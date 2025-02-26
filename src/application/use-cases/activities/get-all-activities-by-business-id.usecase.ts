import { getInjection } from "@/di/container";
import { checkValidSessionUseCase } from "../authentication/check-valid-session";

export const getAllActivitiesByBusinessIdUseCase = {
    async execute(businessId: string) {
        const activityRepository = getInjection("IActivityRepository");
        await checkValidSessionUseCase.execute();
        const activities = await activityRepository.getAll(businessId);
        return activities;
    },
};
