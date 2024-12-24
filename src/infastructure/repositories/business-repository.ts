import { db, Transaction } from "@/drizzle";
import {
  BusinessCollectionDocument,
  BusinessCollectionWithAddressDocument,
  businesses,
  InsertBusinessSchema,
  UpdateBusinessSchema,
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
  ): Promise<BusinessCollectionWithAddressDocument | undefined> {
    try {
      return await db.query.businesses.findFirst({
        where: eq(businesses.id, id),
        with: {
          address: true,
        },
      });
    } catch (error) {
      console.error(`DATABASE_ERROR::BusinessRepository::getById: ${error}`);
      throw new DataBaseError();
    }
  }
  public async create(
    data: InsertBusinessSchema,
    tx?: Transaction
  ): Promise<BusinessCollectionDocument> {
    const invoker = tx ?? db;
    try {
      const query = invoker.insert(businesses).values(data).returning();
      const [insertedBusiness] = await query.execute();

      if (!insertedBusiness) {
        throw new Error("Business creation failed, no data returned.");
      }
      return insertedBusiness;
    } catch (error) {
      console.error(`DATABASE_ERROR::BusinessRepository::create: ${error}`);
      throw new DataBaseError();
    }
  }

  public async update(
    id: string,
    data: UpdateBusinessSchema,
    tx?: Transaction
  ): Promise<BusinessCollectionDocument> {
    const invoker = tx ?? db;
    try {
      const query = invoker
        .update(businesses)
        .set(data)
        .where(eq(businesses.id, id))
        .returning();

      const [updatedBusiness] = await query.execute();

      if (!updatedBusiness) {
        throw new Error("Business updated failed, no data returned.");
      }
      return updatedBusiness;
    } catch (error) {
      console.error(`DATABASE_ERROR::BusinessRepository::update: ${error}`);
      throw new DataBaseError();
    }
  }
}
