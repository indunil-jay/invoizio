import { ClientEntity, CreateClient } from "@/drizzle/schemas/client";
import { ClientAddressEntity } from "@/drizzle/schemas/client-address";
import { Client } from "@/src/client-user/domain/client.entity";
import { ClientAddressMapper } from "./client-address.mapper";
import { inspect } from "util";

export class ClientMapper {
    static toDomain(
        clientEntity: ClientEntity & {
            clientAddresses?: ClientAddressEntity | null;
        }
    ): Client {
        const { id, name, email } = clientEntity;
        const client = new Client(id, name, email);

        if (clientEntity.clientAddresses) {
            client.setAddress(
                ClientAddressMapper.toDomain(clientEntity.clientAddresses)
            );
        }

        return client;
    }
    static toPersistence(data: CreateClient): CreateClient {
        return { ...data };
    }
}
