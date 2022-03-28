export interface apiDataResponse{
    date: string;
    score: number;
    count: number;
    name: string;
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