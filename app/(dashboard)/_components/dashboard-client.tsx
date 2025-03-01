"use client";

import { User, useUserStore } from "@/app/stores/user-store";
import { useEffect } from "react";

interface DashboardClientProps {
    user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
    const setUser = useUserStore((state) => state.setUser);
    const currentUser = useUserStore((state) => state.user);
    const setLoading = useUserStore((state) => state.setLoading);

    useEffect(() => {
        if (!currentUser) {
            setLoading(true);
            setUser(user); // Only hydrate Zustand if it’s empty
            setLoading(false);
        }
    }, [user, setUser, currentUser]);

    return null;
}
