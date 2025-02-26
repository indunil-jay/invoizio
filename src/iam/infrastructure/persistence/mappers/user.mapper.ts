import { CreateUser, UserEntity } from "@/drizzle/schemas/user";
import { User } from "@/src/iam/domain/user.entity";

export class UserMapper {
    static toDomain(userEntity: UserEntity): User {
        return new User(
            userEntity.name,
            userEntity.email,
            null,
            userEntity.emailVerified,
            userEntity.image
        );
    }

    static toPersistence(user: User): CreateUser {
        return {
            name: user.name,
            email: user.email,
            password: user.password ?? null,
        };
    }
}
