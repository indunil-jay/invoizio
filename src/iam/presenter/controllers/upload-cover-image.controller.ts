import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { uploadCoverImageUseCase } from "@/src/iam/application/use-cases/upload-cover-image.usecase";

const presenter = () => {
    return {
        data: undefined,
        status: true,
        message: "Your cover image has been uploaded successfully.",
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadCoverImageController = async (request: any) => {
    if (!(request.image instanceof File)) {
        throw new BadRequestException();
    }

    await uploadCoverImageUseCase.execute(request);

    return presenter();
};
