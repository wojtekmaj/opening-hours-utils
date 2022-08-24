import getDailyOpeningHours from './get_daily_opening_hours';
import getIsOpenAt from './get_is_open_at';

import {
  getDay,
  getMinutesFromMidnightFromDate,
  getMinutesFromMidnightFromString,
  getWeekday,
} from './utils';

function getDaysToClosing(dayGroup, weekday) {
  const from = getDay(dayGroup.day);

  return (7 + (from - weekday)) % 7;
}

function getMinutesToClosing(hourGroup, minutesFromMidnight) {
  const fromMinutes = getMinutesFromMidnightFromString(hourGroup.to);

  return fromMinutes - minutesFromMidnight;
}

function getHourGroups(dayGroups) {
  return dayGroups.reduce((acc, dayGroup) => {
    return acc.concat(dayGroup.hours);
  }, []);
}

function groupDaysByDaysToClosing(dayGroups, day) {
  return dayGroups.reduce((acc, dayGroup) => {
    const daysToClosing = getDaysToClosing(dayGroup, day);

    if (!acc[daysToClosing]) {
      acc[daysToClosing] = [];
    }

    acc[daysToClosing].push(dayGroup);

    return acc;
  }, []);
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function getDifferenceInDays(day1, day2) {
  return (7 + (day2 - day1)) % 7;
}

export default function getNextClosedAt(openingHoursString, date) {
  if (!openingHoursString) {
    return null;
  }

  if (!getIsOpenAt(openingHoursString, date)) {
    return null;
  }

  if (openingHoursString === '24/7') {
    return null;
  }

  const dailyOpeningHoursArray = getDailyOpeningHours(openingHoursString);

  const day = date.getDay();
  const minutesFromMidnight = getMinutesFromMidnightFromDate(date);

  const daysSortedByDaysToClosing = groupDaysByDaysToClosing(dailyOpeningHoursArray, day);

  for (const daysToClosing in daysSortedByDaysToClosing) {
    const dayGroups = daysSortedByDaysToClosing[daysToClosing];

    if (!dayGroups.length) {
      continue;
    }

    const dayGroupDay = getDay(dayGroups[0].day);
    const hourGroups = getHourGroups(dayGroups);

    const sortedHourGroups = [...hourGroups].sort((hourGroupA, hourGroupB) => {
      return (
        getMinutesToClosing(hourGroupA, minutesFromMidnight) -
        getMinutesToClosing(hourGroupB, minutesFromMidnight)
      );
    });

    const isToday = day === dayGroupDay;

    for (const hourGroup of sortedHourGroups) {
      const differenceInDays = getDifferenceInDays(day, dayGroupDay);

      const minutesToClosing = getMinutesToClosing(
        hourGroup,
        isToday ? minutesFromMidnight : minutesFromMidnight - differenceInDays * 1440,
      );

      if (minutesToClosing >= 0) {
        const closingTime = addMinutes(date, minutesToClosing);
        const isOpenRightAfterClosing = getIsOpenAt(openingHoursString, addMinutes(closingTime, 1));

        if (isOpenRightAfterClosing) {
          continue;
        }

        return `${getWeekday(dayGroupDay)} ${hourGroup.to}`;
      }
    }
  }
}
