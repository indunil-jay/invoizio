import { injectable } from "inversify";
import { eq } from "drizzle-orm";
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
    public async update(
        id: string,
        properties: Partial<
            Pick<
                CreateClientAddress,
                "addressLine1" | "addressLine2" | "postalCode" | "city"
            >
        >,
        tx?: Transaction
    ): Promise<ClientAddress> {
        const invoker = tx ?? db;
        try {
            const mutation = invoker
                .update(clientAddresses)
                .set(properties)
                .where(eq(clientAddresses.id, id))
                .returning();

            const [updatedEntity] = await mutation.execute();
            return ClientAddressMapper.toDomain(updatedEntity);
        } catch (error) {
            console.log("UPDATE DATABASE ERROR,(client repository)", error);
            throw new DataBaseException();
        }
    }

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
