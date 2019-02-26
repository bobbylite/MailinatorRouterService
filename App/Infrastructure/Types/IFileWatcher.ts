import { FileWatcher } from "../../Application/Services/FileWatcher";

export interface IFileWatcher {
    FilePath: string;
    FileWatcher: FileWatcher;
    FileFound: boolean;
    Watch(): void;
}