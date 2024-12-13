"use client";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { signOut } from "../(auth)/auth/actions";

export const SignOut = () => {
  const form = useForm({});

  const onSubmit = async () => {
    await signOut();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Button type="submit">sign out</Button>
    </form>
  );
};
