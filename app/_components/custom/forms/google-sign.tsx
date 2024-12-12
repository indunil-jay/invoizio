"use client";
import Image from "next/image";

import { Button } from "@/app/_components/ui/button";
import GoogleIcon from "@/app/_assets/svgs/google.svg";
import { useForm } from "react-hook-form";
import { signInWithGoogle } from "@/app/(auth)/actions";

export const GoogleSign = () => {
  const form = useForm({});
  const onSubmit = async () => {
    await signInWithGoogle();
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
        <Image src={GoogleIcon} width={24} height={24} alt="google-icon-svg" />
        Sign With Google
      </Button>
    </form>
  );
};
