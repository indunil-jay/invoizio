"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { OrSeparator } from "@/app/_components/custom/forms/or-separator";
import { GoogleSign } from "@/app/_components/custom/forms/google-sign";
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
import { PasswordField } from "@/app/_components/custom/forms/password-input-field";
import { FogotPasswordLink } from "@/app/_components/custom/forms/forgot-password.-link";
import { signInFormSchema } from "@/shared/validation-schemas/auth/sign-in-form.schema";
import { CardFooter } from "@/app/_components/ui/card";
import { signInWithCredentials } from "@/app/(auth)/auth/actions";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import SpinnerBtnLoading from "@/app/_components/custom/spinner-btn-loading";
import { cn } from "@/app/_lib/tailwind-css/utils";

export function SignInForm() {
    const { toast } = useShowToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof signInFormSchema>) {
        const response = await signInWithCredentials(values);
        toast(response);

        if (response.status) {
            router.refresh();
        }
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
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
                    <FogotPasswordLink disabled={form.formState.isSubmitting} />
                    <Button
                        type="submit"
                        className="w-full"
                        size={"lg"}
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? (
                            <SpinnerBtnLoading />
                        ) : (
                            <span> Sign in</span>
                        )}
                    </Button>
                </form>
            </Form>

            <CardFooter className="flex flex-col space-y-4">
                <OrSeparator />
                <GoogleSign disabled={form.formState.isSubmitting} />
                <div>
                    <p className="text-xs font-medium text-muted-foreground">
                        Don&apos;t have an Account ?{" "}
                        <Link
                            href="/auth/sign-up"
                            className={cn(
                                "underline text-blue-500 underline-offset-2",
                                form.formState.isSubmitting &&
                                    "pointer-events-none opacity-50"
                            )}
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </CardFooter>
        </>
    );
}
