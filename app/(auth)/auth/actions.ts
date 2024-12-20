"use server";

import { z } from "zod";
import { signUpController } from "@/src/interface-adapter/controllers/authentication/sign-up.controller";
import { signUpFormSchema } from "./sign-up/sign-up-form";
import { signInFormSchema } from "./sign-in/sign-in-form";
import { signInWithCredentialsController } from "@/src/interface-adapter/controllers/authentication/sign-in-with-credentials.controller";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import { signOutController } from "@/src/interface-adapter/controllers/authentication/sign-out.controller";
import { signInWithGoogleController } from "@/src/interface-adapter/controllers/authentication/sign-in-with-google.controller";
import { emailVerificationController } from "@/src/interface-adapter/controllers/authentication/email-verification.controller";
import { forgotPasswordController } from "@/src/interface-adapter/controllers/authentication/forgot-password.controller";
import { forgotPasswordFormSchema } from "./forgot-password/forgot-password-form";
import { resetPasswordFormSchema } from "./reset-password/reset-password-form";
import { resetPasswordController } from "@/src/interface-adapter/controllers/authentication/reset-password.controller";
import { executeAction } from "@/app/_lib/execute.action";

export const signUp = async (values: z.infer<typeof signUpFormSchema>) => {
  return executeAction({
    actionFn: async () => await signUpController(values),
    title: "Sign Up",
    redirectUrl: "/auth/sign-in",
  });
};

export const signInWithCredentials = async (
  values: z.infer<typeof signInFormSchema>
) => {
  return executeAction({
    actionFn: async () => await signInWithCredentialsController(values),
    title: "Sign In",
    redirectUrl: DEFAULT_LOGIN_REDIRECT,
  });
};

export const signInWithGoogle = async () => {
  return executeAction({
    actionFn: async () => await signInWithGoogleController(),
    title: "Sign With Google",
  });
};

export const emailVerification = async (token: string) => {
  return executeAction({
    actionFn: async () => await emailVerificationController(token),
    title: "Email Verification",
    redirectUrl: "/auth/sign-in",
  });
};

export const forgotPassword = async (
  values: z.infer<typeof forgotPasswordFormSchema>
) => {
  return executeAction({
    actionFn: async () => await forgotPasswordController(values),
    title: "Request New Password",
  });
};

export const resetPassword = async (
  values: z.infer<typeof resetPasswordFormSchema>,
  token: string | undefined
) => {
  return executeAction({
    actionFn: async () => await resetPasswordController(values, token),
    title: "Reset Password",
    redirectUrl: "/auth/sign-in",
  });
};

//later TODO:
export const signOut = async () => {
  try {
    await signOutController();
    console.log("success sign out");
  } catch (error) {
    console.log(error);
  }
  redirect("/auth/sign-in");
};
