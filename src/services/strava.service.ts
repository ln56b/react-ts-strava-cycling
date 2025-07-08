import { Activity } from '@/interfaces/strava';
import { useActivitiesStore } from '@/stores/activitiesStore';
import { environment } from '@/environments/environment';
import { toast } from 'sonner';

const apiUrl = environment.apiUrl;

export const loadActivities = async (): Promise<Activity[] | undefined> => {
	const tokenValid = await checkStravaTokensValidity();

	if (!tokenValid) {
		await refreshStravaTokens();
	}

	const accessToken = localStorage.getItem('accessToken');
	if (!accessToken) {
		toast.error('You are not identified');
		return;
	}

	let page = 1;
	const per_page = 10
	const apiRequests = [];
	const apiResponses = [];

	const queryParams = new URLSearchParams({
		page: page.toString(),
		per_page: per_page.toString()
	});

	const url = `https://www.strava.com/api/v3/athlete/activities?${queryParams.toString()}`;

	try {
		const firstResponse = await fetch(`${url}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	
		const firstRes = await firstResponse.json();
		apiResponses.push(...firstRes);
	
		const nextPage = firstRes.length > per_page -1;
	
		if (nextPage) {
			queryParams.set('page', page.toString());
		}
	
		while (nextPage) {
			page++;
			console.log('fetching next page', page);
			apiRequests.push(fetch(`${url}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}).then(res => res.json()).catch(err => {
				toast.error(err.message);
			}) )
		}
	
		const restData = await Promise.all(apiRequests);
		const res = [...apiResponses, ...restData];
	
		if (res) {
			useActivitiesStore.setState({ activities: res });
			return res;
		}
	} catch (err: any) {
		toast.error(err.message);
	}
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

const refreshStravaTokens = async () => {
	const accessToken = localStorage.getItem('accessToken');
	if (!accessToken) {
		toast.error('You are not identified');
		return;
	}
	const refreshToken = localStorage.getItem('refreshToken');
	if (!refreshToken) {
		toast.error('You are not identified');
		return;
	}

	try {
		const response = await fetch(`${apiUrl}/users/strava-refresh-tokens`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({ refreshToken }),
		});

		const res = await response.json();
		if (res) {
			const { access_token, refresh_token, expires_at } = res;
			localStorage.setItem('accessToken', access_token);
			localStorage.setItem('refreshToken', refresh_token);
			localStorage.setItem('tokenExpiresAt', expires_at);
			return res;
		}
		throw new Error(res.message);
	} catch (err) {
		console.log('Error', err);
	}
};
