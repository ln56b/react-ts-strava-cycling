import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	loggedInToStrava: boolean;
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
	const [loggedInToStrava, setLoggedInToStrava] = useState<boolean>(false);
	const isLoggingToStravaRef = useRef<boolean>(false);
	const navigate = useNavigate();

	const signupAction = useCallback(
		async (
			email: string,
			password: string,
			stravaId: number,
			stravaSecret: string
		) => {
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
			if (res.access_token) {
				setAccessToken(res.access_token);
				setRefreshToken(res.refresh_token);
				localStorage.setItem('accessToken', res.access_token);
				localStorage.setItem('refreshToken', res.refresh_token);

				navigate('/dashboard');
				toast.success('Welcome to the app!');
				return;
			} else {
				toast.error(res.message);
			}
		},
		[navigate]
	);

	const loginAction = useCallback(
		async (email: string, password: string) => {
			const loginResponse = await fetch(`${apiUrl}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const res = await loginResponse.json();

			if (res.access_token) {
				localStorage.setItem('accessToken', res.access_token);

				const stravaIdResponse = await fetch(`${apiUrl}/users`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${res.access_token}`,
					},
				});

				const stravaIdRes = await stravaIdResponse.json();

				if (stravaIdRes) {
					localStorage.setItem('stravaId', stravaIdRes.strava_id);
				}

				navigate('/dashboard');
				toast.success('Welcome back!');
				return;
			} else {
				toast.error(res.message);
			}
		},
		[navigate]
	);

	const loginToStravaAction = useCallback(
		async (code: string) => {
			if (!code) return;
			if (isLoggingToStravaRef.current) return;

			const accessToken = localStorage.getItem('accessToken');
			if (!accessToken) {
				toast.error('You are not identified');
			}
			isLoggingToStravaRef.current = true;
			const response = await fetch(`${apiUrl}/users/strava-token`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({ code }),
			});
			const res = await response.json();
			isLoggingToStravaRef.current = false;
			if (res.access_token) {
				setAccessToken(res.access_token);
				setRefreshToken(res.refresh_token);
				localStorage.setItem('tokenExpiresAt', res.expires_at);
				localStorage.setItem('stravaCode', code);
				localStorage.setItem('accessToken', res.access_token);
				localStorage.setItem('refreshToken', res.refresh_token);
				setLoggedInToStrava(true);
				toast.success('Successfully connected to Strava!');
				return;
			} else {
				toast.error(res.message);
			}
		},
		[apiUrl]
	);

	const contextValue = useMemo(
		() => ({
			accessToken,
			refreshToken,
			loggedInToStrava,
			signupAction,
			loginAction,
			loginToStravaAction,
		}),
		[
			accessToken,
			refreshToken,
			loggedInToStrava,
			signupAction,
			loginAction,
			loginToStravaAction,
		]
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
