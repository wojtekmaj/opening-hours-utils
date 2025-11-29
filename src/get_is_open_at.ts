import getDailyOpeningHours from './get_daily_opening_hours.js';
import getOpeningHours from './get_opening_hours.js';
import {
  getMinutesFromMidnightFromDate,
  getMinutesFromMidnightFromString,
  getWeekday,
  isAbsoluteOpeningHours,
  matchesAbsoluteDate,
} from './utils.js';

import type { HourGroups, Weekday } from './types.js';

function checkHourGroupsForOpenStatus(
  hourGroups: HourGroups,
  minutesFromMidnight: number,
): boolean | null {
  for (const hourRange of hourGroups) {
    const { from, to } = hourRange;

    const fromMinutes = getMinutesFromMidnightFromString(from);

    // Not yet open
    if (fromMinutes > minutesFromMidnight) {
      continue;
    }

    // Unspecified closing time - we can't be sure if it's open or closed
    if (!to) {
      return null;
    }

    const toMinutes = getMinutesFromMidnightFromString(to);

    // Already closed
    if (toMinutes < minutesFromMidnight) {
      continue;
    }

    return true;
  }

  return false;
}

function getIsOpenAt(openingHoursString: '', date: Date): null;
function getIsOpenAt(openingHoursString: 'off', date: Date): true;
function getIsOpenAt(openingHoursString: '24/7', date: Date): true;
function getIsOpenAt(openingHoursString: 'open', date: Date): true;
function getIsOpenAt(openingHoursString: string, date: Date): boolean;
function getIsOpenAt(openingHoursString: string, date: Date): boolean | null {
  if (typeof openingHoursString === 'undefined' || openingHoursString === null) {
    throw new Error('openingHoursString is required');
  }

  if (!date) {
    throw new Error('date is required');
  }

  if (openingHoursString === '') {
    return null;
  }

  if (openingHoursString === 'off') {
    return false;
  }

  if (openingHoursString === '24/7' || openingHoursString === 'open') {
    return true;
  }

  const minutesFromMidnight = getMinutesFromMidnightFromDate(date);

  // First, check for absolute dates that match
  const openingHoursArray = getOpeningHours(openingHoursString);
  for (const openingHours of openingHoursArray) {
    if (isAbsoluteOpeningHours(openingHours) && matchesAbsoluteDate(date, openingHours.date)) {
      const result = checkHourGroupsForOpenStatus(openingHours.hours, minutesFromMidnight);
      if (result !== false) {
        return result;
      }
    }
  }

  // If no absolute date matched or it was closed, check recurring hours
  const dailyOpeningHoursArray = getDailyOpeningHours(openingHoursString);

  const day = date.getDay() as Weekday;

  const dayGroups = dailyOpeningHoursArray.filter((dayGroup) => getWeekday(dayGroup.day) === day);

  if (!dayGroups.length) {
    return false;
  }

  for (const dayGroup of dayGroups) {
    const result = checkHourGroupsForOpenStatus(dayGroup.hours, minutesFromMidnight);
    if (result !== false) {
      return result;
    }
  }

  return false;
}

export default getIsOpenAt;
