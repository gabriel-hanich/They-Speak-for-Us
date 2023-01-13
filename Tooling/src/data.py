import csv
import datetime

def GetData(data):
    csvReader = csv.reader(data)

    result = []
    for row in csvReader:
        result.append(row)
    
    return result

def fileStringToDate(dateString, monthIndexes):
    hour = int(dateString[dateString.find(":") - 2: dateString.find(":")])
    minutes = int(dateString[dateString.find(":")+ 1: dateString.find(":") + 3])

    day = int(dateString[dateString.find(",") + 2: dateString.find(",") + 4])
    month = monthIndexes[dateString[dateString.find(",") + 5: dateString.find(",") + 8].lower()]
    year = int(dateString[dateString.find(",") + 9: dateString.find(",") + 13])
    return datetime.datetime(year, month, day, hour, minutes)


def getNames(dataStr, posTag, wordTokenize):
    allowedPOS = ["NNP", "NNS"]
    taggedName = posTag(wordTokenize(dataStr))
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