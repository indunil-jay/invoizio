import { db, Transaction } from "@/drizzle";
import {
  CreateClientAddressInput,
  ClientAddressesCollectionDocument,
  clientAddresses,
} from "@/drizzle/schemas/client-address";
import { IClientAddressRepository } from "@/src/application/repositories/client-address-repository.interface";
import { injectable } from "inversify";
import { DataBaseError } from "../errors/errors";

@injectable()
export class ClientAddressRepository implements IClientAddressRepository {
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
