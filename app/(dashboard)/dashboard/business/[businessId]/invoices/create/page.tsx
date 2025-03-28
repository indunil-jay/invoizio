export default async function Page({
    params,
}: {
    params: { businessId: string };
}) {
    console.log({ params });
    return <div className="max-w-2xl w-full mx-auto py-20">Create Invoice</div>;
}
