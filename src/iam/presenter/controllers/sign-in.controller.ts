import { signInFormSchema } from "@/shared/validation-schemas/auth/sign-in-form.schema";
import { BadRequestException } from "@/src/iam/presenter/exceptions/common.exceptions";
import { signInUseCase } from "@/src/iam/application/use-cases/sign-in.usecase";

export const presenter = () => {
    return {
        data: undefined,
        status: true,
        message: "Successfully signed in. Welcome back!",
    };
};

export const signInController = async (request: unknown) => {
    const { data, error } = signInFormSchema.safeParse(request);
    console.log({ data });
    if (error) {
        throw new BadRequestException();
    }
    await signInUseCase.execute(data);
    return presenter();
};
