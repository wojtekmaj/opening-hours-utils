import getDailyOpeningHours from './get_daily_opening_hours.js';
import getOpeningHours from './get_opening_hours.js';
import {
  getMatchingAbsoluteDate,
  getMinutesFromMidnightFromDate,
  getMinutesFromMidnightFromString,
  getWeekday,
  isAbsoluteOpeningHours,
} from './utils.js';

import type { HourGroups, Weekday } from './types.js';

function checkHourGroupsForOpenStatus(
  hourGroups: HourGroups,
  minutesFromMidnight: number,
): boolean | null {
  for (const hourRange of hourGroups) {
    const { from, to } = hourRange;

    const fromMinutes = getMinutesFromMidnightFromString(from);

    if (fromMinutes > minutesFromMidnight) {
      continue;
    }

    if (!to) {
      return null;
    }

    const toMinutes = getMinutesFromMidnightFromString(to);

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
  const openingHoursArray = getOpeningHours(openingHoursString);

  for (const openingHours of openingHoursArray) {
    if (!isAbsoluteOpeningHours(openingHours)) {
      continue;
    }

    const matchingDate = getMatchingAbsoluteDate(date, openingHours);

    if (!matchingDate) {
      continue;
    }

    const result = checkHourGroupsForOpenStatus(openingHours.hours, minutesFromMidnight);

    // If absolute hours are found, return boolean early, otherwise continue to check recurring hours
    if (result !== null) {
      return result;
    }
  }

  const dailyOpeningHoursArray = getDailyOpeningHours(openingHoursString);
  const day = date.getDay() as Weekday;
  const dayGroups = dailyOpeningHoursArray.filter((dayGroup) => getWeekday(dayGroup.day) === day);

  if (!dayGroups.length) {
    return false;
  }

  for (const dayGroup of dayGroups) {
    const result = checkHourGroupsForOpenStatus(dayGroup.hours, minutesFromMidnight);

    return result;
  }

  return false;
}

export default getIsOpenAt;
