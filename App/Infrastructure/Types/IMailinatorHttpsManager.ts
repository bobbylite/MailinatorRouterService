import { IHttpManager } from "./IHttpManager";
import { IGetInboxMessagesJson } from "./IGetInboxMessagesJson";

export interface IMailinatorHttpsManagerService {
    HttpsManager: IHttpManager;
    FindMatchingInboxSubject(subject: string, inbox: string): Promise<string>;
    ReadMessage(messageId: string, returnHTML: boolean): Promise<object>;
    GetInboxMessagesJson(inboxName: string, filter?: string): Promise<IGetInboxMessagesJson>;
    GetRawData(messageId: string) : Promise<object>
}