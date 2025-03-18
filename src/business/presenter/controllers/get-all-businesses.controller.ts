import { getAllBusinessesUseCase } from "@/src/business/application/use-cases/get-all-businesses.usecase";
import { Business } from "@/src/business/domain/business.entity";

const presenter = (businesses: Business[] | []) => {
    const value = businesses.map((business) => ({
        id: business.id,
        name: business.name,
        userId: business.userId,
        address: business.address,
        image: business.profileImage,
    }));
    return JSON.parse(JSON.stringify(value));
};

export const getAllBusinessesController = async () => {
    const businesses = await getAllBusinessesUseCase.execute();
    return presenter(businesses);
};
