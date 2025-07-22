import { Button } from '../ui/button';
import { useTheme } from '@/providers/themeProvider';
import { Theme } from '@/interfaces/project';
import btnStravaConnectWhite from '@/assets/btn-strava-connect-white.png';
import btnStravaConnectOrange from '@/assets/btn-strava-connect-orange.png';
import { authorizeStrava } from '@/services/users.service';

export default function LoginToStrava() {
  const { theme } = useTheme();

  const connectToStrava = () => {
    authorizeStrava();
  };

  return (
    <div className="flex justify-center items-center my-[100px] mx-0">
      <Button onClick={connectToStrava} variant="ghost">
        <img
          className="w-60"
          src={theme === Theme.Dark ? btnStravaConnectWhite : btnStravaConnectOrange}
          alt="Button Connect With Strava"
        />
      </Button>
    </div>
  );
}
