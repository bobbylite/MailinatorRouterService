import { BaseHandler } from "../../Application/EventHandlers/BaseHandler";

export interface IBaseHandler {
    InitializeHandler(): any;
    InitializeHandler(message: any): any;
}