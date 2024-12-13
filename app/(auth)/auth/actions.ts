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

export const signUp = async (values: z.infer<typeof signUpFormSchema>) => {
  try {
    await signUpController(values);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
  // redirect("/auth/sign-in");
};

export const signInWithCredentials = async (
  values: z.infer<typeof signInFormSchema>
) => {
  try {
    await signInWithCredentialsController(values);
    console.log("success signin");
  } catch (error) {
    console.log(error);
  }
  redirect(DEFAULT_LOGIN_REDIRECT);
};

export const signOut = async () => {
  try {
    await signOutController();
    console.log("success sign out");
  } catch (error) {
    console.log(error);
  }
  redirect("/auth/sign-in");
};

export const signInWithGoogle = async () => {
  let url: string = "";
  try {
    url = await signInWithGoogleController();
  } catch (error) {
    console.log(error);
  }
  redirect(url);
};

export const emailVerification = async (token: string) => {
  try {
    await emailVerificationController(token);
  } catch (error) {
    console.log(error);
  }
  redirect("/");
};
