import { IInboxQueueService } from "../../Infrastructure/Types/IInboxQueueService";
import { injectable, inject } from "inversify";
import { sleep } from "../Utils/Sleep";
import Types from "../../Infrastructure/DependencyInjection/Types";
import { IMailinatorHttpsManagerService } from "../../Infrastructure/Types/IMailinatorHttpsManager";
import { MailinatorHttpsManagerService } from "./MailinatorHttpsManager";
import { SubjectIdentifier } from "../../Model/SubjectIdentifier";

@injectable()
export class InboxQueueService implements IInboxQueueService{

    private PollingInterval: number = 1000;
    private data: string[] = [];

    public constructor(
        @inject(Types.IMailinatorHttpsManagerService) private MailinatorHttpsManagerService: IMailinatorHttpsManagerService
    ) {}

    public StartPolling() : void {

    }

    public Poll(data: string[]) : void {
        if (this.data.length === 0) this.data = data;

        this.data.forEach(async (inboxName: any, index: number) => {
            try {
                await sleep(1000 * index);
                console.log(inboxName);
                console.log("Index: " + index);

                var htmlContent: string = await this.MailinatorHttpsManagerService.FindMatchingInboxSubject(SubjectIdentifier, inboxName);
                this.handleFoundMatch(htmlContent);

                if (index === this.data.length-1) this.restartPoll();
            } catch (err) {
                console.log(err);
            }
        });
    }

    private handleFoundMatch(htmlcontent: string): void {
        // Send off to destination address.
        // POP inbox from queue that matched.

        console.log("Found Match: " + htmlcontent);
    }

    private restartPoll(): void {
        console.log("Ended!");
        this.Poll(this.data);
    }
}