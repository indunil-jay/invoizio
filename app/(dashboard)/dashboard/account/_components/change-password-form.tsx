"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

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
import { changePasswordFormSchema } from "@/shared/validation-schemas/account/change-password-form-schema";
import { changePassword } from "@/app/(dashboard)/dashboard/account/actions";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import SpinnerBtnLoading from "@/app/_components/custom/spinner-btn-loading";
import { ConfirmationModal } from "@/app/_components/custom/modal";
import { signOut } from "next-auth/react";

export const ChangePasswordForm = () => {
    const form = useForm<z.infer<typeof changePasswordFormSchema>>({
        resolver: zodResolver(changePasswordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
    });

    const { toast } = useShowToast();
    const [open, setIsOpen] = useState(false);
    const [logingOut, setLoginOut] = useState(false);

    const onSubmit = async (
        values: z.infer<typeof changePasswordFormSchema>
    ) => {
        const response = await changePassword(values);
        toast(response);

        if (response.status) {
            form.reset();
            setIsOpen(true);
        }
    };

    const logout = async () => {
        setLoginOut(true);
        await signOut();
        setLoginOut(false);
    };

    return (
        <>
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
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New password</FormLabel>
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
                            !form.formState.isDirty
                        }
                        className="self-end"
                    >
                        {form.formState.isSubmitting ? (
                            <SpinnerBtnLoading />
                        ) : (
                            <span>Update Password</span>
                        )}
                    </Button>
                </form>
            </Form>
            <ConfirmationModal
                title="password Update Successful"
                message=" Your password has been successfully updated. For
                            security reasons, we recommend that you log out and
                            log back in using your new password."
                cancleButtonText="Stay Logged In"
                confirmButtonText="Log Out"
                onCancel={() => setIsOpen(false)}
                onConfirm={logout}
                isOpen={open}
                isPending={logingOut}
            />
        </>
    );
};
