import { auth } from "@/src/auth";
import { getUserById } from "../../../../account/queries";
import { CreateInvoice } from "../_components/create-invoice";
import { redirect } from "next/navigation";
import { getBusinessById } from "../../queries";

export default async function Page({
  params,
}: {
  params: { businessId: string };
}) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/auth/sign-in");
  }
  const user = await getUserById(session.user.id);

  const business = await getBusinessById(params.businessId);

  if (!user) return null;

  if (!business) redirect("/dashboard/business/create");
  return (
    <div className="max-w-2xl w-full mx-auto py-20">
      <CreateInvoice user={user} business={business} />
    </div>
  );
}
