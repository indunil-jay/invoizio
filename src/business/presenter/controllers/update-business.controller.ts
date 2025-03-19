import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { Business } from "@/src/business/domain/business.entity";
import { updateBusinessFormSchema } from "@/shared/validation-schemas/business/update-business-form-schema";
import { updateBusinessUseCase } from "@/src/business/application/use-cases/update-business.usecase";

const presenter = (data: Business) => {
    const value = {
        id: data.id,
        name: data.name,
        userId: data.userId,
        address: data.address,
        image: data.profileImage,
    };
    return {
        status: true,
        message: "The business details have been successfully updated.",
        data: JSON.parse(JSON.stringify(value)),
    };
};

export const updateBusinessController = async (
    id: string,
    request: unknown
) => {
    const { data, error } = updateBusinessFormSchema.safeParse(request);

    if (error) {
        console.log({ error });
        throw new BadRequestException();
    }

    const business = await updateBusinessUseCase.execute(id, data);
    return presenter(business);
};
