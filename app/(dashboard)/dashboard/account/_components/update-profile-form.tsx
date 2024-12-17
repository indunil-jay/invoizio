"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useMemo } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { useShowToast } from "@/app/_hooks/custom/use-toast-message";
import { Input } from "@/app/_components/ui/input";
import { updateProfile } from "../actions";
import { useRouter } from "next/navigation";
import { type User } from "@/app/(dashboard)/dashboard/account/types";
import { ConfirmationModal } from "@/app/_components/custom/modal";
import { signOut } from "@/app/(auth)/auth/actions";

export const changeUserDetailsFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long." }),
    email: z.string().email({
      message: "Invalid email address. Please verify and try again.",
    }),
  })
  .partial();

interface UpdateProfileFormProps {
  user: User;
}

export const UpdateProfileForm = ({ user }: UpdateProfileFormProps) => {
  const [showModal, setShowModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | undefined>(
    undefined
  );

  const defaultValues = useMemo(
    () => ({
      name: user.name,
      email: user.email,
    }),
    [user.name, user.email]
  );

  const toast = useShowToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof changeUserDetailsFormSchema>>({
    resolver: zodResolver(changeUserDetailsFormSchema),
    defaultValues,
  });
  // Handle submitting a single field update
  const onSubmitField = async (
    value: z.infer<typeof changeUserDetailsFormSchema>
  ) => {
    let response;

    if (value.email) {
      response = await updateProfile({ email: value.email });
      toast(response);
    } else if (value.name) {
      response = await updateProfile({ name: value.name });
      toast(response);
    }
    router.refresh();
  };

  // Handle individual field validation and submission on blur
  const handleBlurAndSubmit = async (fieldName: "name" | "email") => {
    const isValid = await form.trigger(fieldName);

    if (isValid) {
      const newValue = form.getValues(fieldName);
      const defaultValue = defaultValues[fieldName];

      // If value has changed, proceed
      if (newValue !== defaultValue) {
        if (fieldName === "email") {
          // Show confirmation modal for email update
          setPendingEmail(newValue);
          setShowModal(true);
        } else {
          await onSubmitField({ [fieldName]: newValue });
        }
      }
    }
  };

  // Handle modal confirmation
  const handleConfirmEmailUpdate = async () => {
    if (pendingEmail) {
      await onSubmitField({ email: pendingEmail });
      setPendingEmail(undefined);
      setShowModal(false);
      await signOut();
    }
  };

  //handle cancle
  const handleCancleEmailUpdate = async () => {
    setPendingEmail(undefined);
    setShowModal(false);
  };
  return (
    <>
      <Form {...form}>
        <form className="space-y-6 flex flex-col">
          {/* Username field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    onBlur={() => handleBlurAndSubmit("name")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    onBlur={() => handleBlurAndSubmit("email")}
                  />
                </FormControl>
                <div>
                  <ul className="list-disc text-xs text-muted-foreground space-y-2">
                    <li>
                      Updating your email address will automatically log you
                      out. You will need to verify your new email and log in
                      again to continue.
                    </li>
                    <li>
                      If you originally logged in using a provider account
                      (e.g., Google), you cannot directly switch to a different
                      email for the same provider account.
                    </li>
                    <li>
                      To use a different email, you must first update your
                      account email. After the update, you will need to log in
                      using your new email address and password instead of the
                      provider account.
                    </li>
                    <li>
                      If you do not have a password set yet (because you were
                      using a provider account), you must use the{" "}
                      <strong>Forgot Password</strong> option after logging out
                      to create one.
                    </li>
                    <li>
                      Once you set a password and verify your new email, you can
                      log in using your updated email and password combination.
                    </li>
                  </ul>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <ConfirmationModal
        message=" Updating your email will automatically log you out. You will
                  need to verify your new email address and log in again to
                  continue."
        isOpen={showModal}
        onConfirm={handleConfirmEmailUpdate}
        onCancel={handleCancleEmailUpdate}
      />
    </>
  );
};
