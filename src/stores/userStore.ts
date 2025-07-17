import { Theme } from '@/interfaces/project';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UserState {
	theme: Theme;
	lastLogin: string;
	loading: boolean;
	error: string | null;
}

export interface UserActions {
	setTheme: (theme: Theme) => void;
}

export const userInitialState: UserState = {
	theme: Theme.Dark,
	lastLogin: '',
	loading: false,
	error: null,
};

const createUserStore = (
	set: (partial: Partial<UserState & UserActions>) => void
) => ({
	theme: Theme.Dark,
	lastLogin: '',
	loading: false,
	error: null,
	setTheme: (theme: Theme) => set({ theme }),
});

export const useUserStore = create<UserState & UserActions>()(
	devtools((set) => createUserStore(set), { name: 'UserStore' })
);
