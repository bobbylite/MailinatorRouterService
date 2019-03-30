import { injectable } from "inversify";
import { IInboxModel } from "../Infrastructure/Types/IInboxModel";

@injectable()
export class InboxModel implements IInboxModel {
    public static EmailList: string[] = [];

    public Add(email: string): number {
        return InboxModel.EmailList.push(email);
    }

    public Remove(email: string): string {
        let removalIndex: number = InboxModel.EmailList.findIndex((compare) =>compare===email);
        if (removalIndex < -1) return "";
        return InboxModel.EmailList.splice(removalIndex, 1)[0];
    }

    public AlreadyEntered(email: string): boolean {
        if (InboxModel.EmailList.findIndex(compare=>compare===email) > -1) return true;
        return false;
    }

    public GetData(): string[] {
        return InboxModel.EmailList;
    }
}