export interface IFileWatcherService {
    FilePath: string;
    FileWatch: any;
    FileFound: boolean;
    Watch(): void;
}