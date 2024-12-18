import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  CircleCheck,
  DownloadCloudIcon,
  Mail,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";

export const InvoiceActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`#`}>
            <Pencil className="size-4 mr-2 shrink-0" />
            Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`#`}>
            <DownloadCloudIcon className="size-4 mr-2 shrink-0" />
            Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`#`}>
            <Mail className="size-4 mr-2 shrink-0" />
            Send Reminder
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`#`}>
            <Trash className="size-4 mr-2 shrink-0" />
            Delete Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`#`}>
            <CircleCheck className="size-4 mr-2 shrink-0" />
            Mark as Paid
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
