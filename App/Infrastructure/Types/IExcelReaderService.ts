export interface IExcelReaderService {
    Read(file: string) : Promise<void>;
}