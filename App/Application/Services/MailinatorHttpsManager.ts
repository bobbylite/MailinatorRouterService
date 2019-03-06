import { IMailinatorHttpsManagerService, IInboxResponse, IInboxMessageJson } from "../../Infrastructure/Types/IMailinatorHttpsManager";
import { IHttpManager } from "../../Infrastructure/Types/IHttpManager";
import { HttpManager } from "../../Infrastructure/NetworkInfrestrucutre/HttpManager";
import { injectable } from "inversify";
import { LogColors } from "../Utils/LogColors";
import { ApiKey } from "../../Model/MailiantorApiKey";
import { isNullOrUndefined } from "util";

@injectable()
export class MailinatorHttpsManagerService implements IMailinatorHttpsManagerService {
    HttpsManager: IHttpManager;
    private root: string = "/api/inbox?to=";
    private token: string = "&token="+ ApiKey;
    
    public constructor() {
        this.HttpsManager = new HttpManager();
    }

    public async GetInboxMessagesJson(inboxName: string, filter?: string) : Promise<IInboxMessageJson> {
        let mailinatorPath: string = this.root.concat(inboxName).concat(this.token);
        return await this.RequestInboxMessages('api.mailinator.com', 443, mailinatorPath, 'GET', filter);
    }

    public async ReadMessage(messageId: string): Promise<void> {

    }

    private async RequestInboxMessages(domain: string, port: number, path: string, method: string, filter?: string) : Promise<IInboxMessageJson> {
        try {
            this.HttpsManager.SetOptions(domain, port, path, method);
            let httpBufferPromise : Promise<Buffer> = this.HttpsManager.Get();

            let buffer: Buffer = await httpBufferPromise;

            let bufferString: string = buffer.toString('ascii');
            let jsonData: any = JSON.parse(bufferString);
            let messages: IInboxResponse[] = jsonData.messages;

            var filteredResult: IInboxResponse[] = messages;

            if (filter) {
                var filterString: string = (filter) ? filter : "";
                filteredResult = [];
                messages.forEach((msg: IInboxResponse) => {
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
}