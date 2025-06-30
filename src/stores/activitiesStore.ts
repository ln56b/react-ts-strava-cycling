import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Activity } from '@/interfaces/strava';

interface ActivityState {
	activities: Activity[];
	loading: boolean;
	error: string | null;
}

const initialState: ActivityState = {
	activities: [],
	loading: false,
	error: null,
};

export const useActivitiesStore = create<ActivityState>()(
	devtools(
		(set) => ({
			...initialState,
			setActivities: (activities: Activity[]) => set({ activities }),
			setLoading: (loading: boolean) => set({ loading }),
			setError: (error: string | null) => set({ error }),
		}),
		{ name: 'ActivitiesStore' } // Optional name for the store in Redux DevTools
	)
);
