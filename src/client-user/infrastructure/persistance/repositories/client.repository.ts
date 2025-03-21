import { Transaction } from "@/drizzle";
import { CreateClient } from "@/drizzle/schemas/client";
import { IClientRepository } from "@/src/client-user/application/repositories/client-repository";
import { Client } from "@/src/client-user/domain/client.entity";
import { injectable } from "inversify";

@injectable()
export class ClientRepository implements IClientRepository {
    insert(data: CreateClient, tx?: Transaction): Promise<Client> {
        throw new Error("Method not implemented.");
    }
}
