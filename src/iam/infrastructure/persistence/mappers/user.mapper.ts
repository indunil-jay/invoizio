import { UserEntity } from "@/drizzle/schemas/user";
import { CreateUser } from "@/src/iam/application/dto/user.dto";
import { User } from "@/src/iam/domain/user.entity";

export class UserMapper {
    static toDomain(userEntity: UserEntity): User {
        return new User(
            userEntity.id,
            userEntity.name,
            userEntity.email,
            userEntity.password,
            userEntity.emailVerified,
            userEntity.image
        );
    }

    static toPersistence(user: User): CreateUser {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password ?? null,
        };
    }
}
