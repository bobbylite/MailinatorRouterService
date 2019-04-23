export interface IInboxQueueService {
    StartPolling(): void;
    StopPolling(): void;
}