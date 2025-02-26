"use server";
import { executeAction } from "@/app/_lib/execute.action";
import { deleteBusinessByIdController } from "@/src/presenter/controllers/business/delete-business-by-id.controller";
import { updateBusinessByIdController } from "@/src/presenter/controllers/business/update-business-by-id.controller";
import { updateBusinessFormSchema } from "../../_components/update-business.from";
import { z } from "zod";

export const deleteBusinessById = (id: string) => {
    return executeAction({
        actionFn: async () => await deleteBusinessByIdController(id),
        title: "Delete Business",
    });
};

export const updateBusinessById = (
    id: string,
    values: z.infer<typeof updateBusinessFormSchema>
) => {
    return executeAction({
        actionFn: async () => await updateBusinessByIdController(id, values),
        title: "Update Business",
    });
};
