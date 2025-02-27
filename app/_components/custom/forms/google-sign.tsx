"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@/app/_components/ui/button";
import GoogleIcon from "@/app/_assets/svgs/google.svg";
import { toast } from "@/app/_hooks/use-toast";

export const GoogleSign = ({ disabled }: { disabled: boolean }) => {
    const handleGoogleSign = async () => {
        try {
            await signIn("google", { redirect: false });
            // TODO: this should be changed later
            toast({
                title: "Sign-in Successful 🎉",
                description: "You have successfully signed in with Google.",
            });
        } catch {
            toast({
                title: "Something Went Wrong ❌",
                description:
                    "We're experiencing issues. Please try again later.",
            });
        }
    };
    return (
        <Button
            onClick={handleGoogleSign}
            variant={"secondary"}
            size={"lg"}
            type="submit"
            className="w-full"
            disabled={disabled}
        >
            <Image
                src={GoogleIcon}
                width={24}
                height={24}
                alt="google-icon-svg"
            />
            Sign With Google
        </Button>
    );
};
