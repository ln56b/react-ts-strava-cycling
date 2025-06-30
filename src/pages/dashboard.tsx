import LineChartCard from '@/components/layout/lineChartCard';
import MetricCard from '@/components/layout/metricCard';
import { useAuth } from '@/providers/authProvider';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import BarChartCard from '../components/layout/barChartCard';
import { useActivitiesStore } from '@/stores/activitiesStore';
import MetricCardSkeleton from '@/components/skeletons/metricCardSkeleton';
import ChartSkeleton from '@/components/skeletons/chartSkeleton';

export default function Dashboard() {
	const { loginToStravaAction } = useAuth();
	const { activities, loading, error } = useActivitiesStore();

	const [searchParams] = useSearchParams();

	useEffect(() => {
		const code = searchParams.get('code');
		if (code) loginToStravaAction(code);
	}, [searchParams, loginToStravaAction]);

	return (
		<>
			<div className="flex justify-center items-center my-[100px] lg:px-2">
				<main className="flex flex-col gap-10 justify-center items-center flex-wrap">
					<h2 className="text-2xl font-bold">Main metrics</h2>
					{loading ? (
						<section className="col-span-12 grid grid-cols-12 gap-4">
							<MetricCardSkeleton title="Total Users" />
							<MetricCardSkeleton title="Total Revenue" />
							<MetricCardSkeleton title="Total Products" />
							<MetricCardSkeleton title="Total Ratio" />
						</section>
					) : (
						<section className="col-span-12 grid grid-cols-12 gap-4">
							<MetricCard title="Total Users" value="11,238" />
							<MetricCard title="Total Revenue" value="$56,432" />
							<MetricCard title="Total Products" value="238" />
							<MetricCard title="Total Ratio" value="2.6" />
						</section>
					)}

					<h2 className="text-2xl font-bold">Charts</h2>
					{loading ? (
						<section className="col-span-12 lg:col-span-12 grid grid-cols-12 gap-4 justify-center items-center w-full h-full">
							<ChartSkeleton title="Revenue Analytics" />
							<ChartSkeleton title="Total Visits" />
						</section>
					) : (
						<section className="col-span-12 lg:col-span-12 grid grid-cols-12 gap-4 justify-center items-center w-full h-full">
							<LineChartCard title="Revenue Analytics" />
							<BarChartCard title="Total Visits" />
						</section>
					)}
				</main>
			</div>
		</>
	);
}
