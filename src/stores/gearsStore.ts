import { Gear } from '@/interfaces/strava';
import { deleteGear, loadGears, updateGear } from '@/services/gears.service';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GearState {
  gears: Gear[];
  loading: boolean;
  error: string | null;
}

export interface GearActions {
  fetchGears: () => Promise<void>;
  updateOneGear: (partialGear: Partial<Gear>) => Promise<void>;
  deleteOneGear: (gearUuid: string) => Promise<void>;
}

export const gearsInitialState: GearState = {
  gears: [],
  loading: false,
  error: null,
};

const createGearsStore = (
  set: (partial: Partial<GearState & GearActions>) => void,
  get: () => GearState & GearActions,
) => ({
  gears: [],
  loading: false,
  error: null,
  fetchGears: async () => {
    set({ loading: true });
    const gears = await loadGears();
    return set({ gears, loading: false });
  },
  updateOneGear: async (partialGear: Partial<Gear>) => {
    const updatedGear = await updateGear(partialGear);
    if (!updatedGear) return;
    const gears = get().gears.filter(gear => gear.uuid !== partialGear.uuid);
    return set({ gears: [...gears, updatedGear], loading: false });
  },
  deleteOneGear: async (gearUuid: string) => {
    await deleteGear(gearUuid);
    const gears = get().gears.filter(gear => gear.uuid !== gearUuid);
    console.log(gears.length);
    return set({ gears, loading: false });
  },
});

export const useGearsStore = create<GearState & GearActions>()(
  devtools((set, get) => createGearsStore(set, get), { name: 'GearsStore' }),
);
