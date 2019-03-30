export interface IInboxQueueService {
    Poll(data: string[]) : void;
}