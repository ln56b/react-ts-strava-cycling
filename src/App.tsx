import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import LoginToStrava from './components/layout/loginToStrava';
import Signup from './components/layout/signup';
import PrivateRoute from './guards/privateRoute';
import Dashboard from './pages/dashboard';
import Hikes from './pages/hikes';
import Home from './pages/home';
import Rides from './pages/rides';
import Runs from './pages/runs';
import AuthProvider from './providers/authProvider';
import ThemeProvider from './providers/themeProvider';
import StravaRoute from './guards/stravaRoute';

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
									<Route element={<StravaRoute />}>
										<Route path="/dashboard" element={<Dashboard />} />
										<Route path="/rides" element={<Rides />} />
										<Route path="/hikes" element={<Hikes />} />
										<Route path="/runs" element={<Runs />} />
									</Route>
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
