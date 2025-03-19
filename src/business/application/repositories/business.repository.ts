import { Transaction } from "@/drizzle";
import { CreateBusiness } from "@/drizzle/schemas/business";
import { Business } from "@/src/business/domain/business.entity";

export interface IBusinessRepository {
    insert(data: CreateBusiness, tx?: Transaction): Promise<Business>;
    get(id: string): Promise<Business | null>;
    getAll(userId: string): Promise<Business[] | []>;
    update(id: string, property: Partial<CreateBusiness>): Promise<Business>;
    remove(businessId: string): Promise<void>;
}
