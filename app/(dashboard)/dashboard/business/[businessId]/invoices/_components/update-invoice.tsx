// "use client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/app/_components/ui/card";
// import { InvoiceForm } from "./invoice-form";
// import { type User } from "@/app/(dashboard)/dashboard/account/types";
// import { BusinessWithAddress, InvoiceWithDetails } from "../../../type";
// import { ProductProvider } from "../_contexts/product.context";

// interface UpdateInvoiceProps {
//   user: User;
//   business: BusinessWithAddress;
//   invoice: InvoiceWithDetails;
//   onClose: () => void;
// }

// export const UpdateInvoice = ({
//   user,
//   business,
//   invoice,
//   onClose,
// }: UpdateInvoiceProps) => {
//   return (
//     <Card>
//       <CardHeader className="p-6 lg:p-8">
//         <CardTitle>Business Name</CardTitle>
//         <CardDescription>#{invoice.id}</CardDescription>
//       </CardHeader>
//       <CardContent className="p-6 lg:p-8">
//         <ProductProvider>
//           <InvoiceForm
//             user={user}
//             business={business}
//             mode="update"
//             existingInvoice={invoice}
//             onClose={onClose}
//           />
//         </ProductProvider>
//       </CardContent>
//     </Card>
//   );
// };
