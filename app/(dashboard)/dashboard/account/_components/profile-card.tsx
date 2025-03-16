"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { useUserStore } from "@/app/stores/user-store";

import { ChangeUserNameOrEmailForm } from "@/app/(dashboard)/dashboard/account/_components/change-user-name-or-email-form";
import { UserProfileSkelton } from "@/app/(dashboard)/dashboard/account/_components/skeltons/user-profile-skelton";
import { ChangePasswordForm } from "@/app/(dashboard)/dashboard/account/_components/change-password-form";
import { ChangeCoverPicture } from "@/app/(dashboard)/dashboard/account/_components/change-cover-picture";
import { ChangeProfilePicture } from "@/app/(dashboard)/dashboard/account/_components/change-profile-picture-form";

export const ProfileCard = () => {
    const user = useUserStore((state) => state.user);
    const isLoading = useUserStore((state) => state.isLoading);

    const pending = isLoading || !user;

    return pending ? (
        <UserProfileSkelton />
    ) : (
        <Card className="w-full">
            <CardHeader className="p-0 rounded-br-none rounded-bl-none rounded-tr-md rounded-tl-md overflow-clip">
                <ChangeCoverPicture />
            </CardHeader>
            <CardContent className="px-12">
                <div className="-mt-8 flex gap-3 lg:gap-6">
                    <ChangeProfilePicture user={user} />

                    <div className="self-end">
                        <p className="text-2xl font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </div>
                <div className="my-4">
                    <Separator />
                </div>
                <div className="space-y-6">
                    <CardDescription>Change Your Details</CardDescription>
                    <ChangeUserNameOrEmailForm user={user} />
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
