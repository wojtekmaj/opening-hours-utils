import getDailyOpeningHours from './get_daily_opening_hours.js';
import getIsOpenAt from './get_is_open_at.js';
import getOpeningHours from './get_opening_hours.js';
import {
  getHourGroups,
  getMinutesFromMidnightFromDate,
  getMinutesFromMidnightFromString,
  getWeekday,
  getWeekdayName,
  isAbsoluteOpeningHours,
  matchesAnyAbsoluteDate,
} from './utils.js';

import type {
  AbsoluteOpeningHours,
  DayGroup,
  DayGroups,
  Hour,
  HourGroup,
  NextTimeResult,
  Weekday,
  WeekdayName,
  ZeroToSix,
} from './types.js';

function getDaysToOpening(dayGroup: DayGroup, weekday: Weekday): ZeroToSix {
  const from = getWeekday(dayGroup.day);

  return ((7 + (from - weekday)) % 7) as ZeroToSix;
}

function getMinutesToOpening(hourGroup: HourGroup, minutesFromMidnight: number) {
  const fromMinutes = getMinutesFromMidnightFromString(hourGroup.from);

  return fromMinutes - minutesFromMidnight;
}

function groupDaysByDaysToOpening(dayGroups: DayGroups, day: Weekday) {
  const groupedDays = new Map<ZeroToSix, DayGroups>(
    Array.from({ length: 7 }, (_, index) => [index as ZeroToSix, []]),
  );

  for (const dayGroup of dayGroups) {
    const daysToOpening = getDaysToOpening(dayGroup, day);

    const dayArray = groupedDays.get(daysToOpening) as DayGroups;

    dayArray.push(dayGroup);
  }

  return groupedDays;
}

function getMonth(monthName: string): number {
  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  return months[monthName] ?? -1;
}

function getAbsoluteOpeningTime(
  absoluteOpeningHours: AbsoluteOpeningHours,
  date: Date,
  minutesFromMidnight: number,
): NextTimeResult | null {
  if (!matchesAnyAbsoluteDate(date, absoluteOpeningHours.dates)) {
    return null;
  }

  const matchingDate = absoluteOpeningHours.dates.find(
    (d) => date.getMonth() === getMonth(d.month) && date.getDate() === d.day,
  );

  if (!matchingDate) {
    return null;
  }

  const sortedHourGroups = [...absoluteOpeningHours.hours].sort(
    (hourGroupA, hourGroupB) =>
      getMinutesToOpening(hourGroupA, minutesFromMidnight) -
      getMinutesToOpening(hourGroupB, minutesFromMidnight),
  );

  for (const hourGroup of sortedHourGroups) {
    if (getMinutesToOpening(hourGroup, minutesFromMidnight) > 0) {
      return `${matchingDate.month} ${matchingDate.day} ${hourGroup.from}`;
    }
  }

  return null;
}

export default function getNextOpenAt(
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

  const isOpenAt = getIsOpenAt(openingHoursString, date);

  if (isOpenAt !== false) {
    return null;
  }

  const minutesFromMidnight = getMinutesFromMidnightFromDate(date);
  const openingHoursArray = getOpeningHours(openingHoursString);

  for (const openingHours of openingHoursArray) {
    if (isAbsoluteOpeningHours(openingHours)) {
      const absoluteOpening = getAbsoluteOpeningTime(openingHours, date, minutesFromMidnight);

      if (absoluteOpening) {
        return absoluteOpening;
      }
    }
  }

  const dailyOpeningHoursArray = getDailyOpeningHours(openingHoursString);
  const day = date.getDay() as Weekday;
  const daysSortedByDaysToOpening = groupDaysByDaysToOpening(dailyOpeningHoursArray, day);

  function checkDayGroups(
    dayGroups: DayGroups,
    letFirstGroup?: boolean,
  ): `${WeekdayName} ${Hour}` | null {
    const firstDayGroup = dayGroups[0];

    if (!firstDayGroup) {
      return null;
    }

    const dayGroupDay = getWeekday(firstDayGroup.day);
    const hourGroups = getHourGroups(dayGroups);

    const sortedHourGroups = [...hourGroups].sort(
      (hourGroupA, hourGroupB) =>
        getMinutesToOpening(hourGroupA, minutesFromMidnight) -
        getMinutesToOpening(hourGroupB, minutesFromMidnight),
    );

    const isToday = day === dayGroupDay;

    for (const hourGroup of sortedHourGroups) {
      if (!isToday || getMinutesToOpening(hourGroup, minutesFromMidnight) > 0 || letFirstGroup) {
        return `${getWeekdayName(dayGroupDay)} ${hourGroup.from}`;
      }
    }

    return null;
  }

  for (const dayGroups of daysSortedByDaysToOpening.values()) {
    const nextOpenAt = checkDayGroups(dayGroups);

    if (nextOpenAt) {
      return nextOpenAt;
    }
  }

  const firstDayGroups = daysSortedByDaysToOpening.get(0) as DayGroups;
  const nextOpenAt = checkDayGroups(firstDayGroups, true);

  if (nextOpenAt) {
    return nextOpenAt;
  }

  throw new Error('Could not find opening time');
}
