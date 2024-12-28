import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { ResetPasswordForm } from "./reset-password-form";
import { BackButton } from "@/app/_components/custom/back-button";

export default async function Page(props: {
    searchParams?: Promise<{
        token?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const token = searchParams?.token;
    return (
        <div className="flex items-center justify-center my-auto">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-xl flex justify-between items-center">
                        Reset Your Password
                        <BackButton src="/auth/sign-in" />
                    </CardTitle>
                    <CardDescription>
                        Please enter the new password to reset your password.
                        Once successfully updated, you can sign in with your new
                        password and email credentials.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ResetPasswordForm token={token} />
                </CardContent>
            </Card>
        </div>
    );
}
