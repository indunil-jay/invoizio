import { auth } from "@/src/auth";
import { Invoices } from "./_components/invoices";
import { redirect } from "next/navigation";
import { getUserById } from "../../../account/queries";
import { getBusinessById } from "../queries";

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
    <div>
      <Invoices user={user} business={business} />
    </div>
  );
}
