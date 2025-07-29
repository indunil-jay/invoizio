import { ActivitiesHistory } from "./_components/activities-history-card";

export default async function Page({
    params,
}: {
    params: Promise<{ businessId: string }>;
}) {
    const { businessId } = await params;
    console.log({ businessId });

    return (
        <div className="max-w-2xl w-full mx-auto py-20">
            <ActivitiesHistory />
        </div>
    );
}
