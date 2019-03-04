import { IHttpManager } from "./IHttpManager";

export interface IMailinatorHttpsManager {
    HttpsManager: IHttpManager;
    GetInboxMessages(inbox: string): void;
}