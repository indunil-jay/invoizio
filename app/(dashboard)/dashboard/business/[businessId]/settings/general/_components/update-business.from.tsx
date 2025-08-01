"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { AddressForm } from "@/app/(dashboard)/dashboard/business/_components/address-form";
import { Business, useBusinessStore } from "@/app/stores/business-store";
import { updateBusinessFormSchema } from "@/shared/validation-schemas/business/update-business-form-schema";
import { updateBusiness } from "@/app/(dashboard)/dashboard/business/[businessId]/settings/actions";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import SpinnerBtnLoading from "@/app/_components/custom/spinner-btn-loading";

interface UpdateBusinessFormProps {
    business: Business;
}

export const UpdateBusinessForm = ({ business }: UpdateBusinessFormProps) => {
    const form = useForm<z.infer<typeof updateBusinessFormSchema>>({
        resolver: zodResolver(updateBusinessFormSchema),
        defaultValues: {
            name: business.name,
            image: business.image ? business.image.url : undefined,
            address: {
                addressLine1: business.address.addressLine1,
                addressLine2: business.address.addressLine2 ?? undefined,
                city: business.address.city,
                postalCode: business.address.postalCode,
            },
        },
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const { toast } = useShowToast();
    const router = useRouter();
    const updateStoreBusiness = useBusinessStore(
        (state) => state.updateBusiness
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            form.setValue("image", file);
        }
    };

    const onSubmit = async (
        values: z.infer<typeof updateBusinessFormSchema>
    ) => {
        // Check for modified fields
        const updatedFields: z.infer<typeof updateBusinessFormSchema> = {};

        const formData = new FormData();

        if (values.name && business.name && values.name !== business.name) {
            updatedFields.name = values.name;
            formData.append("name", updatedFields.name);
        }

        // Check if address has actually changed
        if (values.address) {
            if (
                values.address.addressLine1 !== business.address.addressLine1 ||
                values.address.addressLine2 !==
                    (business.address.addressLine2 ?? undefined) ||
                values.address.city !== business.address.city ||
                values.address.postalCode !== business.address.postalCode
            ) {
                updatedFields.address = values.address;
                formData.append("address", JSON.stringify(values.address));
            }
        }

        if (values.image && values.image instanceof File) {
            updatedFields.image = values.image;
            formData.append("image", updatedFields.image);
        }

        // If there are no updates, do not submit
        if (Object.keys(updatedFields).length === 0) {
            console.log("No changes detected.");
            return;
        }

        // Make the API call here to update the business
        const response = await updateBusiness(business.id, formData);
        toast(response);

        if (response.status) {
            updateStoreBusiness(response.data);
            router.refresh();
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary/80 text-xs">
                                    Business Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter business name"
                                        {...field}
                                        disabled={form.formState.isSubmitting}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <AddressForm
                        fieldPrefix="address"
                        disabled={form.formState.isSubmitting}
                    />

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
                                                sizes="72px"
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
                                        <p className="text-sm">Business Icon</p>
                                        <p className="text-xs text-muted-foreground">
                                            JPG, PNG, SVG, JPEG, max 1 MB
                                        </p>
                                        <input
                                            className="hidden"
                                            type="file"
                                            accept=".png, .jpg, .jpeg, .svg"
                                            ref={inputRef}
                                            onChange={handleImageChange}
                                        />
                                        {field.value ? (
                                            <Button
                                                disabled={
                                                    form.formState.isSubmitting
                                                }
                                                type="button"
                                                variant={"destructive"}
                                                size={"sm"}
                                                className="w-fit mt-2"
                                                onClick={() => {
                                                    field.onChange(null);
                                                    if (inputRef.current) {
                                                        inputRef.current.value =
                                                            "";
                                                    }
                                                }}
                                            >
                                                Remove Image
                                            </Button>
                                        ) : (
                                            <Button
                                                disabled={
                                                    form.formState.isSubmitting
                                                }
                                                type="button"
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
                </div>

                <div className="flex items-center justify-between mt-7">
                    <Button
                        type="button"
                        size={"lg"}
                        variant={"secondary"}
                        disabled={form.formState.isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        size={"lg"}
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? (
                            <span className="flex gap-2 items-center">
                                <span>Updating Business </span>
                                <SpinnerBtnLoading />
                            </span>
                        ) : (
                            <span>Update Business</span>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
