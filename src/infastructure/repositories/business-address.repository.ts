import { businessAddresses } from "@/drizzle/schemas";
import { db, Transaction } from "@/drizzle";
import {
  CreateBusinessAddressInput,
  BusinessAddressesCollectionDocument,
  PartialUpdateBusinessAddressesCollectionDocument,
} from "@/drizzle/schemas/business-address";
import { IBusinessAddressRepository } from "@/src/application/repositories/business-address-repository.interface";
import { injectable } from "inversify";
import { DataBaseError } from "../errors/errors";
import { eq } from "drizzle-orm";

@injectable()
export class BusinessAddressRepository implements IBusinessAddressRepository {
  public async update(
    businessId: string,
    data: PartialUpdateBusinessAddressesCollectionDocument,
    tx?: Transaction
  ): Promise<BusinessAddressesCollectionDocument> {
    const invoker = tx ?? db;
    try {
      const query = invoker
        .update(businessAddresses)
        .set(data)
        .where(eq(businessAddresses.businessId, businessId))
        .returning();
      const [updatedBusinessAddress] = await query.execute();

      if (!updatedBusinessAddress) {
        throw new Error("Business address updated failed, no data returned.");
      }
      return updatedBusinessAddress;
    } catch (error) {
      console.error(`DATABASE_ERROR::BusinessRepository::update: ${error}`);
      throw new DataBaseError();
    }
  }
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
