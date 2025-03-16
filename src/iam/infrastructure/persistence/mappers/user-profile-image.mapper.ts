import {
    CreateUserProfileImage,
    UserProfileImageEntity,
} from "@/drizzle/schemas/user-profile-images";
import { UserProfileImage } from "@/src/iam/domain/user-profile-image.entity";

export class UserProfileImageMapper {
    static toDomain(
        userProfileImageEntity: UserProfileImageEntity
    ): UserProfileImage {
        return new UserProfileImage(
            userProfileImageEntity.id,
            userProfileImageEntity.userId,
            userProfileImageEntity.url,
            userProfileImageEntity.publicId,
            userProfileImageEntity.size,
            userProfileImageEntity.type,
            userProfileImageEntity.mimeType
        );
    }

    static toPersistence(
        userProfileImage: UserProfileImage
    ): CreateUserProfileImage {
        return { ...userProfileImage };
    }
}
