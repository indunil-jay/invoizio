"use client";

import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImageIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Input } from "@/app/_components/ui/input";
import { AddressForm } from "@/app/(dashboard)/dashboard/business/_components/address-form";
import { Label } from "@/app/_components/ui/label";
import { cn } from "@/app/_lib/tailwind-css/utils";
import { createBusinessFormSchema } from "@/shared/validation-schemas/business/create-business-from-schema";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import { createNewBusiness } from "@/app/(dashboard)/dashboard/business/create/actions";
import SpinnerBtnLoading from "@/app/_components/custom/spinner-btn-loading";
import { useRouter } from "next/navigation";
import { Business, useBusinessStore } from "@/app/stores/business-store";

interface CreateBusinessFormProps {
    onCloseModal?: (value: boolean) => void;
    setActiveBusiness?: (business: Business) => void;
}

export const CreateBusinessForm = ({
    onCloseModal,
    setActiveBusiness,
}: CreateBusinessFormProps) => {
    const form = useForm<z.infer<typeof createBusinessFormSchema>>({
        resolver: zodResolver(createBusinessFormSchema),
        defaultValues: {
            name: "",
            image: "",
            address: {
                addressLine1: "",
                addressLine2: "",
                city: "",
                postalCode: "",
            },
        },
    });

    const { toast } = useShowToast();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const addBusinessStore = useBusinessStore((state) => state.addBusiness);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            form.setValue("image", file);
        }
    };

    const onSubmit = async (
        values: z.infer<typeof createBusinessFormSchema>
    ) => {
        const formData = new FormData();
        formData.append("name", values.name);

        // Handle file upload properly
        if (values.image instanceof File) {
            formData.append("image", values.image);
        }

        // Convert nested address object into FormData
        Object.entries(values.address).forEach(([key, value]) => {
            formData.append(`address[${key}]`, value);
        });

        const response = await createNewBusiness(formData);

        toast(response);

        if (response.status) {
            form.reset();
            if (onCloseModal) {
                onCloseModal(false);
            }
            addBusinessStore(response.data);
            setActiveBusiness(response.data);
            router.push(`/dashboard/business/${response.data.id}/invoices`);
        }
    };

    const businessAddress =
        form.getValues("address.addressLine1") &&
        form.getValues("address.city") &&
        form.getValues("address.postalCode")
            ? `${form.getValues("address.addressLine1")}, ${form.getValues(
                  "address.city"
              )}, ${form.getValues("address.postalCode")}`
            : "";

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Name</FormLabel>
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

                    <Popover>
                        <PopoverTrigger asChild>
                            <FormItem>
                                <Label
                                    className={cn(
                                        "text-sm",
                                        form.formState.errors.address
                                            ? "text-red-500"
                                            : "text-primary "
                                    )}
                                >
                                    Business Address
                                </Label>

                                <div
                                    className={cn(
                                        form.formState.isSubmitting &&
                                            "pointer-events-none opacity-50 ",
                                        "flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors  md:text-sm",
                                        businessAddress
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {businessAddress ||
                                        "Enter business address"}
                                </div>
                                {form.formState.errors.address && (
                                    <p className="text-xs font-medium text-red-500">
                                        Missing business address field
                                    </p>
                                )}
                            </FormItem>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-80 ">
                            <AddressForm
                                fieldPrefix="address"
                                disabled={form.formState.isSubmitting}
                            />
                        </PopoverContent>
                    </Popover>

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
                                        <p className="text-sm">Business Icon</p>
                                        <p className="text-xs text-muted-foreground">
                                            JPG, PNG, SVG, JPEG, max 1 MB
                                        </p>
                                        <input
                                            disabled={
                                                form.formState.isSubmitting
                                            }
                                            className="hidden"
                                            type="file"
                                            about=".png, .jpg, .jpeg, .svg"
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
                        onClick={() => onCloseModal?.(!true)}
                        type="button"
                        size={"lg"}
                        variant={"secondary"}
                        disabled={form.formState.isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={form.formState.isSubmitting}
                        type="submit"
                        size={"lg"}
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                Creating Business <SpinnerBtnLoading />
                            </>
                        ) : (
                            <span> Create Business </span>
                        )}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
