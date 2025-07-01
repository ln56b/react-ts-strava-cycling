import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatLargeNumber(number: number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
