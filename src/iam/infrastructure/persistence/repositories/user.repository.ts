import { injectable } from "inversify";
import { eq } from "drizzle-orm";
import { db, Transaction } from "@/drizzle";
import { users } from "@/drizzle/schemas";

import { IUserRepository } from "@/src/iam/application/repositories/user.repository";
import { DataBaseException } from "@/src/iam/infrastructure/exceptions/common.exceptions";
import { User } from "@/src/iam/domain/user.entity";
import { UserMapper } from "@/src/iam/infrastructure/persistence/mappers/user.mapper";
import { DatabaseUserUpdateException } from "@/src/iam/infrastructure/exceptions/specific.exceptions";

@injectable()
export class UserRepository implements IUserRepository {
    public async update(
        id: string,
        properties: Partial<User>,
        tx?: Transaction
    ): Promise<User> {
        const invoker = tx ?? db;
        try {
            const query = invoker
                .update(users)
                .set({
                    emailVerified: properties.emailVerified,
                    image: properties.image,
                    name: properties.name,
                    password: properties.password,
                    email: properties.email,
                })
                .where(eq(users.id, id))
                .returning();

            const [updatedUser] = await query.execute();

            if (!updatedUser) {
                throw new DatabaseUserUpdateException();
            }
            return UserMapper.toDomain(updatedUser);
        } catch (error) {
            //TODO:should remove
            console.error(`DATABASE_ERROR::UserRepository::update: ${error}`);
            throw new DataBaseException();
        }
    }

    public async insert(data: User): Promise<User> {
        try {
            const persistenceModel = UserMapper.toPersistence(data);
            const [insertedUser] = await db
                .insert(users)
                .values(persistenceModel)
                .returning();

            return UserMapper.toDomain(insertedUser);
        } catch (error) {
            //TODO:should remove
            console.error(`DATABASE_ERROR::UserRepository::insert: ${error}`);
            throw new DataBaseException();
        }
    }

    public async getByEmail(email: string): Promise<User | undefined> {
        try {
            const user = await db.query.users.findFirst({
                where: eq(users.email, email),
            });
            if (!user) return;

            return UserMapper.toDomain(user);
        } catch (error) {
            //TODO:should remove
            console.error(
                `DATABASE_ERROR::UserRepository::getByEmail: ${error}`
            );
            throw new DataBaseException();
        }
    }
}
