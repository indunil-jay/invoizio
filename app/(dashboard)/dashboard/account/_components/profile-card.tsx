import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { ChangePasswordForm } from "./change-password-form";
import { UpdateProfileForm } from "./update-profile-form";

export const ProfileCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="p-0 rounded-br-none rounded-bl-none rounded-tr-md rounded-tl-md overflow-clip">
        <div className="w-full bg-red-200 h-44"></div>
      </CardHeader>
      <CardContent className="px-12">
        <div className="-mt-8 flex gap-3 lg:gap-6">
          <Avatar className="h-24 w-24 border-white/80 border-2">
            <AvatarImage
              className="h-24 w-24"
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback className="h-24 w-24">CN</AvatarFallback>
          </Avatar>
          <div className="self-end">
            <p className="text-2xl font-semibold">Your Name</p>
            <p className="text-sm text-muted-foreground">
              #youremail@gmail.com
            </p>
          </div>
        </div>
        <div className="my-4">
          <Separator />
        </div>
        <div className="space-y-6">
          <CardDescription>Change Your Details</CardDescription>
          <UpdateProfileForm />
        </div>
        <div className="my-4">
          <Separator />
        </div>
        <div className="space-y-6">
          <CardDescription>Change Your Password</CardDescription>
          <ChangePasswordForm />
        </div>
      </CardContent>
    </Card>
  );
};
