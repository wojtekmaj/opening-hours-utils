import { WEEKDAY_NAMES } from './constants.js';

import type { DayGroups, Hour, HourGroups, Weekday, WeekdayName, ZeroToSix } from './types.js';

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

export function getWeekday(weekdayName: WeekdayName): Weekday {
  const weekdayNamesEntry = Object.entries(WEEKDAY_NAMES).find(
    ([, value]) => value === weekdayName,
  );

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

  const [hoursString, minutesString] = hour.split(':');

  const hours = Number(hoursString);
  const minutes = Number(minutesString);

  return hours >= 0 && hours <= 48 && minutes >= 0 && minutes <= 59;
}

export function isValidWeekdayName(weekday: unknown): weekday is WeekdayName {
  return Object.values(WEEKDAY_NAMES).includes(weekday as WeekdayName);
}
