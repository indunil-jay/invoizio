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
import { useShowToast } from "@/app/_hooks/custom/use-toast-message";
import { Input } from "@/app/_components/ui/input";
import { updateProfile } from "../actions";

// Zod schema for partial updates
export const changeUserDetailsFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long." }),
    email: z.string().email({
      message: "Invalid email address. Please verify and try again.",
    }),
  })
  .partial(); // Allow partial updates (name or email independently)

export const UpdateProfileForm = () => {
  const form = useForm<z.infer<typeof changeUserDetailsFormSchema>>({
    resolver: zodResolver(changeUserDetailsFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const toast = useShowToast();

  // Handle submitting a single field update
  const onSubmitField = async (
    value: z.infer<typeof changeUserDetailsFormSchema>
  ) => {
    let response;

    // If email is provided, update email
    if (value.email) {
      response = await updateProfile({ email: value.email });
      toast(response);
    }
    // If name is provided, update name
    else if (value.name) {
      response = await updateProfile({ name: value.name });
      toast(response);
    }
  };

  // Handle individual field validation and submission on blur
  const handleBlurAndSubmit = async (fieldName: "name" | "email") => {
    // Trigger validation for the individual field (name or email)
    const isValid = await form.trigger(fieldName);

    if (isValid) {
      const value = form.getValues(fieldName); // Get the value of the field
      await onSubmitField({ [fieldName]: value });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6 flex flex-col">
        {/* Username field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onBlur={() => handleBlurAndSubmit("name")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  onBlur={() => handleBlurAndSubmit("email")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
