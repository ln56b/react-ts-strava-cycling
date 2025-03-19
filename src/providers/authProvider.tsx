import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState: AuthState = {
	accessToken: null,
	refreshToken: null,
	stravaId: null,
	stravaToken: null,
	loginAction: () => {},
	signupAction: () => {},
	loginToStravaAction: () => {},
};
interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	stravaId: number | null;
	stravaToken: string | null;
	loginAction: (email: string, password: string) => void;
	signupAction: (
		email: string,
		password: string,
		stravaId: number,
		stravaToken: string
	) => void;
	loginToStravaAction: (stravaCode: string) => void;
}

const AuthContext = createContext<AuthState | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const apiUrl = 'http://localhost:3000/api';

	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);
	const [stravaId, setStravaId] = useState<number | null>(null);
	const [stravaToken, setStravaToken] = useState<string | null>(null);

	const navigate = useNavigate();

	const signupAction = async (
		email: string,
		password: string,
		stravaId: number,
		stravaToken: string
	) => {
		try {
			const response = await fetch(`${apiUrl}/auth/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
					strava_id: stravaId,
					strava_token: stravaToken,
				}),
			});

			const res = await response.json();
			if (res.data) {
				setAccessToken(res.data.access_token);
				setStravaId(stravaId);
				localStorage.setItem('accessToken', res.data.access_token);

				navigate('/dashboard');
				return;
			}
			throw new Error(res.message);
		} catch (err) {
			console.log('Error', err);
		}
	};

	const loginAction = async (email: string, password: string) => {
		try {
			const loginResponse = await fetch(`${apiUrl}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const loginRes = await loginResponse.json();

			if (loginRes) {
				setAccessToken(loginRes.access_token);
				localStorage.setItem('accessToken', loginRes.access_token);

				const stravaIdResponse = await fetch(`${apiUrl}/users`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${loginRes.access_token}`,
					},
				});

				const stravaIdRes = await stravaIdResponse.json();

				if (stravaIdRes) {
					console.log('stravaId res', stravaIdRes);
					setStravaId(stravaIdRes.strava_id);
				}

				navigate('/dashboard');
				return;
			}
			throw new Error(loginRes.message);
		} catch (err) {
			console.log('Error', err);
		}
	};

	const loginToStravaAction = async (code: string) => {
		try {
			const response = await fetch(`${apiUrl}/users/strava-token`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code }),
			});

			const res = await response.json();
			if (res) {
				console.log('loginToStravaAction', res);
				setStravaToken(res.access_token);
				localStorage.setItem('stravaToken', res.access_token);

				return;
			}
			throw new Error(res.message);
		} catch (err) {
			console.log('Error', err);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				accessToken,
				refreshToken,
				stravaId,
				stravaToken,
				signupAction,
				loginAction,
				loginToStravaAction,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const UseAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
