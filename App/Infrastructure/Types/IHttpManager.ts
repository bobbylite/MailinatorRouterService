import * as https from "https";

export interface IHttpManager {
    Get(): Promise<Buffer>;
    SetOptions(hostnameUrl: string, port: number, path: string, method: string, bufferSize?: number): void;
}