import LineChartCard from '@/components/layout/lineChartCard';
import MetricCard from '@/components/layout/metricCard';
import Selector from '@/components/layout/selector';
import ChartSkeleton from '@/components/skeletons/chartSkeleton';
import MetricCardSkeleton from '@/components/skeletons/metricCardSkeleton';
import { useAuth } from '@/providers/authProvider';
import { useActivitiesStore } from '@/stores/activitiesStore';
import {
	athleteId,
	firstRideYear,
	ridesMemoizedMetrics,
} from '@/stores/rideSelectors';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import BarChartCard from '../components/layout/barChartCard';
import { getCurrentYear, yearsFromStringDateUntilNow } from '@/utils/utils';

export default function Dashboard() {
	const { loginToStravaAction } = useAuth();
	const { loading } = useActivitiesStore();
	const userId = useActivitiesStore(athleteId);
	const ridesMetrics = useActivitiesStore(ridesMemoizedMetrics);
	const firstYear = useActivitiesStore(firstRideYear);

	const [searchParams] = useSearchParams();
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [options, setOptions] = useState<string[]>([]);

	useEffect(() => {
		const code = searchParams.get('code');
		if (code) loginToStravaAction(code);
	}, [searchParams, loginToStravaAction]);

	useEffect(() => {
		if (firstYear) {
			setSelectedDate(getCurrentYear());
			setOptions(yearsFromStringDateUntilNow(firstYear));
		}
	}, [firstYear]);

	return (
		<div className="flex justify-center items-center my-[100px] lg:px-2">
			<main className="flex flex-col gap-10 justify-center items-center flex-wrap">
				<h2 className="text-2xl font-bold">Dashboard</h2>
				<a
					href={`https://www.strava.com/athletes/${userId}`}
					target="_blank"
					rel="noopener noreferrer"
					className=" text-[#FC5200]"
				>
					View on Strava
				</a>
				<Selector
					disabled={!firstYear}
					value={selectedDate}
					onHandleChange={setSelectedDate}
					dateType="calendarYear"
					options={options}
				/>

				{loading ? (
					<section className="col-span-12 grid grid-cols-12 gap-4">
						<MetricCardSkeleton title="Total Distance" />
						<MetricCardSkeleton title="Total Elevation" />
						<MetricCardSkeleton title="Total Duration" />
						<MetricCardSkeleton title="Total Activities" />
					</section>
				) : (
					<section className="col-span-12 grid grid-cols-12 gap-4">
						<MetricCard
							title="Total Distance"
							value={Number(ridesMetrics.totalKm.toFixed())}
							unit="km"
						/>
						<MetricCard
							title="Total Distance by Date"
							value={Number(ridesMetrics.totalKmByDate.toFixed())}
							unit="km"
						/>
						<MetricCard
							title="Total Elevation"
							value={Number(ridesMetrics.totalElevationInMeters.toFixed())}
							unit="m"
						/>
						<MetricCard
							title="Total Duration"
							value={Number(ridesMetrics.totalDurationInHours.toFixed())}
							unit="h"
						/>
						<MetricCard
							title="Total Activities"
							value={ridesMetrics.totalActivities}
						/>
						<MetricCard
							title="Eddington Number"
							value={ridesMetrics.eddingtonMetrics.eddington}
						/>
						<MetricCard
							title="Next Eddington Number"
							value={ridesMetrics.eddingtonMetrics.nextEddington}
						/>
						<MetricCard
							title="Activities Needed"
							value={ridesMetrics.eddingtonMetrics.activitiesNeeded}
						/>
						<MetricCard
							title="Previous Eddington Number"
							value={ridesMetrics.eddingtonMetrics.previousEddington}
						/>
					</section>
				)}

				{loading ? (
					<section className="col-span-12 lg:col-span-12 grid grid-cols-12 gap-4 justify-center items-center w-full h-full">
						<ChartSkeleton title="Revenue Analytics" />
						<ChartSkeleton title="Total Visits" />
					</section>
				) : (
					<section className="col-span-12 lg:col-span-12 grid grid-cols-12 gap-4 justify-center items-center w-full h-full">
						<LineChartCard
							title="Activities per month"
							data={ridesMetrics.totalActivitiesSplitByMonth}
							key1="month"
							key2="count"
						/>
						<BarChartCard
							title="Activities per month"
							data={ridesMetrics.totalActivitiesSplitByMonth}
							key1="month"
							key2="count"
						/>
					</section>
				)}
			</main>
		</div>
	);
}
