"use server";
import { executeAction } from "@/app/_utils/execute.action";
import { changePasswordFormSchema } from "@/shared/validation-schemas/account/change-password-form-schema";
import { changePasswordController } from "@/src/account/presenter/controllers/change-password.controller";
import { z } from "zod";

export const changePassword = async (
    values: z.infer<typeof changePasswordFormSchema>
) =>
    executeAction({
        actionFn: async () => await changePasswordController(values),
        successTitle: "Password change success",
        failureTitle: "password change failed",
    });

// export const updateProfile = async (
//     values: z.infer<typeof changeUserDetailsFormSchema>
// ) => {
//     return executeAction({
//         actionFn: async () => await updateUserProfileController(values),
//         title: "User Profile",
//     });
// };
