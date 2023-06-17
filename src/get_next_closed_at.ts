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

import type { DayGroup, DayGroups, HourGroup, Weekday, ZeroToSix, Hour } from './types';

type RequiredHourGroup = Required<HourGroup> & {
  to: Hour;
};

type RequiredHourGroups = RequiredHourGroup[];

function getDaysToClosing(dayGroup: DayGroup, weekday: Weekday): ZeroToSix {
  const from = getWeekday(dayGroup.day);

  return getDayDiff(weekday, from) as ZeroToSix;
}

function getMinutesToClosing(hourGroup: RequiredHourGroup, minutesFromMidnight: number) {
  const fromMinutes = getMinutesFromMidnightFromString(hourGroup.to);

  return fromMinutes - minutesFromMidnight;
}

function groupDaysByDaysToClosing(dayGroups: DayGroups, day: Weekday) {
  const groupedDays = new Map<ZeroToSix, DayGroups>(
    Array.from({ length: 7 }, (_, index: number) => [index as ZeroToSix, []]),
  );

  dayGroups.forEach((dayGroup) => {
    const daysToClosing = getDaysToClosing(dayGroup, day);

    const dayArray = groupedDays.get(daysToClosing) as DayGroups;

    dayArray.push(dayGroup);
  });

  return groupedDays;
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}

export default function getNextClosedAt(openingHoursString: string, date: Date): string | null {
  if (typeof openingHoursString === 'undefined' || openingHoursString === null) {
    throw new Error('openingHoursString is required');
  }

  if (!date) {
    throw new Error('date is required');
  }

  if (!openingHoursString) {
    return null;
  }

  if (!getIsOpenAt(openingHoursString, date)) {
    return null;
  }

  /**
   * At this point, because getIsOpenAt() returned true, we know that there are no unspecified
   * closing times. So, we can be sure that all HourGroups have a 'to' property.
   */

  if (openingHoursString === '24/7' || openingHoursString === 'open') {
    return null;
  }

  const dailyOpeningHoursArray = getDailyOpeningHours(openingHoursString);

  const day = date.getDay() as Weekday;
  const minutesFromMidnight = getMinutesFromMidnightFromDate(date);

  const daysSortedByDaysToClosing = groupDaysByDaysToClosing(dailyOpeningHoursArray, day);

  for (const dayGroups of daysSortedByDaysToClosing.values()) {
    const firstDayGroup = dayGroups[0];

    if (!firstDayGroup) {
      continue;
    }

    const dayGroupDay = getWeekday(firstDayGroup.day);
    const hourGroups = getHourGroups(dayGroups) as RequiredHourGroups;

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

  throw new Error('Could not find closing time');
}
