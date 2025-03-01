"use server";

import z from "zod";
import { signUpFormSchema } from "@/shared/validation-schemas/auth/sign-up-form.schema";
import { signUpController } from "@/src/iam/presenter/controllers/sign-up.controller";
import { executeAction } from "@/app/_utils/execute.action";
import { emailVerifyController } from "@/src/iam/presenter/controllers/verify-email.controller";
import { signInFormSchema } from "@/shared/validation-schemas/auth/sign-in-form.schema";
import { signInController } from "@/src/iam/presenter/controllers/sign-in.controller";
import { forgotPasswordFormSchema } from "@/shared/validation-schemas/auth/forget-password-form.schema";
import { forgotPasswordController } from "@/src/iam/presenter/controllers/forgot-password.controller";
import { resetPasswordFormSchema } from "@/shared/validation-schemas/auth/reset-password-form.schema";
import { passwordResetController } from "@/src/iam/presenter/controllers/password-reset.controller";

export const signUp = async (values: z.infer<typeof signUpFormSchema>) =>
    executeAction({
        actionFn: async () => await signUpController(values),
        successTitle: "Sign-Up Successful 🎉",
        failureTitle: "Sign-Up Failed ❌",
    });

export const verifyEmail = async (token: string) =>
    executeAction({
        actionFn: async () => await emailVerifyController(token),
        successTitle: "Email Verified Successfully 🎉 ",
        failureTitle: "Email Verification Failed ❌",
    });

export const signInWithCredentials = async (
    values: z.infer<typeof signInFormSchema>
) =>
    executeAction({
        actionFn: async () => await signInController(values),
        successTitle: "Sign-In Successful 🎉",
        failureTitle: "Sign-In Failed ❌",
    });

export const forgotPassword = async (
    values: z.infer<typeof forgotPasswordFormSchema>
) => {
    return executeAction({
        actionFn: async () => await forgotPasswordController(values),
        successTitle: "Password Reset Request Sent 🎉",
        failureTitle: "Password Reset Request Failed ❌",
    });
};

export const resetPassword = async (
    values: z.infer<typeof resetPasswordFormSchema>,
    token: string | undefined
) => {
    return executeAction({
        actionFn: async () => await passwordResetController(values, token),
        successTitle: "Password Reset Successful 🎉",
        failureTitle: "Password Reset Failed ❌",
    });
};
