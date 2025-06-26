import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	loginAction: (email: string, password: string) => void;
	signupAction: (
		email: string,
		password: string,
		stravaId: number,
		stravaSecret: string
	) => void;
	loginToStravaAction: (stravaCode: string) => void;
}

const AuthContext = createContext<AuthState | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const apiUrl = 'http://localhost:3000/api';

	const [accessToken, setAccessToken] = useState<string | null>(
		localStorage.getItem('accessToken')
	);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);

	const navigate = useNavigate();

	const signupAction = useCallback(
		async (
			email: string,
			password: string,
			stravaId: number,
			stravaSecret: string
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
						strava_secret: stravaSecret,
					}),
				});

				const res = await response.json();
				if (res.data) {
					setAccessToken(res.data.access_token);
					setRefreshToken(res.data.refresh_token);
					localStorage.setItem('accessToken', res.data.access_token);
					localStorage.setItem('refreshToken', res.data.refresh_token);

					navigate('/dashboard');
					return;
				}
				throw new Error(res.message);
			} catch (err) {
				console.log('Error', err);
			}
		},
		[navigate]
	);

	const loginAction = useCallback(
		async (email: string, password: string) => {
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
						localStorage.setItem('stravaId', stravaIdRes.strava_id);
					}

					navigate('/dashboard');
					return;
				}
				throw new Error(loginRes.message);
			} catch (err) {
				console.log('Error', err);
			}
		},
		[navigate]
	);

	const loginToStravaAction = useCallback(
		async (code: string) => {
			if (!code) return;

			try {
				const accessToken = localStorage.getItem('accessToken');
				if (!accessToken) {
					throw new Error('Access Token not found');
				}
				const response = await fetch(`${apiUrl}/users/strava-token`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({ code }),
				});
				const res = await response.json();
				if (res.access_token) {
					setAccessToken(res.access_token);
					setRefreshToken(res.refresh_token);
					localStorage.setItem('tokenExpiresAt', res.expires_at);
					localStorage.setItem('stravaCode', code);
					localStorage.setItem('accessToken', res.access_token);
					localStorage.setItem('refreshToken', res.refresh_token);

					return;
				}
				throw new Error(res.message);
			} catch (err) {
				console.log('Error', err);
			}
		},
		[apiUrl]
	);

	const contextValue = useMemo(
		() => ({
			accessToken,
			refreshToken,
			signupAction,
			loginAction,
			loginToStravaAction,
		}),
		[accessToken, refreshToken, signupAction, loginAction, loginToStravaAction]
	);

	return <AuthContext value={contextValue}>{children}</AuthContext>;
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
