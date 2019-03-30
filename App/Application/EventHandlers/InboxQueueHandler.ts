import { IInboxQueueHandler } from "../../Infrastructure/Types/IInboxQueueHandler";
import { BaseHandler } from "./BaseHandler";
import { IInboxQueueService } from "../../Infrastructure/Types/IInboxQueueService";
import { Builder } from "../../Infrastructure/DependencyInjection/Containers";
import Types from "../../Infrastructure/DependencyInjection/Types";
import { IExcelReaderService } from "../../Infrastructure/Types/IExcelReaderService";
import { ExcelReaderService } from "../Services/ExcelReaderService";

export class InboxQueueHandler extends BaseHandler implements IInboxQueueHandler{
    
    private InboxQueueService: IInboxQueueService;
    private ExcelReaderService: IExcelReaderService = Builder.Get<IExcelReaderService>(Types.IExcelReaderService);
    
    public constructor() {
        super();
        this.InboxQueueService = Builder.Get<IInboxQueueService>(Types.IInboxQueueService);
    }
    
    protected Handle(message?: any) {
        this.InboxQueueService.Poll(ExcelReaderService.dataArray);
    }

}