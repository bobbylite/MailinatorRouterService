import { injectable } from "inversify";
import { IEmailListService } from "../../Infrastructure/Types/IEmailListService";

@injectable()
export class EmailListService implements IEmailListService {
    public static EmailList: string[] = [];

    public Add(email: string): number {
        return EmailListService.EmailList.push(email);
    }

    public Remove(email: string): string {
        let removalIndex: number = EmailListService.EmailList.findIndex((compare) =>compare===email);
        if (removalIndex < -1) return "";
        return EmailListService.EmailList.splice(removalIndex, 1)[0];
    }

    public AlreadyEntered(email: string): boolean {
        if (EmailListService.EmailList.findIndex(compare=>compare===email) > -1) return true;
        return false;
    }

    public GetData(): string[] {
        return EmailListService.EmailList;
    }
}