"use client";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { createNewBusiness } from "../create/actions";
import { toast } from "@/app/_hooks/use-toast";
import { useRouter } from "next/navigation";
import { Business } from "../type";
import { AddressForm } from "./address-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Label } from "@/app/_components/ui/label";
import { cn } from "@/app/_lib/tailwind-css/utils";

export const createBusinessFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Business name is required." })
    .min(3, { message: "Business name must be at least 3 characters long." }),
  image: z.union([
    z.instanceof(File, {
      message: "Uploaded file must be a valid image file.",
    }),
    z
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .optional()
      .refine((value) => value === undefined || value.startsWith("http"), {
        message: "Image URL must be valid or empty.",
      }),
  ]),
  address: z.object({
    addressLine1: z.string().min(1, { message: "Address Line 1 is required." }),
    addressLine2: z.string().optional(),
    city: z
      .string()
      .min(1, { message: "City is required." })
      .max(100, { message: "City must be 100 characters or less." }),
    postalCode: z
      .string()
      .min(1, { message: "postalCode is required." })
      .refine((val) => (val ? /^\d{5,6}$/.test(val.toString()) : true), {
        message: "Postal code must be a valid 5-6 digit number.",
      }),
  }),
});

interface CreateBusinessFormProps {
  handleBusinessCreate?: (business: Business) => void;
  onCloseModal?: (value: boolean) => void;
}

export const CreateBusinessForm = ({
  handleBusinessCreate,
  onCloseModal,
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

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue("image", file);
    }
  };

  const onSubmit = async (values: z.infer<typeof createBusinessFormSchema>) => {
    const formData = {
      ...values,
      image: values.image instanceof File ? values.image : undefined,
    };
    const response = await createNewBusiness(formData);
    console.log({ response });
    toast(response);

    if (response.success === true && response.newBusinessDocument) {
      router.push(`/dashboard/business/${response.newBusinessDocument.id}`);
      if (typeof handleBusinessCreate === "function") {
        handleBusinessCreate(response.newBusinessDocument);
      } else {
        console.error("onCreate is not a function");
      }
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
                  <Input placeholder="Enter business name" {...field} />
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
                    "flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    businessAddress ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {businessAddress || "Enter business address"}
                </div>
                {form.formState.errors.address && (
                  <p className="text-xs font-medium text-red-500">
                    Missing business address field
                  </p>
                )}
              </FormItem>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 ">
              <AddressForm fieldPrefix="address" disabled={false} />
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
                            ? URL.createObjectURL(field.value)
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
                      about=".png, .jpg, .jpeg, .svg"
                      ref={inputRef}
                      onChange={handleImageChange}
                    />
                    {field.value ? (
                      <Button
                        type="button"
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
                        variant={"secondary"}
                        size={"sm"}
                        className="w-fit mt-2"
                        onClick={() => inputRef.current?.click()}
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
          >
            Cancel
          </Button>
          <Button type="submit" size={"lg"}>
            {form.formState.isSubmitting ? (
              <span className="flex gap-2 items-center">
                <span>Creating Business </span>
              </span>
            ) : (
              "Create Business"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
