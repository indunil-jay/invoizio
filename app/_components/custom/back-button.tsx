import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { MoveRight } from "lucide-react";

interface BackButtonProps {
    src: string;
    btnName?: string;
}

export const BackButton = ({ btnName = "Back", src }: BackButtonProps) => {
    return (
        <Button asChild variant={"secondary"} size={"xsm"} className="w-fit">
            <Link href={src}>
                <p className="flex gap-2 items-center">
                    <span>{btnName}</span>
                    <MoveRight className="shrink-0" />
                </p>
            </Link>
        </Button>
    );
};
