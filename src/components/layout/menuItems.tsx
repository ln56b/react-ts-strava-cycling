import { Theme } from '@/interfaces/project';
import { useAuth } from '@/providers/authProvider';
import { useTheme } from '@/providers/themeProvider';
import { Link } from 'react-router';

const MenuIcon = ({ icon, theme, className }: { icon: string; theme: Theme; className?: string }) => {
  return <i className={`fa-solid fa-${icon} ${className} ${theme === Theme.Light ? 'text-primary' : ''}`}></i>;
};

const MenuItemDiv = ({ theme, title, icon }: { theme: Theme; title: string; icon: string }) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <MenuIcon className="col-span-2" icon={icon} theme={theme} />
      <span className="col-span-10">{title}</span>
    </div>
  );
};

export default function MenuItems() {
  const { theme } = useTheme();
  const { loggedInToStrava } = useAuth();
  return (
    <div className="flex flex-col gap-4 p-2">
      <Link to="/dashboard" relative="path" className={`${!loggedInToStrava ? 'pointer-events-none' : ''}`}>
        <MenuItemDiv theme={theme} title="Dashboard" icon="house" />
      </Link>
      <Link to="/rides" className={`${!loggedInToStrava ? 'pointer-events-none' : ''}`}>
        <MenuItemDiv theme={theme} title="Rides" icon="person-biking" />
      </Link>
      <Link to="/hikes" className={`${!loggedInToStrava ? 'pointer-events-none' : ''}`}>
        <MenuItemDiv theme={theme} title="Hikes" icon="person-hiking" />
      </Link>
      <Link to="/runs" className={`${!loggedInToStrava ? 'pointer-events-none' : ''}`}>
        <MenuItemDiv theme={theme} title="Runs" icon="person-running" />
      </Link>
      <Link to="/gears" className={`${!loggedInToStrava ? 'pointer-events-none' : ''}`}>
        <MenuItemDiv theme={theme} title="Gears" icon="gears" />
      </Link>
      <Link to="/activity-list" className={`${!loggedInToStrava ? 'pointer-events-none' : ''}`}>
        <MenuItemDiv theme={theme} title="Activity List" icon="list" />
      </Link>
    </div>
  );
}
