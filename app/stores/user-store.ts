import { create } from "zustand";

interface UserCoverImage {
    url: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: string;
    image: string;
    userCoverImages: UserCoverImage | null;
}

export type UserState = {
    user: User | null;
    isLoading: boolean;
};

export type UserActions = {
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    updateUserProperty: <K extends keyof User>(key: K, value: User[K]) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
    user: null,
    isLoading: false,
};

export const useUserStore = create<UserStore>()((set) => ({
    ...defaultInitState,
    setUser: (user: User | null) =>
        set(() => ({ user: user ? { ...user } : null })),
    setLoading: (loading: boolean) => set({ isLoading: loading }),
    updateUserProperty: (key, value) =>
        set((state) => ({
            user: state.user ? { ...state.user, [key]: value } : null,
        })),
}));
