import { toast } from 'sonner';

const apiUrl = 'http://localhost:3000/api';

export const loadActivities = async () => {
	const tokenValid = await checkStravaTokensValidity();

	if (!tokenValid) {
		await refreshStravaTokens();
	}

	const accessToken = localStorage.getItem('accessToken');
	if (!accessToken) {
		toast.error('You are not identified');
		return;
	}

	const response = await fetch(
		`https://www.strava.com/api/v3/athlete/activities`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	const res = await response.json();
	if (res) {
		return res;
	}
	toast.error(res.message);
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
