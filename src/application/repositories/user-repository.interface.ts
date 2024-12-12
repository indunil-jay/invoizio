import { SignUpInput, UsersCollectionDocument } from "@/drizzle/schemas/user";
import { RowList } from "postgres";

export interface IUserRepository {
  getByEmail(email: string): Promise<UsersCollectionDocument | undefined>;
  create(data: SignUpInput): Promise<RowList<never[]>>;
}
