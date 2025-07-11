import { useActivitiesStore } from '@/stores/activitiesStore';
import { useEffect, useState } from 'react';
import {
	athleteId,
	firstRideYear,
	rideAllTimesMetrics,
	rideFilteredByDateMetrics,
} from '@/stores/rideSelectors';
import {
	getCurrentYear,
	lastFourWeeksDay,
	yearsFromStringDateUntilNow,
} from '@/utils/utils';
import BarChartCard from '../components/layout/barChartCard';
import LineChartCard from '../components/layout/lineChartCard';
import MetricCard from '../components/layout/metricCard';
import MetricCardSkeleton from '../components/skeletons/metricCardSkeleton';
import ChartSkeleton from '../components/skeletons/chartSkeleton';
import StatsSection from '@/components/ui/statsSection';
import PageContainer from '@/components/ui/pageContainer';

export default function Rides() {
	const { loading } = useActivitiesStore();
	const allTimeMetrics = useActivitiesStore(rideAllTimesMetrics);
	const filteredByDateMetrics = useActivitiesStore(rideFilteredByDateMetrics);
	const userId = useActivitiesStore(athleteId);
	const pastFourWeeksStringDate = lastFourWeeksDay();
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [dateOptions, setDateOptions] = useState<string[]>([]);
	const firstYear = useActivitiesStore(firstRideYear);

	useEffect(() => {
		if (firstYear) {
			setSelectedDate(getCurrentYear());
			setDateOptions(yearsFromStringDateUntilNow(firstYear));
		}
	}, [firstYear]);

	return (
		<PageContainer title="Cycling rides" userId={userId}>
			{/* Past four weeks metrics */}
			<StatsSection
				dateType="pastFourWeeks"
				firstYear={firstYear}
				selectedDate={`from ${pastFourWeeksStringDate}`}
				setSelectedDate={setSelectedDate}
				options={[`from ${pastFourWeeksStringDate}`]}
				title="Past four weeks"
			>
				{loading ? (
					<>
						<MetricCardSkeleton title="Total Activities" />
						<MetricCardSkeleton title="Average Distance" />
						<MetricCardSkeleton title="Total Elevation" />
						<MetricCardSkeleton title="Average Duration" />
					</>
				) : (
					<>
						<MetricCard
							title="Total Activities"
							value={filteredByDateMetrics.totalActivities.length}
						/>
						<MetricCard
							title="Average Distance"
							value={Number(filteredByDateMetrics.averageKm.toFixed())}
							unit="km"
						/>
						<MetricCard
							title="Total Elevation"
							value={Number(
								filteredByDateMetrics.totalElevationInMeters.toFixed()
							)}
							unit="m"
						/>
						<MetricCard
							title="Average Duration"
							value={Number(
								filteredByDateMetrics.averageDurationInHours.toFixed()
							)}
							unit="h"
						/>
					</>
				)}
			</StatsSection>

			{/* Yearly metrics */}
			<StatsSection
				dateType="calendarYear"
				firstYear={firstYear}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				options={dateOptions}
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
							value={Number(filteredByDateMetrics.totalKm.toFixed())}
							unit="km"
						/>
						<MetricCard
							title="Total Distance by Date"
							value={Number(filteredByDateMetrics.totalKm.toFixed())}
							unit="km"
						/>
						<MetricCard
							title="Total Elevation"
							value={Number(
								filteredByDateMetrics.totalElevationInMeters.toFixed()
							)}
							unit="m"
						/>
						<MetricCard
							title="Total Duration"
							value={Number(
								filteredByDateMetrics.totalDurationInHours.toFixed()
							)}
							unit="h"
						/>
						<MetricCard
							title="Total Activities"
							value={filteredByDateMetrics.totalActivities.length}
						/>
					</>
				)}
			</StatsSection>

			{/* All time metrics */}
			<StatsSection
				dateType="allTime"
				firstYear={firstYear}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				options={dateOptions}
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
							value={Number(allTimeMetrics.totalKm.toFixed())}
							unit="km"
						/>
						<MetricCard
							title="Total Distance by Date"
							value={Number(allTimeMetrics.totalKm.toFixed())}
							unit="km"
						/>
						<MetricCard
							title="Total Elevation"
							value={Number(allTimeMetrics.totalElevationInMeters.toFixed())}
							unit="m"
						/>
						<MetricCard
							title="Total Duration"
							value={Number(allTimeMetrics.totalDurationInHours.toFixed())}
							unit="h"
						/>
						<MetricCard
							title="Total Activities"
							value={allTimeMetrics.totalActivities}
						/>
						<MetricCard
							title="Eddington Number"
							value={allTimeMetrics.eddingtonMetrics.eddington}
						/>
						<MetricCard
							title="Next Eddington Number"
							value={allTimeMetrics.eddingtonMetrics.nextEddington}
						/>
						<MetricCard
							title="Activities Needed"
							value={allTimeMetrics.eddingtonMetrics.activitiesNeeded}
						/>
						<MetricCard
							title="Previous Eddington Number"
							value={allTimeMetrics.eddingtonMetrics.previousEddington}
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
						data={allTimeMetrics.totalActivitiesSplitByMonth}
						key1="month"
						key2="count"
					/>
					<BarChartCard
						title="Activities per month"
						data={allTimeMetrics.totalActivitiesSplitByMonth}
						key1="month"
						key2="count"
					/>
				</section>
			)}
		</PageContainer>
	);
}
