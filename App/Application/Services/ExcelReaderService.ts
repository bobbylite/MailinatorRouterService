import { IExcelReaderService } from "../../Infrastructure/Types/IExcelReaderService";
import { injectable } from "inversify";
import * as XLSX from "xlsx";
import { sleep } from "../Utils/Sleep";

@injectable()
export class ExcelReaderService implements IExcelReaderService {

    private PollingInterval: number = 1000;
    
    public Read(file: string): void {
        try {
            var WorkBook: any = XLSX.readFile(file);
            var FirstWorkSheet: object = WorkBook.Sheets[WorkBook.SheetNames[0]];
            var WorkSheetJson: object = XLSX.utils.sheet_to_json(FirstWorkSheet);
            
            this.ParseWorkSheet(WorkSheetJson);
        } catch (err) {

        }
    }

    private async ParseWorkSheet(jsonData: any) : Promise<void> {
        var dataArray: string[];

        
        jsonData.forEach(async(row: any, index: number) => {
            try {
                if (typeof row['EMAIL LABEL'] == 'undefined') return;
                await sleep(this.PollingInterval *index);
                console.log(row['EMAIL LABEL']);
                dataArray.push(row['EMAIL LABEL'])
            } catch (err) {

            }
        });
        
    /** 
        await ExcelReaderService.AsyncForEach(jsonData, async(row: any, index: number) => {
            try {
                if (typeof row['EMAIL LABEL'] == 'undefined') return;
                await sleep(10*index);
                console.log(row['EMAIL LABEL']);
                dataArray.push(row['EMAIL LABEL'])
            } catch (err) {

            }
        });

        console.log("done");
        return dataArray;
    */
    }

    private static async AsyncForEach(array:any, callback:any) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }

}