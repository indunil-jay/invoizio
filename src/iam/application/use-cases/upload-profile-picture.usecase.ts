import { Readable } from "stream";
import { getInjection } from "@/di/container";
import {
    ICloudinaryService,
    IUploadedImageReturnType,
} from "@/src/shared/cloudinary/cloudinary.service.interface";
import { IAuthenticationService } from "@/src/iam/application/services/authentication.service";
import { uploadProfileImageDto } from "@/src/iam/application/dto/upload-profile-image.dto";
import { IUserProfileImageFactory } from "../../domain/factories/user-profile-image.factory";
import { IUserProfileImageRepository } from "../repositories/user-profile-image.repository";

export const uploadProfilePictureUseCase = {
    async execute({ image }: uploadProfileImageDto) {
        const {
            authenticationService,
            uploadService,
            userProfileImageRepository,
            userProfileImageFactory,
            userRepository,
        } = this.getServices();

        // Verify valid session
        const user = await this.verifyUserSession(authenticationService);

        // Remove existing cover image if it exists
        if (user.profileImage) {
            // Remove from DB
            await userProfileImageRepository.remove(user.profileImage.id);
            // Remove from Cloudinary
            await uploadService.deleteFile(user.profileImage.publicId);
        }

        // Upload new cover image
        const buffer = await this.convertImageToBuffer(image);
        const uploadResults = await this.uploadImageToCloud(
            uploadService,
            buffer
        );

        // Create and save new cover image entry in the database
        const updatedUserProfileImage = await this.saveUserProfileImage(
            user.id,
            uploadResults,
            userProfileImageFactory,
            userProfileImageRepository
        );

        //remvoe if google image connect with user account
        if (user.image) {
            await userRepository.update(user.id, { image: null });
        }

        return updatedUserProfileImage;
    },

    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            uploadService: getInjection("ICloudinaryService"),
            userProfileImageFactory: getInjection("IUserProfileImageFactory"),
            userProfileImageRepository: getInjection(
                "IUserProfileImageRepository"
            ),
            userRepository: getInjection("IUserRepository"),
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
        return await uploadService.uploadFile(readableStream, "profileImage");
    },

    async saveUserProfileImage(
        userId: string,
        uploadResults: IUploadedImageReturnType,
        userProfileImageFactory: IUserProfileImageFactory,
        userProfileImageRepository: IUserProfileImageRepository
    ) {
        const userCoverImage = userProfileImageFactory.create(
            userId,
            uploadResults.url,
            uploadResults.publicId,
            uploadResults.size,
            uploadResults.type,
            uploadResults.mimeType
        );
        return await userProfileImageRepository.insert(userCoverImage);
    },
};
