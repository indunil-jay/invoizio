import { BusinessEntity, CreateBusiness } from "@/drizzle/schemas/business";
import { Business } from "@/src/business/domain/business.entity";
import { BusinessAddress } from "@/src/business/domain/business-address.entity";
import { BusinessProfileImage } from "@/src/business/domain/business-image.entity";
import { BusinessAddressEntity } from "@/drizzle/schemas/business-address";
import { BusinessProfileImageEntity } from "@/drizzle/schemas/business-profile-images";

export class BusinessMapper {
    static toDomain(
        businessEntity: BusinessEntity & {
            address?: BusinessAddressEntity;
            image?: BusinessProfileImageEntity | null;
        }
    ): Business {
        const business = new Business(
            businessEntity.id,
            businessEntity.name,
            businessEntity.userId
        );

        if (businessEntity.address) {
            business.setAddress(
                new BusinessAddress(
                    businessEntity.address.id,
                    businessEntity.address.businessId,
                    businessEntity.address.addressLine1,
                    businessEntity.address.city,
                    businessEntity.address.postalCode,
                    businessEntity.address.addressLine2
                )
            );
        }

        if (businessEntity.image) {
            business.setProfileImage(
                new BusinessProfileImage(
                    businessEntity.image.id,
                    businessEntity.image.businessId,
                    businessEntity.image.url,
                    businessEntity.image.publicId,
                    businessEntity.image.size,
                    businessEntity.image.type,
                    businessEntity.image.mimeType
                )
            );
        }

        return business;
    }

    static toPersistence(business: CreateBusiness): CreateBusiness {
        return {
            id: business.id,
            name: business.name,
            userId: business.userId,
        };
    }
}
