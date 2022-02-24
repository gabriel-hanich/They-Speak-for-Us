export interface article{ // Article object
    outletName: string
    headline:string,
    description: string,
    author: string,
    publishDate: Date,
    isLegacy: boolean,
    sentimentScore: number,
    // Modern article data points below, legacy and modern data points above
    linkToArticle?: string,
    imageURL?: string
    catergories?: string[],
}

export interface mediaOutlet{
    name: string,
    rssLink:string,
    articleList: article[]
}