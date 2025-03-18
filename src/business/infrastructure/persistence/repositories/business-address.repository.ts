import { injectable } from "inversify";
import { db, Transaction } from "@/drizzle";
import { IBusinessAddressRepository } from "@/src/business/application/repositories/business-address.repository";
import {
    businessAddresses,
    CreateBusinessAddress,
} from "@/drizzle/schemas/business-address";
import { BusinessAddress } from "@/src/business/domain/business-address.entity";
import { DataBaseException } from "@/src/shared/infrastructure/exceptions/common.exceptions";
import { BusinessAddressMapper } from "@/src/business/infrastructure/persistence/mappers/business-address.mapper";

@injectable()
export class BusinessAddressRepository implements IBusinessAddressRepository {
    public async insert(
        data: CreateBusinessAddress,
        tx?: Transaction
    ): Promise<BusinessAddress> {
        const invoker = tx ?? db;
        try {
            const persitenceModel = BusinessAddressMapper.toPersistence(data);
            const mutation = invoker
                .insert(businessAddresses)
                .values(persitenceModel)
                .returning();
            const [insteredbusinessAddresses] = await mutation.execute();
            return BusinessAddressMapper.toDomain(insteredbusinessAddresses);
        } catch (error) {
            console.log("INSERT BUSINESS ADDRESS ERROR", error);
            throw new DataBaseException();
        }
    }
}
