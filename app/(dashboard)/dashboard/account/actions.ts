"use server";
import { z } from "zod";
import { changePasswordFormSchema } from "@/app/(dashboard)/dashboard/account/_components/change-password-form";
import { executeAction } from "@/app/_lib/execute.action";
import { updatePasswordController } from "@/src/interface-adapter/controllers/user/update-password.controller";

export const changePassword = async (
  values: z.infer<typeof changePasswordFormSchema>
) => {
  return executeAction({
    actionFn: async () => await updatePasswordController(values),
    title: "User Profile",
  });
};
