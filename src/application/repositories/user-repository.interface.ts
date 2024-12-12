import { SignUpInput, UsersCollectionDocument } from "@/drizzle/schemas/user";

export interface IUserRepository {
  getByEmail(email: string): Promise<UsersCollectionDocument | undefined>;
  create(data: SignUpInput): Promise<UsersCollectionDocument>;
}
