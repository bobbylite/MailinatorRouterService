import { IInboxQueueHandler } from "../../Infrastructure/Types/IInboxQueueHandler";
import { BaseHandler } from "./BaseHandler";
import { IInboxQueueService } from "../../Infrastructure/Types/IInboxQueueService";
import { Builder } from "../../Infrastructure/DependencyInjection/Containers";
import Types from "../../Infrastructure/DependencyInjection/Types";
import { ExcelReaderService } from "../Services/ExcelReaderService";
import { InboxQueueService } from "../Services/InboxQueueService";
import { IEmailListService } from "../../Infrastructure/Types/IEmailListService";
import { EmailListService } from "../Services/EmailListService";

export class InboxQueueHandler extends BaseHandler implements IInboxQueueHandler{
    
    private InboxQueueService: IInboxQueueService;
    
    public constructor() {
        super();
        this.InboxQueueService = Builder.Get<IInboxQueueService>(Types.IInboxQueueService);
    }
    
    protected Handle(message?: any) {
        if(!InboxQueueService.IsRunning) this.InboxQueueService.StartPolling();
    }

}