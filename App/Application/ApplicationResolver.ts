import { IApplicationResolver } from "../Infrastructure/Types/IApplicationResolver";
import { injectable, inject } from "inversify";
import express = require("express");
import { Builder } from "../Infrastructure/DependencyInjection/Containers";
import Types from "../Infrastructure/DependencyInjection/Types";
import { IFileWatcherService } from "../Infrastructure/Types/IFileWatcherService";
import { IMessageBus } from "../Infrastructure/Types/IMessageBus";
import { Notify } from "./Events/EventTypes";
import { IFileFoundHandler } from "../Infrastructure/Types/IFileFoundHandler";
import { IMailinatorHttpsManagerService } from "../Infrastructure/Types/IMailinatorHttpsManager";
import { IGetInboxMessagesJson } from "../Infrastructure/Types/IGetInboxMessagesJson";
import { IInboxMessage } from "../Infrastructure/Types/IInboxMessage";
import { IInboxQueueHandler } from "../Infrastructure/Types/IInboxQueueHandler";
import { INodeMailerHandler } from "../Infrastructure/Types/INodeMailerHandler";

@injectable()
export class ApplicationResolver implements IApplicationResolver {

    public app: express.Application;
    private port: number = 8080;

    public constructor(
        @inject(Types.IFileWatcherService) private FileWatcherService: IFileWatcherService,
        @inject(Types.IMessageBus) private MessageBus: IMessageBus,
        @inject(Types.IFileFoundHandler) private FileFoundHandler: IFileFoundHandler,
        @inject(Types.IMailinatorHttpsManagerService) private MailinatorHttpsManagerService: IMailinatorHttpsManagerService,
        @inject(Types.IInboxQueueHandler) private InboxQueueHandler: IInboxQueueHandler,
        @inject(Types.INodeMailerHandler) private NodeMailerHandler: INodeMailerHandler
    ) {
        this.app = express();
        this.OnStart();
    }

    private async TestHttps() : Promise<void> {
        var asyncJson: any;
        var inboxMessageJson: IGetInboxMessagesJson
        asyncJson = await this.MailinatorHttpsManagerService.GetInboxMessagesJson("ConsiliTechTest", "Test 2");
        inboxMessageJson = asyncJson;

        if (inboxMessageJson.filterResult) {
            inboxMessageJson.messages.forEach(async (msg: IInboxMessage) => {
                var readMessage: any= await this.MailinatorHttpsManagerService.ReadMessage(msg.id, true);
                console.log("\x1b[1m", readMessage);
            });
        }
    }

    private OnStart() {
        this.FileWatcherService.Watch();
        this.RegisiterApplicationEventsToHandler();
    }

    private RegisiterApplicationEventsToHandler() {
        this.MessageBus.on(Notify.FileFound, async () => {this.FileFoundHandler.InitializeHandler()});
        this.MessageBus.on(Notify.InboxQueue, async() => {this.InboxQueueHandler.InitializeHandler()});
        this.MessageBus.on(Notify.FoundMatch, async () => {this.NodeMailerHandler.InitializeHandler()});
    }

    private InitializeServer() : void {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
          
        this.app.listen(this.port, () => {
            console.log('MailinatorRouterService listening on port: ' + this.port);
        });
    }
}