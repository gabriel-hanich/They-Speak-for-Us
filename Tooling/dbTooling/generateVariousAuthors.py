"""
Read author strings and seperate them into first name last name pairs
"""

import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords as corpusStopwords
from nltk import pos_tag

# Constants
allowedPOS = ["NNP", "NNS"]
documentCount = 75670


def getNames(dataStr):
    taggedName = pos_tag(word_tokenize(dataStr))
    totalName = ""
    names = [] # List containing each name present in the by-line
    for word in taggedName:
        if len(word[0]) < 3 or word[1] not in allowedPOS: # If this word is NOT an allowed POS (word[0] is the word were word[1] is the POS Tag)
            if totalName != "":
                names.append(totalName[:-1])
                totalName = ""
        if word[1] in allowedPOS:
            totalName += word[0] + " "
    if totalName != "":
        names.append(totalName[:-1]) # Append last name to list 
    return names


# Load DB connection strings
with open("./settings.json", "r") as constantsFile:
    constants = json.load(constantsFile)

# Connect to DB
DBClient = MongoClient(constants["DB_URI"], server_api=ServerApi('1'))

db = DBClient.get_database(constants["DB_NAME"])
newsCollection = db["newsData"]

failedCount = 0

for articleIndex, article in enumerate(newsCollection.find({ "calculatedAuthors": { "$exists": False} })):
    try:
        newNames = getNames(article["author"])
        newsCollection.update_one({"_id": article["_id"]}, {"$push" :{"calculatedAuthors": newNames}})
    except Exception:
        failedCount += 1
    print(str(round(articleIndex / documentCount * 100, 3)) + "%")

print(str(failedCount) + " Articles Failed")
print("Done :)")
DBClient.close()