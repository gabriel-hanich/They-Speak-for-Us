"""
Nukes specific field given by field variable
"""

import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Constants
documentCount = 53919
field = "calculatedAuthors"

# Load DB connection strings
with open("./settings.json", "r") as constantsFile:
    constants = json.load(constantsFile)

# Connect to DB
DBClient = MongoClient(constants["DB_URI"], server_api=ServerApi('1'))

db = DBClient.get_database(constants["DB_NAME"])
newsCollection = db["newsData"]

run = input("WARNING, THIS WILL NUKE FIELD: " + field + "\nON DATABASE: " + constants["DB_NAME"] + "\nPLEASE TYPE THE FIELD NAME BELOW TO CONTINUE\n")
if run == field:
    newsCollection.update_many({}, {"$unset": {field: 1}})

DBClient.close()
print("FIELD NUKED")