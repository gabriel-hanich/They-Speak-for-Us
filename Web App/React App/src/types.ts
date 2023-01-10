export interface BackendStatus{
    status: number;
    success: boolean;
    comment: string;
}

export interface OutletQuery{
    title: string;
    startDate: Date;
    endDate: Date;
    topicList: Topic[];
}

export interface Topic{
    id: string;
    title: string;
    color: string;
    keywords: string[];
    outletList: OutletSelection[];
}

export interface OutletSelection{
    name: string;
    selected: boolean;
}

export interface TopicVals{
    id: string;
    title: string;
    color: string;
    points: Point[];
}

export interface Point{
    x: Date;
    y: number;
}