import getDailyOpeningHours from './get_daily_opening_hours.js';
import getIsOpenAt from './get_is_open_at.js';
import getOpeningHours from './get_opening_hours.js';
import {
  getDayDiff,
  getHourGroups,
  getMatchingAbsoluteDate,
  getMinutesFromMidnightFromDate,
  getMinutesFromMidnightFromString,
  getWeekday,
  getWeekdayName,
  isAbsoluteOpeningHours,
} from './utils.js';

import type {
  AbsoluteOpeningHours,
  DayGroup,
  DayGroups,
  Hour,
  HourGroup,
  NextTimeResult,
  Weekday,
  ZeroToSix,
} from './types.js';

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

  for (const dayGroup of dayGroups) {
    const daysToClosing = getDaysToClosing(dayGroup, day);

    const dayArray = groupedDays.get(daysToClosing) as DayGroups;

    dayArray.push(dayGroup);
  }

  return groupedDays;
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}

function getAbsoluteClosingTime(
  absoluteOpeningHours: AbsoluteOpeningHours,
  date: Date,
  minutesFromMidnight: number,
  openingHoursString: string,
): NextTimeResult | null {
  const matchingDate = getMatchingAbsoluteDate(date, absoluteOpeningHours);

  if (!matchingDate) {
    return null;
  }

  const hourGroupsWithClosing = absoluteOpeningHours.hours.filter(
    (hourGroup): hourGroup is RequiredHourGroup =>
      hourGroup.to !== null && hourGroup.to !== undefined,
  );

  const sortedHourGroups = [...hourGroupsWithClosing].sort((hourGroupA, hourGroupB) => {
    return (
      getMinutesToClosing(hourGroupA, minutesFromMidnight) -
      getMinutesToClosing(hourGroupB, minutesFromMidnight)
    );
  });

  for (const hourGroup of sortedHourGroups) {
    const minutesToClosing = getMinutesToClosing(hourGroup, minutesFromMidnight);

    if (minutesToClosing >= 0) {
      const closingTime = addMinutes(date, minutesToClosing);
      const isOpenRightAfterClosing = getIsOpenAt(openingHoursString, addMinutes(closingTime, 1));

      if (isOpenRightAfterClosing) {
        continue;
      }

      return `${matchingDate} ${hourGroup.to}` as NextTimeResult;
    }
  }

  return null;
}

export default function getNextClosedAt(
  openingHoursString: string,
  date: Date,
): NextTimeResult | null {
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

  const minutesFromMidnight = getMinutesFromMidnightFromDate(date);
  const openingHoursArray = getOpeningHours(openingHoursString);

  for (const openingHours of openingHoursArray) {
    if (isAbsoluteOpeningHours(openingHours)) {
      const absoluteClosing = getAbsoluteClosingTime(
        openingHours,
        date,
        minutesFromMidnight,
        openingHoursString,
      );

      if (absoluteClosing) {
        return absoluteClosing;
      }
    }
  }

  const dailyOpeningHoursArray = getDailyOpeningHours(openingHoursString);
  const day = date.getDay() as Weekday;
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
