import { injectable } from "inversify";
import { db, Transaction } from "@/drizzle";
import {
    clientAddresses,
    CreateClientAddress,
} from "@/drizzle/schemas/client-address";
import { IClientAddressRepository } from "@/src/client-user/application/repositories/client-address-repository";
import { ClientAddress } from "@/src/client-user/domain/client-address.entity";
import { DataBaseException } from "@/src/shared/infrastructure/exceptions/common.exceptions";
import { ClientAddressMapper } from "@/src/client-user/infrastructure/persistance/mappers/client-address.mapper";

@injectable()
export class ClientAddressRepository implements IClientAddressRepository {
    public async insert(
        data: CreateClientAddress,
        tx?: Transaction
    ): Promise<ClientAddress> {
        const invoker = tx ?? db;
        try {
            const peristenceModel = ClientAddressMapper.toPersistence(data);
            const mutation = invoker
                .insert(clientAddresses)
                .values(peristenceModel)
                .returning();
            const [insertedEntity] = await mutation.execute();
            return ClientAddressMapper.toDomain(insertedEntity);
        } catch (error) {
            console.log("INSERT DATABASE ERROR,(client repository)", error);
            throw new DataBaseException();
        }
    }
}
