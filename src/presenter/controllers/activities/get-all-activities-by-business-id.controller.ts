import { BadRequestError } from "@/src/application/errors/errors";
import { getAllActivitiesByBusinessIdUseCase } from "@/src/application/use-cases/activities/get-all-activities-by-business-id.usecase";

export const getAllActivitiesByBusinessIdController = async (
    businessId: string
) => {
    if (!businessId || typeof businessId !== "string") {
        throw new BadRequestError("invalid businessId");
    }

    return await getAllActivitiesByBusinessIdUseCase.execute(businessId);
};
