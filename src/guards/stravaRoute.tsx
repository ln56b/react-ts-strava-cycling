import StravaContainer from '@/components/layout/stravaContainer';
import { Navigate, Outlet } from 'react-router-dom';

const StravaRoute = () => {
	const loggedInToStrava = localStorage.getItem('loggedInToStrava');

	

	if (!loggedInToStrava) {
		return <Navigate to="/login-to-strava" />;
	}

	return (
		<StravaContainer>
			<Outlet />
		</StravaContainer>
	);
};

export default StravaRoute;
