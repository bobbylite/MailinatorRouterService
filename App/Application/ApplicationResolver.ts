import { IApplicationResolver } from "../Infrastructure/Types/IApplicationResolver";
import { injectable, inject } from "inversify";
import express = require("express");
import { Builder } from "../Infrastructure/DependencyInjection/Containers";
import Types from "../Infrastructure/DependencyInjection/Types";
import { IFileWatcherService } from "../Infrastructure/Types/IFileWatcherService";
import { IMessageBus } from "../Infrastructure/Types/IMessageBus";
import { Notify } from "./Events/EventTypes";
import { IFileFoundHandler } from "../Infrastructure/Types/IFileFoundHandler";

@injectable()
export class ApplicationResolver implements IApplicationResolver {

    public app: express.Application;
    private port: number = 8080;

    public constructor(
        @inject(Types.IFileWatcherService) private FileWatcherService: IFileWatcherService,
        @inject(Types.IMessageBus) private MessageBus: IMessageBus,
        @inject(Types.IFileFoundHandler) private FileFoundHandler: IFileFoundHandler
    ) {
        this.app = express();
        this.InitializeServer();
        this.OnStart();
    }

    private OnStart() {
        this.FileWatcherService.Watch();
        this.RegisiterApplicationEventsToHandler();
    }

    private RegisiterApplicationEventsToHandler() {
        this.MessageBus.on(Notify.FileFound, async () => {this.FileFoundHandler.InitializeHandler()});
        
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