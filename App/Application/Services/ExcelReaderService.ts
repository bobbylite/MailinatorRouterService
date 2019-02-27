import { IExcelReaderService } from "../../Infrastructure/Types/IExcelReaderService";
import { injectable } from "inversify";
import * as XLSX from "xlsx";

@injectable()
export class ExcelReaderService implements IExcelReaderService {

    private PollingInterval: number = 1000;
    
    public async Read(file: string): Promise<void> {
        try {
            var WorkBook: any = XLSX.readFile(file);
            var FirstWorkSheet: object = WorkBook.Sheets[WorkBook.SheetNames[0]];
            var WorkSheetJson: object = XLSX.utils.sheet_to_json(FirstWorkSheet);
            
            this.ParseWorkSheet(WorkSheetJson);
        } catch (err) {

        }
    }

    private ParseWorkSheet(jsonData: any) : void {
        jsonData.forEach((row: any, index: number) => {
            try {
                setTimeout(async() => {
                    if (typeof row['EMAIL LABEL'] == 'undefined') return;
                    console.log(row['EMAIL LABEL']);
                }, this.PollingInterval * index);
            } catch (err) {

            }
        });
    }

}