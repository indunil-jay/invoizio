import { Avatar } from "@/app/_components/ui/avatar";
import { Skeleton } from "@/app/_components/ui/skeleton";

export const SidebarProfileAvatarSkelton = () => {
    return (
        <>
            <Avatar className="h-8 w-8 rounded-lg">
                <Skeleton className="h-8 w-8 rounded-lg" />
            </Avatar>
            <div className="grid flex-1 text-left text-sm space-y-1">
                <Skeleton className="h-3  w-[85%]" />
                <Skeleton className="h-3 " />
            </div>
        </>
    );
};
