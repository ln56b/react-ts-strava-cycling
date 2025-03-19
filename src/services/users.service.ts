import { environment } from '../environments/environment';
export const authorizeStrava = async (stravaId: number) => {
	console.log('stravaId', stravaId);

	if (!stravaId) {
		throw new Error('Strava ID not found');
	}

	window.location.href = `https://www.strava.com/oauth/authorize?client_id=${stravaId}&redirect_uri=${environment.uri}/dashboard&response_type=code&scope=read_all,activity:read_all,activity:write`;
};
