import { CreateUser, UserEntity } from "@/drizzle/schemas/user";
import { User } from "@/src/iam/domain/user.entity";
import { UserCoverImageMapper } from "./user-cover-image.mapper";
import { UserCoverImageEntity } from "@/drizzle/schemas/user-cover-images";

export class UserMapper {
    static toDomain(
        userEntity: UserEntity & { userCoverImages?: UserCoverImageEntity }
    ): User {
        return new User(
            userEntity.id,
            userEntity.name,
            userEntity.email,
            userEntity.password,
            userEntity.emailVerified,
            userEntity.image,
            userEntity.userCoverImages
                ? UserCoverImageMapper.toDomain(userEntity.userCoverImages)
                : undefined
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
