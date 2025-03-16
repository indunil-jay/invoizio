import { injectable } from "inversify";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { IUserCoverImageRepository } from "@/src/iam/application/repositories/user-cover-image.repository";
import { UserCoverImage } from "@/src/iam/domain/user-cover-image.entity";
import { DataBaseException } from "@/src/iam/infrastructure/exceptions/common.exceptions";
import { userCoverImages } from "@/drizzle/schemas";
import { UserCoverImageMapper } from "@/src/iam/infrastructure/persistence/mappers/user-cover-image.mapper";

@injectable()
export class UserCoverImageRepository implements IUserCoverImageRepository {
    public async remove(id: string): Promise<void> {
        try {
            await db.delete(userCoverImages).where(eq(userCoverImages.id, id));
        } catch {
            throw new DataBaseException();
        }
    }
    public async insert(data: UserCoverImage): Promise<UserCoverImage> {
        try {
            const persistenceModel = UserCoverImageMapper.toPersistence(data);
            const [insertedUserCoverImage] = await db
                .insert(userCoverImages)
                .values(persistenceModel)
                .returning();
            return UserCoverImageMapper.toDomain(insertedUserCoverImage);
        } catch {
            throw new DataBaseException();
        }
    }
}
