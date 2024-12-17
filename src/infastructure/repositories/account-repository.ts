import { db } from "@/drizzle";
import {
  accounts,
  AccountsCollectionDocument,
} from "@/drizzle/schemas/account";
import { IAccountRepository } from "@/src/application/repositories/account-repository.interface";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { DataBaseError } from "../errors/errors";

@injectable()
export class AccountRepository implements IAccountRepository {
  public async deleteById(id: string): Promise<void> {
    try {
      await db.delete(accounts).where(eq(accounts.userId, id));
    } catch (error) {
      console.error(`DATABASE_ERROR::AccountRepository::deleteById: ${error}`);
      throw new DataBaseError();
    }
  }
  public async getById(
    id: string
  ): Promise<AccountsCollectionDocument | undefined> {
    try {
      return await db.query.accounts.findFirst({
        where: eq(accounts.userId, id),
      });
    } catch (error) {
      console.error(`DATABASE_ERROR::AccountRepository::getById: ${error}`);
      throw new DataBaseError();
    }
  }
}
