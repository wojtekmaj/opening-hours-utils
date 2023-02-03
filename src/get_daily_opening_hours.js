import getOpeningHours from './get_opening_hours';

import { getDayDiff, getWeekday, getWeekdayName } from './utils';

export default function getDailyOpeningHours(openingHoursString) {
  const openingHoursArray = getOpeningHours(openingHoursString);

  if (!openingHoursArray) {
    return null;
  }

  const dailyOpeningHoursObject = {};

  openingHoursArray.forEach((dayGroup) => {
    const from = getWeekday(dayGroup.from);
    const to = getWeekday(dayGroup.to);

    const dayDiff = getDayDiff(from, to);
    const numberOfDays = dayDiff + 1;

    for (let i = 0; i < numberOfDays; i++) {
      const day = (from + i) % 7;

      dailyOpeningHoursObject[getWeekdayName(day)] = dayGroup.hours;
    }
  });

  const dailyOpeningHoursArray = Object.entries(dailyOpeningHoursObject).map(([day, hours]) => ({
    day,
    hours,
  }));

  return dailyOpeningHoursArray;
}
