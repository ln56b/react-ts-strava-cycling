import { useTheme } from '@/providers/themeProvider';
import { Link } from 'react-router';

const MenuIcon = ({
	icon,
	theme,
}: {
	icon: string;
	theme: 'light' | 'dark';
}) => {
	return (
		<i
			className={`pr-2 fa-solid fa-${icon} ${
				theme === 'light' ? 'text-primary' : ''
			}`}
		></i>
	);
};

export default function MenuItems() {
	const { theme } = useTheme();
	return (
		<>
			<Link to="/dashboard">
				<MenuIcon icon="house" theme={theme} />
				<span>Dashboard</span>
			</Link>
			<Link to="/distance-records">
				<MenuIcon icon="road" theme={theme} />
				<span>Distance Records</span>
			</Link>
			<Link to="/activity-summary">
				<MenuIcon icon="calendar" theme={theme} />
				<span>Activity summary</span>
			</Link>
			<Link to="/eddington-focus">
				<MenuIcon icon="crosshairs" theme={theme} />
				<span>Eddington focus</span>
			</Link>
		</>
	);
}
