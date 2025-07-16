import { Activity } from '@/interfaces/strava';
import { useActivitiesStore } from '@/stores/activitiesStore';
import { environment } from '@/environments/environment';
import { toast } from 'sonner';
import * as userService from './users.service';

export const loadActivities = async (
	year: string
): Promise<Activity[] | undefined> => {
	const tokenValid = await checkStravaTokensValidity();
	if (!tokenValid) await userService.refreshStravaTokens();

	const accessToken = localStorage.getItem('accessToken');
	if (!accessToken) {
		toast.error('You are not identified');
		return;
	}

	let page = 1;
	const per_page = 200;
	const allActivities: Activity[] = [];

	try {
		while (true) {
			const queryParams = new URLSearchParams({
				page: page.toString(),
				per_page: per_page.toString(),
				start_date_local: `${year}-01-01T00:00:00Z`,
				end_date_local: `${year}-12-31T23:59:59Z`,
			});
			const url = `https://www.strava.com/api/v3/athlete/activities?${queryParams.toString()}`;

			const res = await fetch(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const data: Activity[] = await res.json();

			if (!Array.isArray(data)) {
				throw new Error('Invalid response from Strava API');
			}

			allActivities.push(...data);

			if (data.length < per_page) break;

			page++;
		}

		useActivitiesStore.setState({ cyclingRides: allActivities });
		return allActivities;
		/* eslint-disable @typescript-eslint/no-explicit-any */
	} catch (err: any) {
		toast.error(err.message);
	}
};

export const authorizeStrava = async () => {
	if (!environment.strava.clientId) {
		throw new Error('Strava client ID not found');
	}

	window.location.href = `https://www.strava.com/oauth/authorize?client_id=${environment.strava.clientId}&redirect_uri=${environment.uri}/dashboard&response_type=code&scope=read_all,activity:read_all,activity:write`;
};

const checkStravaTokensValidity = async () => {
	const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');

	if (!tokenExpiresAt) return false;
	const now = new Date();
	const tokenExpiresAtDate = new Date(Number(tokenExpiresAt) * 1000);
	if (tokenExpiresAtDate < now) {
		return false;
	}
	return true;
};
