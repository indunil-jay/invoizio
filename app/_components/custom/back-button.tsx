import Link from "next/link";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";

interface BackButtonProps {
  src: string;
  btnName?: string;
}

export const BackButton = ({ btnName = "Back", src }: BackButtonProps) => {
  return (
    <Button asChild variant={"secondary"} size={"sm"} className="w-fit">
      <Link href={src}>
        <p className="flex gap-0.5 items-center">
          <MoveLeft className="shrink-0" />
          <span>{btnName}</span>
        </p>
      </Link>
    </Button>
  );
};
