import { IInboxMessage } from "./IInboxMessage";

export interface IGetInboxMessagesJson {
    filterResult: boolean;
    messages: IInboxMessage[]
}