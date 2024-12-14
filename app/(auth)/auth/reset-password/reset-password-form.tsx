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
import { PasswordField } from "@/app/_components/custom/forms/password-input-field";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "../actions";

export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters." }),
    passwordConfirm: z.string({ message: "Confirm password is required." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords does not match.",
  });

export const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    await resetPassword(values, token);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordField {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <PasswordField {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || form.formState.isSubmitted}
          className="w-full"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Form>
  );
};
