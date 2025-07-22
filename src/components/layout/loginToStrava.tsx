import { Button } from '../ui/button';
import { useTheme } from '@/providers/themeProvider';
import { Theme } from '@/interfaces/project';
import { authorizeStrava } from '@/services/strava.service';
import btnStravaConnectWhite from '@/assets/btn-strava-connect-white.png';
import btnStravaConnectOrange from '@/assets/btn-strava-connect-orange.png';

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
