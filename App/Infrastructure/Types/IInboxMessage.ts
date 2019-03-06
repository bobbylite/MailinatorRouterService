export interface IInboxMessage {
    fromfull: string;
    subject: string;
    from: string;
    origfrom: string;
    to: string;
    id: string;
    time: number;
    seconds_ago: number;
}