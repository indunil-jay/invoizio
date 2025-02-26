import { signUpFormSchema } from "@/shared/validation-schemas/auth/sign-up-form.schema";
import { signUpUseCase } from "@/src/iam/application/use-cases/sign-up.usecase";

import { User } from "@/src/iam/domain/user.entity";
import { BadRequestException } from "../exceptions/common.exceptions";

const presenter = (data: User) => {
    return {
        data: data.toJSON(),
        status: true,
        message:
            "You have successfully signed in. Please log in with your credentials.",
    };
};

export const signUpController = async (request: unknown) => {
    const { data, error } = signUpFormSchema.safeParse(request);

    if (error) {
        throw new BadRequestException();
    }
    const user = await signUpUseCase.execute(data);

    return presenter(user);
};
