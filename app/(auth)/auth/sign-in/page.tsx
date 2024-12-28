import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { OrSeparator } from "@/app/_components/custom/forms/or-separator";
import { GoogleSign } from "@/app/_components/custom/forms/google-sign";
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
                <CardFooter className="flex flex-col space-y-4">
                    <OrSeparator />
                    <GoogleSign />
                    <div>
                        <p className="text-xs font-medium text-muted-foreground">
                            Don&apos;t have an Account ?{" "}
                            <Link
                                href="/auth/sign-up"
                                className="underline text-blue-500 underline-offset-2"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
