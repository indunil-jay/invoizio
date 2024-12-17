import { db } from "@/drizzle";
import {
  BusinessCollectionDocument,
  businesses,
  InsertBusinessSchema,
} from "@/drizzle/schemas/business";
import { IBusinessRepository } from "@/src/application/repositories/business-repository.interface";
import { injectable } from "inversify";
import { DataBaseError } from "../errors/errors";

@injectable()
export class BusinessRepository implements IBusinessRepository {
  getById(id: string): Promise<BusinessCollectionDocument | undefined> {
    throw new Error("Method not implemented.");
  }
  public async create(
    data: InsertBusinessSchema
  ): Promise<BusinessCollectionDocument> {
    try {
      const [insertedBusiness] = await db
        .insert(businesses)
        .values(data)
        .returning();

      if (!insertedBusiness) {
        throw new Error("Business creation failed, no data returned.");
      }
      return insertedBusiness;
    } catch (error) {
      console.error(`DATABASE_ERROR::BusinessRepository::create: ${error}`);
      throw new DataBaseError();
    }
  }
}
