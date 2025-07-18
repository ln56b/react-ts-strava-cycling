import StravaContainer from '@/components/layout/stravaContainer';
import { useTheme } from '@/providers/themeProvider';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const StravaRoute = () => {
	const loggedInToStrava = localStorage.getItem('loggedInToStrava');

	const {  getUserTheme } = useTheme();

	useEffect(() => {
		getUserTheme();
	}, [getUserTheme]);

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
