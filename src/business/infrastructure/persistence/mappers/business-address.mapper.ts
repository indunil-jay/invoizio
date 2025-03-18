import {
    BusinessAddressEntity,
    CreateBusinessAddress,
} from "@/drizzle/schemas/business-address";
import { BusinessAddress } from "@/src/business/domain/business-address.entity";

export class BusinessAddressMapper {
    static toDomain(
        busniessAddressEntity: BusinessAddressEntity
    ): BusinessAddress {
        return new BusinessAddress(
            busniessAddressEntity.id,
            busniessAddressEntity.businessId,
            busniessAddressEntity.addressLine1,
            busniessAddressEntity.city,
            busniessAddressEntity.postalCode,
            busniessAddressEntity.addressLine2
        );
    }

    static toPersistence(
        createBusinessAddress: CreateBusinessAddress
    ): CreateBusinessAddress {
        return { ...createBusinessAddress };
    }
}
