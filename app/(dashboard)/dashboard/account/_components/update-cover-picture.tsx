"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Camera, ImageIcon, Save, Trash } from "lucide-react";

import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Form, FormField } from "@/app/_components/ui/form";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { useImageUpload } from "../_hooks/use-image-upload";
import { updateCoverPhotoFormSchema } from "@/shared/validation-schemas/account/update-cover-photo-form-schema";
import { uploadCoverImage } from "../actions";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import { useUserStore } from "@/app/stores/user-store";

export const UpdateCoverPhotoForm = () => {
    const form = useForm<z.infer<typeof updateCoverPhotoFormSchema>>({
        resolver: zodResolver(updateCoverPhotoFormSchema),
        defaultValues: {
            image: undefined,
        },
    });
    const { fileRef, imagePreview, handleImageChange, removeImage } =
        useImageUpload(form, "image");

    const { toast } = useShowToast();

    const currentUser = useUserStore((state) => state.user);

    const onSubmit = async (
        values: z.infer<typeof updateCoverPhotoFormSchema>
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

        const response = await uploadCoverImage(formData);
        toast(response);
    };

    return (
        <div className="w-full bg-neutral-100 h-44 relative">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <div>
                                {imagePreview ||
                                currentUser?.userCoverImages?.url ? (
                                    <div className="h-44 relative w-full rounded-md overflow-hidden">
                                        <Image
                                            alt="profile-cover-photo"
                                            className="object-cover"
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority
                                            src={
                                                imagePreview ??
                                                currentUser?.userCoverImages
                                                    ?.url ??
                                                ""
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div className="flex gap-2 items-center justify-center">
                                        <Avatar className="size-[72px] h-44">
                                            <AvatarFallback>
                                                <ImageIcon className="size-[36px] text-neutral-400" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-xl text-neutral-400 font-medium">
                                            Upload a Cover Image
                                        </p>
                                    </div>
                                )}
                                <input
                                    className="hidden"
                                    ref={fileRef}
                                    type="file"
                                    name="file"
                                    id="file"
                                    accept="image/png, image/jpeg, image/svg+xml"
                                    onChange={handleImageChange}
                                />

                                <TooltipProvider>
                                    {field.value ? (
                                        <div className="flex gap-3 absolute right-8 top-8">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        type="submit"
                                                        size={"icon"}
                                                        variant={"ghost"}
                                                        className="bg-white p-2 rounded-full"
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
                                                        variant={"destructive"}
                                                        className="p-2 rounded-full"
                                                        onClick={removeImage}
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
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    type="button"
                                                    size={"icon"}
                                                    variant={"ghost"}
                                                    className="absolute right-8 top-8 bg-white p-2 rounded-full"
                                                    onClick={() =>
                                                        fileRef.current?.click()
                                                    }
                                                >
                                                    <Camera />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Upload</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </TooltipProvider>
                            </div>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};
