import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatLargeNumber(number: number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getMonthName(month: number) {
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
