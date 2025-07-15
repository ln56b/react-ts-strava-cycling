export type ActivityType = 'cycling' | 'running' | 'hiking';

export type Filters = {
	[dateSection: string]: {
		dates: {
			from: string;
			to: string;
		};
	};
};

export type DateType =
	| 'calendarYear'
	| 'fullYear'
	| 'pastFourWeeks'
	| 'allTime';

export enum DateSection {
	CalendarYear = 'calendarYear',
	FullYear = 'fullYear',
	PastFourWeeks = 'pastFourWeeks',
}
