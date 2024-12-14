"use client";

import { BackButton } from "@/app/_components/custom/back-button";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { emailVerification } from "../actions";

interface NewVerificationFormProps {
  token: string | undefined;
}

export const NewVerificationForm = ({ token }: NewVerificationFormProps) => {
  const form = useForm();

  const onSubmit = async () => {
    if (token) {
      await emailVerification(token);
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto shadow-lg">
      <CardHeader className="space-y-4 text-center">
        <BackButton src="/auth/sign-in" />
        <CardTitle className="text-xl font-semibold">
          Verify Your Email Address
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Confirm your email to complete the verification process and access
          your account.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || form.formState.isSubmitted}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Verify Email"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
