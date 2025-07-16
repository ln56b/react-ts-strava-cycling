import StravaContainer from '@/components/layout/stravaContainer';
import { Outlet } from 'react-router-dom';

const StravaRoute = () => {
	// TODO: check if user is logged in to Strava
	return (
		<StravaContainer>
			<Outlet />
		</StravaContainer>
	);
};

export default StravaRoute;
