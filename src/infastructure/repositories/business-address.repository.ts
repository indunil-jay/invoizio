import { businessAddresses } from "@/drizzle/schemas";
import { db, Transaction } from "@/drizzle";
import {
  CreateBusinessAddressInput,
  BusinessAddressesCollectionDocument,
} from "@/drizzle/schemas/business-address";
import { IBusinessAddressRepository } from "@/src/application/repositories/business-address-repository.interface";
import { injectable } from "inversify";
import { DataBaseError } from "../errors/errors";

@injectable()
export class BusinessAddressRepository implements IBusinessAddressRepository {
  public async create(
    data: CreateBusinessAddressInput,
    tx?: Transaction
  ): Promise<BusinessAddressesCollectionDocument> {
    try {
      const invoker = tx ?? db;
      const query = invoker.insert(businessAddresses).values(data).returning();
      const [insertedBusinessAddress] = await query.execute();

      if (!insertedBusinessAddress) {
        throw new Error("Business creation failed, no data returned.");
      }
      return insertedBusinessAddress;
    } catch (error) {
      console.error(
        `DATABASE_ERROR::BusinessAddressRepository::create: ${error}`
      );
      throw new DataBaseError();
    }
  }
}
