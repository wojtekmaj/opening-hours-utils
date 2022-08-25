import getDailyOpeningHours from './get_daily_opening_hours';

import { getDay, getMinutesFromMidnightFromDate, getMinutesFromMidnightFromString } from './utils';

export default function getIsOpenAt(openingHoursString, date) {
  if (!openingHoursString) {
    return null;
  }

  if (!date) {
    throw new Error('date is required');
  }

  if (openingHoursString === '24/7') {
    return true;
  }

  const dailyOpeningHoursArray = getDailyOpeningHours(openingHoursString);

  const day = date.getDay();

  const dayGroups = dailyOpeningHoursArray.filter((dayGroup) => getDay(dayGroup.day) === day);

  if (!dayGroups.length) {
    return false;
  }

  const minutesFromMidnight = getMinutesFromMidnightFromDate(date);

  return dayGroups.some((dayGroup) =>
    dayGroup.hours.some((hourRange) => {
      const { from, to } = hourRange;

      const fromMinutes = getMinutesFromMidnightFromString(from);
      const toMinutes = getMinutesFromMidnightFromString(to);

      return fromMinutes <= minutesFromMidnight && minutesFromMidnight <= toMinutes;
    }),
  );
}
