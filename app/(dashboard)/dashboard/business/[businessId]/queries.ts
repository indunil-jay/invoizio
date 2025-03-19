"use server";
import { executeQuery } from "@/app/_utils/execute.queries";
import { Business } from "@/app/stores/business-store";
import { getBusinessByIdController } from "@/src/business/presenter/controllers/get-business-by-id.controller";

export const getBusinessById = (id: string) => {
    return executeQuery<Business>({
        queryFn: async () => await getBusinessByIdController(id),
    });
};
