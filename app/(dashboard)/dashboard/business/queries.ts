"use server";
import { executeQuery } from "@/app/_lib/execute.queries";
import { getAllBusinessController } from "@/src/presenter/controllers/business/get-all-business.controller";

export const getAllBusiness = () => {
    return executeQuery({
        queryFn: async () => await getAllBusinessController(),
    });
};
