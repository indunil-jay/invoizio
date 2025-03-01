import { resetPasswordFormSchema } from "@/shared/validation-schemas/auth/reset-password-form.schema";
import { BadRequestException } from "@/src/iam/presenter/exceptions/common.exceptions";
import { resetPasswordUseCase } from "@/src/iam/application/use-cases/reset-password.usecase";

const presenter = () => {
    return {
        data: undefined,
        status: true,
        message:
            "Your password has been successfully reset. You can now log in with your new password.",
    };
};

export const passwordResetController = async (
    request: unknown,
    token: unknown
) => {
    const { data, error } = resetPasswordFormSchema.safeParse(request);

    if (error || typeof token !== "string") {
        throw new BadRequestException();
    }
    await resetPasswordUseCase.execute(data, token);
    return presenter();
};
