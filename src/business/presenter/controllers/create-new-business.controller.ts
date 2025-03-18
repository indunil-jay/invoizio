import { createBusinessFormSchema } from "@/shared/validation-schemas/business/create-business-from-schema";
import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { createNewBusinessUseCase } from "@/src/business/application/use-cases/create-new-business.usecase";
import { Business } from "@/src/business/domain/business.entity";

const presenter = (data: Business) => {
    const value = {
        ...data,
        address: data.address,
        image: data.profileImage,
    };
    return {
        status: true,
        message: "The business profile has been created successfully.",
        data: JSON.parse(JSON.stringify(value)),
    };
};

export const createNewBusinessController = async (request: unknown) => {
    const { data, error } = createBusinessFormSchema.safeParse(request);

    if (error) {
        throw new BadRequestException();
    }
    const business = await createNewBusinessUseCase.execute(data);
    return presenter(business);
};
