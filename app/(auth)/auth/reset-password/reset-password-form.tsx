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

export const resetPasswordFormSchema = z
    .object({
        password: z.string().min(8, {
            message: "Password must contain at least 8 characters.",
        }),
        passwordConfirm: z.string({ message: "Confirm password is required." }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: "Passwords does not match.",
    });

interface ResetPasswordFormPorps {
    token: string | undefined;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormPorps) => {
    const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = async (
        values: z.infer<typeof resetPasswordFormSchema>
    ) => {
        // const response = await resetPassword(values, token);
        // toast(response);
    };
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
                    disabled={
                        form.formState.isSubmitting ||
                        form.formState.isSubmitted
                    }
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
