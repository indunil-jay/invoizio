"use client";
import Link from "next/link";
import { useState } from "react";

import { MoveLeft, AlertCircle, RefreshCw, Home } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/tailwind-css/utils";

export default function ErrorPage({ errorMessage }: { errorMessage?: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const refreshWindow = () => {
        setIsLoading(true);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    return (
        <div className="flex flex-col items-center justify-center  flex-grow">
            <Card className="max-w-md w-full shadow-lg rounded-lg bg-white">
                <CardHeader className="flex flex-col items-center">
                    <AlertCircle className="w-12 h-12 text-red-500 animate-pulse" />
                    <h1 className="text-2xl font-bold mt-2 text-gray-800">
                        Authentication Error
                    </h1>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <p className="text-lg text-gray-600" aria-live="polite">
                        {errorMessage ||
                            "Something went wrong while processing your request. Please try again."}
                    </p>
                    <div className="flex flex-col gap-3">
                        <Button asChild variant="default">
                            <Link
                                href="/auth/sign-in"
                                className="flex items-center"
                            >
                                <MoveLeft className="mr-2" />
                                Try Again
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/dashboard">
                                <Home />
                                Go to Homepage
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={refreshWindow}
                            className="flex items-center justify-center"
                        >
                            <RefreshCw
                                className={cn(
                                    "mr-2 w-4 h-4",
                                    isLoading && "animate-spin"
                                )}
                            />
                            Refresh Page
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
