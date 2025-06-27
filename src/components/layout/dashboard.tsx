import { useAuth } from '@/providers/authProvider';
import { loadActivities } from '@/services/strava.service';
import { authorizeStrava } from '@/services/users.service';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '../ui/button';
import { useTheme } from '@/providers/themeProvider';

export default function Dashboard() {
	const { loginToStravaAction, loggedInToStrava, logout } = useAuth();
	const { toggleTheme } = useTheme();
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
			{loggedInToStrava ? (
				<div>
					<Button onClick={loadStravaActivities}>Load activities</Button>
					<Button onClick={toggleTheme}>Toggle Theme</Button>
					<Button onClick={logout}>Logout</Button>
				</div>
			) : (
				<Button onClick={connectToStrava}>Connect To Strava</Button>
			)}
		</div>
	);
}
