import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatLargeNumber(number: number): string {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getMonthName(month: number): string {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	return months[month - 1];
}

export function toEpoch(date: Date): number {
	return Math.floor(date.getTime() / 1000);
}

export function getCurrentYear(): string {
	return new Date().getFullYear().toString();
}

export function lastFourWeeksDay(): string {
	return new Date(Date.now() - 4 * 7 * 24 * 60 * 60 * 1000).toISOString();
}

export function firstDayOfYear(year: string): string {
	return new Date(Number(year), 0, 1).toISOString();
}

export function lastDayOfYear(year: string): string {
	return new Date(Number(year), 11, 31).toISOString();
}

export function oneYearAgoDay(): string {
	return new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
}

export function yearsFromStringDateUntilNow(date: string): string[] {
	const years = [];
	for (
		let year = Number(date.split('-')[0]);
		year <= new Date().getFullYear();
		year++
	) {
		years.push(year.toString());
	}
	return years;
}
