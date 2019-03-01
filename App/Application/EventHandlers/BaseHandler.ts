import { injectable } from "inversify";
import { IBaseHandler } from "../../Infrastructure/Types/IBaseHandler";

@injectable()
export abstract class BaseHandler {

    public InitializeHandler(message?: any): void {
        try {
            if (typeof message === null) this.Handle();
            if (typeof message !== null) this.Handle(message);
        } catch(err) {
            
        }
    }

    protected abstract Handle(message?: any) : any;
}