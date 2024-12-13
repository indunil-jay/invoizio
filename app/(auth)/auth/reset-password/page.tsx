import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ResetPasswordForm } from "./reset-password-form";
import { BackButton } from "@/app/_components/custom/back-button";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <BackButton src="/auth/sign-in" />
          <CardTitle className="text-xl">Reset Your Password</CardTitle>
          <CardDescription>
            Please enter the required details to reset your password. Once
            successfully updated, you can sign in with your new password and
            email credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
