import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { NewVerificationForm } from "./new-verification-form";
import { BackButton } from "@/app/_components/custom/back-button";

export default async function Page(props: {
    searchParams: Promise<{ token: string }>;
}) {
    const searchParams = await props.searchParams;
    const token = searchParams.token;
    return (
        <div className="flex flex-col justify-center items-center my-auto">
            <Card className="max-w-md w-full mx-auto shadow-lg">
                <CardHeader className="space-y-4 ">
                    <CardTitle className="text-xl flex justify-between items-center">
                        Verify Your Email Address
                        <BackButton src="/auth/sign-in" />
                    </CardTitle>
                    <CardDescription>
                        Confirm your email to complete the verification process
                        and access your account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <NewVerificationForm token={token} />
                </CardContent>
            </Card>
        </div>
    );
}
