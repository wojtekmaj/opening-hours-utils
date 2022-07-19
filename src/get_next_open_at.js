import getDailyOpeningHours from './get_daily_opening_hours';
import isOpenAt from './is_open_at';

import {
  getDay,
  getMinutesFromMidnightFromDate,
  getMinutesFromMidnightFromString,
  getWeekday,
} from './utils';

function getDaysToOpening(dayGroup, weekday) {
  const from = getDay(dayGroup.day);

  return (7 + (from - weekday)) % 7;
}

function getMinutesToOpening(hourGroup, minutesFromMidnight) {
  const fromMinutes = getMinutesFromMidnightFromString(hourGroup.from);

  return fromMinutes - minutesFromMidnight;
}

function getHourGroups(dayGroups) {
  return dayGroups.reduce((acc, dayGroup) => {
    return acc.concat(dayGroup.hours);
  }, []);
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

  if (isOpenAt(openingHoursString, date)) {
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

    const dayGroupDay = getDay(dayGroups[0].day);
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
        return `${getWeekday(dayGroupDay)} ${hourGroup.from}`;
      }
    }
  }
}
