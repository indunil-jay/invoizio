import { injectable } from "inversify";
import { UserProfileImage } from "@/src/iam/domain/user-profile-image.entity";

export interface IUserProfileImageFactory {
    create(
        userId: string,
        url: string,
        publicId: string,
        size: string,
        type: string,
        mimeType: string
    ): UserProfileImage;
}

@injectable()
export class UserProfileImageFactory {
    create(
        userId: string,
        url: string,
        publicId: string,
        size: string,
        type: string,
        mimeType: string
    ) {
        const id = crypto.randomUUID();
        return new UserProfileImage(
            id,
            userId,
            url,
            publicId,
            size,
            type,
            mimeType
        );
    }
}
