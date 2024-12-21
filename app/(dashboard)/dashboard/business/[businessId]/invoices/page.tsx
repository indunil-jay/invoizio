import { auth } from "@/src/auth";
import { Invoices } from "./_components/invoices";
import { redirect } from "next/navigation";
import { getUserById } from "../../../account/queries";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/auth/sign-in");
  }
  const user = await getUserById(session.user.id);
  if (!user) return null;
  return (
    <div>
      <Invoices user={user} />
    </div>
  );
}
