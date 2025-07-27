import DateFilters from '@/components/layout/dateFilters';
import ChartSkeleton from '@/components/skeletons/chartSkeleton';
import MetricCardSkeleton from '@/components/skeletons/metricCardSkeleton';
import ChartsSection from '@/components/ui/chartsSection';
import MetricCard from '@/components/ui/metricCard';
import PageContainer from '@/components/ui/pageContainer';
import PageSection from '@/components/ui/pageSection';
import StatsSection from '@/components/ui/statsSection';
import { DateSection } from '@/interfaces/project';
import { SportTypes } from '@/interfaces/strava';
import {
  athleteId,
  firstActiveYearBySport,
  runAllTimesMetrics,
  runFilteredByDateMetrics,
} from '@/stores/activitiesSelectors';
import { useActivitiesStore } from '@/stores/activitiesStore';
import {
  formatDateForSelector,
  getCurrentYear,
  sameDayInPreviousYear,
  yearsFromStringDateUntilNow,
} from '@/utils/utils';
import { useEffect, useState } from 'react';

export default function Runs() {
  const { loading } = useActivitiesStore();
  const allTimeMetrics = useActivitiesStore(runAllTimesMetrics);
  const pastFourWeeksMetrics = useActivitiesStore(runFilteredByDateMetrics(DateSection.PastFourWeeks));
  const calendarYearMetrics = useActivitiesStore(runFilteredByDateMetrics(DateSection.CalendarYear));
  const athlete = useActivitiesStore(athleteId);
  const [calendarYearOptions, setCalendarYearOptions] = useState<string[]>([]);
  const firstYear = useActivitiesStore(state => firstActiveYearBySport(SportTypes.Run, state));

  useEffect(() => {
    if (firstYear) {
      const fullYearOptions: string[] = [];
      for (let year = Number(firstYear); year <= new Date().getFullYear(); year++) {
        fullYearOptions.push(
          `${formatDateForSelector(sameDayInPreviousYear(year.toString()))} - ${formatDateForSelector(
            sameDayInPreviousYear((year + 1).toString()),
          )}`,
        );
      }

      setCalendarYearOptions(yearsFromStringDateUntilNow(firstYear));
    }
  }, [firstYear]);

  return (
    <PageContainer title="Running" athleteId={athlete} loading={loading}>
      {/* Best runs ever */}
      <PageSection title="Best runs ever" icon="trophy">
        <StatsSection>
          {loading ? (
            <>
              <MetricCardSkeleton title="Longest hike" />
              <MetricCardSkeleton title="Highest elevation" />
              <MetricCardSkeleton title="Max duration" />
              <MetricCardSkeleton title="Fastest hike" />
            </>
          ) : (
            <StatsSection>
              <MetricCard title="Longest hike" value={Number(allTimeMetrics.maxDistanceKm.toFixed())} unit="km" />
              <MetricCard
                title="Highest elevation"
                value={Number(allTimeMetrics.maxElevationInMeters.toFixed())}
                unit="m"
              />
              <MetricCard title="Max duration" value={Number(allTimeMetrics.maxDurationInHours.toFixed())} unit="h" />
              <MetricCard title="Fastest hike" value={Number(allTimeMetrics.maxSpeedKmPerHour.toFixed())} unit="km/h" />
            </StatsSection>
          )}
        </StatsSection>
      </PageSection>

      {/* All time metrics */}
      <PageSection title="All times">
        <StatsSection>
          {loading ? (
            <>
              <MetricCardSkeleton title="Activities" />
              <MetricCardSkeleton title="Distance" />
              <MetricCardSkeleton title="Elevation" />
              <MetricCardSkeleton title="Duration" />
            </>
          ) : (
            <StatsSection>
              <MetricCard title="Activities" value={allTimeMetrics.totalActivities} />
              <MetricCard title="Distance" value={Number(allTimeMetrics.totalKm.toFixed())} unit="km" />
              <MetricCard title="Elevation" value={Number(allTimeMetrics.totalElevationInMeters.toFixed())} unit="m" />
              <MetricCard title="Duration" value={Number(allTimeMetrics.totalDurationInHours.toFixed())} unit="h" />
            </StatsSection>
          )}
        </StatsSection>
      </PageSection>

      {/* Calendar year metrics */}
      <PageSection title="Calendar year">
        <DateFilters
          dateType="calendarYear"
          firstYear={firstYear}
          options={calendarYearOptions}
          defaultValue={getCurrentYear()}
        />
        <StatsSection>
          {loading ? (
            <>
              <MetricCardSkeleton title="Activities" />
              <MetricCardSkeleton title="Distance" />
              <MetricCardSkeleton title="Elevation" />
              <MetricCardSkeleton title="Duration" />
            </>
          ) : (
            <StatsSection>
              <MetricCard title="Activities" value={calendarYearMetrics.totalActivities.length} />
              <MetricCard title="Distance" value={Number(calendarYearMetrics.totalKm.toFixed())} unit="km" />
              <MetricCard
                title="Elevation"
                value={Number(calendarYearMetrics.totalElevationInMeters.toFixed())}
                unit="m"
              />
              <MetricCard
                title="Duration"
                value={Number(calendarYearMetrics.totalDurationInHours.toFixed())}
                unit="h"
              />
            </StatsSection>
          )}
        </StatsSection>
        <StatsSection>
          {loading ? (
            <ChartSkeleton title="Over time" />
          ) : (
            <StatsSection>
              <ChartsSection
                charts={[
                  {
                    type: 'line',
                    value: 'activities',
                    data: calendarYearMetrics.totalActivitiesSplitByMonth,
                    key1: 'month',
                    key2: 'activities',
                  },
                  {
                    type: 'bar',
                    value: 'distance',
                    data: calendarYearMetrics.totalKmByDateSplitByMonth,
                    key1: 'month',
                    key2: 'km',
                  },
                  {
                    type: 'line',
                    value: 'elevation',
                    data: calendarYearMetrics.totalElevationInMetersSplitByMonth,
                    key1: 'month',
                    key2: 'meters',
                  },
                ]}></ChartsSection>
            </StatsSection>
          )}
        </StatsSection>
      </PageSection>

      {/* Past four weeks metrics */}
      <PageSection title="Past four weeks">
        <StatsSection>
          {loading ? (
            <>
              <MetricCardSkeleton title="Activities" />
              <MetricCardSkeleton title="Distance" />
              <MetricCardSkeleton title="Elevation" />
              <MetricCardSkeleton title="Duration" />
            </>
          ) : (
            <StatsSection>
              <MetricCard title="Activities" value={pastFourWeeksMetrics.totalActivities.length} />
              <MetricCard title="Distance" value={Number(pastFourWeeksMetrics.totalKm.toFixed())} unit="km" />
              <MetricCard
                title="Elevation"
                value={Number(pastFourWeeksMetrics.totalElevationInMeters.toFixed())}
                unit="m"
              />
              <MetricCard
                title="Duration"
                value={Number(pastFourWeeksMetrics.totalDurationInHours.toFixed())}
                unit="h"
              />
            </StatsSection>
          )}
        </StatsSection>
        <StatsSection>
          {loading ? (
            <ChartSkeleton title="Over time" />
          ) : (
            <StatsSection>
              <ChartsSection
                charts={[
                  {
                    type: 'line',
                    value: 'activities',
                    data: pastFourWeeksMetrics.totalActivitiesSplitByWeek,
                    key1: 'week',
                    key2: 'activities',
                  },
                  {
                    type: 'bar',
                    value: 'distance',
                    data: pastFourWeeksMetrics.totalKmByDateSplitByWeek,
                    key1: 'week',
                    key2: 'km',
                  },
                  {
                    type: 'line',
                    value: 'elevation',
                    data: pastFourWeeksMetrics.totalElevationInMetersSplitByWeek,
                    key1: 'week',
                    key2: 'meters',
                  },
                ]}></ChartsSection>
            </StatsSection>
          )}
        </StatsSection>
      </PageSection>
    </PageContainer>
  );
}
