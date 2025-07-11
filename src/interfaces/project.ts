export type ActivityType = 'cycling' | 'running' | 'hiking';

export type Filters = {
	sport: ActivityType;
	dates: {
		from: string;
		to: string;
	};
};

export type DateType =
	| 'calendarYear'
	| 'pastYear'
	| 'pastFourWeeks'
	| 'allTime';
