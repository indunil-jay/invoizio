import { Ban, CalendarClock, CheckCheck, CircleDotDashed } from "lucide-react";

// value for database returns status ID
export const invoiceStatus = [
    {
        id: 1,
        value: "pending",
        label: "Pending",
        icon: CircleDotDashed,
    },
    {
        id: 2,
        value: "paid",
        label: "Paid",
        icon: CheckCheck,
    },
    {
        id: 3,
        value: "cancelled",
        label: "Cancelled",
        icon: Ban,
    },
    {
        id: 4,
        value: "expired",
        label: "Expired",
        icon: CalendarClock,
    },
];
