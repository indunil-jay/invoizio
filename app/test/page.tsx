import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
    return Array.from({ length: 50 }, (_, index) => ({
        id: `inv_${index + 1}`,
        amount: Math.floor(Math.random() * 1000) + 50,
        status: ["pending", "processing", "success", "failed"][
            Math.floor(Math.random() * 4)
        ] as "pending" | "processing" | "success" | "failed",
        email: `user${index + 1}@example.com`,
    }));
}

export default async function DemoPage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
