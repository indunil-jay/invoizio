import { executeQuery } from "@/app/_lib/execute.queries";
import { getAllBusinessController } from "@/src/interface-adapter/controllers/business/get-all-business.controller";
import { getBusinessByIdController } from "@/src/interface-adapter/controllers/business/get-business-by-id.controller";

export const getAllBusiness = () => {
  return executeQuery({
    queryFn: async () => await getAllBusinessController(),
  });
};

export const getBusinessById = (id: string) => {
  return executeQuery({
    queryFn: async () => await getBusinessByIdController(id),
  });
};
