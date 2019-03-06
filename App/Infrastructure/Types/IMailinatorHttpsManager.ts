import { IHttpManager } from "./IHttpManager";
import { IGetInboxMessagesJson } from "./IGetInboxMessagesJson";

export interface IMailinatorHttpsManagerService {
    HttpsManager: IHttpManager;
    ReadMessage(messageId: string, returnHTML: boolean): Promise<object>
    GetInboxMessagesJson(inboxName: string, filter?: string): Promise<IGetInboxMessagesJson>;
}