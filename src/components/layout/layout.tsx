import { useAuth } from '@/providers/authProvider';
import { useTheme } from '@/providers/themeProvider';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { logout } = useAuth();
	const { toggleTheme } = useTheme();

	return (
		<div className="p-4">
			<div className="flex items-center justify-end gap-2">
				<Switch onClick={toggleTheme}>Toggle Theme</Switch>
				<Button variant="outline" onClick={logout}>
					Logout
				</Button>
			</div>
			{children}
		</div>
	);
}
