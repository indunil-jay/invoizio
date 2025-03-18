import { BusinessClient } from "./_components/business-client";
import { Business } from "@/app/stores/business-store";
import { getAllBusinesses } from "./queries";

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
