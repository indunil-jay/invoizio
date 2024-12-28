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
import { SignUpForm } from "./sign-up-form";

export default function Page() {
    return (
        <div className="flex items-center justify-center my-auto">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-xl">
                        Welcome, Create your account
                    </CardTitle>
                    <CardDescription>
                        Enter details to create your account and continue.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <OrSeparator />
                    <GoogleSign />
                    <div>
                        <p className="text-xs font-medium text-muted-foreground">
                            Already have an Account ?{" "}
                            <Link
                                href="/auth/sign-in"
                                className="underline text-blue-500 underline-offset-2"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
