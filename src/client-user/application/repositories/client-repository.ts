import { Transaction } from "@/drizzle";
import { CreateClient } from "@/drizzle/schemas/client";
import { Client } from "@/src/client-user/domain/client.entity";

export interface IClientRepository {
    insert(data: CreateClient, tx?: Transaction): Promise<Client>;
    get(id: string): Promise<Client | null>;
}
