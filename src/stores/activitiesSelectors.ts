import { getFourWeeksFromToday, getMonthName } from '@/utils/utils';
import { ActivityState } from './activitiesStore';
import { createSelector } from 'reselect';
import { DateSection } from '@/interfaces/project';
import { Activity, rideSports, SportTypes } from '@/interfaces/strava';

const filterBySport = (activities: Activity[], sport: SportTypes | SportTypes[]) =>
  Array.isArray(sport)
    ? activities.filter(activity => sport.includes(activity.type as SportTypes))
    : activities.filter(activity => activity.type === sport);

const filterByDate = (activities: Activity[], from: string, to: string) =>
  activities.filter(
    activity => new Date(activity.start_date) >= new Date(from) && new Date(activity.start_date) <= new Date(to),
  );

const activitiesBySportAndDate = (sport: SportTypes | SportTypes[], dateSection: DateSection) =>
  createSelector(
    [(state: ActivityState) => state.activities, (state: ActivityState) => state.filters[dateSection]],
    (activities, filters) => {
      const filteredBySport = filterBySport(activities, sport);
      return filterByDate(filteredBySport, filters.dates.from, filters.dates.to);
    },
  );

export const athleteId = (state: ActivityState): number => {
  return state.activities[0]?.athleteId ?? 0;
};

export const firstActiveYearBySport = (sport: SportTypes | SportTypes[], state: ActivityState): string | undefined => {
  const filtered = filterBySport(state.activities, sport);
  return filtered?.[0]?.start_date?.split('-')[0] ?? undefined;
};

/* ACTIVITY METRICS */

const totalKmBySport = (sport: SportTypes | SportTypes[], state: ActivityState): number => {
  return filterBySport(state.activities, sport).reduce((acc, activity) => {
    return acc + activity.distance / 1000; // from meters to km
  }, 0);
};

const totalKmBySportAndDate = (sport: SportTypes | SportTypes[], dateSection: DateSection) =>
  createSelector([activitiesBySportAndDate(sport, dateSection)], filteredByDateRides => {
    return filteredByDateRides.reduce((acc, activity) => {
      return acc + activity.distance / 1000; // from meters to km
    }, 0);
  });

const totalElevationInMetersBySport = (sport: SportTypes | SportTypes[], state: ActivityState): number => {
  return filterBySport(state.activities, sport).reduce((acc, activity) => {
    return acc + activity.total_elevation_gain;
  }, 0);
};

const totalElevationInMetersBySportAndDate = (sport: SportTypes | SportTypes[], dateSection: DateSection) =>
  createSelector([activitiesBySportAndDate(sport, dateSection)], filteredByDateRides => {
    return filteredByDateRides.reduce((acc, activity) => {
      return acc + activity.total_elevation_gain;
    }, 0);
  });

const totalDurationInHoursBySport = (sport: SportTypes | SportTypes[], state: ActivityState): number => {
  return filterBySport(state.activities, sport).reduce((acc, activity) => {
    return acc + activity.moving_time / 3600; // from seconds to hours
  }, 0);
};

const totalDurationInHoursBySportAndDate = (sport: SportTypes | SportTypes[], dateSection: DateSection) =>
  createSelector([activitiesBySportAndDate(sport, dateSection)], filteredByDateRides => {
    return filteredByDateRides.reduce((acc, activity) => {
      return acc + activity.moving_time / 3600; // from seconds to hours
    }, 0);
  });

const totalActivitiesBySport = (sport: SportTypes | SportTypes[], state: ActivityState): number => {
  return filterBySport(state.activities, sport).length;
};

const totalActivitiesBySportAndDateSplitByMonth = (sport: SportTypes | SportTypes[], dateSection: DateSection) =>
  createSelector(
    [activitiesBySportAndDate(sport, dateSection)],
    (filteredByDateRides): { month: string; activities: number }[] => {
      return filteredByDateRides.reduce(
        (acc, activity) => {
          const month = activity.start_date.split('-')[1];
          const monthName = getMonthName(Number(month));

          const isCurrentYear = new Date().getFullYear() === Number(activity.start_date.split('-')[0]);
          const finalMonth = isCurrentYear ? Number(month) : 12;
          for (let i = 1; i <= finalMonth; i++) {
            const monthName = getMonthName(i);
            if (!acc.find(m => m.month === monthName)) {
              acc.push({ month: monthName, activities: 0 });
            }
          }

          const existingMonth = acc.find(m => m.month === monthName);
          if (existingMonth) {
            existingMonth.activities++;
          } else {
            acc.push({ month: monthName, activities: 1 });
          }
          return acc;
        },
        [] as { month: string; activities: number }[],
      );
    },
  );

