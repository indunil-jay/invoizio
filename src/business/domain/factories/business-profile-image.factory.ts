import { injectable } from "inversify";
import { BusinessProfileImage } from "../business-image.entity";

export interface IBusinessProfileImageFactory {
    create(
        businessId: string,
        url: string,
        publicId: string,
        size: string,
        type: string,
        mimeType: string
    ): BusinessProfileImage;
}

@injectable()
export class BusinessProfileImageFactory
    implements IBusinessProfileImageFactory
{
    create(
        businessId: string,
        url: string,
        publicId: string,
        size: string,
        type: string,
        mimeType: string
    ) {
        const id = crypto.randomUUID();
        return new BusinessProfileImage(
            id,
            businessId,
            url,
            publicId,
            size,
            type,
            mimeType
        );
    }
}
