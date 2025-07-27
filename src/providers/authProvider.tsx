import { login, signup } from '@/services/auth.service';
import { postStravaToken } from '@/services/users.service';
import { activitiesInitialState, useActivitiesStore } from '@/stores/activitiesStore';
import { userInitialState, useUserStore } from '@/stores/userStore';
import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  loggedInToStrava: boolean;
  loginAction: (email: string, password: string) => void;
  signupAction: (email: string, password: string) => void;
  loginToStravaAction: (stravaCode: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loggedInToStrava, setLoggedInToStrava] = useState<boolean>(false);
  const isLoggingToStravaRef = useRef<boolean>(false);
  const navigate = useNavigate();

  const signupAction = useCallback(
    async (email: string, password: string) => {
      const response = await signup(email, password);

      const res = await response;
      setAccessToken(res.access_token);
      localStorage.setItem('accessToken', res.access_token);
      localStorage.setItem('loggedInToStrava', 'false');

      navigate('/login-to-strava');
      toast.success('Welcome to the app!');
      return;
    },
    [navigate],
  );

  const loginAction = useCallback(
    async (email: string, password: string) => {
      const loginResponse = await login(email, password);

      const res = await loginResponse;
      localStorage.setItem('theme', res.theme);
      localStorage.setItem('accessToken', res.access_token);
      localStorage.setItem('loggedInToStrava', 'false');

      navigate('/login-to-strava');
      toast.success('Welcome back!');
      return;
    },
    [navigate],
  );

  const loginToStravaAction = useCallback(async (code: string) => {
    if (!code) return;
    if (isLoggingToStravaRef.current) return;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      toast.error('You are not identified');
    }
    isLoggingToStravaRef.current = true;
    const response = await postStravaToken(code);

    const res = await response;
    isLoggingToStravaRef.current = false;
    if (res.access_token) {
      setLoggedInToStrava(true);
      setAccessToken(res.access_token);
      setRefreshToken(res.refresh_token);
      localStorage.setItem('loggedInToStrava', 'true');
      localStorage.setItem('tokenExpiresAt', res.expires_at);
      localStorage.setItem('stravaCode', code);
      localStorage.setItem('accessToken', res.access_token);
      localStorage.setItem('refreshToken', res.refresh_token);
      toast.success('Successfully connected to Strava!');

      useUserStore.getState().setUsername();
      // One single initial fetch of all activities
      useActivitiesStore.getState().fetchActivities();
      return;
    } else {
      toast.error(res.message);
    }
  }, []);

  const clearUserData = useCallback(() => {
    // Local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiresAt');
    localStorage.removeItem('stravaCode');
    localStorage.removeItem('loggedInToStrava');
    localStorage.removeItem('theme');
    // Zustand
    useActivitiesStore.setState(activitiesInitialState);
    useUserStore.setState(userInitialState);

    // Context APi
    setAccessToken(null);
    setRefreshToken(null);
    setLoggedInToStrava(false);
  }, []);

  const logout = useCallback(() => {
    clearUserData();
    navigate('/');
  }, [clearUserData, navigate]);

  const contextValue = useMemo(
    () => ({
      accessToken,
      refreshToken,
      loggedInToStrava,
      signupAction,
      loginAction,
      loginToStravaAction,
      logout,
    }),
    [accessToken, refreshToken, loggedInToStrava, signupAction, loginAction, loginToStravaAction, logout],
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
