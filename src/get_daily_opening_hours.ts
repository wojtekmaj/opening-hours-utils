import getOpeningHours from './get_opening_hours.js';
import { getDayDiff, getWeekday, getWeekdayName, isRecurringOpeningHours } from './utils.js';

import type {
  DayGroups,
  HourGroups,
  RecurringOpeningHours,
  Weekday,
  WeekdayName,
} from './types.js';

function getDailyOpeningHours(openingHoursString: ''): null;
function getDailyOpeningHours(openingHoursString: string): DayGroups;
function getDailyOpeningHours(openingHoursString: string): DayGroups | null {
  if (typeof openingHoursString === 'undefined' || openingHoursString === null) {
    throw new Error('openingHoursString is required');
  }

  if (openingHoursString === '') {
    return null;
  }

  const openingHoursArray = getOpeningHours(openingHoursString);

  const dailyOpeningHoursMap = new Map<WeekdayName, HourGroups>();

  for (const dayGroup of openingHoursArray) {
    // Only process recurring opening hours, skip absolute dates
    if (!isRecurringOpeningHours(dayGroup)) {
      continue;
    }

    const recurringDayGroup = dayGroup as RecurringOpeningHours;
    const from = getWeekday(recurringDayGroup.from);
    const to = getWeekday(recurringDayGroup.to);

    const dayDiff = getDayDiff(from, to);
    const numberOfDays = dayDiff + 1;

    for (let i = 0; i < numberOfDays; i++) {
      const day = ((from + i) % 7) as Weekday;

      dailyOpeningHoursMap.set(getWeekdayName(day), recurringDayGroup.hours);
    }
  }

  const dailyOpeningHoursArray = [];

  for (const [day, hours] of dailyOpeningHoursMap.entries()) {
    dailyOpeningHoursArray.push({
      day,
      hours,
    });
  }

  return dailyOpeningHoursArray;
}

export default getDailyOpeningHours;
