import { eq } from "drizzle-orm";
import { db, Transaction } from "@/drizzle";
import {
  CreateClientInput,
  ClientsCollectionDocument,
  clients,
} from "@/drizzle/schemas/client";
import { IClientRepository } from "@/src/application/repositories/client-repository.interface";
import { injectable } from "inversify";
import { DataBaseError } from "../errors/errors";

@injectable()
export class ClientRepository implements IClientRepository {
  public async getById(
    clientId: string
  ): Promise<ClientsCollectionDocument | undefined> {
    try {
      return await db.query.clients.findFirst({
        where: eq(clients.id, clientId),
      });
    } catch (error) {
      console.error(`DATABASE_ERROR::ClientRepository::getById: ${error}`);
      throw new DataBaseError();
    }
  }

  public async insert(
    data: CreateClientInput,
    tx?: Transaction
  ): Promise<ClientsCollectionDocument> {
    const invoker = tx ?? db;
    try {
      const query = invoker.insert(clients).values(data).returning();
      const [insertedClient] = await query.execute();

      if (!insertedClient) {
        throw new Error("Client creation failed, no data returned.");
      }

      return insertedClient;
    } catch (error) {
      console.error(`DATABASE_ERROR::ClientRepository::create: ${error}`);
      throw new DataBaseError();
    }
  }
}
