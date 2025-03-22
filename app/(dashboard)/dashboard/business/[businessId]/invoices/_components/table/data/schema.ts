import { z } from "zod";

export const invoiceSchema = z.object({
    id: z.string(),
    client: z.object({
        name: z.string(),
        email: z.string(),
    }),
    amount: z.string(),
    statusId: z.number(),
    date: z.object({
        issueDate: z.coerce.date(),
        dueDate: z.coerce.date(),
    }),
});

export type Invoice = z.infer<typeof invoiceSchema>;
