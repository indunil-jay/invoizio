import { changePasswordFormSchema } from "@/shared/validation-schemas/account/change-password-form-schema";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { changePasswordUseCase } from "@/src/iam/application/use-cases/change-password.usecase";

const presenter = () => {
    return {
        data: undefined,
        status: true,
        message: "Your password has been updated successfully.",
    };
};

export const changePasswordController = async (request: unknown) => {
    const { data, error } = changePasswordFormSchema.safeParse(request);

    if (error) {
        throw new BadRequestException();
    }

    await changePasswordUseCase.execute(data);
    return presenter();
};
