import { Skeleton } from "@/app/_components/ui/skeleton";

export const ListItem2LineSkelton = () => {
    return (
        <li className="space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[70%]" />
        </li>
    );
};
