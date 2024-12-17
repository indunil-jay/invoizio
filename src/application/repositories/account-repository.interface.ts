import { AccountsCollectionDocument } from "@/drizzle/schemas/account";

export interface IAccountRepository {
  deleteById(id: string): Promise<void>;
  getById(id: string): Promise<AccountsCollectionDocument | undefined>;
}
