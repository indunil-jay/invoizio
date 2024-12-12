"use client";
import { useForm } from "react-hook-form";
import { signOut } from "./(auth)/actions";
import { Button } from "./_components/ui/button";

export default function Home() {
  const form = useForm({});

  const onSubmit = async () => {
    await signOut();
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Button type="submit">sign out</Button>
    </form>
  );
}
