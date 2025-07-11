import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Activity, rideSports, SportTypes } from '@/interfaces/strava';
import { loadActivities } from '@/services/strava.service';
import { lastFourWeeksDay } from '@/utils/utils';
import { Filters } from '@/interfaces/project';

export interface ActivityState {
	cyclingRides: Activity[];
	filters: Filters;
	loading: boolean;
	error: string | null;
}

interface ActivityActions {
	fetchActivities: (year?: string) => Promise<void>;
	setFilters: (filters: Filters) => void;
}

export const activitiesInitialState: ActivityState = {
	cyclingRides: [],
	filters: {
		sport: 'cycling',
		dates: {
			from: lastFourWeeksDay(),
			to: new Date().toISOString(),
		},
	},
	loading: true,
	error: null,
};

const createActivitiesStore = (
	set: (partial: Partial<ActivityState & ActivityActions>) => void
) => ({
	...activitiesInitialState,
	fetchActivities: async (year: string) => {
		const allActivities = await loadActivities(year);

		const rides = allActivities?.filter((activity) =>
			rideSports.includes(activity?.type as SportTypes)
		);

		set({ cyclingRides: rides, loading: false });
	},
	setFilters: (filters: Filters) => set({ filters }),
	setLoading: (loading: boolean) => set({ loading }),
	setError: (error: string | null) => set({ error }),
});

export const useActivitiesStore = create<ActivityState & ActivityActions>()(
	devtools((set) => createActivitiesStore(set), { name: 'ActivitiesStore' })
);
