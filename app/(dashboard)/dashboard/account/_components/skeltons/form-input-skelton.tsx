import { Skeleton } from "@/app/_components/ui/skeleton";

export const FormInputSkelton = () => {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className={" h-9 w-full rounded-md shadow-sm"} />
        </div>
    );
};
