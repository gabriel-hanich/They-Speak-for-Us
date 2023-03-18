export interface Outlet{
    _id: string;
    outletName: string; 
    RSSLink: string;
    articleList: Article[];
}

export interface Article{ // Article object
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
