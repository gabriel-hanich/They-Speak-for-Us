"""
Generates a word cloud from the headlines
"""

import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import matplotlib.pyplot as plt
from regex import E


# Load DB connection strings
with open("./settings.json", "r") as constantsFile:
    constants = json.load(constantsFile)

# Connect to DB
DBClient = MongoClient(constants["DB_URI"], server_api=ServerApi('1'))

db = DBClient.get_database(constants["DB_NAME"])
newsCollection = db["newsData"]

failedCount = 0
headlinelist = []
headlinestr = ""
for articleIndex, article in enumerate(newsCollection.aggregate([
    {
        '$match': {
            'headline': {
                '$regex': '(?i)labor'
            }
        }
    }
])):
    headlinelist.append(article["headline"])
    headlinestr +=  article["headline"].strip() + "\n"
    print(articleIndex)

with open("./test.txt", "w", encoding="utf-8", newline="\n") as testFile:
    testFile.write(headlinestr) 

DBClient.close()
