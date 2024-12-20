import { redirect } from "next/navigation";
import { getUserById } from "../../account/queries";
import { Invoices } from "./invoices/_components/invoices";
import { auth } from "@/src/auth";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/auth/sign-in");
  }
  const user = await getUserById(session.user.id);

  if (!user) return null;
  return <Invoices user={user} />;
}
