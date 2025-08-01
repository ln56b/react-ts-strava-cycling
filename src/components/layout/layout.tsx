import molletsCassoulet from '@/assets/mollets-cassoulet-full.svg';
import stravaBlack from '@/assets/strava-black.svg';
import stravaWhite from '@/assets/strava-white.svg';
import { useAuth } from '@/providers/authProvider';
import { useTheme } from '@/providers/themeProvider';
import { useUserStore } from '@/stores/userStore';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import Menu from './menu';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username } = useUserStore();

  return (
    <div className="p-4">
      <div className="lg:grid lg:grid-cols-12">
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="col-span-12 lg:col-span-10 ">
          <div className="flex items-center w-full">
            {username && <p className="flex pl-12 lg:pl-3 italic">You are {username}</p>}
            <div className="flex gap-2 items-center justify-end ml-auto">
              <Switch onClick={toggleTheme}></Switch>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
          <main className={`overflow-y-scroll max-h-[calc(100vh-112px)] ${isMenuOpen ? 'opacity-20' : ''}`}>
            {children}
          </main>
        </div>
      </div>
      <div className="fixed bottom-0 w-full flex justify-end bg-accent-foreground dark:bg-accent-foreground">
        <div className="flex justify-between items-center px-8 py-4 w-full">
          <img width={80} src={molletsCassoulet} alt="Incubated in Les Mollets Cassoulet"></img>

          <img width={100} src={theme === 'dark' ? stravaWhite : stravaBlack} alt="powered by Strava"></img>
        </div>
      </div>
    </div>
  );
}
