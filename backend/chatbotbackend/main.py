import os
import json
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain.memory import ConversationBufferMemory
from pymongo import MongoClient

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

# Initialize conversation memory
memory = ConversationBufferMemory(return_messages=True)

@app.get("/ping")
def ping_db():
    try:
        # Adjust the URI for your MongoDB Atlas cluster with the correct parameters
        mongodb_uri=f'mongodb+srv://surajahasarindadev:LWhAP7MsRZxcsCx3@cluster0.a83gl.mongodb.net/SpiritX_ByteSquad_02?retryWrites=true&w=majority&appName=Cluster0'
        client = MongoClient(mongodb_uri, serverSelectionTimeoutMS=5000)
        # Ping the server
        client.admin.command('ping')
        # List collections from the specified database
        collections = client[os.getenv("DB_NAME")].list_collection_names()
        return {"status": "success", "collections": collections}
    except Exception as e:
        return {"status": "error", "message": str(e)}
@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    try:
        print(f"Received message: {request.message}")
        response = chat_with_llm(request.message)
        return ChatResponse(response=response)
    except Exception as e:
        print(f"Error in chat_endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

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

def get_best_team(db):
    best_players = list(db.players.find({}, {"_id": 0, "points": 0}).sort("points", -1).limit(11))
    if not best_players:
        return "I don’t have enough knowledge to answer that question."
    
    team_names = [player['name'] for player in best_players]
    return f"The best possible team is: {', '.join(team_names)}."


def chat_with_llm(user_message: str):
    # Initialize Gemini model and start chat session
    model = initialize_gemini()
    chat_session = model.start_chat()
    
    # Connect to MongoDB
    mongodb_uri=f'mongodb+srv://surajahasarindadev:LWhAP7MsRZxcsCx3@cluster0.a83gl.mongodb.net/SpiritX_ByteSquad_02?retryWrites=true&w=majority&appName=Cluster0'
    client = MongoClient(mongodb_uri)
    db = client[os.getenv("DB_NAME")]
    # Build a rudimentary schema: list collections and sample document keys from each
    schema_info = {}
    collections = db.list_collection_names()
    for coll in collections:
        sample_doc = db[coll].find_one()
        schema_info[coll] = list(sample_doc.keys()) if sample_doc else []
    schema = json.dumps(schema_info, indent=2)
    
    try:
        # Load conversation history
        history = memory.load_memory_variables({})
        history_context = "\n".join([f"{m.type}: {m.content}" for m in history.get("history", [])])
        

        if "best" in user_message.lower() or "best 11" in user_message.lower():
            return get_best_team(db)
        # Build a context prompt to generate a MongoDB query
        context = f"""Based on this MongoDB database schema:
        {schema}

        Previous conversation:
        {history_context}

        Generate only a MongoDB query in JSON format with the following keys:
        - If user asking about one player's stats then give him all stats of that player.
        - "collection": the name of the collection to query
        - "filter": a JSON object representing the query filter
        - "projection" (optional): a JSON object representing the projection
        - Order the players by highest points but do not limit to 11 players.

        Answer the following question: {user_message}

        Return only the JSON query without any markdown formatting or additional explanation."""
        
        # Get MongoDB query from the model
        response = chat_session.send_message(context)
        response_text = response.text.strip()
        
        try:
            mongo_query = json.loads(response_text)
        except Exception as e:
            mongo_query = None

        if not mongo_query or "collection" not in mongo_query or "filter" not in mongo_query:
            # If generated query is not valid, fallback to a general conversational response
            fallback_context = f"""You are a helpful and friendly customer service chatbot called Spiriter for The Ultimate Inter-University Fantasy Cricket Game. 
                If you dont have details about user question only say I don’t have enough knowledge to answer that question., please:
                ask something else.

            The user's question is: {user_message}"""
            
            return chat_session.send_message(fallback_context).text

        # Execute MongoDB query
        collection_name = mongo_query.get("collection")
        query_filter = mongo_query.get("filter", {})
        projection = mongo_query.get("projection", None)
        
        collection = db[collection_name]
        results_cursor = collection.find(query_filter, projection)
        results = list(results_cursor)
        
        print(f"MongoDB Query: {mongo_query}")
        print(f"Results: {results}")
        
        # Create context with query results for the final answer
        if results:
            results_context = f"""Based on this database query result:
            {json.dumps(results, indent=2)}

            Previous conversation:
            {history_context}

            You are a friendly customer service chatbot called Spiriter for The Ultimate Inter-University Fantasy Cricket Game. Please provide a natural, conversational response to this question: {user_message}

            
            Guidelines:
            - If user asing about best possible team then give 11 players with highest points without asking another question from user.
            - Use the query results to provide accurate information.
            - Do not reveal any sensitive data like personal details or internal records.
            - Format numbers and dates in a user-friendly way."""
        else:
            results_context = f"""You are a helpful and friendly customer service chatbot called Spiriter for The Ultimate Inter-University Fantasy Cricket Game. 
            I don’t have enough knowledge to answer that question, please:
            1. Ask another question.
            2. Maintain a natural, conversational tone.
            3. Ensure that the conversation does not reveal players' points under any circumstances.
            4. Express willingness to help with other questions.
            5. Don't give any details about users in the database.

            Previous conversation:
            {history_context}

            The user's question is: {user_message}"""
        
        # Get final response from the model
        final_response = chat_session.send_message(results_context)
        
        # Generate a summary of the conversation exchange
        conversation_summary = summarize_conversation(user_message, final_response.text, model)
        
        # Save both the full context and the summary to conversation memory
        memory.save_context(
            {"input": f"{user_message}\nSummary: {conversation_summary}"}, 
            {"output": f"{final_response.text}\nSummary: {conversation_summary}"}
        )
        
        return final_response.text
        
    except Exception as e:
        raise Exception(f"Error in chat processing: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
