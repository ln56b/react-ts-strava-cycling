import { Button } from '../ui/button';
import { authorizeStrava } from '@/services/users.service';
import { loadActivities } from '@/services/strava.service';
import { useAuth } from '@/providers/authProvider';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';

export default function Dashboard() {
	const { loginToStravaAction } = useAuth();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const code = searchParams.get('code');
		if (code) loginToStravaAction(code);
	}, [searchParams, loginToStravaAction]);

	const connectToStrava = () => {
		const stravaId = localStorage.getItem('stravaId');
		if (!stravaId) {
			throw new Error('Strava ID not found');
		}
		authorizeStrava(Number(stravaId));
	};

	const loadStravaActivities = () => {
		loadActivities();
	};

	return (
		<div>
			Dashboard component works
			<Button onClick={connectToStrava}>Connect To Strava</Button>
			<Button onClick={loadStravaActivities}>Load activities</Button>
		</div>
	);
}
