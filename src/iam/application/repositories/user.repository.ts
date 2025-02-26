import { User } from "@/src/iam/domain/user.entity";

export interface IUserRepository {
    getByEmail(email: string): Promise<User | undefined>;

    insert(data: User): Promise<User>;

    update(id: string, properties: Partial<User>): Promise<User>;
}
