"use server";
import { executeAction } from "@/app/_lib/execute.action";
import { deleteBusinessByIdController } from "@/src/interface-adapter/controllers/business/delete-business-by-id.controller";

export const deleteBusinessById = (id: string) => {
  return executeAction({
    actionFn: async () => await deleteBusinessByIdController(id),
    title: "Delete Business",
  });
};
