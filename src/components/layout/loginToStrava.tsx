import { authorizeStrava } from '@/services/users.service';
import { Button } from '../ui/button';

export default function LoginToStrava() {
	const connectToStrava = () => {
		const stravaId = localStorage.getItem('stravaId');
		if (!stravaId) {
			throw new Error('Strava ID not found');
		}
		authorizeStrava(Number(stravaId));
	};

	return (
		<div className="flex justify-center items-center my-[100px] mx-0 ">
			<Button onClick={connectToStrava}>Connect To Strava</Button>
		</div>
	);
}
