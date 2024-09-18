import { StateCreator } from 'zustand';

type UserState = {
    userName: string;
    fullName: string;
    age: number;
    address: string;
};

type UserAction = {
    setAddress: (address: string) => void;
    fecthUser: () => Promise<void>;
};
export type UserSlice = UserState & UserAction;

export const createUserSlice: StateCreator<
    UserSlice,
    [['zustand/immer', never]],
    [],
    UserSlice
> = (set) => ({
    address: '',
    age: 0,
    fullName: '',
    userName: '',
    setAddress: (address) =>
        set((state) => {
            state.address = address;
        }),
    fecthUser: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
            address: '',
            fullName: 'Mari',
            userName: 'mare@test.com',
            age: 30,
        });
    },
});
