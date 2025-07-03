import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Activity } from '@/interfaces/strava';
import { loadActivities } from '@/services/strava.service';
import { toEpoch } from '@/utils/utils';
import { DateRange } from 'react-day-picker';

export interface ActivityState {
	activities: Activity[];
	loading: boolean;
	error: string | null;
}

interface ActivitiesStore extends ActivityState {
	fetchActivities: (selectedDateRange: DateRange) => Promise<void>;
}

export const activitiesInitialState: ActivityState = {
	activities: [],
	loading: true,
	error: null,
};

const createActivitiesStore = (
	set: (partial: Partial<ActivitiesStore>) => void
) => ({
	...activitiesInitialState,
	fetchActivities: async (selectedDateRange: DateRange) => {
		const activities = await loadActivities({
			after: toEpoch(selectedDateRange.from!),
			before: toEpoch(selectedDateRange.to!),
		});
		set({ activities, loading: false });
	},
	setLoading: (loading: boolean) => set({ loading }),
	setError: (error: string | null) => set({ error }),
});

export const useActivitiesStore = create<ActivitiesStore>()(
	process.env.NODE_ENV === 'development'
		? devtools((set) => createActivitiesStore(set), { name: 'ActivitiesStore' })
		: (set) => createActivitiesStore(set)
);
