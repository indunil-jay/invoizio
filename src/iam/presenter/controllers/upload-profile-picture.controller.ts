import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { uploadProfilePictureUseCase } from "@/src/iam/application/use-cases/upload-profile-picture.usecase";
import { UserProfileImage } from "@/src/iam/domain/user-profile-image.entity";

const presenter = (profileImage: UserProfileImage) => {
    return {
        data: profileImage,
        status: true,
        message: "Your profile  picture has been uploaded successfully.",
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadProfilePictureController = async (request: any) => {
    if (!(request.image instanceof File)) {
        throw new BadRequestException();
    }

    const profileImage = await uploadProfilePictureUseCase.execute(request);
    return presenter(profileImage);
};
