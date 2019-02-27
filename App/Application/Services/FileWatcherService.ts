import filewatcher from "filewatcher";
import fileExists from "file-exists";
import { injectable, inject } from "inversify";
import { IFileWatcherService } from "../../Infrastructure/Types/IFileWatcherService";
import { FilePath } from "../../Model/FilePath";
import { IExcelReaderService } from "../../Infrastructure/Types/IExcelReaderService";
import Types from "../../Infrastructure/DependencyInjection/Types";

@injectable()
export class FileWatcherService implements IFileWatcherService {

    public FilePath: string;    
    public FileWatch: any;
    public FileFound: boolean;
    public PollingInterval: number;

    public constructor(@inject(Types.IExcelReaderService) public ExcelReaderService: IExcelReaderService) {
        this.FilePath = FilePath;
        this.FileWatch = filewatcher();
        this.FileFound = false;
        this.PollingInterval = 1000;
    }
    
    public Watch() : void {
        setInterval(async() : Promise<void> => {
            if (await this.IsFIleFound() === false) {
                this.OnFIleNotFOund();
                return;
            }
            if (this.FileFound) return;
            this.OnFIleFound();
        }, this.PollingInterval);
    }

    private async IsFIleFound(): Promise<boolean> {
        try {
            return await fileExists(this.FilePath);
        } catch (err) {

            return false;
        }
    }

    private InitializeFileWatcher() : void {
        try {
            this.FileWatch.add(this.FilePath);
            this.FileWatch.on('change', (file: any, stat: any) => {
                this.ExcelReaderService.Read(this.FilePath);
            });
            this.FileWatch.on('error', (err: any) => {
                
            })
        } catch (err) {

        }
    }

    private OnFIleFound() : void {
        try {
            this.FileFound = true;
            this.InitializeFileWatcher();
            this.ExcelReaderService.Read(this.FilePath);
        } catch(err) {

        }
    }

    private OnFIleNotFOund() : void {
        this.FileFound = false;
    }
}

