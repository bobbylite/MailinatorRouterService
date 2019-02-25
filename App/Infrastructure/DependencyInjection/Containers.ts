import { Container } from "inversify";
import "reflect-metadata";
import Types from "./Types";
import { IApplicationResolver } from "../Types/IApplicationResolver";
import { ApplicationResolver } from "../../Application/ApplicationResolver";
import { Service, IService } from "../../Services/Service";

export class Builder {

    public static _container: Container = new Container();

    public constructor() {
        this.Bind(Builder._container);
    }

    public static Boostrap() : Builder {
        return new Builder();
    }

    public static Get<T>(templateString: string) : any {
        return Builder._container.get<T>(templateString);
    }

    private Bind(builder: Container) : void {
        builder.bind<IService>(Types.IService).to(Service);
        builder.bind<IApplicationResolver>(Types.IApplicationResolver).toConstantValue(new ApplicationResolver);
    }
}

Builder.Boostrap();