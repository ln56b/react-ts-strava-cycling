import { Theme } from '@/interfaces/project';
import { getUser } from '@/services/users.service';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UserState {
  theme: Theme;
  username: string;
  lastLogin: string;
  loading: boolean;
  error: string | null;
}

export interface UserActions {
  setTheme: (theme: Theme) => void;
  setUsername: () => Promise<void>;
}

export const userInitialState: UserState = {
  theme: Theme.Dark,
  username: '',
  lastLogin: '',
  loading: false,
  error: null,
};

const createUserStore = (set: (partial: Partial<UserState & UserActions>) => void) => ({
  theme: Theme.Dark,
  username: '',
  lastLogin: '',
  loading: false,
  error: null,
  setTheme: (theme: Theme) => set({ theme }),
  setUsername: async () => {
    const user = await getUser();
    set({ username: user.username ?? '' });
  },
});

export const useUserStore = create<UserState & UserActions>()(
  devtools(set => createUserStore(set), { name: 'UserStore' }),
);
