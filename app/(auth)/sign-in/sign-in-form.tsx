"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { PasswordField } from "@/app/_components/custom/forms/password-input-field";
import { FogotPasswordLink } from "@/app/_components/custom/forms/forgot-password.-link";
import { credentialsSignIn } from "../actions";

export const signInFormSchema = z.object({
  email: z.string().email().min(1, {
    message: "email is required.",
  }),
  password: z
    .string()
    .min(1, { message: "password is required." })
    .min(8, { message: "password must contain at least 8 characters." }),
});

export function SignInForm() {
  // 1. Define  form.
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    await credentialsSignIn(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="youremail@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordField {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FogotPasswordLink />
        <Button
          type="submit"
          className="w-full"
          size={"lg"}
          disabled={form.formState.isSubmitting}
        >
          Sign in
        </Button>
      </form>
    </Form>
  );
}
