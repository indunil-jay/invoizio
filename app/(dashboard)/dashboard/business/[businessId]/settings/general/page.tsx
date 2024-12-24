import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { UpdateBusinessForm } from "../../../_components/update-business.from";
import { Separator } from "@/app/_components/ui/separator";
import { DeleteBusiness } from "../../../_components/delete-business";
import { redirect } from "next/navigation";
import { getBusinessById } from "../../queries";

export default async function Page({
  params,
}: {
  params: { businessId: string };
}) {
  const business = await getBusinessById(params.businessId);

  if (!business) return redirect("/dashboard");

  return (
    <div className="mx-auto max-w-lg py-20 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Update your business</CardTitle>
          <CardDescription>
            Update either the name or icon of your business to reflect new
            changes.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <UpdateBusinessForm business={business} />
        </CardContent>

        <div className="my-7">
          <Separator />
        </div>

        <CardHeader>
          <CardTitle>Delete your business</CardTitle>
          <CardDescription>
            Please note, this action is permanent and cannot be undone.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <DeleteBusiness businessId={business.id} />
        </CardContent>
      </Card>
    </div>
  );
}
