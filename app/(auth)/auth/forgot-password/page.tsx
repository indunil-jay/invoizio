import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { BackButton } from "@/app/_components/custom/back-button";
import { ForgotPasswordForm } from "@/app/(auth)/auth/forgot-password/forgot-password-form";

export default function Page() {
    return (
        <div className="flex  items-center justify-center my-auto">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center justify-between">
                        Forgot Password
                        <BackButton src="/auth/sign-in" />
                    </CardTitle>
                    <CardDescription>
                        Please enter your email address to receive a password
                        reset link. Instructions to reset your password will be
                        sent to your email.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ForgotPasswordForm />
                </CardContent>
            </Card>
        </div>
    );
}
