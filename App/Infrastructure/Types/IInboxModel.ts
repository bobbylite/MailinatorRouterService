export interface IInboxModel {
    Add(email: string): number;
    Remove(email: string): string;
    AlreadyEntered(email: string): boolean;
    GetData(): string[];
}