import { injectable } from "inversify";
import { INodeMailerService } from "../../Infrastructure/Types/INodeMailerService";

@injectable()
export class NodeMailerService implements INodeMailerService {

    public Send(content: string): void {
        console.log("Sending: " + content);
    }
}