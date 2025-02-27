import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { SignInForm } from "@/app/(auth)/auth/sign-in/sign-in-form";

export default function Page() {
    return (
        <div className="flex items-center justify-center my-auto">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-xl">Welcome Back</CardTitle>
                    <CardDescription className="text-pretty">
                        Access your account and continue where you left off.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInForm />
                </CardContent>
            </Card>
        </div>
    );
}
