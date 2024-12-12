"use server";

import { z } from "zod";
import { signUpController } from "@/src/interface-adapter/controllers/authentication/sign-up-controller";
import { signUpFormSchema } from "./sign-up/sign-up-form";

export const signUp = async (values: z.infer<typeof signUpFormSchema>) => {
  //controller
  try {
    await signUpController(values);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
