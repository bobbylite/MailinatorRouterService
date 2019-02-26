import { Container } from "inversify";
import "reflect-metadata";
import Types from "./Types";
import { IApplicationResolver } from "../Types/IApplicationResolver";
import { ApplicationResolver } from "../../Application/ApplicationResolver";
import { Service, IService } from "../../Tests/Service";
import { IFileWatcher } from "../Types/IFileWatcher";
import { FileWatcher } from "../../Application/Services/FileWatcher";

export class Builder {

    public static _container: Container = new Container();

    public constructor() {
        this.InitializeBindings(Builder._container);
        this.InitializeApplicationResolver(Builder._container);
    }

    public static Boostrap() : Builder {
        return new Builder();
    }

    public static Get<T>(templateString: string) : any {
        return Builder._container.get<T>(templateString);
    }

    private InitializeApplicationResolver(builder: Container) : void {
        builder.bind<IApplicationResolver>(Types.IApplicationResolver).toConstantValue(new ApplicationResolver);
    }

    private InitializeBindings(builder: Container) : void {
        builder.bind<IFileWatcher>(Types.IFileWatcher).to(FileWatcher);
        builder.bind<IService>(Types.IService).to(Service);
    }
}

Builder.Boostrap();