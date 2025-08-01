"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Business } from "@/app/stores/business-store";
import { DataTableViewOptions } from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_components/table/components/data-table-view-options";
import { DataTableFacetedFilter } from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_components/table/components/data-table-faceted-filter";
import { invoiceStatus } from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_components/table//data/data";
import { CreateInvoice } from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_components/create-invoice";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    business: Business;
}

export function DataTableToolbar<TData>({
    table,
    business,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="search customer enter name or email..."
                    value={
                        (table
                            .getColumn("client")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("client")
                            ?.setFilterValue(event.target.value)
                    }
                    className="flex h-10  w-[250px] lg:w-[350px]  rounded-md"
                />

                {table.getColumn("statusId") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("statusId")}
                        title="Status"
                        options={invoiceStatus}
                    />
                )}

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X />
                    </Button>
                )}
            </div>
            <div className="flex gap-3 items-center">
                <DataTableViewOptions table={table} />
                <CreateInvoice business={business} />
            </div>
        </div>
    );
}
