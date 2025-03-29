import { Skeleton } from "@/app/_components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { TableHeaderSkelton } from "./table-header-skelton";
import { TableFooterSkelton } from "./table-footer-skelton";

export const TableSkelton = () => {
    return (
        <Card className="my-4">
            <CardHeader className="py-2">
                <TableHeaderSkelton />
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {Array.from({ length: 1 }, (_, index) => (
                                <TableRow key={index}>
                                    {Array.from({ length: 6 }, (_, index) => (
                                        <TableHead
                                            key={index + 1}
                                            className="h-8"
                                        >
                                            <Skeleton className="h-6 rounded-md w-[140px]" />
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 8 }, (_, index) => (
                                <TableRow key={index}>
                                    {Array.from({ length: 6 }, (_, index) => (
                                        <TableCell key={index + 1}>
                                            <Skeleton className="h-6 rounded-md w-[140px]" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <TableFooterSkelton />
            </CardContent>
        </Card>
    );
};
