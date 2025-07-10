import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Activity, SportType } from '@/interfaces/strava';
import { loadActivities } from '@/services/strava.service';

export interface ActivityState {
	activities: Activity[];
	loading: boolean;
	error: string | null;
}

interface ActivitiesStore extends ActivityState {
	fetchActivities: () => Promise<void>;
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
	fetchActivities: async () => {
		const allActivities = await loadActivities();
		const rideSports = [
			SportType.Ride,
			SportType.GravelRide,
			SportType.VirtualRide,
		];
		const rides = allActivities?.filter((activity) =>
			rideSports.includes(activity?.type as SportType)
		);

		set({ activities: rides, loading: false });
	},
	setLoading: (loading: boolean) => set({ loading }),
	setError: (error: string | null) => set({ error }),
});

export const useActivitiesStore = create<ActivitiesStore>()(
	process.env.NODE_ENV === 'development'
		? devtools((set) => createActivitiesStore(set), { name: 'ActivitiesStore' })
		: (set) => createActivitiesStore(set)
);
