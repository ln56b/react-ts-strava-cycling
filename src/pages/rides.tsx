import PageContainer from '@/components/ui/pageContainer';
import StatsSection from '@/components/ui/statsSection';
import { DateSection } from '@/interfaces/project';
import { useActivitiesStore } from '@/stores/activitiesStore';
import {
	athleteId,
	firstRideYear,
	rideAllTimesMetrics,
	rideFilteredByDateMetrics,
} from '@/stores/rideSelectors';
import {
	formatDateForSelector,
	sameDayInPreviousYear,
	yearsFromStringDateUntilNow,
} from '@/utils/utils';
import { useEffect, useState } from 'react';
import BarChartCard from '../components/layout/barChartCard';
import LineChartCard from '../components/layout/lineChartCard';
import MetricCard from '../components/ui/metricCard';
import ChartSkeleton from '../components/skeletons/chartSkeleton';
import MetricCardSkeleton from '../components/skeletons/metricCardSkeleton';
import DateFilters from '@/components/layout/dateFilters';
import PageSection from '@/components/ui/pageSection';

export default function Rides() {
	const { loading } = useActivitiesStore();
	const allTimeMetrics = useActivitiesStore(rideAllTimesMetrics);
	const pastFourWeeksMetrics = useActivitiesStore(
		rideFilteredByDateMetrics(DateSection.PastFourWeeks)
	);
	const fullYearMetrics = useActivitiesStore(
		rideFilteredByDateMetrics(DateSection.FullYear)
	);
	const calendarYearMetrics = useActivitiesStore(
		rideFilteredByDateMetrics(DateSection.CalendarYear)
	);
	const athlete = useActivitiesStore(athleteId);
	const [calendarYearOptions, setCalendarYearOptions] = useState<string[]>([]);
	const [fullYearOptions, setFullYearOptions] = useState<string[]>([]);
	const firstYear = useActivitiesStore(firstRideYear);

	useEffect(() => {
		if (firstYear) {
			const fullYearOptions: string[] = [];
			for (
				let year = Number(firstYear);
				year <= new Date().getFullYear();
				year++
			) {
				fullYearOptions.push(
					`${formatDateForSelector(
						sameDayInPreviousYear(year.toString())
					)} - ${formatDateForSelector(
						sameDayInPreviousYear((year + 1).toString())
					)}`
				);
			}
			setFullYearOptions(fullYearOptions);

			setCalendarYearOptions(yearsFromStringDateUntilNow(firstYear));
		}
	}, [firstYear]);

	return (
		<PageContainer title="Cycling rides" athleteId={athlete} loading={loading}>
			{/* Past four weeks metrics */}
			<PageSection title="Past four weeks">
				<StatsSection>
					{loading ? (
						<>
							<MetricCardSkeleton title="Total Activities" />
							<MetricCardSkeleton title="Total Distance" />
							<MetricCardSkeleton title="Total Elevation" />
							<MetricCardSkeleton title="Total Duration" />
						</>
					) : (
						<>
							<MetricCard
								title="Total Activities"
								value={pastFourWeeksMetrics.totalActivities.length}
							/>
							<MetricCard
								title="Total Distance"
								value={Number(pastFourWeeksMetrics.totalKm.toFixed())}
								unit="km"
							/>
							<MetricCard
								title="Total Elevation"
								value={Number(
									pastFourWeeksMetrics.totalElevationInMeters.toFixed()
								)}
								unit="m"
							/>
							<MetricCard
								title="Total Duration"
								value={Number(
									pastFourWeeksMetrics.totalDurationInHours.toFixed()
								)}
								unit="h"
							/>
						</>
					)}
				</StatsSection>
			</PageSection>

			{/* Full year metrics */}
			<PageSection title="Full year">
				<DateFilters
					dateType="fullYear"
					firstYear={firstYear}
					options={fullYearOptions}
				/>
				<StatsSection>
					{loading ? (
						<>
							<MetricCardSkeleton title="Total Distance" />
							<MetricCardSkeleton title="Total Duration" />
							<MetricCardSkeleton title="Total Elevation" />
						</>
					) : (
						<>
							<MetricCard
								title="Total Distance"
								value={Number(fullYearMetrics.totalKm.toFixed())}
								unit="km"
							/>
							<MetricCard
								title="Total Duration"
								value={Number(fullYearMetrics.totalDurationInHours.toFixed())}
								unit="h"
							/>
							<MetricCard
								title="Total Elevation"
								value={Number(fullYearMetrics.totalElevationInMeters.toFixed())}
								unit="m"
							/>
						</>
					)}
				</StatsSection>
				<StatsSection>
					{loading ? (
						<>
							<ChartSkeleton title="Total Distance split per month" />
							<ChartSkeleton title="Total Duration split per month" />
							<ChartSkeleton title="Total Elevation split per month" />
						</>
					) : (
						<>
							<BarChartCard
								title="Total Distance split per month"
								data={fullYearMetrics.totalKmByDateSplitByMonth}
								key1="month"
								key2="km"
							/>
							<BarChartCard
								title="Total Duration split per month"
								data={fullYearMetrics.totalDurationInHoursSplitByMonth}
								key1="month"
								key2="hours"
							/>
							<BarChartCard
								title="Total Elevation split per month"
								data={fullYearMetrics.totalElevationInMetersSplitByMonth}
								key1="month"
								key2="meters"
							/>
						</>
					)}
				</StatsSection>
			</PageSection>

			{/* Calendar year metrics */}
			<PageSection title="Calendar year">
				<DateFilters
					dateType="calendarYear"
					firstYear={firstYear}
					options={calendarYearOptions}
				/>
				<StatsSection>
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
								value={Number(calendarYearMetrics.totalKm.toFixed())}
								unit="km"
							/>
							<MetricCard
								title="Total Distance by Date"
								value={Number(calendarYearMetrics.totalKm.toFixed())}
								unit="km"
							/>
							<MetricCard
								title="Total Elevation"
								value={Number(
									calendarYearMetrics.totalElevationInMeters.toFixed()
								)}
								unit="m"
							/>
							<MetricCard
								title="Total Duration"
								value={Number(
									calendarYearMetrics.totalDurationInHours.toFixed()
								)}
								unit="h"
							/>
							<MetricCard
								title="Total Activities"
								value={calendarYearMetrics.totalActivities.length}
							/>
						</>
					)}
				</StatsSection>
			</PageSection>

			{/* All time metrics */}
			<PageSection title="All times">
				<StatsSection>
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
			</PageSection>

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
