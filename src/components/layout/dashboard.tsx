import { UseAuth } from '@/providers/authProvider';
import { use, useEffect } from 'react';
import { Button } from '../ui/button';
import { authorizeStrava } from '@/services/users.service';
import { useSearchParams } from 'react-router-dom';
import { loadActivities } from '@/services/strava.service';

export default function Dashboard() {
	const auth = UseAuth();
	const [searchParams] = useSearchParams();
	const { stravaToken } = auth;

	useEffect(() => {
		const code = searchParams.get('code');
		console.log('Dashboard component mounted', code);
		if (code) auth.loginToStravaAction(code);
	});

	const connectToStrava = () => {
		if (!auth.stravaId) {
			throw new Error('Strava ID not found');
		}
		authorizeStrava(auth.stravaId);
	};

	const loadStravaActivities = () => {
		const token = stravaToken;
		if (!token) {
			throw new Error('Strava Token not found');
		}
		loadActivities(token);
	};

	return (
		<div>
			Dashboard component works
			<Button onClick={connectToStrava}>Connect To Strava</Button>
			<Button onClick={loadStravaActivities}>Load activities</Button>
		</div>
	);
}
