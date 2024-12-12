"use server";

import { z } from "zod";
import { signUpController } from "@/src/interface-adapter/controllers/authentication/sign-up.controller";
import { signUpFormSchema } from "./sign-up/sign-up-form";
import { signInFormSchema } from "./sign-in/sign-in-form";
import { signInWithCredentialsController } from "@/src/interface-adapter/controllers/authentication/sign-in-with-credentials.controller";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import { signOutController } from "@/src/interface-adapter/controllers/authentication/sign-out.controller";

export const signUp = async (values: z.infer<typeof signUpFormSchema>) => {
  try {
    await signUpController(values);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
  redirect("/sign-in");
};

export const credentialsSignIn = async (
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
  redirect("/sign-in");
};
