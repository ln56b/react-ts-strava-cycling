import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ActivityType, DateSection, Filters } from '@/interfaces/project';
import { Activity } from '@/interfaces/strava';
import { loadActivities } from '@/services/activities.service';
import {
  firstDayOfYear,
  getCurrentYear,
  lastDayOfYear,
  lastFourWeeksMonday,
  sameDayInPreviousYear,
} from '@/utils/utils';

export interface ActivityState {
  activities: Activity[];
  selectedSport: ActivityType;
  filters: Filters;
  loading: boolean;
  error: string | null;
}

interface ActivityActions {
  fetchActivities: () => Promise<void>;
  setFilters: (filters: Filters) => void;
}

export const activitiesInitialState: ActivityState = {
  activities: [],
  selectedSport: 'cycling',
  filters: {
    [DateSection.PastFourWeeks]: {
      dates: {
        from: lastFourWeeksMonday(),
        to: new Date().toISOString(),
      },
    },
    [DateSection.FullYear]: {
      dates: {
        from: sameDayInPreviousYear(getCurrentYear()),
        to: new Date().toISOString(),
      },
    },
    [DateSection.CalendarYear]: {
      dates: {
        from: firstDayOfYear(getCurrentYear()),
        to: lastDayOfYear(getCurrentYear()),
      },
    },
  },
  loading: true,
  error: null,
};

const createActivitiesStore = (set: (partial: Partial<ActivityState & ActivityActions>) => void) => ({
  ...activitiesInitialState,
  fetchActivities: async () => {
    const allActivities = await loadActivities();

    set({ activities: allActivities, loading: false });
  },
  setFilters: (filters: Filters) => set({ filters }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
});

export const useActivitiesStore = create<ActivityState & ActivityActions>()(
  persist(
    devtools(set => createActivitiesStore(set), { name: 'ActivitiesStore' }),
    {
      name: 'activities',
    },
  ),
);
