import getOpeningHours from './get_opening_hours';

import { getDay, getDayDiff, getWeekday } from './utils';

export default function getDailyOpeningHours(openingHoursString) {
  const openingHoursArray = getOpeningHours(openingHoursString);

  if (!openingHoursArray) {
    return null;
  }

  const dailyOpeningHoursObject = {};

  openingHoursArray.forEach((dayGroup) => {
    const from = getDay(dayGroup.from);
    const to = getDay(dayGroup.to);

    const dayDiff = getDayDiff(from, to);
    const numberOfDays = dayDiff + 1;

    for (let i = 0; i < numberOfDays; i++) {
      const day = (from + i) % 7;

      dailyOpeningHoursObject[getWeekday(day)] = dayGroup.hours;
    }
  });

  const dailyOpeningHoursArray = Object.entries(dailyOpeningHoursObject).map(([day, hours]) => ({
    day,
    hours,
  }));

  return dailyOpeningHoursArray;
}
