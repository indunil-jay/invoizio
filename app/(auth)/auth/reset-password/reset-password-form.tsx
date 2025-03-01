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
import { resetPasswordFormSchema } from "@/shared/validation-schemas/auth/reset-password-form.schema";
import SpinnerBtnLoading from "@/app/_components/custom/spinner-btn-loading";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import { resetPassword } from "../actions";
import { useRouter } from "next/navigation";

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
    const { toast } = useShowToast();
    const router = useRouter();

    const onSubmit = async (
        values: z.infer<typeof resetPasswordFormSchema>
    ) => {
        const response = await resetPassword(values, token);
        toast(response);
        router.push("/auth/sign-in");
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
                                <PasswordField
                                    {...field}
                                    disabled={form.formState.isSubmitting}
                                />
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
                                <PasswordField
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
                        <span> Reset Password</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};
