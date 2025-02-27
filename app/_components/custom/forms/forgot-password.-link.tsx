import { cn } from "@/app/_lib/tailwind-css/utils";
import Link from "next/link";

export const FogotPasswordLink = ({ disabled }: { disabled: boolean }) => {
    return (
        <div className="flex justify-end">
            <Link
                href={"/auth/forgot-password"}
                className={cn(
                    "text-xs text-blue-500 transition-colors hover:text-blue-600  underline-offset-2 font-medium underline",
                    disabled && "pointer-events-none opacity-50"
                )}
            >
                Fogot password?
            </Link>
        </div>
    );
};
