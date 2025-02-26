"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@/app/_components/ui/button";
import GoogleIcon from "@/app/_assets/svgs/google.svg";
import { useForm } from "react-hook-form";

export const GoogleSign = () => {
    const form = useForm({});

    const onSubmit = async () => {
        await signIn("google");
    };
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button
                disabled={form.formState.isSubmitting}
                variant={"secondary"}
                size={"lg"}
                type="submit"
                className="w-full"
            >
                <Image
                    src={GoogleIcon}
                    width={24}
                    height={24}
                    alt="google-icon-svg"
                />
                Sign With Google
            </Button>
        </form>
    );
};
