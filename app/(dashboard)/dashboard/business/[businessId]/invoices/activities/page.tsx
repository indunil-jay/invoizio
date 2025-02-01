import { inspect } from "node:util";
import { ActivitiesHistory } from "../_components/activities-history-card";
import { getAllActivitiesByBusinessId } from "./queries";

export default async function Page({
    params,
}: {
    params: Promise<{ businessId: string }>;
}) {
    const { businessId } = await params;

    const activities = await getAllActivitiesByBusinessId(businessId);
    console.log(inspect(activities, { depth: null }));
    return (
        <div className="max-w-2xl w-full mx-auto py-20">
            <ActivitiesHistory />
        </div>
    );
}
