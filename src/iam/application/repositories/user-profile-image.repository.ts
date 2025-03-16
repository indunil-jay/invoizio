import { UserProfileImage } from "@/src/iam/domain/user-profile-image.entity";

export interface IUserProfileImageRepository {
    insert(data: UserProfileImage): Promise<UserProfileImage>;
    remove(id: string): Promise<void>;
}
