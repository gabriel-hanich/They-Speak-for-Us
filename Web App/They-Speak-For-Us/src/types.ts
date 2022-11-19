export interface GraphSettings{
    title: String;
    startDate: Date;
    endDate: Date;
    plotType: "sentiment" | "count";
    seriesList: Series[];
}

export interface Series{
    name: String;
    color: String;
    keywordList: String[];
    outletList: String[];
}