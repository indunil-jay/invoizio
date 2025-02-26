import { injectable } from "inversify";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schemas";
import { IUserRepository } from "@/src/iam/application/repositories/user.repository";
import { DataBaseException } from "../../exceptions/common.exceptions";
import { User } from "../../../domain/user.entity";
import { UserMapper } from "../mappers/user.mapper";

@injectable()
export class UserRepository implements IUserRepository {
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
