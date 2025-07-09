import LineChartCard from "@/components/layout/lineChartCard";
import MetricCard from "@/components/layout/metricCard";
import ChartSkeleton from "@/components/skeletons/chartSkeleton";
import MetricCardSkeleton from "@/components/skeletons/metricCardSkeleton";
import { DatePicker } from "@/components/ui/datePicker";
import { useAuth } from "@/providers/authProvider";
import { memoizedMetrics } from "@/stores/activitiesSelectors";
import { useActivitiesStore } from "@/stores/activitiesStore";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";
import BarChartCard from "../components/layout/barChartCard";

export default function Dashboard() {
  const { loginToStravaAction, loggedInToStrava } = useAuth();
  const { loading } = useActivitiesStore();
  const activityMetrics = useActivitiesStore(memoizedMetrics);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) loginToStravaAction(code);
  }, [searchParams, loginToStravaAction]);

  const handleDateChange = useCallback(() => {
    if (!loggedInToStrava) {
      return;
    }
    // TODO: Implement with Store instead of api call
    useActivitiesStore.getState().fetchActivities();
  }, [loggedInToStrava]);

  return (
    <>
      <div className="flex justify-center items-center my-[100px] lg:px-2">
        <main className="flex flex-col gap-10 justify-center items-center flex-wrap">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <DatePicker handleDateChange={handleDateChange} />
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
                value={Number(activityMetrics.totalKm.toFixed())}
                unit="km"
              />
              <MetricCard
                title="Total Elevation"
                value={Number(activityMetrics.totalElevationInMeters.toFixed())}
                unit="m"
              />
              <MetricCard
                title="Total Duration"
                value={Number(activityMetrics.totalDurationInHours.toFixed())}
                unit="h"
              />
              <MetricCard
                title="Total Activities"
                value={activityMetrics.totalActivities}
              />
              <MetricCard
                title="Eddington Number"
                value={activityMetrics.eddingtonMetrics.eddington}
              />
              <MetricCard
                title="Next Eddington Number"
                value={activityMetrics.eddingtonMetrics.nextEddington}
              />
              <MetricCard
                title="Activities Needed"
                value={activityMetrics.eddingtonMetrics.activitiesNeeded}
              />
              <MetricCard
                title="Previous Eddington Number"
                value={activityMetrics.eddingtonMetrics.previousEddington}
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
                data={activityMetrics.totalActivitiesSplitByMonth}
                key1="month"
                key2="count"
              />
              <BarChartCard
                title="Activities per month"
                data={activityMetrics.totalActivitiesSplitByMonth}
                key1="month"
                key2="count"
              />
            </section>
          )}
        </main>
      </div>
    </>
  );
}
