import { db } from "@/drizzle";
import { users } from "@/drizzle/schemas";
import {
  PartialUserUpdate,
  SignUpInput,
  UsersCollectionDocument,
} from "@/drizzle/schemas/user";
import { IUserRepository } from "@/src/application/repositories/user-repository.interface";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";

//TODO:error handler

@injectable()
export class UserRepository implements IUserRepository {
  public async update(
    id: string,
    data: PartialUserUpdate
  ): Promise<UsersCollectionDocument | undefined> {
    try {
      const [updatedUser] = await db
        .update(users)
        .set({
          emailVerified: data.emailVerified,
          image: data.image,
          name: data.image,
          password:data.password
        })
        .where(eq(users.id, id));
      if (updatedUser) {
        throw new Error("User updated failed, no data returned.");
      }
      return updatedUser;
    } catch (error) {
      console.error(`Database update failed: ${error}`, { data });
      throw new Error("Unable to insert user. Please try again later.");
    }
  }

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
  public async getById(
    id: string
  ): Promise<UsersCollectionDocument | undefined> {
    try {
      return await db.query.users.findFirst({
        where: eq(users.id, id),
      });
    } catch (error) {
      console.error(`Database query failed: ${error}`, { id });

      throw new Error("Unable to fetch user by id. Please try again later.");
    }
  }
}
