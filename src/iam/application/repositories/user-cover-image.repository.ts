import { UserCoverImage } from "@/src/iam/domain/user-cover-image.entity";

export interface IUserCoverImageRepository {
    insert(data: UserCoverImage): Promise<UserCoverImage>;
    remove(id: string): Promise<void>;
}
