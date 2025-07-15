import { environment } from '../environments/environment';
export const authorizeStrava = async (stravaId: number) => {
	if (!stravaId) {
		throw new Error('Strava ID not found');
	}

	window.location.href = `https://www.strava.com/oauth/authorize?client_id=${environment.strava.clientId}&redirect_uri=${environment.uri}/dashboard&response_type=code&scope=read_all,activity:read_all,activity:write`;
};
