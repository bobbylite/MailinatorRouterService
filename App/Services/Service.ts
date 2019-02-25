import { injectable } from "inversify";

export interface IService {
    ServiceTest(): void
}

@injectable()
export class Service implements IService{

    public ServiceTest(): void {
        console.log("Testing Service");
    }
}