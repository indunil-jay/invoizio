import { Transaction } from "@/drizzle";
import { BusinessProfileImage } from "@/src/business/domain/business-image.entity";

export interface IBusinessProfileImageRepository {
    insert(
        data: BusinessProfileImage,
        tx?: Transaction
    ): Promise<BusinessProfileImage>;
    remove(id: string): Promise<void>;
    get(businessId: string): Promise<BusinessProfileImage | undefined>;
}
