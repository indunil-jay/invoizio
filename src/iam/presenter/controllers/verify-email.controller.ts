import { emailVerifyUseCase } from "@/src/iam/application/use-cases/email-verify.usecase";
import { BadRequestException } from "@/src/iam/presenter/exceptions/common.exceptions";

const presenter = () => {
    return {
        status: true,
        message:
            "Email verified successfully. Please log in to access your account.",
    };
};

export const emailVerifyController = async (token: unknown) => {
    if (typeof token !== "string") {
        throw new BadRequestException();
    }
    await emailVerifyUseCase.execute(token);
    return presenter();
};
