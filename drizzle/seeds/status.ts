import { statuses } from "@/drizzle/schemas";
import { CreateStatusInput } from "../schemas/status";
import { DB } from "..";

const mock: CreateStatusInput[] = [
  {
    status: "pending",
  },
  {
    status: "paid",
  },
  {
    status: "cancelled",
  },
  {
    status: "expired",
  },
];

export async function seed(db: DB) {
  await db.insert(statuses).values(mock);
}
