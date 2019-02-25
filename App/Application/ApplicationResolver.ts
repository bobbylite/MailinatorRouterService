import { IApplicationResolver } from "../Infrastructure/Types/IApplicationResolver";
import { injectable } from "inversify";
import express = require("express");
import { Builder } from "../Infrastructure/DependencyInjection/Containers";
import { IService } from "../Services/Service";
import Types from "../Infrastructure/DependencyInjection/Types";

@injectable()
export class ApplicationResolver implements IApplicationResolver {

    public app: express.Application;
    private port: number = 8080;

    public constructor() {
        this.app = express();
        this.InitializeComponents();
        this.InitializeServer();
    }

    public InitializeComponents() {
        
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