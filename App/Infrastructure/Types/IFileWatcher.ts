export interface IFileWatcher {
    FilePath: string;
    FileWatch: any;
    FileFound: boolean;
    Watch(): void;
}