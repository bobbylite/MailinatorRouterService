import { IInboxQueueService } from "../../Infrastructure/Types/IInboxQueueService";
import { injectable, inject } from "inversify";
import { sleep, sleepSync } from "../Utils/Sleep";
import Types from "../../Infrastructure/DependencyInjection/Types";
import { IMailinatorHttpsManagerService } from "../../Infrastructure/Types/IMailinatorHttpsManager";
import { SubjectIdentifier } from "../../Model/SubjectIdentifier";
import { IMessageBus } from "../../Infrastructure/Types/IMessageBus";
import { Builder } from "../../Infrastructure/DependencyInjection/Containers";
import { Notify } from "../Events/EventTypes";
import { NoMatchFound } from "../../Model/NoMatchFound";
import { IEmailListService } from "../../Infrastructure/Types/IEmailListService";
import { EmailListService } from "./EmailListService";

@injectable()
export class InboxQueueService implements IInboxQueueService{

    public static NodeMailerContent: any;
    private PollingInterval: number = 1000;
    private MessageBus: IMessageBus;
    private EmailListService: IEmailListService;
    public static IsRunning: boolean;
    

    public constructor(
        @inject(Types.IMailinatorHttpsManagerService) private MailinatorHttpsManagerService: IMailinatorHttpsManagerService
    ) {
        this.MessageBus = Builder.Get<IMessageBus>(Types.IMessageBus);
        this.EmailListService =  Builder.Get<IEmailListService>(Types.IEmailListService);
        InboxQueueService.IsRunning = false;
    }

    public StartPolling() : void {  
        InboxQueueService.IsRunning = true;   
        this.Poll();
    }

    public StopPolling(): void {
        InboxQueueService.IsRunning = false;
    }

    public async Poll() {
        /*
        this.data.forEach(async (inboxName: any, index: number) => {
            try {
                if (!InboxQueueService.CanPoll) throw this.BreakException;
                await sleep(1000 * index);
                console.log("Can Poll: " + InboxQueueService.CanPoll);
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
        */ 
        
        for(var i = 0; i < EmailListService.EmailList.length; i++) {
            try {
                await sleep(1000);
                var inboxName = EmailListService.EmailList[i];
                console.log(inboxName);
                console.log("Index: " + i);

                var htmlContent: string = await this.MailinatorHttpsManagerService.FindMatchingInboxSubject(SubjectIdentifier, inboxName);
                if (htmlContent !== NoMatchFound){
                    this.handleFoundMatch(inboxName);
                    this.PopEmail(inboxName);
                } 

                if (i === EmailListService.EmailList.length-1 && InboxQueueService.IsRunning) this.restartPoll();
            } catch (err) {
                console.log(err);
            }           
        }
    }

    private async handleFoundMatch(inbox: string): Promise<any> {
        var rawData: any = await this.MailinatorHttpsManagerService.GetRawData(inbox);

        var from = '"Mailinator Service" - ' + rawData.data.origfrom;
        var subject = rawData.data.subject;
        var html = rawData.data.parts[1].body;

        InboxQueueService.NodeMailerContent = {
            from: from,
            subject: subject,
            html: html
        };

        this.MessageBus.emit(Notify.FoundMatch);
    }

    private restartPoll(): void {
        console.log("Ended!");
        this.Poll();
    }

    private PopEmail(match: string): string[] {
        this.EmailListService.Remove(match);
        return EmailListService.EmailList;
    }
}