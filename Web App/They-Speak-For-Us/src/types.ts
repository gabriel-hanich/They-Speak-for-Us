export interface GraphOptions{
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
    outlet: String;
    points: Point[];
}

export interface Point{
    date: Date;
    value: number
}