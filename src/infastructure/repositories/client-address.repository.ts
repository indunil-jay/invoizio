import { db, Transaction } from "@/drizzle";
import {
  CreateClientAddressInput,
  ClientAddressesCollectionDocument,
  clientAddresses,
} from "@/drizzle/schemas/client-address";
import { IClientAddressRepository } from "@/src/application/repositories/client-address-repository.interface";
import { injectable } from "inversify";
import { DataBaseError } from "../errors/errors";
import { eq } from "drizzle-orm";

@injectable()
export class ClientAddressRepository implements IClientAddressRepository {
  public async getById(
    clientId: string
  ): Promise<ClientAddressesCollectionDocument | undefined> {
    try {
      return await db.query.clientAddresses.findFirst({
        where: eq(clientAddresses.clientId, clientId),
      });
    } catch (error) {
      console.error(
        `DATABASE_ERROR::ClientAddressRepository::getById: ${error}`
      );
      throw new DataBaseError();
    }
  }

  public async insert(
    data: CreateClientAddressInput,
    tx?: Transaction
  ): Promise<ClientAddressesCollectionDocument> {
    const invoker = tx ?? db;
    try {
      const query = invoker.insert(clientAddresses).values(data).returning();
      const [insertedClientAddress] = await query.execute();

      if (!insertedClientAddress) {
        throw new Error("Client Address creation failed, no data returned.");
      }

      return insertedClientAddress;
    } catch (error) {
      console.error(
        `DATABASE_ERROR::ClientAddressRepository::create: ${error}`
      );
      throw new DataBaseError();
    }
  }
}
