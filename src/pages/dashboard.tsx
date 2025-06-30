import { useAuth } from '@/providers/authProvider';
import { loadActivities } from '@/services/strava.service';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '../components/ui/button';
import BarChartCard from '../components/layout/barChartCard';
import MetricCard from '@/components/layout/metricCard';
import LineChartCard from '@/components/layout/lineChartCard';

export default function Dashboard() {
	const { loginToStravaAction } = useAuth();

	const [searchParams] = useSearchParams();

	useEffect(() => {
		const code = searchParams.get('code');
		if (code) loginToStravaAction(code);
	}, [searchParams, loginToStravaAction]);

	const loadStravaActivities = () => {
		loadActivities();
	};

	return (
		<>
			<Button onClick={loadStravaActivities}>Load activities</Button>
			<div className="flex justify-center items-center my-[100px] lg:px-2">
				<main className="flex flex-col gap-10 justify-center items-center flex-wrap">
					<h2 className="text-2xl font-bold">Main metrics</h2>
					<section className="col-span-12 grid grid-cols-12 gap-4">
						<MetricCard
							className="col-span-12 md:col-span-6 lg:col-span-3"
							title="Total Users"
							value="11,238"
						/>
						<MetricCard
							className="col-span-12 md:col-span-6 lg:col-span-3"
							title="Total Revenue"
							value="$56,432"
						/>
						<MetricCard
							className="col-span-12 md:col-span-6 lg:col-span-3"
							title="Total Products"
							value="238"
						/>
						<MetricCard
							className="col-span-12 md:col-span-6 lg:col-span-3"
							title="Total Ratio"
							value="2.6"
						/>
					</section>

					<h2 className="text-2xl font-bold">Charts</h2>
					<section className="col-span-12 lg:col-span-12 grid grid-cols-12 gap-4 justify-center items-center">
						<LineChartCard
							className="col-span-12 lg:col-span-6"
							title="Revenue Analytics"
						/>
						<BarChartCard
							className="col-span-12 lg:col-span-6"
							title="Total Visits"
						/>
					</section>
				</main>
			</div>
		</>
	);
}
