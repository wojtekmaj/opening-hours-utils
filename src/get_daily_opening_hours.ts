import getOpeningHours from './get_opening_hours';

import { getDayDiff, getWeekday, getWeekdayName } from './utils';

import type { DayGroups, HourGroups, Weekday, WeekdayName } from './types';

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

  openingHoursArray.forEach((dayGroup) => {
    const from = getWeekday(dayGroup.from);
    const to = getWeekday(dayGroup.to);

    const dayDiff = getDayDiff(from, to);
    const numberOfDays = dayDiff + 1;

    for (let i = 0; i < numberOfDays; i++) {
      const day = ((from + i) % 7) as Weekday;

      dailyOpeningHoursMap.set(getWeekdayName(day), dayGroup.hours);
    }
  });

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