const totalKmBySportAndDateSplitByMonth = (sport: SportTypes | SportTypes[], dateSection: DateSection) =>
  createSelector(
    [activitiesBySportAndDate(sport, dateSection)],
    (filteredByDateRides): { month: string; km: number }[] => {
      return filteredByDateRides.reduce(
        (acc, activity) => {
          const month = activity.start_date.split('-')[1];
          const monthName = getMonthName(Number(month));

          const isCurrentYear = new Date().getFullYear() === Number(activity.start_date.split('-')[0]);
          const finalMonth = isCurrentYear ? Number(month) : 12;
          for (let i = 1; i <= finalMonth; i++) {
            const monthName = getMonthName(i);
            if (!acc.find(m => m.month === monthName)) {
              acc.push({ month: monthName, km: 0 });
            }
          }

          const existingMonth = acc.find(m => m.month === monthName);
          if (existingMonth) {
            existingMonth.km += Number((activity.distance / 1000).toFixed(0));
          } else {
            acc.push({
              month: monthName,
              km: Number((activity.distance / 1000).toFixed(0)),
            });
          }
          return acc;
        },
        [] as { month: string; km: number }[],
      );
    },
  );

const totalElevationInMetersBySportAndDateSplitByMonth = (sport: SportTypes | SportTypes[], dateSection: DateSection) =>
  createSelector(
    [activitiesBySportAndDate(sport, dateSection)],
    (filteredByDateRides): { month: string; meters: number }[] => {
      return filteredByDateRides.reduce(
        (acc, activity) => {
          const month = activity.start_date.split('-')[1];
          const monthName = getMonthName(Number(month));

          const isCurrentYear = new Date().getFullYear() === Number(activity.start_date.split('-')[0]);
          const finalMonth = isCurrentYear ? Number(month) : 12;
          for (let i = 1; i <= finalMonth; i++) {
            const monthName = getMonthName(i);
            if (!acc.find(m => m.month === monthName)) {
              acc.push({ month: monthName, meters: 0 });
            }
          }

          const existingMonth = acc.find(m => m.month === monthName);
          if (existingMonth) {
            existingMonth.meters += Number(activity.total_elevation_gain.toFixed(0));
          } else {
            acc.push({
              month: monthName,
              meters: Number(activity.total_elevation_gain.toFixed(0)),
            });
          }
          return acc;
        },
        [] as { month: string; meters: number }[],
      );
    },
  );

const totalActivitiesBySportAndDateSplitByWeek = (sport: SportTypes | SportTypes[], dateSection: DateSection) =>
  createSelector(
    [activitiesBySportAndDate(sport, dateSection)],
    (filteredByDateRides): { week: string; activities: number }[] => {
      const result = filteredByDateRides.reduce(
        (acc, activity) => {
          const weeksFromToday = getFourWeeksFromToday();

          for (const week in weeksFromToday) {
            if (!acc.find(w => w.week === week)) {
              acc.push({ week, activities: 0 });
            }
            if (
              new Date(activity.start_date) >= new Date(weeksFromToday[week].from) &&
              new Date(activity.start_date) <= new Date(weeksFromToday[week].to)
            ) {
              const existingWeek = acc.find(w => w.week === week);
              if (existingWeek) {
                existingWeek.activities++;
              } else {
                acc.push({ week, activities: 1 });
              }
            }
          }
          return acc;
        },
        [] as { week: string; activities: number }[],
      );
      return result;
    },
  );

const totalKmBySportAndDateSplitByWeek = (sport: SportTypes | SportTypes[], dateSection: DateSection) =>
  createSelector(
    [activitiesBySportAndDate(sport, dateSection)],
    (filteredByDateRides): { week: string; km: number }[] => {
      const result = filteredByDateRides.reduce(
        (acc, activity) => {
          const weeksFromToday = getFourWeeksFromToday();

          for (const week in weeksFromToday) {
            if (!acc.find(w => w.week === week)) {
              acc.push({ week, km: 0 });
            }

            if (
              new Date(activity.start_date) >= new Date(weeksFromToday[week].from) &&
              new Date(activity.start_date) <= new Date(weeksFromToday[week].to)
            ) {
              const existingWeek = acc.find(w => w.week === week);
              if (existingWeek) {
                existingWeek.km += Number((activity.distance / 1000).toFixed(0));
              } else {
                acc.push({ week, km: Number((activity.distance / 1000).toFixed(0)) });
              }
            }
          }
          return acc;
        },
        [] as { week: string; km: number }[],
      );
      return result;
    },
  );

