import type { Metadata } from "next";
import { Logo } from "@/app/_components/custom/logo";

export const metadata: Metadata = {
    title: "Invoizio",
    description:
        "Securely log in or sign up to access your account on Invoizio.",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-svh min-w-svw p-6 md:p-10 flex flex-col   ">
            <div className="self-start mr-auto   ">
                <Logo />
            </div>
            {children}
        </div>
    );
}
