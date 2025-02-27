import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";

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
            </Card>
        </div>
    );
}
