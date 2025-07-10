import { authorizeStrava } from '@/services/users.service';
import { Button } from '../ui/button';
import { useTheme } from '@/providers/themeProvider';

export default function LoginToStrava() {
	const { theme } = useTheme();

	const connectToStrava = () => {
		const stravaId = localStorage.getItem('stravaId');
		if (!stravaId) {
			throw new Error('Strava ID not found');
		}
		authorizeStrava(Number(stravaId));
	};

	return (
		<div className="flex justify-center items-center my-[100px] mx-0">
			<Button onClick={connectToStrava} variant="ghost">
				<img
					className="w-60"
					src={
						theme === 'dark'
							? 'src/assets/btn-strava-connect-white.png'
							: 'src/assets/btn-strava-connect-orange.png'
					}
					alt="Button Connect With Strava"
				/>
			</Button>
		</div>
	);
}
