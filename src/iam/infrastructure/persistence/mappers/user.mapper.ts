import { CreateUser, UserEntity } from "@/drizzle/schemas/user";
import { User } from "@/src/iam/domain/user.entity";
import { UserCoverImageEntity } from "@/drizzle/schemas/user-cover-images";
import { UserProfileImageEntity } from "@/drizzle/schemas/user-profile-images";
import { UserCoverImageMapper } from "@/src/iam/infrastructure/persistence/mappers/user-cover-image.mapper";
import { UserProfileImageMapper } from "@/src/iam/infrastructure/persistence/mappers/user-profile-image.mapper";

export class UserMapper {
    static toDomain(
        userEntity: UserEntity & {
            userCoverImages?: UserCoverImageEntity | null;
            userProfileImages?: UserProfileImageEntity | null;
        }
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
                : undefined,
            userEntity.userProfileImages
                ? UserProfileImageMapper.toDomain(userEntity.userProfileImages)
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
