import filewatcher from "filewatcher";
import fileExists from "file-exists";
import { injectable, inject } from "inversify";
import { IFileWatcher } from "../../Infrastructure/Types/IFileWatcher";
import { FilePath } from "../../Model/FilePath";

@injectable()
export class FileWatcher implements IFileWatcher {

    public FilePath: string;    
    public FileWatch: any;
    public FileFound: boolean;

    public constructor() {
        this.FilePath = FilePath;
        this.FileWatch = filewatcher();
        this.FileFound = false;
    }
    
    public Watch() : void {
        setInterval(async() : Promise<void> => {
            try {
                if (await this.IsFIleFound() === false) {
                    this.OnFIleNotFOund();
                    return;
                }
 
                if (this.FileFound) return;
                this.OnFIleFound();
            } catch(err) {

            }
        }, 1000);
    }

    private async IsFIleFound(): Promise<boolean> {
        var doesFIleExist = await fileExists(this.FilePath);
        console.log(`File Found: ${doesFIleExist}`);
        return doesFIleExist;
    }

    private OnFIleNotFOund() : void {
        this.FileFound = false;
    }

    private OnFIleFound() : void {
        try {
            this.FileFound = true;
            console.log('OnFIleFOund()');
            this.FileWatch.add(this.FilePath);
        } catch(err) {

        }
    }
}

