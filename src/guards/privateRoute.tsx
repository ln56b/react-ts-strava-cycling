import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const accessToken = localStorage.getItem('accessToken');
	if (!accessToken) return <Navigate to="/" />;
	return <Outlet />;
};

export default PrivateRoute;
