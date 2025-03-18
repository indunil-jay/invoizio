import { BusinessClient } from "@/app/(dashboard)/dashboard/business/_components/business-client";
import { Business } from "@/app/stores/business-store";
import { getAllBusinesses } from "@/app/(dashboard)/dashboard/business/queries";

export default async function BusinessesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const allBusinesses = await getAllBusinesses();

    return (
        <>
            <BusinessClient businesses={allBusinesses as Business[] | []} />
            {children}
        </>
    );
}
