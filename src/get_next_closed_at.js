import getDailyOpeningHours from './get_daily_opening_hours';
import getIsOpenAt from './get_is_open_at';

import {
  getDayDiff,
  getHourGroups,
  getMinutesFromMidnightFromDate,
  getMinutesFromMidnightFromString,
  getWeekday,
  getWeekdayName,
} from './utils';

function getDaysToClosing(dayGroup, weekday) {
  const from = getWeekday(dayGroup.day);

  return getDayDiff(weekday, from);
}

function getMinutesToClosing(hourGroup, minutesFromMidnight) {
  const fromMinutes = getMinutesFromMidnightFromString(hourGroup.to);

  return fromMinutes - minutesFromMidnight;
}

function groupDaysByDaysToClosing(dayGroups, day) {
  const groupedDays = new Map(Array.from({ length: 7 }, (_, index) => [index, []]));

  dayGroups.forEach((dayGroup) => {
    const daysToClosing = getDaysToClosing(dayGroup, day);

    groupedDays.get(daysToClosing).push(dayGroup);
  });

  return groupedDays;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
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

  for (const dayGroups of daysSortedByDaysToClosing.values()) {
    if (!dayGroups.length) {
      continue;
    }

    const dayGroupDay = getWeekday(dayGroups[0].day);
    const hourGroups = getHourGroups(dayGroups);

    const sortedHourGroups = [...hourGroups].sort((hourGroupA, hourGroupB) => {
      return (
        getMinutesToClosing(hourGroupA, minutesFromMidnight) -
        getMinutesToClosing(hourGroupB, minutesFromMidnight)
      );
    });

    const isToday = day === dayGroupDay;

    for (const hourGroup of sortedHourGroups) {
      const differenceInDays = getDayDiff(day, dayGroupDay);

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

        return `${getWeekdayName(dayGroupDay)} ${hourGroup.to}`;
      }
    }
  }
}
