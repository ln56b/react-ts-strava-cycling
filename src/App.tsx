import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AuthProvider from './providers/authProvider';
import PrivateRoute from './guards/privateRoute';
import Dashboard from './components/layout/dashboard';
import Signup from './components/layout/signup';
import { Toaster } from 'sonner';
import ThemeProvider from './providers/themeProvider';

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
									<Route path="/dashboard" element={<Dashboard />} />
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
