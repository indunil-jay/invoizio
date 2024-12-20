import { auth } from "@/src/auth";
import { getUserById } from "../../../../account/queries";
import { CreateInvoice } from "../_components/create-invoice";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/auth/sign-in");
  }
  const user = await getUserById(session.user.id);
  if (!user) return null;
  return (
    <div className="max-w-2xl w-full mx-auto py-20">
      <CreateInvoice user={user} />
    </div>
  );
}
