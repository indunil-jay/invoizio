import { changeUserNameOrEmailFormSchema } from "@/shared/validation-schemas/account/change-user-name-or-email-form.schema";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { changeUserNameOrEmailUseCase } from "@/src/iam/application/use-cases/change-user-name-or-email.usecase";

export const changeUserNameOrEmailController = async (request: unknown) => {
    const { data, error } = changeUserNameOrEmailFormSchema.safeParse(request);

    if (error) {
        throw new BadRequestException();
    }

    return await changeUserNameOrEmailUseCase.execute(data);
};
