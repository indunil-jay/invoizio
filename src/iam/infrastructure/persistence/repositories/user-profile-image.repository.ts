import { injectable } from "inversify";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle";

import { DataBaseException } from "@/src/shared/infrastructure/exceptions/common.exceptions";
import { userProfileImages } from "@/drizzle/schemas";
import { UserCoverImageMapper } from "@/src/iam/infrastructure/persistence/mappers/user-cover-image.mapper";
import { IUserProfileImageRepository } from "@/src/iam/application/repositories/user-profile-image.repository";
import { UserProfileImage } from "@/src/iam/domain/user-profile-image.entity";

@injectable()
export class UserProfileImageRepository implements IUserProfileImageRepository {
    public async remove(id: string): Promise<void> {
        try {
            await db
                .delete(userProfileImages)
                .where(eq(userProfileImages.id, id));
        } catch {
            throw new DataBaseException();
        }
    }
    public async insert(data: UserProfileImage): Promise<UserProfileImage> {
        try {
            const persistenceModel = UserCoverImageMapper.toPersistence(data);
            const [insertedUserProfileImage] = await db
                .insert(userProfileImages)
                .values(persistenceModel)
                .returning();
            return UserCoverImageMapper.toDomain(insertedUserProfileImage);
        } catch {
            throw new DataBaseException();
        }
    }
}
