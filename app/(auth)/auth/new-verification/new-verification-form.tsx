"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/app/_components/ui/button";
import { verifyEmail } from "@/app/(auth)/auth/actions";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import SpinnerBtnLoading from "@/app/_components/custom/spinner-btn-loading";

interface NewVerificationFormProps {
    token: string | undefined;
}

export const NewVerificationForm = ({ token }: NewVerificationFormProps) => {
    const form = useForm();
    const { toast } = useShowToast();
    const router = useRouter();

    const onSubmit = async () => {
        if (token) {
            const response = await verifyEmail(token);
            toast(response);
        }
        router.push("/auth/sign-in");
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Button
                type="submit"
                disabled={
                    form.formState.isSubmitting || form.formState.isSubmitted
                }
                className="w-full"
            >
                {form.formState.isSubmitting ? (
                    <SpinnerBtnLoading />
                ) : (
                    <span> Verify Email</span>
                )}
            </Button>
        </form>
    );
};
