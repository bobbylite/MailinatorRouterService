import { IHttpManager } from "./IHttpManager";

export interface IMailinatorHttpsManager {
    HttpsManager: IHttpManager;
    GetInboxMessagesJson(inboxName: string, filter?: string): Promise<object>;
}

export interface IInboxResponse {
    fromfull: string;
    subject: string;
    from: string;
    origfrom: string;
    to: string;
    id: string;
    time: number;
    seconds_ago: number;
}

export interface IInboxMessageJson {
    filterResult: boolean;
    messages: IInboxResponse[]
}