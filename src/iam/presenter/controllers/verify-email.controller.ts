import { emailVerifyUseCase } from "@/src/iam/application/use-cases/email-verify.usecase";

const presenter = () => {
    return {
        status: true,
        message:
            "Email verified successfully. Please log in to access your account.",
    };
};

export const emailVerifyController = async (token: string) => {
    await emailVerifyUseCase.execute(token);
    return presenter();
};
