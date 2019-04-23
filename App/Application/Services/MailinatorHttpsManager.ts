import { IMailinatorHttpsManagerService } from "../../Infrastructure/Types/IMailinatorHttpsManager";
import { IHttpManager } from "../../Infrastructure/Types/IHttpManager";
import { HttpManager } from "../../Infrastructure/NetworkInfrestrucutre/HttpManager";
import { injectable } from "inversify";
import { LogColors } from "../Utils/LogColors";
import { ApiKey } from "../../Model/MailiantorApiKey";
import { isNullOrUndefined } from "util";
import { IGetInboxMessagesJson } from "../../Infrastructure/Types/IGetInboxMessagesJson";
import { IInboxMessage } from "../../Infrastructure/Types/IInboxMessage";
import { NoMatchFound } from "../../Model/NoMatchFound";

@injectable()
export class MailinatorHttpsManagerService implements IMailinatorHttpsManagerService {
    HttpsManager: IHttpManager;
    private ReadInboxroot: string = '/api/inbox?to=';
    private readMessageRoot: string = 'https://api.mailinator.com/api/email?id=';
    private token: string = "&token="+ ApiKey;

    public constructor() {
        this.HttpsManager = new HttpManager();
    }

    public async FindMatchingInboxSubject(subject: string, inbox: string) : Promise<string>{
        var asyncJson: any;
        var inboxMessageJson: IGetInboxMessagesJson
        asyncJson = await this.GetInboxMessagesJson(inbox, subject);
        inboxMessageJson = asyncJson;

        return (inboxMessageJson.filterResult) ? await this.getMatchedHtml(inboxMessageJson): NoMatchFound;
    }

    public async GetInboxMessagesJson(inboxName: string, filter?: string) : Promise<IGetInboxMessagesJson> {
        let mailinatorPath: string = this.ReadInboxroot.concat(inboxName).concat(this.token);
        return await this.RequestInboxMessages('api.mailinator.com', 443, mailinatorPath, 'GET', filter);
    }

    public async ReadMessage(messageId: string, returnHTML: boolean): Promise<object> {
        let mailinatorPath: string = this.readMessageRoot.concat(messageId).concat(this.token);

        return await this.RequestReadMessage('api.mailinator.com', 443, mailinatorPath, 'GET', returnHTML);
    }

    private async RequestReadMessage(domain: string, port: number, path: string, method: string, returnHTML: boolean) : Promise<object> {
        try {
            var jsonData: any = await this.Request(domain, port, path, method);
            var messageBody: any = (returnHTML) ? jsonData.data.parts[1].body : jsonData.data.parts[0].body

            return messageBody;
        } catch (err) {
            console.log(err);
            return {msg: err};
        }
    }

    private async RequestInboxMessages(domain: string, port: number, path: string, method: string, filter?: string) : Promise<IGetInboxMessagesJson> {
        try {
            let jsonData: any = await this.Request(domain, port, path, method);
            let messages: IInboxMessage[] = jsonData.messages;

            var filteredResult: IInboxMessage[] = messages;

            if (filter) {
                var filterString: string = (filter) ? filter : "";
                filteredResult = [];
                messages.forEach((msg: IInboxMessage) => {
                    if (msg["subject"].toString() === filterString) {
                        filteredResult.push(msg);
                    }
                });
            }

            return (isNullOrUndefined(filteredResult[0])) ? {filterResult: false, messages: messages} : {filterResult: true, messages: filteredResult};
        } catch (err) {
            console.log(err);
            return {filterResult: false, messages: err}
        }
    }
    
    private async Request(domain: string, port: number, path: string, method: string) : Promise<object> {
        try {
            this.HttpsManager.SetOptions(domain, port, path, method);
            let httpBufferPromise : Promise<Buffer> = this.HttpsManager.Get();
    
            let buffer: Buffer = await httpBufferPromise;
            let bufferString: string = buffer.toString('ascii');
            let jsonData: any = JSON.parse(bufferString);
    
            return jsonData;
        } catch (err) {
            console.log(err);
            return {msg: err}
        }
    }

    private async getMatchedHtml(inboxMessages: IGetInboxMessagesJson) : Promise<any> {

        return new Promise( (resolve, reject) => {
            if (typeof(inboxMessages.messages) === "undefined") reject();
            inboxMessages.messages.forEach(async (msg: IInboxMessage) => {
                var readMessage: any= await this.ReadMessage(msg.id, true);
                //console.log("\x1b[1m", readMessage);
                resolve(readMessage);
            });
        });
    }
}