import { Container } from "inversify";
import "reflect-metadata";
import Types from "./Types";
import { IApplicationResolver } from "../Types/IApplicationResolver";
import { ApplicationResolver } from "../../Application/ApplicationResolver";
import { Service, IService } from "../../Tests/Service";
import { IFileWatcherService } from "../Types/IFileWatcherService";
import { FileWatcherService } from "../../Application/Services/FileWatcherService";
import { IExcelReaderService } from "../Types/IExcelReaderService";
import { ExcelReaderService } from "../../Application/Services/ExcelReaderService";
import { MessageBus } from "../EventInfrastructure/MessageBus";
import { IMessageBus } from "../Types/IMessageBus";
import { IFileFoundHandler } from "../Types/IFileFoundHandler";
import { FileFoundHandler } from "../../Application/EventHandlers/FileFoundHandler";

export class Builder {

    public static _container: Container = new Container();

    public constructor() {
        this.InitializeEventBindings(Builder._container);
        this.InitializeServiceBindings(Builder._container);
        this.InitializeApplicationResolver(Builder._container);
    }

    public static Boostrap() : Builder {
        return new Builder();
    }

    public static Get<T>(templateString: string) : any {
        return Builder._container.get<T>(templateString);
    }

    private InitializeApplicationResolver(builder: Container) : void {       
        builder.bind<IApplicationResolver>(Types.IApplicationResolver)
        .toConstantValue(new ApplicationResolver(
            Builder.Get<IFileWatcherService>(Types.IFileWatcherService),
            Builder.Get<IMessageBus>(Types.IMessageBus),
            Builder.Get<IFileFoundHandler>(Types.IFileFoundHandler)
            ));
    }

    private InitializeServiceBindings(builder: Container) : void {
        builder.bind<IMessageBus>(Types.IMessageBus).toConstantValue(new MessageBus);
        builder.bind<IExcelReaderService>(Types.IExcelReaderService).to(ExcelReaderService);
        builder.bind<IFileWatcherService>(Types.IFileWatcherService).to(FileWatcherService);
        builder.bind<IService>(Types.IService).to(Service);
    }

    private InitializeEventBindings(builder: Container) : void {
        builder.bind<IFileFoundHandler>(Types.IFileFoundHandler).to(FileFoundHandler);
    }
}

Builder.Boostrap();