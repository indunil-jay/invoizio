import { executeQuery } from "@/app/_lib/execute.queries";
import { getAllActivitiesByBusinessIdController } from "@/src/presenter/controllers/activities/get-all-activities-by-business-id.controller";

export const getAllActivitiesByBusinessId = (businessId: string) => {
    return executeQuery({
        queryFn: async () =>
            await getAllActivitiesByBusinessIdController(businessId),
    });
};
