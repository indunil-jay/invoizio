import { auth } from "@/src/auth";
import { ProfileCard } from "./_components/profile-card";
import { redirect } from "next/navigation";
import { getUserById } from "./queries";
import { type User } from "@/app/(dashboard)/dashboard/account/types";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/auth/sign-in");
  }

  const user: User | null = await getUserById(session.user.id);

  if (!user) {
    return;
  }

  return (
    <div className="max-w-xl w-full mx-auto   py-20">
      <ProfileCard user={user} />
    </div>
  );
}
