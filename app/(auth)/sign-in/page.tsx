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
import { SignInForm } from "@/app/(auth)/sign-in/sign-in-form";

export default function Page() {
  return (
    <div className="flex h-screen w-full  items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
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
                href="/sign-up"
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
