import { IMailinatorHttpsManager } from "../../Infrastructure/Types/IMailinatorHttpsManager";
import { IHttpManager } from "../../Infrastructure/Types/IHttpManager";
import { HttpManager } from "../../Infrastructure/NetworkInfrestrucutre/HttpManager";
import { injectable } from "inversify";
import { LogColors } from "../Utils/LogColors";
import { ApiKey } from "../../Model/MailiantorApiKey";

@injectable()
export class MailinatorHttpsManager implements IMailinatorHttpsManager {
    HttpsManager: IHttpManager;
    private root: string = "/api/inbox?to=";
    private token: string = "&token="+ ApiKey;
    
    public constructor() {
        this.HttpsManager = new HttpManager();
    }

    public async GetInboxMessages(inboxName: string) : Promise<object> {
        let mailinatorPath: string = this.root.concat(inboxName).concat(this.token);
        return await this.RequestInboxMessages('api.mailinator.com', 443, mailinatorPath, 'GET');
    }

    private async RequestInboxMessages(domain: string, port: number, path: string, method: string) : Promise<object> {
        try {
            this.HttpsManager.SetOptions(domain, port, path, method);
            let httpBufferPromise : Promise<Buffer> = this.HttpsManager.Get();

            let buffer: Buffer = await httpBufferPromise;

            let bufferString: string = buffer.toString('ascii');
            let jsonData: any = JSON.parse(bufferString);
            let messages: any = jsonData.messages;

            return messages;
        } catch (err) {
            console.log(err);
            return {error: err}
        }
    }
}