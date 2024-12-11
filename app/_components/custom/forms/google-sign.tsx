import { Button } from "@/app/_components/ui/button";

import GoogleIcon from "@/app/_assets/svgs/google.svg";
import Image from "next/image";
export const GoogleSign = () => {
  return (
    <Button variant={"secondary"} size={"lg"} className="w-full">
      <Image src={GoogleIcon} width={24} height={24} alt="google-icon-svg" />
      Sign With Google
    </Button>
  );
};
