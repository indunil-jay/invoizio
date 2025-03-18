import { randomUUID } from "crypto";
import { injectable } from "inversify";
import { Business } from "@/src/business/domain/business.entity";

export interface IBusinessFactory {
    create(name: string, userId: string): Business;
}

@injectable()
export class BusinessFactory implements IBusinessFactory {
    create(name: string, userId: string) {
        const id = randomUUID();
        return new Business(id, name, userId);
    }
}
