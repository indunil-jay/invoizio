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
import { Loader2 } from "lucide-react";
import { useShowToast } from "@/app/_hooks/custom/use-toast-message";
import { Input } from "@/app/_components/ui/input";

export const changeUserDetailsFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
});

export const UpdateProfileForm = () => {
  const form = useForm<z.infer<typeof changeUserDetailsFormSchema>>({
    resolver: zodResolver(changeUserDetailsFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const toast = useShowToast();

  const onSubmit = async (
    values: z.infer<typeof changeUserDetailsFormSchema>
  ) => {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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
            "Update"
          )}
        </Button>
      </form>
    </Form>
  );
};
