import { IFileFoundHandler } from "../../Infrastructure/Types/IFileFoundHandler";
import { BaseHandler } from "./BaseHandler";
import { injectable } from "inversify";
import { FileWatcherService } from "../Services/FileWatcherService";
import { IExcelReaderService } from "../../Infrastructure/Types/IExcelReaderService";
import { Builder } from "../../Infrastructure/DependencyInjection/Containers";
import Types from "../../Infrastructure/DependencyInjection/Types";

@injectable()
export class FileFoundHandler extends BaseHandler implements IFileFoundHandler {

    private ExcelReaderService: IExcelReaderService;
    
    public constructor() {
        super();
        this.ExcelReaderService = Builder.Get<IExcelReaderService>(Types.IExcelReaderService);
    }
    
    protected Handle(message?: any) : any {
        this.ExcelReaderService.Read(FileWatcherService.FilePath);
    }

}