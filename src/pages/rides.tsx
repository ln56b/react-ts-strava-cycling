import DateFilters from '@/components/layout/dateFilters';
import ChartsSection from '@/components/ui/chartsSection';
import PageContainer from '@/components/ui/pageContainer';
import PageSection from '@/components/ui/pageSection';
import StatsSection from '@/components/ui/statsSection';
import { DateSection } from '@/interfaces/project';
import { useAuth } from '@/providers/authProvider';
import { useActivitiesStore } from '@/stores/activitiesStore';
import {
  athleteId,
  firstActiveYearBySport,
  rideAllTimesMetrics,
  rideFilteredByDateMetrics,
} from '@/stores/activitiesSelectors';
import {
  formatDateForSelector,
  getCurrentYear,
  sameDayInPreviousYear,
  yearsFromStringDateUntilNow,
} from '@/utils/utils';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import ChartSkeleton from '../components/skeletons/chartSkeleton';
import MetricCardSkeleton from '../components/skeletons/metricCardSkeleton';
import MetricCard from '../components/ui/metricCard';
import { rideSports } from '@/interfaces/strava';

export default function Rides() {
  const { loading } = useActivitiesStore();
  const allTimeMetrics = useActivitiesStore(rideAllTimesMetrics);
  const pastFourWeeksMetrics = useActivitiesStore(rideFilteredByDateMetrics(DateSection.PastFourWeeks));
  const calendarYearMetrics = useActivitiesStore(rideFilteredByDateMetrics(DateSection.CalendarYear));
  const athlete = useActivitiesStore(athleteId);
  const [calendarYearOptions, setCalendarYearOptions] = useState<string[]>([]);
  const firstYear = useActivitiesStore(state => firstActiveYearBySport(rideSports, state));

  const { loginToStravaAction } = useAuth();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) loginToStravaAction(code);
  }, [searchParams, loginToStravaAction]);

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
    <PageContainer title="Cycling rides" athleteId={athlete} loading={loading}>
      {/* Eddington number */}
      <PageSection title="Eddington" icon="infinity">
        <StatsSection>
          {loading ? (
            <>
              <MetricCardSkeleton title="Current" />
            </>
          ) : (
            <>
              <MetricCard title="Current" value={allTimeMetrics.eddingtonMetrics.eddington} />
            </>
          )}
        </StatsSection>
      </PageSection>

      {/* Best rides ever */}
      <PageSection title="Best rides ever" icon="trophy">
        <StatsSection>
          {loading ? (
            <>
              <MetricCardSkeleton title="Longest ride" />
              <MetricCardSkeleton title="Highest elevation" />
              <MetricCardSkeleton title="Max duration" />
              <MetricCardSkeleton title="Fastest ride" />
            </>
          ) : (
            <>
              <MetricCard title="Longest ride" value={Number(allTimeMetrics.maxDistanceKm.toFixed())} unit="km" />
              <MetricCard
                title="Highest elevation"
                value={Number(allTimeMetrics.maxElevationInMeters.toFixed())}
                unit="m"
              />
              <MetricCard title="Max duration" value={Number(allTimeMetrics.maxDurationInHours.toFixed())} unit="h" />
              <MetricCard title="Fastest ride" value={Number(allTimeMetrics.maxSpeedKmPerHour.toFixed())} unit="km/h" />
            </>
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
            <>
              <MetricCard title="Activities" value={allTimeMetrics.totalActivities} />
              <MetricCard title="Distance" value={Number(allTimeMetrics.totalKm.toFixed())} unit="km" />
              <MetricCard title="Elevation" value={Number(allTimeMetrics.totalElevationInMeters.toFixed())} unit="m" />
              <MetricCard title="Duration" value={Number(allTimeMetrics.totalDurationInHours.toFixed())} unit="h" />
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
            <>
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
            </>
          )}
        </StatsSection>
        <StatsSection>
          {loading ? (
            <ChartSkeleton title="Over time" />
          ) : (
            <>
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
            </>
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
            <>
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
            </>
          )}
        </StatsSection>
        <StatsSection>
          {loading ? (
            <ChartSkeleton title="Over time" />
          ) : (
            <>
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
            </>
          )}
        </StatsSection>
      </PageSection>
    </PageContainer>
  );
}
