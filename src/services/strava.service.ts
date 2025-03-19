export const loadActivities = async (accessToken: string) => {
	try {
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
			console.log('loadActivities', res);
			return res;
		}
		throw new Error(res.message);
	} catch (err) {
		console.log('Error', err);
	}
};
