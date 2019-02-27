import { IExcelReaderService } from "../../Infrastructure/Types/IExcelReaderService";
import { injectable } from "inversify";
import * as XLSX from "xlsx";

@injectable()
export class ExcelReaderService implements IExcelReaderService {
    
    public async Read(file: string): Promise<void> {
        try {
            var WorkBook: any = XLSX.readFile(file);
            var FirstWorkSheet: object = WorkBook.Sheets[WorkBook.SheetNames[0]];
            var WorkSheetJson: object = XLSX.utils.sheet_to_json(FirstWorkSheet);
            
            this.ParseWorkSheet(WorkSheetJson);
        } catch (err) {

        }
    }

    private ParseWorkSheet(jsonData: object) : void {
        console.log(jsonData);
    }

}