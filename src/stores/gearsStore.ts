import { Gear } from '@/interfaces/strava';
import { loadGears } from '@/services/gears.service';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GearState {
  gears: Gear[];
  loading: boolean;
  error: string | null;
}

export interface GearActions {
  fetchGears: () => Promise<void>;
}

export const gearsInitialState: GearState = {
  gears: [],
  loading: false,
  error: null,
};

const createGearsStore = (set: (partial: Partial<GearState & GearActions>) => void) => ({
  gears: [],
  loading: false,
  error: null,
  fetchGears: async () => {
    set({ loading: true });
    const gears = await loadGears();
    set({ gears, loading: false });
  },
});

export const useGearsStore = create<GearState & GearActions>()(
  devtools(set => createGearsStore(set), { name: 'GearsStore' }),
);
