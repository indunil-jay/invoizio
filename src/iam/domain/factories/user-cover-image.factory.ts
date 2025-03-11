import { injectable } from "inversify";
import { UserCoverImage } from "../user-cover-image.entity";

export interface IUserCoverImageFactory {
    create(
        userId: string,
        url: string,
        publicId: string,
        size: string,
        type: string,
        mimeType: string
    ): UserCoverImage;
}

@injectable()
export class UserCoverImageFactory {
    create(
        userId: string,
        url: string,
        publicId: string,
        size: string,
        type: string,
        mimeType: string
    ) {
        const id = crypto.randomUUID();
        return new UserCoverImage(
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
