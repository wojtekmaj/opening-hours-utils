import getDailyOpeningHours from './get_daily_opening_hours.js';

import {
  getMinutesFromMidnightFromDate,
  getMinutesFromMidnightFromString,
  getWeekday,
} from './utils.js';

import type { HolidayCheckers, Weekday } from './types.js';

function getIsOpenAt(openingHoursString: '', date: Date, holidayCheckers?: HolidayCheckers): null;
function getIsOpenAt(
  openingHoursString: 'off',
  date: Date,
  holidayCheckers?: HolidayCheckers,
): true;
function getIsOpenAt(
  openingHoursString: '24/7',
  date: Date,
  holidayCheckers?: HolidayCheckers,
): true;
function getIsOpenAt(
  openingHoursString: 'open',
  date: Date,
  holidayCheckers?: HolidayCheckers,
): true;
function getIsOpenAt(
  openingHoursString: string,
  date: Date,
  holidayCheckers?: HolidayCheckers,
): boolean;
function getIsOpenAt(
  openingHoursString: string,
  date: Date,
  holidayCheckers?: HolidayCheckers,
): boolean | null {
  const { isPublicHoliday, isSchoolHoliday } = holidayCheckers || {};

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

  const dailyOpeningHoursArray = getDailyOpeningHours(openingHoursString);

  const day = date.getDay() as Weekday;

  const dayGroups = dailyOpeningHoursArray.filter((dayGroup) => {
    if (dayGroup.day === 'PH') {
      if (!isPublicHoliday) {
        throw new Error('isPublicHoliday function is required for public holidays');
      }

      return isPublicHoliday(date);
    }

    if (dayGroup.day === 'SH') {
      if (!isSchoolHoliday) {
        throw new Error('isSchoolHoliday function is required for school holidays');
      }

      return isSchoolHoliday(date);
    }

    return getWeekday(dayGroup.day) === day;
  });

  if (!dayGroups.length) {
    return false;
  }

  const minutesFromMidnight = getMinutesFromMidnightFromDate(date);

  for (const dayGroup of dayGroups) {
    for (const hourRange of dayGroup.hours) {
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
  }

  return false;
}

export default getIsOpenAt;
