"use client";
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
import { useUserStore } from "@/app/stores/user-store";
import { UpdateProfileForm } from "./update-profile-form";
import { UserProfileSkelton } from "./skeltons/user-profile-skelton";

export const ProfileCard = () => {
    const user = useUserStore((state) => state.user);
    const isLoading = useUserStore((state) => state.isLoading);

    const pending = isLoading || !user;

    return pending ? (
        <UserProfileSkelton />
    ) : (
        <Card className="w-full">
            <CardHeader className="p-0 rounded-br-none rounded-bl-none rounded-tr-md rounded-tl-md overflow-clip">
                <div className="w-full bg-red-200 h-44"></div>
            </CardHeader>
            <CardContent className="px-12">
                <div className="-mt-8 flex gap-3 lg:gap-6">
                    <Avatar className="h-24 w-24 border-white/80 border-2">
                        <AvatarImage
                            className="h-24 w-24"
                            src={user?.image ?? ""}
                            alt="@user-profile-img"
                        />
                        <AvatarFallback className="h-24 w-24">
                            {/* {fallbackUsername(user?.name)} */}
                        </AvatarFallback>
                    </Avatar>
                    <div className="self-end">
                        <p className="text-2xl font-semibold">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <div className="my-4">
                    <Separator />
                </div>
                <div className="space-y-6">
                    <CardDescription>Change Your Details</CardDescription>
                    <UpdateProfileForm user={user} />
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