const totalElevationBySportAndDateInMetersSplitByWeek = (sport: SportTypes | SportTypes[], dateSection: DateSection) =>
  createSelector(
    [activitiesBySportAndDate(sport, dateSection)],
    (filteredByDateRides): { week: string; meters: number }[] => {
      const result = filteredByDateRides.reduce(
        (acc, activity) => {
          const weeksFromToday = getFourWeeksFromToday();

          for (const week in weeksFromToday) {
            if (!acc.find(w => w.week === week)) {
              acc.push({ week, meters: 0 });
            }

            if (
              new Date(activity.start_date) >= new Date(weeksFromToday[week].from) &&
              new Date(activity.start_date) <= new Date(weeksFromToday[week].to)
            ) {
              const existingWeek = acc.find(w => w.week === week);
              if (existingWeek) {
                existingWeek.meters += Number(activity.total_elevation_gain.toFixed(0));
              } else {
                acc.push({ week, meters: Number(activity.total_elevation_gain.toFixed(0)) });
              }
            }
          }
          return acc;
        },
        [] as { week: string; meters: number }[],
      );
      return result;
    },
  );

const averageKmBySport = createSelector(
  [totalKmBySport, totalActivitiesBySport],
  (totalKm, totalActivities): number => {
    return totalKm / totalActivities;
  },
);

const averageSpeedKmPerHourBySport = createSelector(
  [totalKmBySport, totalDurationInHoursBySport],
  (totalKm, totalDurationInHours): number => {
    return totalKm / totalDurationInHours;
  },
);

const maxSpeedKmPerHourBySport = (sport: SportTypes | SportTypes[], state: ActivityState): number => {
  const maxSpeed = filterBySport(state.activities, sport).reduce((acc, activity) => {
    return Math.max(acc, activity.max_speed);
  }, 0);
  return maxSpeed;
};

const maxElevationInMetersBySport = (sport: SportTypes | SportTypes[], state: ActivityState): number => {
  const maxElevation = filterBySport(state.activities, sport).reduce((acc, activity) => {
    return Math.max(acc, activity.elev_high ?? 0);
  }, 0);
  return maxElevation;
};

const maxDurationInHoursBySport = (sport: SportTypes | SportTypes[], state: ActivityState): number => {
  const maxDuration = filterBySport(state.activities, sport).reduce((acc, activity) => {
    return Math.max(acc, activity.moving_time / 3600); // from seconds to hours
  }, 0);
  return maxDuration;
};

const maxDistanceKmBySport = (sport: SportTypes | SportTypes[], state: ActivityState): number => {
  return filterBySport(state.activities, sport).reduce((acc, activity) => {
    return Math.max(acc, activity.distance / 1000);
  }, 0);
};

const ridesCountBetweenOneHundredAndTwoHundredKm = (state: ActivityState): number => {
  return filterBySport(state.activities, rideSports).filter(
    activity => activity.distance > 100000 && activity.distance < 200000,
  ).length;
};

const ridesCountWithMoreThanTwoHundredKm = (state: ActivityState): number => {
  return filterBySport(state.activities, rideSports).filter(activity => activity.distance > 200000).length;
};

const activeDaysCountBySport = (sport: SportTypes | SportTypes[], state: ActivityState): number => {
  const uniqueDays = new Set(filterBySport(state.activities, sport).map(activity => activity.start_date));
  return uniqueDays.size;
};

const highestCountOfConsecutiveActiveDaysBySport = (sport: SportTypes | SportTypes[], state: ActivityState): number => {
  const activitiesSortedByDate = filterBySport(state.activities, sport).sort((a, b) => {
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
  });

  const consecutiveDays = [];

  for (let i = 0; i < activitiesSortedByDate.length; i++) {
    const currentDate = new Date(activitiesSortedByDate[i].start_date);
    // if the last activity, break
    if (i === activitiesSortedByDate.length - 1) {
      break;
    }
    const nextDate = new Date(activitiesSortedByDate[i + 1].start_date);

    if (nextDate.getTime() - currentDate.getTime() === 24 * 60 * 60 * 1000) {
      consecutiveDays.push(currentDate);
    }
  }

  return consecutiveDays.length;
};

