import { db } from "@/drizzle";
import {
  BusinessCollectionDocument,
  businesses,
  InsertBusinessSchema,
} from "@/drizzle/schemas/business";
import { IBusinessRepository } from "@/src/application/repositories/business-repository.interface";
import { injectable } from "inversify";
import { DataBaseError } from "../errors/errors";
import { desc, eq } from "drizzle-orm";

@injectable()
export class BusinessRepository implements IBusinessRepository {
  public async deleteById(id: string): Promise<void> {
    try {
      await db.delete(businesses).where(eq(businesses.id, id));
    } catch (error) {
      console.error(`DATABASE_ERROR::BusinessRepository::deleteById: ${error}`);
      throw new DataBaseError();
    }
  }

  public async getAllByUserId(
    userId: string
  ): Promise<BusinessCollectionDocument[] | []> {
    try {
      return await db.query.businesses.findMany({
        where: eq(businesses.userId, userId),
        orderBy: desc(businesses.createdAt),
      });
    } catch (error) {
      console.error(
        `DATABASE_ERROR::BusinessRepository::getAllByUserId: ${error}`
      );
      throw new DataBaseError();
    }
  }
  public async getById(
    id: string
  ): Promise<BusinessCollectionDocument | undefined> {
    try {
      return await db.query.businesses.findFirst({
        where: eq(businesses.id, id),
      });
    } catch (error) {
      console.error(`DATABASE_ERROR::BusinessRepository::getById: ${error}`);
      throw new DataBaseError();
    }
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
