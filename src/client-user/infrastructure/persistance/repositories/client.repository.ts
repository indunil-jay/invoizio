import { injectable } from "inversify";
import { db, Transaction } from "@/drizzle";
import { clients, CreateClient } from "@/drizzle/schemas/client";
import { IClientRepository } from "@/src/client-user/application/repositories/client-repository";
import { Client } from "@/src/client-user/domain/client.entity";
import { DataBaseException } from "@/src/shared/infrastructure/exceptions/common.exceptions";
import { ClientMapper } from "@/src/client-user/infrastructure/persistance/mappers/client.mapper";
import { eq } from "drizzle-orm";

@injectable()
export class ClientRepository implements IClientRepository {
    public async get(id: string): Promise<Client | null> {
        try {
            const clientEntity = await db.query.clients.findFirst({
                where: eq(clients.id, id),
                with: { address: true },
            });

            if (!clientEntity) return null;

            return ClientMapper.toDomain(clientEntity);
        } catch (error) {
            console.log("GET DATABASE ERROR,(client repository)", error);
            throw new DataBaseException();
        }
    }

    public async insert(data: CreateClient, tx?: Transaction): Promise<Client> {
        const invoker = tx ?? db;
        try {
            const peristenceModel = ClientMapper.toPersistence(data);
            const mutation = invoker
                .insert(clients)
                .values(peristenceModel)
                .returning();
            const [insertedEntity] = await mutation.execute();
            return ClientMapper.toDomain(insertedEntity);
        } catch (error) {
            console.log("INSERT DATABASE ERROR,(client repository)", error);
            throw new DataBaseException();
        }
    }
}
