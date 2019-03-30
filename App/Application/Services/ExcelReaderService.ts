import { IExcelReaderService } from "../../Infrastructure/Types/IExcelReaderService";
import { injectable, inject } from "inversify";
import * as XLSX from "xlsx";
import { sleep } from "../Utils/Sleep";
import Types from "../../Infrastructure/DependencyInjection/Types";
import { IMessageBus } from "../../Infrastructure/Types/IMessageBus";
import { Builder } from "../../Infrastructure/DependencyInjection/Containers";
import { Notify } from "../Events/EventTypes";

@injectable()
export class ExcelReaderService implements IExcelReaderService {

    private PollingInterval: number = 1000;
    private MessageBus: IMessageBus = Builder.Get<IMessageBus>(Types.IMessageBus);
    public static dataArray: string[];
    
    public async Read(file: string) : Promise<void> {
        try {
            var WorkBook: any = XLSX.readFile(file);
            var FirstWorkSheet: object = WorkBook.Sheets[WorkBook.SheetNames[0]];
            var WorkSheetJson: object = XLSX.utils.sheet_to_json(FirstWorkSheet);
            
            this.ParseWorkSheet(WorkSheetJson);
        } catch (err) {

        }
    }

    private async ParseWorkSheet(jsonData: any) : Promise<void> {
        ExcelReaderService.dataArray = [];

        jsonData.forEach(async(row: any, index: number) => {
            try {
                if (index === jsonData.length-1) {
                    console.log("Complete!");
                    this.OnComplete(ExcelReaderService.dataArray);
                }
                
                if (typeof row['EMAIL LABEL'] == 'undefined') return;
                ExcelReaderService.dataArray.push(row['EMAIL LABEL']);
            } catch (err) {

            }
        });
    }

    private OnComplete(data: string[]) : void {
        this.MessageBus.emit(Notify.InboxQueue);
    }

    private static async AsyncForEach(array:any, callback:any) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }

}