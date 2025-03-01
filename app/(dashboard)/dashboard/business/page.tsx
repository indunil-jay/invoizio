import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
    // const getAllBusinessArr = await getAllBusiness();

    // if (!getAllBusinessArr || getAllBusinessArr.length === 0) {
    redirect(`/dashboard/business/create`);
    // }
    // redirect(`/dashboard/business/${getAllBusinessArr[0].id}`);
}
