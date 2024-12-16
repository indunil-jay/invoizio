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
import { useShowToast } from "@/app/_hooks/custom/use-toast-message";

export const changePasswordFormSchema = z.object({
  currentPassword: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters." }),
  newPassword: z
    .string()
    .min(8, { message: "New Password must contain at least 8 characters." }),
});

export const ChangePasswordForm = () => {
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const toast = useShowToast();

  const onSubmit = async (values: z.infer<typeof changePasswordFormSchema>) => {
    //...
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordField {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <PasswordField {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
          className="self-end"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </Form>
  );
};
