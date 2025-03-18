import {
    BusinessProfileImageEntity,
    CreateBusinessProfileImage,
} from "@/drizzle/schemas/business-profile-images";
import { BusinessProfileImage } from "@/src/business/domain/business-image.entity";

export class BusinessProfileImageMapper {
    static toDomain(
        busniessProfileImageEntity: BusinessProfileImageEntity
    ): BusinessProfileImage {
        return new BusinessProfileImage(
            busniessProfileImageEntity.id,
            busniessProfileImageEntity.businessId,
            busniessProfileImageEntity.url,
            busniessProfileImageEntity.publicId,
            busniessProfileImageEntity.size,
            busniessProfileImageEntity.type,
            busniessProfileImageEntity.mimeType
        );
    }

    static toPersistence(
        businessProfileImage: BusinessProfileImage
    ): CreateBusinessProfileImage {
        return { ...businessProfileImage };
    }
}
