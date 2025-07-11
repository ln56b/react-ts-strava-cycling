import { useTheme } from '@/providers/themeProvider';
import { Link } from 'react-router';

const MenuIcon = ({
	icon,
	theme,
	className,
}: {
	icon: string;
	theme: 'light' | 'dark';
	className?: string;
}) => {
	return (
		<i
			className={`fa-solid fa-${icon} ${className} ${
				theme === 'light' ? 'text-primary' : ''
			}`}
		></i>
	);
};

const MenuItemDiv = ({
	theme,
	title,
	icon,
}: {
	theme: 'light' | 'dark';
	title: string;
	icon: string;
}) => {
	return (
		<div className="grid grid-cols-12 gap-2 items-center">
			<MenuIcon className="col-span-2" icon={icon} theme={theme} />
			<span className="col-span-10">{title}</span>
		</div>
	);
};

export default function MenuItems() {
	const { theme } = useTheme();
	return (
		<div className="flex flex-col gap-4 p-2">
			<Link to="/dashboard">
				<MenuItemDiv theme={theme} title="Dashboard" icon="house" />
			</Link>
			<Link to="/rides">
				<MenuItemDiv theme={theme} title="Rides" icon="person-biking" />
			</Link>
			<Link to="/hikes">
				<MenuItemDiv theme={theme} title="Hikes" icon="person-hiking" />
			</Link>
			<Link to="/runs">
				<MenuItemDiv theme={theme} title="Runs" icon="person-running" />
			</Link>
		</div>
	);
}
