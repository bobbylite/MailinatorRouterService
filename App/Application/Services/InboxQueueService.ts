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
    public static EmailListLength: number;
    

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
        InboxQueueService.EmailListLength = EmailListService.EmailList.length
        for(var i = 0; i < InboxQueueService.EmailListLength; i++) {
            try {
                await sleep(1000);
                if (i === 0) console.log(EmailListService.EmailList.length + "/" + InboxQueueService.EmailListLength);
                var inboxName = EmailListService.EmailList[i];
                console.log(inboxName);
                console.log("Index: " + i);

                var htmlContent: string = await this.MailinatorHttpsManagerService.FindMatchingInboxSubject(SubjectIdentifier, inboxName);
                //console.log(htmlContent);
                if (htmlContent !== NoMatchFound){
                    this.handleFoundMatch(inboxName, htmlContent);
                    this.PopEmail(inboxName);
                } 

            } catch (err) {
                console.log(err);
            }           
        }

        this.restartPoll();
    }

    private async handleFoundMatch(inbox: string, emailContext: string): Promise<any> {
        try {
            var rawData: any = await this.MailinatorHttpsManagerService.GetRawMessageData(SubjectIdentifier, inbox);

            var from = '"Mailinator Service" - ' + rawData.messages[0].origfrom;
            var subject = rawData.messages[0].subject;
            var html = emailContext;
    
            InboxQueueService.NodeMailerContent = {
                inbox: inbox,
                from: from,
                subject: subject,
                html: html
            };
    
            this.MessageBus.emit(Notify.FoundMatch);
        } catch (err) {
            console.log(err);
        }
    }

    private restartPoll(): void {
        try {
            console.log("Ended!");
            this.Poll();
        } catch(err) {
            console.log(err);
        }
    }

    private PopEmail(match: string): string[] {
        try {
            this.EmailListService.Remove(match);
            InboxQueueService.EmailListLength = EmailListService.EmailList.length;
            return EmailListService.EmailList;
        } catch (err) {
            console.log(err);
            return EmailListService.EmailList;
        }
    }
}