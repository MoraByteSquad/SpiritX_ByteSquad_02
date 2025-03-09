import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain.memory import ConversationBufferMemory
from pymongo import MongoClient
from bson.json_util import dumps

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# Load environment variables
load_dotenv()

# Initialize MongoDB connection
mongo_uri = os.getenv("MONGO_URI")
mongo_client = MongoClient(mongo_uri)

db = mongo_client[os.getenv("DB_NAME")]


# Initialize conversation memory
memory = ConversationBufferMemory(return_messages=True)

def initialize_gemini():
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise ValueError("GEMINI_API_KEY is not set in the environment variables.")
    genai.configure(api_key=gemini_api_key)
    
    generation_config = {
        "temperature": 0.7,
        "top_p": 0.9,
        "top_k": 40,
        "max_output_tokens": 4096,
        "response_mime_type": "text/plain",
    }
    
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )
    return model

def summarize_conversation(user_message: str, bot_response: str, model) -> str:
    summary_prompt = f"""Please provide a brief summary of this conversation exchange:
    User: {user_message}
    Bot: {bot_response}
    
    Summarize the key points in 1-2 sentences."""
    
    summary_response = model.generate_content(summary_prompt)
    return summary_response.text

def get_mongo_schema():

    schema = {}
    
    collections = db.list_collection_names()
    print(collections)
    
    if not collections:
        print("No collections found in the database.")
        return {"error": "No collections found."}

    for collection_name in collections:
        sample_doc = db[collection_name].find_one()
        if sample_doc:
            schema[collection_name] = list(sample_doc.keys())
        else:
            schema[collection_name] = ["No documents in this collection"]
    
    return schema




def execute_mongo_query(query: str):
    try:
        # Execute query in all collections
        results = {}
        for collection_name in db.list_collection_names():
            try:
                collection = db[collection_name]
                cursor = collection.aggregate([query])  # Assuming the query is a valid MongoDB aggregation pipeline
                results[collection_name] = list(cursor)
            except Exception as e:
                results[collection_name] = f"Error executing query: {str(e)}"
        return results
    except Exception as e:
        raise Exception(f"Error executing MongoDB query: {str(e)}")

def chat_with_llm(user_message: str):
    model = initialize_gemini()
    chat_session = model.start_chat()
    
    schema = get_mongo_schema()
    print(schema)
    
    try:
        history = memory.load_memory_variables({})
        history_context = "\n".join([f"{m.type}: {m.content}" for m in history.get("history", [])])
        
        context = f"""Based on this MongoDB schema:
        {schema}
        
        Previous conversation:
        {history_context}
        
        Generate only a MongoDB  query to answer this question: {user_message}
        Return only the MongoDB query without any markdown formatting or explanations."""
        
        response = chat_session.send_message(context)
        mongo_query = response.text.strip()
        print(f"Generated MongoDB query: {mongo_query}")
        query_results = execute_mongo_query(mongo_query)
        print(f"Query results: {query_results}")
        
        if any(query_results.values()):
            results_context = f"""Based on this MongoDB query result:
            {dumps(query_results)}
            
            Previous conversation:
            {history_context}
            
            You are a friendly customer service chatbot for Spiriter for The Ultimate Inter-University Fantasy Cricket Game. Please provide a natural, conversational response to this question: {user_message}
            
            Guidelines:
            - Use the query results to provide accurate information
            - Maintain a helpful and professional tone
            - Only share publicly available information
            - Do not reveal any sensitive data like personal details or internal records
            - Keep the conversation engaging and suggest relevant follow-up topics
            - Format numbers and dates in a user-friendly way"""
        else:
            results_context = f"""You are a helpful and friendly customer service chatbot for Spiriter for The Ultimate Inter-University Fantasy Cricket Game. 
            Even though I don't have specific database information for this query, please:
            1. Maintain a natural, conversational tone
            2. Acknowledge the user's question
            3. Suggest alternative topics or questions if appropriate
            4. Express willingness to help with other questions
            
            Previous conversation:
            {history_context}
            
            The user's question is: {user_message}
            
            Remember to be empathetic, professional, and focus only on publicly available information."""
        
        final_response = chat_session.send_message(results_context)
        conversation_summary = summarize_conversation(user_message, final_response.text, model)
        
        memory.save_context(
            {"input": f"{user_message}\nSummary: {conversation_summary}"}, 
            {"output": f"{final_response.text}\nSummary: {conversation_summary}"}
        )
        
        return final_response.text
        
    except Exception as e:
        raise Exception(f"Error in chat processing: {str(e)}")

@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    try:
        print(f"Received message: {request.message}")
        response = chat_with_llm(request.message)
        return ChatResponse(response=response)
    except Exception as e:
        print(f"Error in chat_endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
