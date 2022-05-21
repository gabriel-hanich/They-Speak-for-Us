"""
Generates a word cloud from the headlines
"""

import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator


# Load DB connection strings
with open("./settings.json", "r") as constantsFile:
    constants = json.load(constantsFile)

# Connect to DB
DBClient = MongoClient(constants["DB_URI"], server_api=ServerApi('1'))

db = DBClient.get_database(constants["DB_NAME"])
newsCollection = db["newsData"]

failedCount = 0
headlinelist = ""
for articleIndex, article in enumerate(newsCollection.find()):
    headlinelist += article["headline"] + " "
    print(articleIndex)

DBClient.close()

wordCloud =  WordCloud(max_font_size=50, max_words=200, background_color="white").generate(headlinelist)
wordCloud.to_file("total_wordcloud.png")
plt.imshow(wordCloud)
plt.axis("off")
plt.show()