import { injectable } from "inversify";
import { BaseHandler } from "./BaseHandler";
import { INodeMailerHandler } from "../../Infrastructure/Types/INodeMailerHandler";
import { INodeMailerService } from "../../Infrastructure/Types/INodeMailerService";
import Types from "../../Infrastructure/DependencyInjection/Types";
import { Builder } from "../../Infrastructure/DependencyInjection/Containers";
import { IInboxQueueService } from "../../Infrastructure/Types/IInboxQueueService";
import { InboxQueueService } from "../Services/InboxQueueService";

@injectable()
export class NodeMailerHandler extends BaseHandler implements INodeMailerHandler {
    public MailerService: INodeMailerService;
    
    public constructor() {
        super();
        this.MailerService = Builder.Get<INodeMailerService>(Types.INodeMailerService);
    }
    
    protected Handle(message?: any) {
        this.MailerService.Send(InboxQueueService.NodeMailerHtmlContent);
    }
}