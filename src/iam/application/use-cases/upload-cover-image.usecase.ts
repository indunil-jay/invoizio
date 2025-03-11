import { getInjection } from "@/di/container";
import { uploadCoverImageDto } from "../dto/upload-cover-image.dto";
import { Readable } from "stream";
import { IUploadedImageReturnType } from "@/src/shared/cloudinary/cloudinary.service.interface";

export const uploadCoverImageUseCase = {
    async execute({ image }: uploadCoverImageDto) {
        const authenticationService = getInjection("IAuthenticationService");
        const uploadService = getInjection("ICloudinaryService");
        const userCoverImageFactory = getInjection("IUserCoverImageFactory");
        const userCoverImageRepository = getInjection(
            "IUserCoverImageRepository"
        );
        //verify valid session

        const user = await authenticationService.verifySessionUser();
        //check if existsing cover image
        //if so remove and create new
        //if not create new

        // Convert `File` to Buffer
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Convert `Buffer` to Readable Stream (if required)
        const readableStream = Readable.from(buffer);

        // Upload file
        const uploadResults: IUploadedImageReturnType =
            await uploadService.uploadFile(readableStream, "coverImages");

        //save in db
        const userCoverImage = userCoverImageFactory.create(
            user.id,
            uploadResults.url,
            uploadResults.publicId,
            uploadResults.size,
            uploadResults.type,
            uploadResults.mimeType
        );

        console.log({ userCoverImage });
        await userCoverImageRepository.insert(userCoverImage);
    },
};
