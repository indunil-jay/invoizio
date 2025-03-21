import { ClientEntity, CreateClient } from "@/drizzle/schemas/client";
import { Client } from "@/src/client-user/domain/client.entity";

export class ClientMapper {
    static toDomain(clientEntity: ClientEntity): Client {
        const { id, name, email } = clientEntity;
        return new Client(id, name, email);
    }
    static toPersistence(data: CreateClient): CreateClient {
        return { ...data };
    }
}
