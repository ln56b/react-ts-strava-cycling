import { getMonthName } from '@/utils/utils';
import { ActivityState } from './activitiesStore';
import { createSelector } from 'reselect';
import { DateSection } from '@/interfaces/project';

export const athleteId = (state: ActivityState): number => {
	return state.cyclingRides?.[0]?.athlete?.id ?? 0;
};

export const firstRideYear = (state: ActivityState): string | undefined => {
	return state.cyclingRides?.[0]?.start_date?.split('-')[0] ?? undefined;
};

const filteredByDateRides = (dateSection: DateSection) =>
	createSelector(
		[
			(state: ActivityState) => state.cyclingRides,
			(state: ActivityState) => state.filters[dateSection],
		],
		(cyclingRides, filters) => {
			return cyclingRides.filter(
				(activity) =>
					new Date(activity.start_date) >= new Date(filters.dates.from) &&
					new Date(activity.start_date) <= new Date(filters.dates.to)
			);
		}
	);

/* ACTIVITY METRICS */

const totalKm = (state: ActivityState): number => {
	return state.cyclingRides.reduce((acc, activity) => {
		return acc + activity.distance / 1000; // from meters to km
	}, 0);
};

const totalKmByDate = (dateSection: DateSection) =>
	createSelector([filteredByDateRides(dateSection)], (filteredByDateRides) => {
		return filteredByDateRides.reduce((acc, activity) => {
			return acc + activity.distance / 1000; // from meters to km
		}, 0);
	});

const totalElevationInMeters = (state: ActivityState): number => {
	return state.cyclingRides.reduce((acc, activity) => {
		return acc + activity.total_elevation_gain;
	}, 0);
};

const totalElevationInMetersByDate = (dateSection: DateSection) =>
	createSelector([filteredByDateRides(dateSection)], (filteredByDateRides) => {
		return filteredByDateRides.reduce((acc, activity) => {
			return acc + activity.total_elevation_gain;
		}, 0);
	});

const totalDurationInHours = (state: ActivityState): number => {
	return state.cyclingRides.reduce((acc, activity) => {
		return acc + activity.moving_time / 3600; // from seconds to hours
	}, 0);
};

const totalDurationInHoursByDate = (dateSection: DateSection) =>
	createSelector([filteredByDateRides(dateSection)], (filteredByDateRides) => {
		return filteredByDateRides.reduce((acc, activity) => {
			return acc + activity.moving_time / 3600; // from seconds to hours
		}, 0);
	});

const totalActivities = (state: ActivityState): number => {
	return state.cyclingRides.length;
};

const totalActivitiesSplitByMonth = (
	state: ActivityState
): { month: string; count: number }[] => {
	return state.cyclingRides.reduce((acc, activity) => {
		const month = activity.start_date.split('-')[1];
		const monthName = getMonthName(Number(month));
		const existingMonth = acc.find((m) => m.month === monthName);
		if (existingMonth) {
			existingMonth.count++;
		} else {
			acc.push({ month: monthName, count: 1 });
		}
		return acc;
	}, [] as { month: string; count: number }[]);
};

const totalKmByDateSplitByMonth = (dateSection: DateSection) =>
	createSelector(
		[filteredByDateRides(dateSection)],
		(filteredByDateRides): { month: string; km: number }[] => {
			return filteredByDateRides.reduce((acc, activity) => {
				const month = activity.start_date.split('-')[1];
				const monthName = getMonthName(Number(month));
				const existingMonth = acc.find((m) => m.month === monthName);
				if (existingMonth) {
					existingMonth.km += Number((activity.distance / 1000).toFixed(0));
				} else {
					acc.push({
						month: monthName,
						km: Number((activity.distance / 1000).toFixed(0)),
					});
				}
				return acc;
			}, [] as { month: string; km: number }[]);
		}
	);

const totalDurationInHoursSplitByMonth = (dateSection: DateSection) =>
	createSelector(
		[filteredByDateRides(dateSection)],
		(filteredByDateRides): { month: string; hours: number }[] => {
			return filteredByDateRides.reduce((acc, activity) => {
				const month = activity.start_date.split('-')[1];
				const monthName = getMonthName(Number(month));
				const existingMonth = acc.find((m) => m.month === monthName);
				if (existingMonth) {
					existingMonth.hours += Number(
						(activity.moving_time / 3600).toFixed(0)
					); // from seconds to hours
				} else {
					acc.push({
						month: monthName,
						hours: Number((activity.moving_time / 3600).toFixed(0)),
					});
				}
				return acc;
			}, [] as { month: string; hours: number }[]);
		}
	);

const totalElevationInMetersSplitByMonth = (dateSection: DateSection) =>
	createSelector(
		[filteredByDateRides(dateSection)],
		(filteredByDateRides): { month: string; meters: number }[] => {
			return filteredByDateRides.reduce((acc, activity) => {
				const month = activity.start_date.split('-')[1];
				const monthName = getMonthName(Number(month));
				const existingMonth = acc.find((m) => m.month === monthName);
				if (existingMonth) {
					existingMonth.meters += Number(
						activity.total_elevation_gain.toFixed(0)
					);
				} else {
					acc.push({
						month: monthName,
						meters: Number(activity.total_elevation_gain.toFixed(0)),
					});
				}
				return acc;
			}, [] as { month: string; meters: number }[]);
		}
	);

const averageKm = createSelector(
	[totalKm, totalActivities],
	(totalKm, totalActivities): number => {
		return totalKm / totalActivities;
	}
);

