import { create } from "zustand";

export interface IUserInfo {
    name: string;
    email: string;
    role: string;
}

interface UserInfoState {
    user: IUserInfo | null;
    setUser: (user: IUserInfo) => void;
    clearUser: () => void;
}

const useUserInfo = create<UserInfoState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

export default useUserInfo;