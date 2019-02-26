import filewatcher from "filewatcher";
import fileExists from "file-exists";
import { injectable, inject } from "inversify";
import { IFileWatcher } from "../../Infrastructure/Types/IFileWatcher";
import { FilePath } from "../../Model/FilePath";

@injectable()
export class FileWatcher implements IFileWatcher {

    FilePath: string;    
    FileWatcher: FileWatcher;
    FileFound: boolean;

    public constructor() {
        this.FilePath = FilePath;
        this.FileWatcher = filewatcher();
        this.FileFound = false;
    }
    
    public async Watch() {
        while (!this.FileFound) {
            console.log("File Not Found");
            this.FileFound = await fileExists(this.FilePath);
        }
    }


}

