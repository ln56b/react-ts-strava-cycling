import Layout from '@/components/layout/layout';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const accessToken = localStorage.getItem('accessToken');
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
