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

const signInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export const ForgotPasswordForm = () => {
  // 1. Define  form.
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signInFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your email address</FormLabel>
              <FormControl>
                <Input placeholder="youremail@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size={"lg"}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
