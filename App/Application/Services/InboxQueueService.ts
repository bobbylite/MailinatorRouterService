import { IInboxQueueService } from "../../Infrastructure/Types/IInboxQueueService";
import { injectable, inject } from "inversify";
import { sleep } from "../Utils/Sleep";
import Types from "../../Infrastructure/DependencyInjection/Types";
import { IMailinatorHttpsManagerService } from "../../Infrastructure/Types/IMailinatorHttpsManager";
import { MailinatorHttpsManagerService } from "./MailinatorHttpsManager";
import { SubjectIdentifier } from "../../Model/SubjectIdentifier";
import { IMessageBus } from "../../Infrastructure/Types/IMessageBus";
import { Builder } from "../../Infrastructure/DependencyInjection/Containers";
import { Notify } from "../Events/EventTypes";
import { NoMatchFound } from "../../Model/NoMatchFound";

@injectable()
export class InboxQueueService implements IInboxQueueService{

    public static NodeMailerHtmlContent: string;
    private PollingInterval: number = 1000;
    private data: string[] = [];
    private MessageBus: IMessageBus;

    public constructor(
        @inject(Types.IMailinatorHttpsManagerService) private MailinatorHttpsManagerService: IMailinatorHttpsManagerService
    ) {
        this.MessageBus = Builder.Get<IMessageBus>(Types.IMessageBus);
    }

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
                if (htmlContent !== NoMatchFound){
                    this.handleFoundMatch(htmlContent);
                    this.PopData(inboxName);
                } 

                if (index === this.data.length-1) this.restartPoll();
            } catch (err) {
                console.log(err);
            }
        });
    }

    private handleFoundMatch(htmlcontent: string): void {
        // Send off to destination address.
        // POP inbox from queue that matched.
        InboxQueueService.NodeMailerHtmlContent = htmlcontent;
        this.MessageBus.emit(Notify.FoundMatch);
    }

    private restartPoll(): void {
        console.log("Ended!");
        this.Poll(this.data);
    }

    private PopData(match: string): string[] {
        var index = this.data.indexOf(match);
        if (index !== -1) return this.data.splice(index, 1);
        else return this.data;
    }
}