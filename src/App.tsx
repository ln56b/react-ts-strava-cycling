import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AuthProvider from './providers/authProvider';
import PrivateRoute from './guards/privateRoute';
import Dashboard from './components/layout/dashboard';

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route element={<PrivateRoute />}>
								<Route path="/dashboard" element={<Dashboard />} />
							</Route>
						</Routes>
					</AuthProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
