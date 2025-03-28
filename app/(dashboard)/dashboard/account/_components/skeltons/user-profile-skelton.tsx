"use client";
import { Avatar } from "@/app/_components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { FormInputSkelton } from "./form-input-skelton";
import { ListItem2LineSkelton } from "./list-item-skelton";
import { ButtonSkelton } from "./button-skelton";

export const UserProfileSkelton = () => {
    return (
        <Card className="w-full">
            <CardHeader className="p-0 rounded-br-none rounded-bl-none rounded-tr-md rounded-tl-md overflow-clip">
                <Skeleton className="h-44 w-full" />
            </CardHeader>
            <CardContent className="px-12">
                <div className="-mt-8 flex gap-3 lg:gap-6">
                    <Avatar className="h-24 w-24 border-white/80 border-2">
                        <Skeleton className="h-24 w-24 rounded-full" />
                    </Avatar>
                    <div className="self-end space-y-2">
                        <Skeleton className="h-8 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className="my-4">
                    <Separator />
                </div>
                <div className="space-y-6">
                    <CardDescription>Change Your Details</CardDescription>

                    <div className="space-y-6 flex flex-col">
                        {Array.from({ length: 2 }, (_, index) => (
                            <FormInputSkelton key={index} />
                        ))}

                        <ul className="list-disc text-xs text-muted-foreground space-y-3">
                            {Array.from({ length: 5 }, (_, index) => (
                                <ListItem2LineSkelton key={index} />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="my-4">
                    <Separator />
                </div>
                <div className="space-y-6">
                    <CardDescription>Change Your Password</CardDescription>

                    <div className="space-y-6 flex flex-col">
                        {Array.from({ length: 2 }, (_, index) => (
                            <FormInputSkelton key={index} />
                        ))}
                        <div className="self-end">
                            <ButtonSkelton />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