const averageKmByDate = (dateSection: DateSection) =>
	createSelector(
		[totalKmByDate(dateSection), totalActivities],
		(totalKmByDate, totalActivities): number => {
			return totalKmByDate / totalActivities;
		}
	);

const averageElevationInMeters = createSelector(
	[totalElevationInMeters, totalActivities],
	(totalElevationInMeters, totalActivities): number => {
		return totalElevationInMeters / totalActivities;
	}
);

const averageDurationInHours = createSelector(
	[totalDurationInHours, totalActivities],
	(totalDurationInHours, totalActivities): number => {
		return totalDurationInHours / totalActivities;
	}
);

const averageDurationInHoursByDate = (dateSection: DateSection) =>
	createSelector(
		[totalDurationInHoursByDate(dateSection), totalActivities],
		(totalDurationInHoursByDate, totalActivities): number => {
			return totalDurationInHoursByDate / totalActivities;
		}
	);

const averageSpeedKmPerHour = createSelector(
	[totalKm, totalDurationInHours],
	(totalKm, totalDurationInHours): number => {
		return totalKm / totalDurationInHours;
	}
);

const maxSpeedKmPerHour = (state: ActivityState): number => {
	const maxSpeed = state.cyclingRides.reduce((acc, activity) => {
		return Math.max(acc, activity.max_speed);
	}, 0);
	return maxSpeed * 3.6;
};

const maxElevationInMeters = (state: ActivityState): number => {
	const maxElevation = state.cyclingRides.reduce((acc, activity) => {
		return Math.max(acc, activity.elev_high);
	}, 0);
	return maxElevation;
};

const maxDurationInHours = (state: ActivityState): number => {
	const maxDuration = state.cyclingRides.reduce((acc, activity) => {
		return Math.max(acc, activity.moving_time / 3600); // from seconds to hours
	}, 0);
	return maxDuration;
};

const activiesCountBetweenOneHundredAndTwoHundredKm = (
	state: ActivityState
): number => {
	return state.cyclingRides.filter(
		(activity) => activity.distance > 100000 && activity.distance < 200000
	).length;
};

const activiesCountWithMoreThanTwoHundredKm = (
	state: ActivityState
): number => {
	return state.cyclingRides.filter((activity) => activity.distance > 200000)
		.length;
};

const activeDaysCount = (state: ActivityState): number => {
	const uniqueDays = new Set(
		state.cyclingRides.map((activity) => activity.start_date)
	);
	return uniqueDays.size;
};

const highestCountOfConsecutiveActiveDays = (state: ActivityState): number => {
	const activitiesSortedByDate = state.cyclingRides.sort((a, b) => {
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

const sortedDistancesKm = (state: ActivityState): number[] => {
	return state.cyclingRides
		.map((activity) => activity.distance / 1000)
		.sort((a, b) => b - a);
};

const eddingtonMetrics = (
	state: ActivityState
): {
	eddington: number;
	nextEddington: number;
	activitiesNeeded: number;
	previousEddington: number;
} => {
	// E is the largest integer such that there are at least E activities with more than E km
	// For example, if there are 10 activities with more than 10 km, the eddington number is 10
	const distancesKm = sortedDistancesKm(state);

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
	const countNextE = distancesKm.filter((d) => d >= nextE).length;

	const activitiesNeeded = nextE - countNextE > 0 ? nextE - countNextE : 0;

	// The previous Eddington is the second highest eddington number such that there are at least E activities with more than E km
	let previousE = E - 1;
	const countPreviousE = distancesKm.filter((d) => d >= previousE).length;
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
	(state) => {
		return {
			totalKm: totalKm(state),
			totalElevationInMeters: totalElevationInMeters(state),
			totalDurationInHours: totalDurationInHours(state),
			totalActivities: totalActivities(state),
			totalActivitiesSplitByMonth: totalActivitiesSplitByMonth(state),
			averageKm: averageKm(state),
			averageElevationInMeters: averageElevationInMeters(state),
			averageDurationInHours: averageDurationInHours(state),
			averageSpeedKmPerHour: averageSpeedKmPerHour(state),
			maxSpeedKmPerHour: maxSpeedKmPerHour(state),
			maxElevationInMeters: maxElevationInMeters(state),
			maxDurationInHours: maxDurationInHours(state),
			activiesCountBetweenOneHundredAndTwoHundredKm:
				activiesCountBetweenOneHundredAndTwoHundredKm(state),
			activiesCountWithMoreThanTwoHundredKm:
				activiesCountWithMoreThanTwoHundredKm(state),
			activeDaysCount: activeDaysCount(state),
			highestCountOfConsecutiveActiveDays:
				highestCountOfConsecutiveActiveDays(state),
			eddingtonMetrics: eddingtonMetrics(state),
		};
	}
);

export const rideFilteredByDateMetrics = (dateSection: DateSection) =>
	createSelector(
		(state: ActivityState) => state,
		(state) => {
			return {
				totalActivities: filteredByDateRides(dateSection)(state),
				totalKm: totalKmByDate(dateSection)(state),
				totalElevationInMeters:
					totalElevationInMetersByDate(dateSection)(state),
				totalDurationInHours: totalDurationInHoursByDate(dateSection)(state),
				averageKm: averageKmByDate(dateSection)(state),
				averageDurationInHours:
					averageDurationInHoursByDate(dateSection)(state),
				totalKmByDateSplitByMonth:
					totalKmByDateSplitByMonth(dateSection)(state),
				totalDurationInHoursSplitByMonth:
					totalDurationInHoursSplitByMonth(dateSection)(state),
				totalElevationInMetersSplitByMonth:
					totalElevationInMetersSplitByMonth(dateSection)(state),
			};
		}
	);
