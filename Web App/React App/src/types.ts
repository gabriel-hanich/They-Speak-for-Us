export interface BackendStatus{
    status: number;
    success: boolean;
    comment: string;
}

export interface ProfileData{
    imgLink: string;
    at: string;
    name: string;
    followCount: number;
    followingCount: number;
    tweetCount: number;
}