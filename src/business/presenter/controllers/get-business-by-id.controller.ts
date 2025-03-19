import { getBusinessByIdUseCase } from "@/src/business/application/use-cases/get-business-by-id.usecase";
import { Business } from "@/src/business/domain/business.entity";

const presenter = (data: Business) => {
    const value = {
        id: data.id,
        name: data.name,
        userId: data.userId,
        address: data.address,
        image: data.profileImage,
    };
    return JSON.parse(JSON.stringify(value));
};

export const getBusinessByIdController = async (id: string) => {
    const business = await getBusinessByIdUseCase.execute(id);
    return presenter(business);
};
