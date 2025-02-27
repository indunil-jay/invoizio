"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Link from "next/link";
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
import { signUpFormSchema } from "@/shared/validation-schemas/auth/sign-up-form.schema";
import { signUp } from "@/app/(auth)/auth/actions";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import { CardFooter } from "@/app/_components/ui/card";
import SpinnerBtnLoading from "@/app/_components/custom/spinner-btn-loading";

export function SignUpForm() {
    const { toast } = useShowToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
        const response = await signUp(values);

        toast(response);

        if (response.status) {
            router.push("/auth/sign-in");
        }
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="username"
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
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
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
                        className="w-full"
                        size={"lg"}
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? (
                            <SpinnerBtnLoading />
                        ) : (
                            <span>Create an account</span>
                        )}
                    </Button>
                </form>
            </Form>

            <CardFooter className="flex flex-col space-y-4 mt-4">
                <OrSeparator />
                <GoogleSign disabled={form.formState.isSubmitting} />
                <div>
                    <p className="text-xs font-medium text-muted-foreground">
                        Already have an Account ?{" "}
                        <Link
                            href="/auth/sign-in"
                            className="underline text-blue-500 underline-offset-2"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </CardFooter>
        </>
    );
}
