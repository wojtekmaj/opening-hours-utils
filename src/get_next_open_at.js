import getDailyOpeningHours from './get_daily_opening_hours';
import getIsOpenAt from './get_is_open_at';

import {
  getHourGroups,
  getMinutesFromMidnightFromDate,
  getMinutesFromMidnightFromString,
  getWeekday,
  getWeekdayName,
} from './utils';

function getDaysToOpening(dayGroup, weekday) {
  const from = getWeekday(dayGroup.day);

  return (7 + (from - weekday)) % 7;
}

function getMinutesToOpening(hourGroup, minutesFromMidnight) {
  const fromMinutes = getMinutesFromMidnightFromString(hourGroup.from);

  return fromMinutes - minutesFromMidnight;
}

function groupDaysByDaysToOpening(dayGroups, day) {
  return dayGroups.reduce((acc, dayGroup) => {
    const daysToOpening = getDaysToOpening(dayGroup, day);

    if (!acc[daysToOpening]) {
      acc[daysToOpening] = [];
    }

    acc[daysToOpening].push(dayGroup);

    return acc;
  }, []);
}

export default function getNextOpenAt(openingHoursString, date) {
  if (!openingHoursString) {
    return null;
  }

  const isOpenAt = getIsOpenAt(openingHoursString, date);

  // If open or unspecified closing time, return null.
  if (isOpenAt !== false) {
    return null;
  }

  const dailyOpeningHoursArray = getDailyOpeningHours(openingHoursString);

  const day = date.getDay();
  const minutesFromMidnight = getMinutesFromMidnightFromDate(date);

  const daysSortedByDaysToOpening = groupDaysByDaysToOpening(dailyOpeningHoursArray, day);

  for (const daysToOpening in daysSortedByDaysToOpening) {
    const dayGroups = daysSortedByDaysToOpening[daysToOpening];

    if (!dayGroups.length) {
      continue;
    }

    const dayGroupDay = getWeekday(dayGroups[0].day);
    const hourGroups = getHourGroups(dayGroups);

    const sortedHourGroups = [...hourGroups].sort((hourGroupA, hourGroupB) => {
      return (
        getMinutesToOpening(hourGroupA, minutesFromMidnight) -
        getMinutesToOpening(hourGroupB, minutesFromMidnight)
      );
    });

    const isToday = day === dayGroupDay;

    for (const hourGroup of sortedHourGroups) {
      if (!isToday || getMinutesToOpening(hourGroup, minutesFromMidnight) > 0) {
        return `${getWeekdayName(dayGroupDay)} ${hourGroup.from}`;
      }
    }
  }

  // If we got to this point, opening hour must be some time the same day next week
  const firstDayGroups = daysSortedByDaysToOpening[0];

  const dayGroupDay = getWeekday(firstDayGroups[0].day);
  const hourGroups = getHourGroups(firstDayGroups);

  const sortedHourGroups = [...hourGroups].sort((hourGroupA, hourGroupB) => {
    return (
      getMinutesToOpening(hourGroupA, minutesFromMidnight) -
      getMinutesToOpening(hourGroupB, minutesFromMidnight)
    );
  });

  const firstHourGroup = sortedHourGroups[0];

  return `${getWeekdayName(dayGroupDay)} ${firstHourGroup.from}`;
}
