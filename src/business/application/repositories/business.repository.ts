import { Transaction } from "@/drizzle";
import { CreateBusiness } from "@/drizzle/schemas/business";
import { Business } from "@/src/business/domain/business.entity";

export interface IBusinessRepository {
    insert(data: CreateBusiness, tx?: Transaction): Promise<Business>;
    get(id: string): Promise<Business | null>;
}