const sortedDistancesKmBySport = (sport: SportTypes | SportTypes[], state: ActivityState): number[] => {
  return filterBySport(state.activities, sport)
    .map(activity => activity.distance / 1000)
    .sort((a, b) => b - a);
};

const eddingtonMetrics = (
  state: ActivityState,
): {
  eddington: number;
  nextEddington: number;
  activitiesNeeded: number;
  previousEddington: number;
} => {
  // E is the largest integer such that there are at least E activities with more than E km
  // For example, if there are 10 activities with more than 10 km, the eddington number is 10
  const distancesKm = sortedDistancesKmBySport(rideSports, state);

  let E = 0;
  for (let i = 0; i < distancesKm.length; i++) {
    const dist = distancesKm[i];
    const rank = i + 1;
    if (dist >= rank) {
      E = rank;
    } else {
      break;
    }
  }

  // The nextEddington is the highest eddington number such that there are at least E activities with more than E km
  const nextE = E + 1;
  const countNextE = distancesKm.filter(d => d >= nextE).length;

  const activitiesNeeded = nextE - countNextE > 0 ? nextE - countNextE : 0;

  // The previous Eddington is the second highest eddington number such that there are at least E activities with more than E km
  let previousE = E - 1;
  const countPreviousE = distancesKm.filter(d => d >= previousE).length;
  if (countPreviousE < previousE) {
    previousE = 0;
  }

  return {
    eddington: E,
    nextEddington: nextE,
    activitiesNeeded,
    previousEddington: E - 1,
  };
};

export const rideAllTimesMetrics = createSelector(
  (state: ActivityState) => state,
  state => {
    return {
      totalKm: totalKmBySport(rideSports, state),
      totalElevationInMeters: totalElevationInMetersBySport(rideSports, state),
      totalDurationInHours: totalDurationInHoursBySport(rideSports, state),
      totalActivities: totalActivitiesBySport(rideSports, state),
      averageKm: averageKmBySport(rideSports, state),
      averageSpeedKmPerHour: averageSpeedKmPerHourBySport(rideSports, state),
      maxSpeedKmPerHour: maxSpeedKmPerHourBySport(rideSports, state),
      maxElevationInMeters: maxElevationInMetersBySport(rideSports, state),
      maxDurationInHours: maxDurationInHoursBySport(rideSports, state),
      maxDistanceKm: maxDistanceKmBySport(rideSports, state),
      activiesCountBetweenOneHundredAndTwoHundredKm: ridesCountBetweenOneHundredAndTwoHundredKm(state),
      activiesCountWithMoreThanTwoHundredKm: ridesCountWithMoreThanTwoHundredKm(state),
      activeDaysCount: activeDaysCountBySport(rideSports, state),
      highestCountOfConsecutiveActiveDays: highestCountOfConsecutiveActiveDaysBySport(rideSports, state),
      eddingtonMetrics: eddingtonMetrics(state),
    };
  },
);

export const rideFilteredByDateMetrics = (dateSection: DateSection) =>
  createSelector(
    (state: ActivityState) => state,
    state => {
      return {
        totalActivities: activitiesBySportAndDate(rideSports, dateSection)(state),
        totalKm: totalKmBySportAndDate(rideSports, dateSection)(state),
        totalElevationInMeters: totalElevationInMetersBySportAndDate(rideSports, dateSection)(state),
        totalDurationInHours: totalDurationInHoursBySportAndDate(rideSports, dateSection)(state),
        totalActivitiesSplitByWeek: totalActivitiesBySportAndDateSplitByWeek(
          rideSports,
          DateSection.PastFourWeeks,
        )(state),
        totalKmByDateSplitByWeek: totalKmBySportAndDateSplitByWeek(rideSports, DateSection.PastFourWeeks)(state),
        totalElevationInMetersSplitByWeek: totalElevationBySportAndDateInMetersSplitByWeek(
          rideSports,
          DateSection.PastFourWeeks,
        )(state),
        totalActivitiesSplitByMonth: totalActivitiesBySportAndDateSplitByMonth(rideSports, dateSection)(state),
        totalKmByDateSplitByMonth: totalKmBySportAndDateSplitByMonth(rideSports, dateSection)(state),
        totalElevationInMetersSplitByMonth: totalElevationInMetersBySportAndDateSplitByMonth(
          rideSports,
          dateSection,
        )(state),
      };
    },
  );
