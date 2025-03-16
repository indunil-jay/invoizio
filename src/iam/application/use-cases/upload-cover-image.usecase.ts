import { Readable } from "stream";
import { getInjection } from "@/di/container";
import { uploadCoverImageDto } from "@/src/iam/application/dto/upload-cover-image.dto";
import {
    ICloudinaryService,
    IUploadedImageReturnType,
} from "@/src/shared/cloudinary/cloudinary.service.interface";
import { IAuthenticationService } from "@/src/iam/application/services/authentication.service";
import { IUserCoverImageRepository } from "@/src/iam/application/repositories/user-cover-image.repository";
import { IUserCoverImageFactory } from "@/src/iam/domain/factories/user-cover-image.factory";

export const uploadCoverImageUseCase = {
    async execute({ image }: uploadCoverImageDto) {
        const {
            authenticationService,
            uploadService,
            userCoverImageFactory,
            userCoverImageRepository,
        } = this.getServices();

        // Verify valid session
        const user = await this.verifyUserSession(authenticationService);

        // Remove existing cover image if it exists
        if (user.coverImages) {
            // Remove from DB
            await userCoverImageRepository.remove(user.coverImages.id);
            // Remove from Cloudinary
            await uploadService.deleteFile(user.coverImages.publicId);
        }

        // Upload new cover image
        const buffer = await this.convertImageToBuffer(image);
        const uploadResults = await this.uploadImageToCloud(
            uploadService,
            buffer
        );

        // Create and save new cover image entry in the database
        await this.saveUserCoverImage(
            user.id,
            uploadResults,
            userCoverImageFactory,
            userCoverImageRepository
        );
    },

    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            uploadService: getInjection("ICloudinaryService"),
            userCoverImageFactory: getInjection("IUserCoverImageFactory"),
            userCoverImageRepository: getInjection("IUserCoverImageRepository"),
        };
    },

    async verifyUserSession(authenticationService: IAuthenticationService) {
        return await authenticationService.verifySessionUser();
    },

    async convertImageToBuffer(image: File) {
        const arrayBuffer = await image.arrayBuffer();
        return Buffer.from(arrayBuffer);
    },

    async uploadImageToCloud(
        uploadService: ICloudinaryService,
        buffer: Buffer
    ) {
        const readableStream = Readable.from(buffer);
        return await uploadService.uploadFile(readableStream, "coverImages");
    },

    async saveUserCoverImage(
        userId: string,
        uploadResults: IUploadedImageReturnType,
        userCoverImageFactory: IUserCoverImageFactory,
        userCoverImageRepository: IUserCoverImageRepository
    ) {
        const userCoverImage = userCoverImageFactory.create(
            userId,
            uploadResults.url,
            uploadResults.publicId,
            uploadResults.size,
            uploadResults.type,
            uploadResults.mimeType
        );
        await userCoverImageRepository.insert(userCoverImage);
    },
};
