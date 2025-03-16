import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { uploadCoverImageUseCase } from "@/src/iam/application/use-cases/upload-cover-image.usecase";
import { UserCoverImage } from "@/src/iam/domain/user-cover-image.entity";

const presenter = (coverImage: UserCoverImage) => {
    return {
        data: coverImage,
        status: true,
        message: "Your cover image has been uploaded successfully.",
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadCoverImageController = async (request: any) => {
    if (!(request.image instanceof File)) {
        throw new BadRequestException();
    }

    const coverImage = await uploadCoverImageUseCase.execute(request);

    return presenter(coverImage);
};
