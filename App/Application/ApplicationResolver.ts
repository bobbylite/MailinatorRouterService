import { IApplicationResolver } from "../Infrastructure/Types/IApplicationResolver";
import { injectable } from "inversify";
import express = require("express");
import { Builder } from "../Infrastructure/DependencyInjection/Containers";

@injectable()
export class ApplicationResolver implements IApplicationResolver {
    
    public app: express.Application;
    private port: number = 8080;

    public constructor() {
        this.app = express();
        this.InitializeServer();
    }

    public InitializeServer() : void {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
          
        this.app.listen(this.port, () => {
            console.log('Example app listening on port 3000!');
        });
    }
}