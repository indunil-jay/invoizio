import {
  PartialUserUpdate,
  SignUpInput,
  UsersCollectionDocument,
} from "@/drizzle/schemas/user";

export interface IUserRepository {
  getByEmail(email: string): Promise<UsersCollectionDocument | undefined>;
  getById(id: string): Promise<UsersCollectionDocument | undefined>;
  create(data: SignUpInput): Promise<UsersCollectionDocument>;
  update(
    id: string,
    data: PartialUserUpdate
  ): Promise<UsersCollectionDocument | undefined>;
}
