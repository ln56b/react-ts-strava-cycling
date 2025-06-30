import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Activity } from '@/interfaces/strava';

interface ActivityState {
	activities: Activity[];
	loading: boolean;
	error: string | null;
}

export const activitiesInitialState: ActivityState = {
	activities: [],
	loading: false,
	error: null,
};

export const useActivitiesStore = create<ActivityState>()(
	process.env.NODE_ENV === 'development'
		? devtools(
				(set) => ({
					...activitiesInitialState,
					setActivities: (activities: Activity[]) => set({ activities }),
					setLoading: (loading: boolean) => set({ loading }),
					setError: (error: string | null) => set({ error }),
				}),
				{ name: 'ActivitiesStore' }
		  )
		: (set) => ({
				...activitiesInitialState,
				setActivities: (activities: Activity[]) => set({ activities }),
				setLoading: (loading: boolean) => set({ loading }),
				setError: (error: string | null) => set({ error }),
		  })
);
