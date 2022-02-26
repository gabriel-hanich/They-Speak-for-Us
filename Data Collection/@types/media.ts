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
    imageURL?: string,
    catergories?: string[]
}

export interface mediaOutlet{
    name: string,
    rssLink:string,
    articleList: article[]
}

export interface rssReply{
    title:string,
    description: string,
    creator: string,
    isoDate: string,
    isLegacy: boolean,
    link: string,
    content: string,
    contentSnippet: string,
    categories: string[]
}