import { Skeleton } from "@/app/_components/ui/skeleton";

export const TableFooterSkelton = () => {
    return (
        <div className="flex items-center justify-between px-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                <Skeleton className="h-8 rounded-md w-[160px]" />
            </div>

            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 rounded-md w-[120px]" />
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    <Skeleton className="h-8 rounded-md w-[80px]" />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className=" h-8 w-8 p-0 lg:flex" />
                    <Skeleton className=" h-8 w-8 p-0 lg:flex" />
                    <Skeleton className=" h-8 w-8 p-0 lg:flex" />
                    <Skeleton className=" h-8 w-8 p-0 lg:flex" />
                </div>
            </div>
        </div>
    );
};
