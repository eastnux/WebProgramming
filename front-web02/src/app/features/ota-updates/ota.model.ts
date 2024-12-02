export interface Form {  // was calss 
    otaName: string;
    deviceType: string;
    otaVersion: string;
    description: string;
    files: any[];
};

export interface Ota2 {
    _id: string;
    otaName: string;
    otaVersion: string;
    otaDescription: string;
    fileUrl: string;
    createdAt: string;
}

export interface Ota {
    deviceType: string;
    versionCounter: number;
    ota: Ota2;
}

export interface Data {
    ota: Ota[];
    total: number;
}

export interface OtaResponse {
    status: string;
    message: string;
    data: Data;
}
