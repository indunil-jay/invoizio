type Status = "created" | "updated" | "expired" | "paid" | "pending" | "notify";

type Activity = {
  id: string;
  title: string;
  date: string;
  status: Status;
  customerName: string;
  customerEmail: string;
  dueDate?: string;
};

const activities: Activity[] = [
  {
    id: "89370589325905",
    title: "Invoice #89370589325905",
    date: "2024-11-21T18:30:00.000Z",
    status: "created",
    customerName: "John Doe",
    customerEmail: "johndoe@example.com",
    dueDate: "2024-12-01T18:30:00.000Z",
  },
  {
    id: "89370589325909",
    title: "Invoice #89370589325909",
    date: "2024-11-21T18:30:00.000Z",
    status: "notify",
    customerName: "Emily Green",
    customerEmail: "emilygreen@example.com",
    dueDate: "2024-12-15T12:00:00.000Z",
  },
  {
    id: "89370589325906",
    title: "Invoice #89370589325906",
    date: "2024-11-25T10:00:00.000Z",
    status: "expired",
    customerName: "Jane Smith",
    customerEmail: "janesmith@example.com",
  },
  {
    id: "89370589325907",
    title: "Invoice #89370589325907",
    date: "2024-11-26T14:30:00.000Z",
    status: "paid",
    customerName: "Michael Brown",
    customerEmail: "michaelbrown@example.com",
  },
  {
    id: "89370589325908",
    title: "Invoice #89370589325908",
    date: "2024-11-27T09:00:00.000Z",
    status: "pending",
    customerName: "Sara White",
    customerEmail: "sarawhite@example.com",
    dueDate: "2024-12-10T09:00:00.000Z",
  },
];

const statusColors: Record<Status, string> = {
  created: "bg-green-100 text-green-700",
  updated: "bg-blue-100 text-blue-700",
  expired: "bg-red-100 text-red-700",
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-yellow-100 text-yellow-700",
  notify: "bg-purple-100 text-purple-700",
};

const getStatusMessage = (
  status: Status,
  title: string,
  customerName: string,
  customerEmail: string,
  dueDate?: string
): string => {
  const customerInfo = `Customer: ${customerName} (${customerEmail})`;
  const dueDateMessage = dueDate
    ? `Due date: ${new Date(dueDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`
    : "";

  switch (status) {
    case "created":
      return `You, as the business owner, created a new invoice: ${title}. It's ready to be sent to the client. ${customerInfo}. ${dueDateMessage}`;
    case "updated":
      return `The invoice ${title} was updated and saved with new details. ${customerInfo}.`;
    case "expired":
      return `The invoice ${title} has expired as the payment was not made. Consider following up with the client. ${customerInfo}.`;
    case "paid":
      return `Payment was received for invoice ${title}. You, as the business owner, marked it as paid. ${customerInfo}.`;
    case "pending":
      return `Payment for invoice ${title} is still pending from the client. Awaiting further action. ${customerInfo}. ${dueDateMessage}`;
    case "notify":
      return `You notified the client about the payment for invoice ${title}. ${customerInfo}. ${dueDateMessage}`;
    default:
      return "";
  }
};

export const ActivitiesHistory = () => {
  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
      <div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block"></div>
      <div className="space-y-16">
        {activities.map((activity, index) => {
          const isNewDate =
            index === 0 ||
            activities[index - 1].date.split("T")[0] !==
              activity.date.split("T")[0];

          return (
            <article key={activity.id} className="relative group">
              <div className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl"></div>

              <svg
                viewBox="0 0 9 9"
                className="hidden absolute right-full mr-6 top-2 text-slate-200 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block"
              >
                <circle
                  cx="4.5"
                  cy="4.5"
                  r="4.5"
                  stroke="currentColor"
                  className="fill-white dark:fill-slate-900"
                  strokeWidth="2"
                ></circle>
              </svg>

              <div className="relative">
                {/* Render Date if it's a new day */}
                {isNewDate && (
                  <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
                    <dt className="sr-only">Date</dt>
                    <dd className="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
                      <time dateTime={activity.date}>
                        {formatDate(activity.date)}
                      </time>
                    </dd>
                  </dl>
                )}

                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 pt-8 lg:pt-0">
                    {activity.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      statusColors[activity.status]
                    }`}
                  >
                    {activity.status.charAt(0).toUpperCase() +
                      activity.status.slice(1)}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {getStatusMessage(
                    activity.status,
                    activity.title,
                    activity.customerName,
                    activity.customerEmail
                  )}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
