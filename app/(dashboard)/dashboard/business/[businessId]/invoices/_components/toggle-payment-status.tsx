// "use client";

// import {
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/app/_components/ui/alert-dialog";
// import { CircleCheck } from "lucide-react";
// import { updateInvoiceById } from "../actions";
// import { useShowToast } from "@/app/_hooks/custom/use-toast-message";
// import { useRouter } from "next/navigation";
// import { INVOICE_STATUS, InvoiceWithDetails } from "../../../type";

// interface TogglePaymentStatusProps {
//   invoice: InvoiceWithDetails;
// }

// export const TogglePaymentStatus = ({ invoice }: TogglePaymentStatusProps) => {
//   const nextStatus =
//     invoice.status.status === "pending"
//       ? INVOICE_STATUS.PAID
//       : INVOICE_STATUS.PENDING;

//   const toast = useShowToast();
//   const router = useRouter();

//   const handleConfirm = async () => {
//     const response = await updateInvoiceById(invoice.id, nextStatus);

//     toast(response);

//     router.refresh();
//   };

//   return (
//     <>
//       <AlertDialogTrigger asChild>
//         <div className="flex gap-2 cursor-pointer">
//           <CircleCheck className="size-4 mr-2 shrink-0" />
//           {nextStatus === INVOICE_STATUS.PAID
//             ? "Mark Invoice as Paid"
//             : "Mark Invoice as Pending"}
//         </div>
//       </AlertDialogTrigger>

//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
//           <AlertDialogDescription>
//             {nextStatus === INVOICE_STATUS.PAID
//               ? "You are about to mark this invoice as paid. Once updated, the client will receive a notification confirming that the payment has been successfully processed. Are you sure you want to proceed?"
//               : "You are about to mark this invoice as pending. This action indicates that the payment is not yet completed. The client will be notified of this status update. Are you sure you want to proceed?"}
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={handleConfirm}>
//             Confirm and Update
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </>
//   );
// };
