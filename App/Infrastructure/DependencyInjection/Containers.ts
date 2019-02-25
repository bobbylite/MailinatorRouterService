import { Container } from "inversify";
import "reflect-metadata";
import Types from "./Types";
import { IApplicationResolver } from "../Types/IApplicationResolver";
import { ApplicationResolver } from "../../Application/ApplicationResolver";

export class Builder {

    public static Boostrap() : Container {
        var _container = new Container();
        return Builder.Bind(_container);
    }

    private static Bind(builder: Container) : Container {
        builder.bind<IApplicationResolver>(Types.IApplicationResolver).toConstantValue(new ApplicationResolver);
        
        return builder;
    }
}

Builder.Boostrap();