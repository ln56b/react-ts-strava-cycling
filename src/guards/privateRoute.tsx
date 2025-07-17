import Layout from '@/components/layout/layout';
import { useTheme } from '@/providers/themeProvider';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const accessToken = localStorage.getItem('accessToken');

	const {  getUserTheme } = useTheme();

	useEffect(() => {
		getUserTheme();
	}, [getUserTheme]);

	if (!accessToken) return <Navigate to="/" />;
	return (
		<>
			<Layout>
				<Outlet />
			</Layout>
		</>
	);
};

export default PrivateRoute;
