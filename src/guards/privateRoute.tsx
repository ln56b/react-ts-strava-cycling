import { Navigate, Outlet } from 'react-router-dom';
import { UseAuth } from '../providers/authProvider';

const PrivateRoute = () => {
	const { accessToken } = UseAuth();
	if (!accessToken) return <Navigate to="/login" />;
	return <Outlet />;
};

export default PrivateRoute;
