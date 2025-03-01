"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";

import { Input } from "@/app/_components/ui/input";
import { ConfirmationModal } from "@/app/_components/custom/modal";
import { changeUserNameOrEmailFormSchema } from "@/shared/validation-schemas/account/change-user-name-or-email-form.schema";
import { User, useUserStore } from "@/app/stores/user-store";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import { updateProfile } from "../actions";
import { signOut } from "next-auth/react";

const emailChangeGuides = [
    {
        id: 1,
        rule: "Updating your email address will automatically log you out. You will need to verify your new email and log in again to continue.",
    },
    {
        id: 2,
        rule: "If you originally logged in using a provider account (e.g., Google), you cannot directly switch to a different email for the same provider account.",
    },
    {
        id: 3,
        rule: "To use a different email, you must first update your account email. After the update, you will need to log in using your new email address and password instead of the provider account.",
    },
    {
        id: 4,
        rule: "If you do not have a password set yet (because you were using a provider account), you must use the Forgot Password option after logging out to create one.",
    },
    {
        id: 5,
        rule: "Once you set a password and verify your new email, you can log in using your updated email and password combination.",
    },
];

interface UpdateUserNameOrEmailFormProps {
    user: User;
}

export const UpdateUserNameOrEmailForm = ({
    user,
}: UpdateUserNameOrEmailFormProps) => {
    const [showModal, setShowModal] = useState(false);
    const [pendingEmail, setPendingEmail] = useState<string | undefined>(
        undefined
    );
    const setUser = useUserStore((state) => state.setUser);
    const userz = useUserStore((state) => state.user);

    const defaultValues = useMemo(
        () => ({
            name: user.name,
            email: user.email,
        }),
        [user.name, user.email]
    );

    const router = useRouter();
    const { toast } = useShowToast();

    const form = useForm<z.infer<typeof changeUserNameOrEmailFormSchema>>({
        resolver: zodResolver(changeUserNameOrEmailFormSchema),
        defaultValues,
    });

    // Handle submitting a single field update
    const onSubmitField = async (
        value: z.infer<typeof changeUserNameOrEmailFormSchema>
    ) => {
        let response;
        if (value.email) {
            response = await updateProfile({ email: value.email });
            toast(response);

            if (response.status) {
                setUser(response.data as User);
                console.log(response?.data);
            }
        } else if (value.name) {
            response = await updateProfile({ name: value.name });
            toast(response);
            if (response.status) {
                setUser(response.data as User);
                console.log(response?.data);
            }
        }

        router.refresh();
    };

    // Handle individual field validation and submission on blur
    const handleBlurAndSubmit = async (fieldName: "name" | "email") => {
        const isValid = await form.trigger(fieldName);

        if (isValid) {
            const newValue = form.getValues(fieldName);
            const defaultValue = defaultValues[fieldName];

            // If value has changed, proceed
            if (newValue !== defaultValue) {
                if (fieldName === "email") {
                    // Show confirmation modal for email update
                    setPendingEmail(newValue);
                    setShowModal(true);
                } else {
                    await onSubmitField({ [fieldName]: newValue });
                }
            }
        }
    };

    // Handle modal confirmation
    const handleConfirmEmailUpdate = async () => {
        if (pendingEmail) {
            await onSubmitField({ email: pendingEmail });
            setPendingEmail(undefined);
            setShowModal(false);
            await signOut();
        }
    };

    //handle cancle
    const handleCancleEmailUpdate = async () => {
        setPendingEmail(undefined);
        setShowModal(false);
    };
    return (
        <>
            {JSON.stringify(userz)}
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
                                        onBlur={() =>
                                            handleBlurAndSubmit("name")
                                        }
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
                                        onBlur={() =>
                                            handleBlurAndSubmit("email")
                                        }
                                    />
                                </FormControl>
                                <div>
                                    <ul className="list-disc text-xs text-muted-foreground space-y-2">
                                        {emailChangeGuides.map((guide) => (
                                            <li key={guide.id}>{guide.rule}</li>
                                        ))}
                                    </ul>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <ConfirmationModal
                message=" Updating your email will automatically log you out. You will
                  need to verify your new email address and log in again to
                  continue."
                isOpen={showModal}
                onConfirm={handleConfirmEmailUpdate}
                onCancel={handleCancleEmailUpdate}
            />
        </>
    );
};
