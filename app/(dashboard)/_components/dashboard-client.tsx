"use client";

import { User, useUserStore } from "@/app/stores/user-store";
import { useEffect } from "react";

interface DashboardClientProps {
    user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
    const setUser = useUserStore((state) => state.setUser);
    const setLoading = useUserStore((state) => state.setLoading);

    useEffect(() => {
        // Set loading to true when starting to fetch user data
        setLoading(true);

        if (user) {
            setUser(user);
        }

        // After setting the user, set loading to false
        setLoading(false);
    }, [user, setUser, setLoading]);

    return null;
}
