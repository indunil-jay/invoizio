"use server";
import { z } from "zod";
import { changePasswordFormSchema } from "@/app/(dashboard)/dashboard/account/_components/change-password-form";
import { executeAction } from "@/app/_utils/execute.action";
import { updatePasswordController } from "@/src/presenter/controllers/user/update-password.controller";
import { changeUserDetailsFormSchema } from "@/app/(dashboard)/dashboard/account/_components/update-profile-form";
import { updateUserProfileController } from "@/src/presenter/controllers/user/update-user-profile.controller";

export const changePassword = async (
    values: z.infer<typeof changePasswordFormSchema>
) => {
    return executeAction({
        actionFn: async () => await updatePasswordController(values),
        title: "User Profile",
    });
};

export const updateProfile = async (
    values: z.infer<typeof changeUserDetailsFormSchema>
) => {
    return executeAction({
        actionFn: async () => await updateUserProfileController(values),
        title: "User Profile",
    });
};
