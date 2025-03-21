// "use client";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/app/_components/ui/table";
// import { InvoiceActions } from "./invoice-actions";
// import { BusinessWithAddress, InvoiceWithDetails } from "../../../type";
// import { User } from "@/app/(dashboard)/dashboard/account/types";

// interface InvoiceTableProps {
//   invoices: InvoiceWithDetails[] | null;
//   user: User;
//   business: BusinessWithAddress;
// }

// export const InvoiceTable = ({
//   invoices,
//   user,
//   business,
// }: InvoiceTableProps) => {
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Invoice ID</TableHead>
//           <TableHead>Customer</TableHead>
//           <TableHead>Amount</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Date</TableHead>
//           <TableHead className="text-right">Actions</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {!invoices ? (
//           <TableRow>
//             <TableCell colSpan={6} className="text-center">
//               No Invoice data. Start creating the first one.
//             </TableCell>
//           </TableRow>
//         ) : (
//           invoices.map((invoice) => (
//             <TableRow key={invoice.id}>
//               <TableCell>{invoice.id}</TableCell>
//               <TableCell>{invoice.client.name}</TableCell>
//               <TableCell>{invoice.totalPrice}</TableCell>
//               <TableCell>{invoice.status.status}</TableCell>
//               <TableCell>{invoice.dueDate.toString()}</TableCell>
//               <TableCell className="text-right">
//                 <InvoiceActions
//                   invoice={invoice}
//                   user={user}
//                   business={business}
//                 />
//               </TableCell>
//             </TableRow>
//           ))
//         )}
//       </TableBody>
//     </Table>
//   );
// };
