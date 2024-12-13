import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ForgotPasswordForm } from "./forgot-password-form";
import { BackButton } from "@/app/_components/custom/back-button";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <BackButton src="/sign-in" />
        <CardHeader>
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Please enter your email address to receive a password reset link.
            Instructions to reset your password will be sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
