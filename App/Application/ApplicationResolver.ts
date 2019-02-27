import { IApplicationResolver } from "../Infrastructure/Types/IApplicationResolver";
import { injectable, inject } from "inversify";
import express = require("express");
import { Builder } from "../Infrastructure/DependencyInjection/Containers";
import Types from "../Infrastructure/DependencyInjection/Types";
import { IFileWatcherService } from "../Infrastructure/Types/IFileWatcherService";

@injectable()
export class ApplicationResolver implements IApplicationResolver {

    public app: express.Application;
    private port: number = 8080;

    public constructor(
        @inject(Types.IFileWatcherService) private FileWatcherService: IFileWatcherService
    ) {
        this.app = express();
        this.InitializeServer();
        this.OnStart();
    }

    public OnStart() {
        this.FileWatcherService.Watch();
    }

    public InitializeServer() : void {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
          
        this.app.listen(this.port, () => {
            console.log('MailinatorRouterService listening on port: ' + this.port);
        });
    }
}