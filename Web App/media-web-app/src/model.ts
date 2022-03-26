export interface apiDataResponse{
    date: string;
    score: number;
    count: number;
}

export interface apiOutletResponse{
    outletName: string;
}

export interface topic{
    topicNumber: number;
    selectedOutletName: string;
    selectedHeadlineTerms: Array<string>;
    topicName: string;
}