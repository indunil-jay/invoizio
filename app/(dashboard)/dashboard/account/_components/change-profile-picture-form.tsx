"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Camera, Save, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Form, FormField } from "@/app/_components/ui/form";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { fallbackUsername } from "@/app/stores/fallback-username";
import { User, useUserStore } from "@/app/stores/user-store";
import { useImageUpload } from "@/app/(dashboard)/dashboard/account/_hooks/use-image-upload";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import { changeProfilePictureFormSchema } from "@/shared/validation-schemas/account/change-profile-picture-form-schema";
import { changeProfileImage } from "../actions";
import { cn } from "@/app/_lib/tailwind-css/utils";

interface updateProfilePictureProps {
    user: User;
}

export const ChangeProfilePicture = ({ user }: updateProfilePictureProps) => {
    const form = useForm<z.infer<typeof changeProfilePictureFormSchema>>({
        resolver: zodResolver(changeProfilePictureFormSchema),
        defaultValues: {
            image: undefined,
        },
    });
    const { fileRef, imagePreview, handleImageChange, removeImage } =
        useImageUpload(form, "image");

    const { toast } = useShowToast();
    const router = useRouter();
    const updateUserProperty = useUserStore(
        (state) => state.updateUserProperty
    );
    const onSubmit = async (
        values: z.infer<typeof changeProfilePictureFormSchema>
    ) => {
        if (values.image === undefined || !(values.image instanceof File)) {
            toast({
                status: false,
                message:
                    "Please select a valid image file (PNG, JPEG, or SVG) before uploading.",
                title: "Form Input Invalid",
            });
            return;
        }
        const formData = new FormData();
        formData.append("image", values.image);

        const response = await changeProfileImage(formData);

        toast(response);
        if (response.status) {
            updateUserProperty("image", response.data!.url);
            form.reset();
            router.refresh();
        }
    };
    return (
        <Form {...form}>
            <form
                className={cn(
                    "relative",
                    form.formState.isSubmitting &&
                        "opacity-80 pointer-events-none"
                )}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <div>
                            {field.value ? (
                                <Avatar className="h-24 w-24 border-white/80 border-2">
                                    <AvatarImage
                                        className="h-24 w-24"
                                        src={imagePreview ?? ""}
                                        alt="@user-profile-img"
                                    />
                                </Avatar>
                            ) : (
                                <Avatar className="h-24 w-24 border-white/80 border-2">
                                    <AvatarImage
                                        className="h-24 w-24"
                                        src={(user.image || imagePreview) ?? ""}
                                        alt="@user-profile-img"
                                    />
                                    <AvatarFallback className="h-24 w-24">
                                        {fallbackUsername(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            )}

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        {field.value ? (
                                            <div className="flex flex-col gap-1 absolute -left-10 top-10">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            type="submit"
                                                            size={"icon"}
                                                            variant={"ghost"}
                                                            className="bg-emerald-500 text-white/90 hover:bg-emerald-600 hover:text-white p-2 rounded-full"
                                                        >
                                                            <Save />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Save</p>
                                                    </TooltipContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            size={"icon"}
                                                            variant={
                                                                "destructive"
                                                            }
                                                            className="p-2 rounded-full"
                                                            onClick={
                                                                removeImage
                                                            }
                                                        >
                                                            <Trash />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Remove</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        ) : (
                                            <Button
                                                type="button"
                                                size={"icon"}
                                                variant={"ghost"}
                                                className="absolute bottom-[1px] -right-[1px]  bg-neutral-100 rounded-full border-neutral-700 z-50 "
                                                onClick={() =>
                                                    fileRef.current?.click()
                                                }
                                            >
                                                <Camera />
                                            </Button>
                                        )}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Upload</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                />

                <input
                    type="file"
                    ref={fileRef}
                    className="hidden"
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleImageChange}
                />
            </form>
        </Form>
    );
};
