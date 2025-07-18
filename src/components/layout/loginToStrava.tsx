import { Button } from '../ui/button';
import { useTheme } from '@/providers/themeProvider';
import { Theme } from '@/interfaces/project';
import { authorizeStrava } from '@/services/strava.service';

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
					src={
						theme === Theme.Dark
							? 'src/assets/btn-strava-connect-white.png'
							: 'src/assets/btn-strava-connect-orange.png'
					}
					alt="Button Connect With Strava"
				/>
			</Button>
		</div>
	);
}
