import { ActivityState } from './activitiesStore';
import { createSelector } from 'reselect';

const totalKm = (state: ActivityState) => {
	return state.activities.reduce((acc, activity) => {
		return acc + activity.distance / 1000; // from meters to km
	}, 0);
};

const totalElevationInMeters = (state: ActivityState) => {
	return state.activities.reduce((acc, activity) => {
		return acc + activity.total_elevation_gain;
	}, 0);
};

const totalDurationInHours = (state: ActivityState) => {
	return state.activities.reduce((acc, activity) => {
		return acc + activity.moving_time / 3600; // from seconds to hours
	}, 0);
};

const totalActivities = (state: ActivityState) => {
	return state.activities.length;
};

const averageKm = createSelector(
	[totalKm, totalActivities],
	(totalKm, totalActivities) => {
		return totalKm / totalActivities;
	}
);

const averageElevationInMeters = createSelector(
	[totalElevationInMeters, totalActivities],
	(totalElevationInMeters, totalActivities) => {
		return totalElevationInMeters / totalActivities;
	}
);

const averageDurationInHours = createSelector(
	[totalDurationInHours, totalActivities],
	(totalDurationInHours, totalActivities) => {
		return totalDurationInHours / totalActivities;
	}
);

const averageSpeedKmPerHour = createSelector(
	[totalKm, totalDurationInHours],
	(totalKm, totalDurationInHours) => {
		return totalKm / totalDurationInHours;
	}
);

const maxSpeedKmPerHour = (state: ActivityState) => {
	const maxSpeed = state.activities.reduce((acc, activity) => {
		return Math.max(acc, activity.max_speed);
	}, 0);
	return maxSpeed * 3.6;
};

const maxElevationInMeters = (state: ActivityState) => {
	const maxElevation = state.activities.reduce((acc, activity) => {
		return Math.max(acc, activity.elev_high);
	}, 0);
	return maxElevation;
};

const maxDurationInHours = (state: ActivityState) => {
	const maxDuration = state.activities.reduce((acc, activity) => {
		return Math.max(acc, activity.moving_time / 3600); // from seconds to hours
	}, 0);
	return maxDuration;
};

const activiesCountBetweenOneHundredAndTwoHundredKm = (
	state: ActivityState
) => {
	return state.activities.filter(
		(activity) => activity.distance > 100000 && activity.distance < 200000
	).length;
};

const activiesCountWithMoreThanTwoHundredKm = (state: ActivityState) => {
	return state.activities.filter((activity) => activity.distance > 200000)
		.length;
};

const activeDaysCount = (state: ActivityState) => {
	const uniqueDays = new Set(
		state.activities.map((activity) => activity.start_date)
	);
	return uniqueDays.size;
};

const highestCountOfConsecutiveActiveDays = (state: ActivityState) => {
	const activitiesSortedByDate = state.activities.sort((a, b) => {
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

const sortedDistancesKm = (state: ActivityState) => {
	return state.activities
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

export const memoizedMetrics = createSelector(
	(state: ActivityState) => state,
	(state) => {
		return {
			totalKm: totalKm(state),
			totalElevationInMeters: totalElevationInMeters(state),
			totalDurationInHours: totalDurationInHours(state),
			totalActivities: totalActivities(state),
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
