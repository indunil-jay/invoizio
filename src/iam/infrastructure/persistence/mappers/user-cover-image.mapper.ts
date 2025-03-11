import {
    CreateUserCoverImage,
    UserCoverImageEntity,
} from "@/drizzle/schemas/user-cover-images";
import { UserCoverImage } from "@/src/iam/domain/user-cover-image.entity";

export class UserCoverImageMapper {
    static toDomain(
        userCoverImageEntity: UserCoverImageEntity
    ): UserCoverImage {
        return new UserCoverImage(
            userCoverImageEntity.id,
            userCoverImageEntity.userId,
            userCoverImageEntity.url,
            userCoverImageEntity.publicId,
            userCoverImageEntity.size,
            userCoverImageEntity.type,
            userCoverImageEntity.mimeType
        );
    }

    static toPersistence(userCoverImage: UserCoverImage): CreateUserCoverImage {
        return { ...userCoverImage };
    }
}
