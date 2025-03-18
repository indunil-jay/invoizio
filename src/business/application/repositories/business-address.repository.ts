import { Transaction } from "@/drizzle";
import { CreateBusinessAddress } from "@/drizzle/schemas/business-address";
import { BusinessAddress } from "@/src/business/domain/business-address.entity";

export interface IBusinessAddressRepository {
    insert(
        data: CreateBusinessAddress,
        tx?: Transaction
    ): Promise<BusinessAddress>;
}
