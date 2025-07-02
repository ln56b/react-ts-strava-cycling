import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AuthProvider from './providers/authProvider';
import PrivateRoute from './guards/privateRoute';
import Dashboard from './pages/dashboard';
import Signup from './components/layout/signup';
import { Toaster } from 'sonner';
import ThemeProvider from './providers/themeProvider';
import LoginToStrava from './components/layout/loginToStrava';
import DistanceRecords from './pages/distanceRecords';
import EddingtonFocus from './pages/eddingtonFocus';
import ActivitySummary from './pages/activitySummary';

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<ThemeProvider>
							<Toaster />
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/signup" element={<Signup />} />
								<Route element={<PrivateRoute />}>
									<Route path="/login-to-strava" element={<LoginToStrava />} />
									<Route path="/dashboard" element={<Dashboard />} />
									<Route
										path="/distance-records"
										element={<DistanceRecords />}
									/>
									<Route
										path="/activity-summary"
										element={<ActivitySummary />}
									/>
									<Route path="/eddington-focus" element={<EddingtonFocus />} />
								</Route>
							</Routes>
						</ThemeProvider>
					</AuthProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
