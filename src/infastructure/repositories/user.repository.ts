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
import { DataBaseError } from "@/src/infastructure/errors/errors";

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
                    name: data.name,
                    password: data.password,
                    email: data.email,
                })
                .where(eq(users.id, id))
                .returning();
            if (!updatedUser) {
                throw new Error("User updated failed, no data returned.");
            }
            return updatedUser;
        } catch (error) {
            console.error(`DATABASE_ERROR::UserRepository::update: ${error}`);
            throw new DataBaseError();
        }
    }

    public async create(data: SignUpInput): Promise<UsersCollectionDocument> {
        try {
            const [insertedUser] = await db
                .insert(users)
                .values(data)
                .returning();
            if (!insertedUser) {
                throw new Error("User creation failed, no data returned.");
            }
            return insertedUser;
        } catch (error) {
            console.error(`DATABASE_ERROR::UserRepository::create: ${error}`);
            throw new DataBaseError();
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
            console.error(
                `DATABASE_ERROR::UserRepository::getByEmail: ${error}`
            );
            throw new DataBaseError();
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
            console.error(`DATABASE_ERROR::UserRepository::getById: ${error}`);
            throw new DataBaseError();
        }
    }
}
