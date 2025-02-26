"use server";

import z from "zod";
import { signUpFormSchema } from "@/shared/validation-schemas/auth/sign-up-form.schema";
import { signUpController } from "@/src/iam/presenter/controllers/sign-up.controller";
import { executeAction } from "@/app/_utils/execute.action";

export const signUp = async (values: z.infer<typeof signUpFormSchema>) =>
    executeAction({
        actionFn: async () => await signUpController(values),
        title: "Sign-in Successful 🎉",
    });

// export const signInWithCredentials = async (
//     values: z.infer<typeof signInFormSchema>
// ) => {
//     return executeAction({
//         actionFn: async () => await signInWithCredentialsController(values),
//         title: "Sign In",
//         redirectUrl: DEFAULT_LOGIN_REDIRECT,
//     });
// };

// export const emailVerification = async (token: string) => {
//     return executeAction({
//         actionFn: async () => await emailVerificationController(token),
//         title: "Email Verification",
//         redirectUrl: "/auth/sign-in",
//     });
// };

// export const forgotPassword = async (
//     values: z.infer<typeof forgotPasswordFormSchema>
// ) => {
//     return executeAction({
//         actionFn: async () => await forgotPasswordController(values),
//         title: "Request New Password",
//     });
// };

// export const resetPassword = async (
//     values: z.infer<typeof resetPasswordFormSchema>,
//     token: string | undefined
// ) => {
//     return executeAction({
//         actionFn: async () => await resetPasswordController(values, token),
//         title: "Reset Password",
//         redirectUrl: "/auth/sign-in",
//     });
// };

// //later TODO:
// export const signOut = async () => {
//     try {
//         await signOutController();
//         console.log("success sign out");
//     } catch (error) {
//         console.log(error);
//     }
//     redirect("/auth/sign-in");
// };
