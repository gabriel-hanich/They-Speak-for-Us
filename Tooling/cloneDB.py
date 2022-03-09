'''
Clones one database to another
'''

import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Constants
newDBName = "New-Test"
documentCount = 54000


# Load DB connection strings
with open("./settings.json", "r") as constantsFile:
    DBconstants = json.load(constantsFile)

DBClient = MongoClient(DBconstants["DB_URI"])

parentDB = DBClient[DBconstants["DB_NAME"]]
childDB = DBClient[newDBName]

insertedCount = 0
for collection in parentDB.list_collection_names():
    print(collection)
    childDBCursor = childDB[collection]
    for document in parentDB[collection].aggregate([]):
        childDBCursor.insert_one(document)
        insertedCount += 1
        print(str(round(insertedCount / documentCount * 100, 2)) + "%")

DBClient.close()