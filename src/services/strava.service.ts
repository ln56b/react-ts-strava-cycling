const apiUrl = 'http://localhost:3000/api';

export const loadActivities = async () => {
	const tokenValid = await checkStravaTokensValidity();

	if (!tokenValid) {
		await refreshStravaTokens();
	}

	try {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			throw new Error('Access Token not found');
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
		throw new Error(res.message);
	} catch (err) {
		console.log('Error', err);
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
		throw new Error('Access Token not found');
	}
	const refreshToken = localStorage.getItem('refreshToken');
	if (!refreshToken) {
		throw new Error('Refresh token not found');
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
