// "use client";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
//   DialogTrigger,
// } from "@/app/_components/ui/dialog";
// import { ScrollArea } from "@/app/_components/ui/scroll-area";
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// import { Pencil } from "lucide-react";
// import { UpdateInvoice } from "./update-invoice";
// import { BusinessWithAddress, InvoiceWithDetails } from "../../../type";
// import { User } from "@/app/(dashboard)/dashboard/account/types";
// import { useState } from "react";

// interface UpdateInvoiceModalProps {
//   invoice: InvoiceWithDetails;
//   user: User;
//   business: BusinessWithAddress;
// }

// export const UpdateInvoiceModal = ({
//   business,
//   invoice,
//   user,
// }: UpdateInvoiceModalProps) => {
//   const [isOpenDialog, setIsOpenDialog] = useState(false);

//   const handleClose =()=> setIsOpenDialog(false);
//   return (
//     <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
//       <DialogTrigger asChild>
//         <button className="flex gap-2">
//           <Pencil className="size-4 mr-2 shrink-0" />
//           Edit Invoice
//         </button>
//       </DialogTrigger>
//       <VisuallyHidden>
//         <DialogTitle>title</DialogTitle>
//         <DialogDescription>description</DialogDescription>
//       </VisuallyHidden>
//       <DialogContent
//         onKeyDown={(e) => e.stopPropagation()}
//         className="max-w-2xl h-[90vh] p-0 overflow-clip"
//       >
//         <ScrollArea>
//           <UpdateInvoice
//             invoice={invoice}
//             business={business}
//             user={user}
//             onClose={handleClose}
//           />
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// };
