export interface apiDataResponse{
    date: string;
    score: number;
    count: number;
    name: string;
}

export interface apiOutletResponse{
    outletName: string;
}

export interface apiArticleResponse{
    outletName: string;
    headline: string;
    description: string;
    author: string;
    publishDate: string;
    sentimentScore: number;
    linkToArticle?: string;
}

export interface topic{
    topicNumber: number;
    selectedOutletName: string;
    selectedHeadlineTerms: Array<string>;
    topicName: string;
}

export interface topicData{
    name: string
    dates: Array<string>;
    counts: Array<number>;
    scores: Array<number>;
}

export interface topicTextData{
    name: string;
    avgSentiment: string;
    avgCount: string;
    maxCount: number;
    maxCountDay: string;
    minCount: number;
    minCountDay: string;
    maxScore: string;
    maxScoreDay: string;
    minScore: string;
    minScoreDay: string;
}

export interface barRowData{
    title: string;
    dateList: Array<String>;
    valList: Array<number>;
}