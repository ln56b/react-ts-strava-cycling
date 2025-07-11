import { useActivitiesStore } from '@/stores/activitiesStore';
import { useEffect, useState } from 'react';
import {
	athleteId,
	firstRideYear,
	ridesMemoizedMetrics,
} from '@/stores/rideSelectors';
import { getCurrentYear, yearsFromStringDateUntilNow } from '@/utils/utils';
import BarChartCard from '../components/layout/barChartCard';
import LineChartCard from '../components/layout/lineChartCard';
import MetricCard from '../components/layout/metricCard';
import MetricCardSkeleton from '../components/skeletons/metricCardSkeleton';
import ChartSkeleton from '../components/skeletons/chartSkeleton';
import StatsSection from '@/components/ui/statsSection';
import PageContainer from '@/components/ui/pageContainer';

export default function Rides() {
	const { loading } = useActivitiesStore();
	const ridesMetrics = useActivitiesStore(ridesMemoizedMetrics);
	const userId = useActivitiesStore(athleteId);

	const [selectedDate, setSelectedDate] = useState<string>('');
	const [options, setOptions] = useState<string[]>([]);
	const firstYear = useActivitiesStore(firstRideYear);

	useEffect(() => {
		console.log(firstYear);
		if (firstYear) {
			setSelectedDate(getCurrentYear());
			setOptions(yearsFromStringDateUntilNow(firstYear));
		}
	}, [firstYear]);

	return (
		<PageContainer title="Cycling rides" userId={userId}>
			{/* Past four weeks metrics */}
			<StatsSection
				firstYear={firstYear}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				options={options}
				title="Past four weeks"
			>
				{loading ? (
					<>
						<MetricCardSkeleton title="Total Distance" />
						<MetricCardSkeleton title="Total Elevation" />
						<MetricCardSkeleton title="Total Duration" />
						<MetricCardSkeleton title="Total Activities" />
					</>
				) : (
					<>
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
					</>
				)}
			</StatsSection>

			{/* Yearly metrics */}
			<StatsSection
				firstYear={firstYear}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				options={options}
				title="Yearly metrics"
			>
				{loading ? (
					<>
						<MetricCardSkeleton title="Total Distance" />
						<MetricCardSkeleton title="Total Elevation" />
						<MetricCardSkeleton title="Total Duration" />
						<MetricCardSkeleton title="Total Activities" />
					</>
				) : (
					<>
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
					</>
				)}
			</StatsSection>

			{/* All time metrics */}
			<StatsSection
				firstYear={firstYear}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				options={options}
				title="All time metrics"
			>
				{loading ? (
					<>
						<MetricCardSkeleton title="Total Distance" />
						<MetricCardSkeleton title="Total Elevation" />
						<MetricCardSkeleton title="Total Duration" />
						<MetricCardSkeleton title="Total Activities" />
					</>
				) : (
					<>
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
					</>
				)}
			</StatsSection>

			{loading ? (
				<section className="grid grid-cols-12 col-span-12 gap-4 justify-center items-center w-full h-full lg:col-span-12">
					<ChartSkeleton title="Revenue Analytics" />
					<ChartSkeleton title="Total Visits" />
				</section>
			) : (
				<section className="grid grid-cols-12 col-span-12 gap-4 justify-center items-center w-full h-full lg:col-span-12">
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
		</PageContainer>
	);
}
