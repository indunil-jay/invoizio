import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/_components/ui/avatar";
import { fallbackUsername } from "@/app/_utils/fallback-username";
import { User } from "@/app/stores/user-store";

interface SidebarProfileAvatarProps {
    user: User;
}

export const SidebarProfileAvatar = ({ user }: SidebarProfileAvatarProps) => {
    return (
        <>
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "user image"}
                />
                <AvatarFallback className="rounded-lg">
                    {fallbackUsername(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
            </div>
        </>
    );
};
