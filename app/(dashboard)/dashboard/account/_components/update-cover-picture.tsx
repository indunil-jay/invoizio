import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Form, FormField } from "@/app/_components/ui/form";
import { Camera, ImageIcon, Save, Trash } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip";

const updateCoverPhotoFormSchema = z.object({
    image: z
        .union([
            z.instanceof(File),
            z
                .string()
                .nullable()
                .transform((val) => val || undefined),
        ])
        .optional(),
});

export const UpdateCoverPhotoForm = () => {
    const form = useForm<z.infer<typeof updateCoverPhotoFormSchema>>({
        resolver: zodResolver(updateCoverPhotoFormSchema),
        defaultValues: {
            image: undefined,
        },
    });

    const fileRef = useRef<HTMLInputElement | null>(null);

    const [imagePreview, setImagePreview] = useState<string | undefined>();

    const imageValue = form.watch("image");

    useEffect(() => {
        if (imageValue instanceof File) {
            const objectURL = URL.createObjectURL(imageValue);
            setImagePreview(objectURL);
            return () => URL.revokeObjectURL(objectURL);
        } else {
            setImagePreview(imageValue);
        }
    }, [imageValue]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            form.setValue("image", file);
        }
    };

    const onSubmit = (values: z.infer<typeof updateCoverPhotoFormSchema>) => {
        const formData = {
            ...values,
            image: values.image instanceof File ? values.image : undefined,
        };
        console.log({ formData });
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
                                {imagePreview ? (
                                    <div className="h-44 relative rounded-md overflow-hidden">
                                        <Image
                                            alt="profile-cover-photo"
                                            fill
                                            className="object-cover"
                                            src={imagePreview}
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
                                        <div className="flex gap-3 absolute right-8 top-8  ">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        type="submit"
                                                        size={"icon"}
                                                        variant={"ghost"}
                                                        className=" bg-white p-2 rounded-full"
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
                                                        className=" p-2 rounded-full"
                                                        onClick={() => {
                                                            field.onChange(
                                                                null
                                                            );
                                                            if (
                                                                fileRef.current
                                                            ) {
                                                                fileRef.current.value =
                                                                    "";
                                                            }
                                                        }}
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
