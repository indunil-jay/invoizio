import { Ban, CalendarClock, CheckCheck, CircleDotDashed } from "lucide-react";
import { z } from "zod";
// value for database returns status ID
export const invoiceStatus = [
    {
        id: 1,
        value: "pending",
        label: "Pending",
        icon: CircleDotDashed,
        disable: false,
    },
    {
        id: 2,
        value: "paid",
        label: "Paid",
        icon: CheckCheck,
        disable: false,
    },
    {
        id: 3,
        value: "cancelled",
        label: "Cancelled",
        icon: Ban,
        disable: false,
    },
    {
        id: 4,
        value: "expired",
        label: "Expired",
        icon: CalendarClock,
        disable: true,
    },
];

export type InvoiceStatus = (typeof invoiceStatus)[number];
