import { useAuth } from '@/providers/authProvider';
import { loadActivities } from '@/services/strava.service';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '../ui/button';

export default function Dashboard() {
	const { loginToStravaAction } = useAuth();

	const [searchParams] = useSearchParams();

	useEffect(() => {
		const code = searchParams.get('code');
		if (code) loginToStravaAction(code);
	}, [searchParams, loginToStravaAction]);

	const loadStravaActivities = () => {
		loadActivities();
	};

	return (
		<div className="flex justify-center items-center my-[100px] mx-0">
			<Button onClick={loadStravaActivities}>Load activities</Button>
		</div>
	);
}
