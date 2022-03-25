export interface apiDataResponse{
    date: string;
    score: number;
    count: number;
}

export interface apiOutletResponse{
    outletName: string;
}

export interface topic{
    selectedOutletName: string;
    selectedHeadlineTerms: Array<string>;
}