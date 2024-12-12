import { db } from "@/drizzle";
import { users } from "@/drizzle/schemas";
import { SignUpInput, UsersCollectionDocument } from "@/drizzle/schemas/user";
import { IUserRepository } from "@/src/application/repositories/user-repository.interface";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";

//TODO:error handler

@injectable()
export class UserRepository implements IUserRepository {
  public async create(data: SignUpInput): Promise<UsersCollectionDocument> {
    try {
      const [insertedUser] = await db.insert(users).values(data).returning();
      if (!insertedUser) {
        throw new Error("User creation failed, no data returned.");
      }
      return insertedUser;
    } catch (error) {
      console.error(`Database insert failed: ${error}`, { data });
      throw new Error("Unable to insert user. Please try again later.");
    }
  }
  public async getByEmail(
    email: string
  ): Promise<UsersCollectionDocument | undefined> {
    try {
      return await db.query.users.findFirst({
        where: eq(users.email, email),
      });
    } catch (error) {
      console.error(`Database query failed: ${error}`, { email });

      throw new Error("Unable to fetch user by email. Please try again later.");
    }
  }
}
