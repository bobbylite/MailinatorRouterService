import { IMessageBus } from "./IMessageBus";

export interface IFileWatcherService {
    MessageBus: IMessageBus;
    FileWatch: any;
    FileFound: boolean;
    Watch(): void;
}