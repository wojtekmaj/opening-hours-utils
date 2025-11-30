import { MONTH_NAMES, WEEKDAY_NAMES } from './constants.js';

import type {
  AbsoluteDate,
  AbsoluteOpeningHours,
  DayGroups,
  Hour,
  HourGroups,
  MonthName,
  OpeningHours,
  RecurringOpeningHours,
  Weekday,
  WeekdayName,
  ZeroToSix,
} from './types.js';

export function getDayDiff(from: Weekday, to: Weekday): ZeroToSix {
  return ((7 + (to - from)) % 7) as ZeroToSix;
}

export function getHourGroups(dayGroups: DayGroups): HourGroups {
  return dayGroups.reduce<HourGroups>((acc, dayGroup) => {
    return acc.concat(dayGroup.hours);
  }, []);
}

export function getMinutesFromMidnightFromDate(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function getMinutesFromMidnightFromString(hour: Hour): number {
  const [hours, minutes] = hour.split(':');

  return Number(hours) * 60 + Number(minutes);
}

const weekdayNamesEntries = Object.entries(WEEKDAY_NAMES);

export function getWeekday(weekdayName: WeekdayName): Weekday {
  const weekdayNamesEntry = weekdayNamesEntries.find(([, value]) => value === weekdayName);

  if (!weekdayNamesEntry) {
    throw new Error(`Invalid weekday name: ${weekdayName}`);
  }

  return Number(weekdayNamesEntry[0]) as Weekday;
}

export function getWeekdayName(weekday: Weekday): WeekdayName {
  return WEEKDAY_NAMES[weekday];
}

export function isValidHour(hour: unknown): hour is Hour {
  if (!hour || typeof hour !== 'string') {
    return false;
  }

  return hour.match(/^(0?[0-9]|[123][0-9]|4[0-8]):[0-5][0-9]$/) !== null;
}

const weekdayNamesValues = Object.values(WEEKDAY_NAMES);

export function isValidWeekdayName(weekday: unknown): weekday is WeekdayName {
  return weekdayNamesValues.includes(weekday as WeekdayName);
}

const monthNamesValues = Object.values(MONTH_NAMES);
const monthNamesEntries = Object.entries(MONTH_NAMES);

export function isValidMonthName(month: unknown): month is MonthName {
  return monthNamesValues.includes(month as MonthName);
}

export function getMonthIndex(monthName: MonthName): number {
  const monthNamesEntry = monthNamesEntries.find(([, value]) => value === monthName);

  if (!monthNamesEntry) {
    throw new Error(`Invalid month name: ${monthName}`);
  }

  return Number(monthNamesEntry[0]);
}

// Maximum days per month (for validation, not accounting for leap years)
const MAX_DAYS_PER_MONTH: Record<MonthName, number> = {
  Jan: 31,
  Feb: 29, // Allow 29 for leap years
  Mar: 31,
  Apr: 30,
  May: 31,
  Jun: 30,
  Jul: 31,
  Aug: 31,
  Sep: 30,
  Oct: 31,
  Nov: 30,
  Dec: 31,
};

export function isValidDayOfMonth(day: number, month: MonthName): boolean {
  if (!Number.isInteger(day) || day < 1) {
    return false;
  }

  const maxDays = MAX_DAYS_PER_MONTH[month];

  return day <= maxDays;
}

// Pattern to match absolute date strings like "Jan 26" or "Apr 13"
const absoluteDatePattern = /^([A-Z][a-z]{2})\s+(\d+)$/;
const absoluteDateStartPattern = /^[A-Z][a-z]{2}\s+\d/;

export function isAbsoluteDate(value: string): boolean {
  return absoluteDatePattern.test(value);
}

export function startsWithAbsoluteDate(value: string): boolean {
  return absoluteDateStartPattern.test(value);
}

export function isRecurringOpeningHours(
  openingHours: OpeningHours,
): openingHours is RecurringOpeningHours {
  return isValidWeekdayName(openingHours.from) && isValidWeekdayName(openingHours.to);
}

export function isAbsoluteOpeningHours(
  openingHours: OpeningHours,
): openingHours is AbsoluteOpeningHours {
  return isAbsoluteDate(openingHours.from) && isAbsoluteDate(openingHours.to);
}

export function matchesAbsoluteDate(date: Date, absoluteDate: AbsoluteDate): boolean {
  const match = absoluteDate.match(absoluteDatePattern);

  if (!match?.[1] || !match[2]) {
    return false;
  }

  const monthName = match[1] as MonthName;
  const day = Number.parseInt(match[2], 10);
  const month = getMonthIndex(monthName);

  return date.getMonth() === month && date.getDate() === day;
}

export function getMatchingAbsoluteDate(
  date: Date,
  absoluteOpeningHours: AbsoluteOpeningHours,
): AbsoluteDate | undefined {
  if (matchesAbsoluteDate(date, absoluteOpeningHours.from)) {
    return absoluteOpeningHours.from;
  }

  if (matchesAbsoluteDate(date, absoluteOpeningHours.to)) {
    return absoluteOpeningHours.to;
  }

  return undefined;
}
