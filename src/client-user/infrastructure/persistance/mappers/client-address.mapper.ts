import {
    ClientAddressEntity,
    CreateClientAddress,
} from "@/drizzle/schemas/client-address";
import { ClientAddress } from "@/src/client-user/domain/client-address.entity";

export class ClientAddressMapper {
    static toDomain(clientAddressEntity: ClientAddressEntity): ClientAddress {
        const { id, clientId, addressLine1, city, postalCode, addressLine2 } =
            clientAddressEntity;
        return new ClientAddress(
            id,
            clientId,
            addressLine1,
            city,
            postalCode,
            addressLine2
        );
    }
    static toPersistence(data: CreateClientAddress): CreateClientAddress {
        return { ...data };
    }
}
