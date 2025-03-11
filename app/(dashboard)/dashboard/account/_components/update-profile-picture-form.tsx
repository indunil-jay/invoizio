"use client";

import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Form, FormField } from "@/app/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const createProfilePictureFormSchema = z.object({
    image: z
        .union([
            typeof File !== "undefined" ? z.instanceof(File) : z.any(),
            z.string().transform((value) => (value === "" ? undefined : value)),
        ])
        .optional(),
});

export const UpdateProfilePictureForm = () => {
    const form = useForm<z.infer<typeof createProfilePictureFormSchema>>({
        resolver: zodResolver(createProfilePictureFormSchema),
        defaultValues: {
            image: undefined,
        },
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            form.setValue("image", file);
        }
    };

    const onSubmit = (
        values: z.infer<typeof createProfilePictureFormSchema>
    ) => {
        const formData = {
            ...values,
            image: values.image instanceof File ? values.image : undefined,
        };

        console.log({ formData });
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-center gap-x-5">
                                {field.value ? (
                                    <div className="size-[72px] relative rounded-md overflow-hidden">
                                        <Image
                                            alt="workspace logo"
                                            fill
                                            className="object-cover"
                                            src={
                                                field.value instanceof File
                                                    ? URL.createObjectURL(
                                                          field.value
                                                      )
                                                    : field.value
                                            }
                                        />
                                    </div>
                                ) : (
                                    <Avatar className="size-[72px]">
                                        <AvatarFallback>
                                            <ImageIcon className="size-[36px] text-neutral-400" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div className="flex flex-col">
                                    <p className="text-sm">workspace Icon</p>
                                    <p className="text-xs text-muted-foreground">
                                        JPG, PNG, SVG, JPEG, max 1 MB
                                    </p>
                                    <input
                                        className="hidden"
                                        type="file"
                                        about=".png, .jpg, .jpeg, .svg"
                                        ref={inputRef}
                                        // disabled={isPending}
                                        onChange={handleImageChange}
                                    />
                                    {field.value ? (
                                        <Button
                                            type="button"
                                            // disabled={isPending}
                                            variant={"destructive"}
                                            size={"sm"}
                                            className="w-fit mt-2"
                                            onClick={() => {
                                                field.onChange(null);
                                                if (inputRef.current) {
                                                    inputRef.current.value = "";
                                                }
                                            }}
                                        >
                                            Remove Image
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            // disabled={isPending}
                                            variant={"secondary"}
                                            size={"sm"}
                                            className="w-fit mt-2"
                                            onClick={() =>
                                                inputRef.current?.click()
                                            }
                                        >
                                            Upload Image
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                />
            </form>
        </Form>
    );
};
