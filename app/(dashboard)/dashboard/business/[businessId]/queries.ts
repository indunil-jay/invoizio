"use server";
import { executeQuery } from "@/app/_lib/execute.queries";
import { getBusinessByIdController } from "@/src/interface-adapter/controllers/business/get-business-by-id.controller";

export const getBusinessById = (id: string) => {
  return executeQuery({
    queryFn: async () => await getBusinessByIdController(id),
  });
};
