import { INodeMailerService } from "./INodeMailerService";
import { BaseHandler } from "../../Application/EventHandlers/BaseHandler";

export interface INodeMailerHandler extends BaseHandler {
    MailerService: INodeMailerService;
}