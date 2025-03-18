import { injectable } from "inversify";
import { IBusinessProfileImageRepository } from "@/src/business/application/repositories/business-profile-image.repository";
import { db, Transaction } from "@/drizzle";
import { businessProfileImages } from "@/drizzle/schemas/business-profile-images";
import { eq } from "drizzle-orm";
import { DataBaseException } from "@/src/shared/infrastructure/exceptions/common.exceptions";
import { BusinessProfileImage } from "@/src/business/domain/business-image.entity";
import { BusinessProfileImageMapper } from "@/src/business/infrastructure/persistence/mappers/business-profile-image.mapper";

@injectable()
export class BusinessProfileImageRepository
    implements IBusinessProfileImageRepository
{
    public async remove(id: string): Promise<void> {
        try {
            await db
                .delete(businessProfileImages)
                .where(eq(businessProfileImages.id, id));
        } catch {
            throw new DataBaseException();
        }
    }
    public async insert(
        data: BusinessProfileImage,
        tx?: Transaction
    ): Promise<BusinessProfileImage> {
        const invoker = tx ?? db;
        try {
            const persistenceModel =
                BusinessProfileImageMapper.toPersistence(data);
            const query = invoker
                .insert(businessProfileImages)
                .values(persistenceModel)
                .returning();
            const [insertedUserProfileImage] = await query.execute();
            return BusinessProfileImageMapper.toDomain(
                insertedUserProfileImage
            );
        } catch {
            throw new DataBaseException();
        }
    }
}
