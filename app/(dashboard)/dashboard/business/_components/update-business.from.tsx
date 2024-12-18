"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/app/_hooks/use-toast";
import { useRouter } from "next/navigation";
import { Business } from "../type";
import { updateBusinessById } from "../[businessId]/settings/actions";

export const updateBusinessFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Required")
      .min(3, "Must be 3 or more characters"),
    image: z.union([
      z.instanceof(File),
      z
        .string()
        .transform((value) => (value === "" ? undefined : value))
        .optional(),
    ]),
  })
  .partial();

interface UpdateBusinessFormProps {
  business: Business;
}

export const UpdateBusinessForm = ({ business }: UpdateBusinessFormProps) => {
  const form = useForm<z.infer<typeof updateBusinessFormSchema>>({
    resolver: zodResolver(updateBusinessFormSchema),
    defaultValues: {
      name: business.name,
      image: business.image ? business.image : undefined,
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

  const onSubmit = async (values: z.infer<typeof updateBusinessFormSchema>) => {
    const formData = {
      ...values,
      image: values.image instanceof File ? values.image : undefined,
    };
    const response = await updateBusinessById(business.id, formData);
    toast(response);

    if (response.success === true && response.updatedBusinessDocument) {
      router.push(`/dashboard/business/${response.updatedBusinessDocument.id}`);
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
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter business name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
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
          <Button type="button" size={"lg"} variant={"secondary"}>
            Cancel
          </Button>
          <Button type="submit" size={"lg"}>
            {form.formState.isSubmitting ? (
              <span className="flex gap-2 items-center">
                <span>Updating Business </span>
              </span>
            ) : (
              "Update Business"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
