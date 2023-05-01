class Outlet:
    def __init__(self, name):
        self.name = name
        self.articleList = []

    def addArticle(self, article) -> None:
        self.articleList.append(article)

class Article:
    def __init__(self, outlet, headline, description, author, date, sentimentScore, url, catergories):
        self.outlet = outlet
        self.headline = headline
        self.description = description
        self.author = author
        self.date = date
        self.sentimentScore = sentimentScore
        self.url = url
        self.catergories = catergories