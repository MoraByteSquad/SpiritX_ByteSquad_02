import pandas as pd
from pymongo import MongoClient
from datetime import datetime

# MongoDB Atlas connection string
connection_string = "mongodb+srv://<username>:<password>@cluster0.a83gl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Connect to MongoDB
client = MongoClient(connection_string)
db = client.SpiritX_ByteSquad_02  # Replace with your database name
collection = db.players  # Replace with your collection name

# Read the CSV file
csv_file_path = "sample_data.csv"  # Replace with the path to your CSV file
df = pd.read_csv(csv_file_path)

# Convert the DataFrame to a list of dictionaries
data = df.to_dict(orient='records')

# Insert data into MongoDB
for record in data:
    # Add createdAt and updatedAt fields
    record['createdAt'] = datetime.now()
    record['updatedAt'] = datetime.now()

    # Convert stats to the correct structure
    stats = {
        "Total Runs": int(record["Total Runs"]),
        "Balls Faced": int(record["Balls Faced"]),
        "Innings Played": int(record["Innings Played"]),
        "Wickets": int(record["Wickets"]),
        "Overs Bowled": int(record["Overs Bowled"]),
        "Runs Conceded": int(record["Runs Conceded"])
    }

    # Create the final document
    document = {
        "name": record["Name"],
        "university": record["University"],
        "category": record["Category"],
        "stats": stats,
        "createdAt": record["createdAt"],
        "updatedAt": record["updatedAt"]
    }

    # Insert the document into the collection
    collection.insert_one(document)

print("Data inserted successfully!")