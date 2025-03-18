"use server";

import { executeQuery } from "@/app/_utils/execute.queries";
import { getAllBusinessesController } from "@/src/business/presenter/controllers/get-all-businesses.controller";

export const getAllBusinesses = () =>
    executeQuery({ queryFn: async () => await getAllBusinessesController() });
