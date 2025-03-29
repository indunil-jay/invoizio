import { Skeleton } from "@/app/_components/ui/skeleton";

export const TableHeaderSkelton = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Skeleton className="flex h-9  w-[250px] lg:w-[350px]  rounded-md" />
                <Skeleton className="h-8 w-[120px]" />
            </div>
            <div className="flex gap-3 items-center">
                <Skeleton className="h-8 w-[120px]" />
                <Skeleton className="h-8 w-[140px]" />
            </div>
        </div>
    );
};
