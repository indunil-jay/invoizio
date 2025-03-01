import { db } from "@/drizzle";
import { accounts, AccountsEntity } from "@/drizzle/schemas/account";
import { IAccountRepository } from "@/src/application/repositories/account-repository.interface";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { DataBaseException } from "../../exceptions/common.exceptions";

@injectable()
export class AccountRepository implements IAccountRepository {
    public async deleteById(id: string): Promise<void> {
        try {
            await db.delete(accounts).where(eq(accounts.userId, id));
        } catch (error) {
            console.error(
                `DATABASE_ERROR::AccountRepository::deleteById: ${error}`
            );
            throw new DataBaseException();
        }
    }
    public async getById(id: string): Promise<AccountsEntity | undefined> {
        try {
            return await db.query.accounts.findFirst({
                where: eq(accounts.userId, id),
            });
        } catch (error) {
            console.error(
                `DATABASE_ERROR::AccountRepository::getById: ${error}`
            );
            throw new DataBaseException();
        }
    }
}
