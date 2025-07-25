import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m `;
}

export function formatLargeNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function getMonthName(month: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month - 1];
}

export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}

export function getFourWeeksFromToday(): { [string: string]: { from: string; to: string } } {
  const weeksFromToday: { [string: string]: { from: string; to: string } } = {};

  for (let i = 3; i >= 0; i--) {
    const from = new Date(new Date().setDate(new Date().getDate() - 7 * (i + 1)));
    const to = new Date(new Date().setDate(new Date().getDate() - 7 * i));
    const formattedFrom = `${from.toISOString().slice(0, 10).split('-')[2]}/${from.toISOString().slice(0, 10).split('-')[1]}`;
    const formattedTo = `${to.toISOString().slice(0, 10).split('-')[2]}/${to.toISOString().slice(0, 10).split('-')[1]}`;
    weeksFromToday[`${formattedFrom}-${formattedTo}`] = {
      from: from.toISOString(),
      to: to.toISOString(),
    };
  }

  return weeksFromToday;
}

export function lastFourWeeksMonday(): string {
  const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);
  const dayOfWeek = fourWeeksAgo.getDay();
  const daysToNextMonday = (7 - dayOfWeek) % 7; // Sunday at midnight

  fourWeeksAgo.setDate(fourWeeksAgo.getDate() + daysToNextMonday);

  return fourWeeksAgo.toISOString();
}

export function firstDayOfYear(year: string): string {
  return new Date(Number(year), 0, 1).toISOString();
}

export function lastDayOfYear(year: string): string {
  return new Date(Number(year), 11, 31).toISOString();
}

export function sameDayInPreviousYear(year: string): string {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();

  const previousYear = Number(year) - 1;
  const previousYearDate = new Date(previousYear, month, day);
  return previousYearDate.toISOString();
}

export function formatDateForSelector(date: string): string {
  return new Date(date).toISOString().split('T')[0].split('-').reverse().join('-');
}

export function yearsFromStringDateUntilNow(date: string): string[] {
  const years = [];
  for (let year = Number(date.split('-')[0]); year <= new Date().getFullYear(); year++) {
    years.push(year.toString());
  }
  return years.reverse();
}

export function ddMmYyyyToIsoString(dateStr: string): string {
  const [day, month, year] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toISOString();
}
