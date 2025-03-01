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
import { forgotPasswordFormSchema } from "@/shared/validation-schemas/auth/forget-password-form.schema";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import SpinnerBtnLoading from "@/app/_components/custom/spinner-btn-loading";
import { forgotPassword } from "../actions";

export const ForgotPasswordForm = () => {
    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    });
    const { toast } = useShowToast();

    async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
        const response = await forgotPassword(values);
        console.log({ response });
        toast(response);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter your email address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="youremail@gmail.com"
                                    {...field}
                                    disabled={form.formState.isSubmitting}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={
                        form.formState.isSubmitting ||
                        form.formState.isSubmitted
                    }
                    className="w-full"
                >
                    {form.formState.isSubmitting ? (
                        <SpinnerBtnLoading />
                    ) : (
                        <span>Send Password Reset Link</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};
