import { Transaction } from "@/drizzle";
import { CreateClientAddress } from "@/drizzle/schemas/client-address";
import { ClientAddress } from "@/src/client-user/domain/client-address.entity";

export interface IClientAddressRepository {
    insert(data: CreateClientAddress, tx?: Transaction): Promise<ClientAddress>;
    update(
        id: string,
        properties: Partial<
            Pick<
                CreateClientAddress,
                "addressLine1" | "addressLine2" | "postalCode" | "city"
            >
        >,
        tx?: Transaction
    ): Promise<ClientAddress>;
}
