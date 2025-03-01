import { forgotPasswordFormSchema } from "@/shared/validation-schemas/auth/forget-password-form.schema";
import { BadRequestException } from "@/src/iam/presenter/exceptions/common.exceptions";
import { forgotPasswordUseCase } from "@/src/iam/application/use-cases/forgot-password.usecase";

export const presenter = (message: string) => {
    return {
        status: true,
        data: undefined,
        message: message,
    };
};

export const forgotPasswordController = async (request: unknown) => {
    const { data, error } = forgotPasswordFormSchema.safeParse(request);

    if (error) {
        throw new BadRequestException();
    }

    const message = await forgotPasswordUseCase.execute(data);

    return presenter(message);
};
