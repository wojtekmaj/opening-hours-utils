import { isValidDayOfMonth, isValidHour, isValidMonthName, isValidWeekdayName } from './utils.js';

import type {
  AbsoluteDate,
  FromHourPlus,
  Hour,
  HourGroup,
  HourRange,
  MonthName,
  OpeningHoursArray,
} from './types.js';

function toHourGroup(hourRange: HourRange): HourGroup | null {
  if (hourRange === 'off') {
    return null;
  }

  if (hourRange === 'open' || hourRange === '00:00-24:00') {
    return {
      from: '00:00',
      to: '24:00',
    };
  }

  if (hourRange.endsWith('+')) {
    const from = (hourRange as FromHourPlus).slice(0, -1) as Hour;

    if (!isValidHour(from)) {
      throw new Error(`Invalid hour range: ${hourRange}`);
    }

    const fromWithLeadingZero = from.padStart(5, '0') as Hour;

    return { from: fromWithLeadingZero, to: null };
  }

  const [from, to] = hourRange.split('-') as [Hour, Hour];

  if (!isValidHour(from) || !isValidHour(to)) {
    throw new Error(`Invalid hour range: ${hourRange}`);
  }

  const fromWithLeadingZero = from.padStart(5, '0') as Hour;
  const toWithLeadingZero = to.padStart(5, '0') as Hour;

  return { from: fromWithLeadingZero, to: toWithLeadingZero };
}

// Pattern to match absolute date like "Jan 26" or "Apr 13"
const absoluteDatePattern = /^([A-Z][a-z]{2})\s+(\d+)$/;

// Reuse the month pattern from absoluteDatePattern for checking if string starts with absolute date
const startsWithAbsoluteDatePattern = /^[A-Z][a-z]{2}\s+\d/;

function startsWithAbsoluteDate(dayGroup: string): boolean {
  return startsWithAbsoluteDatePattern.test(dayGroup);
}

function parseAbsoluteDates(dateRangesStr: string): AbsoluteDate[] {
  const absoluteDates: AbsoluteDate[] = [];
  const parts = dateRangesStr.split(/,\s*/);

  for (const part of parts) {
    const match = part.match(absoluteDatePattern);

    if (!match?.[1] || !match[2]) {
      throw new Error(`Invalid absolute date format: ${part}`);
    }

    const [, monthName, dayStr] = match;
    const day = Number.parseInt(dayStr, 10);

    if (!isValidMonthName(monthName)) {
      throw new Error(`Invalid month name: ${monthName}`);
    }

    const validMonthName = monthName as MonthName;

    if (!isValidDayOfMonth(day, validMonthName)) {
      throw new Error(`Invalid day of month: ${dayStr} for ${monthName}`);
    }

    absoluteDates.push({ month: validMonthName, day });
  }

  return absoluteDates;
}

function splitAbsoluteDayGroup(dayGroup: string): [string, string | undefined] {
  const hourStartPattern = /\s+(\d{1,2}:\d{2}|off|open)/;
  const match = dayGroup.match(hourStartPattern);

  if (match) {
    const hourStartIndex = match.index as number;
    return [dayGroup.slice(0, hourStartIndex), dayGroup.slice(hourStartIndex).trim()];
  }

  return [dayGroup, undefined];
}

function getOpeningHours(openingHoursString: ''): null;
function getOpeningHours(openingHoursString: string): OpeningHoursArray;
function getOpeningHours(openingHoursString: string): OpeningHoursArray | null {
  if (typeof openingHoursString === 'undefined' || openingHoursString === null) {
    throw new Error('openingHoursString is required');
  }

  if (openingHoursString === '' || openingHoursString === 'off') {
    return null;
  }

  if (openingHoursString === '24/7' || openingHoursString === 'open') {
    openingHoursString = 'Mo-Su 00:00-24:00';
  }

  const dayGroups = openingHoursString.split(/;\s*/);

  const openingHoursArray: OpeningHoursArray = [];

  dayGroups.filter(Boolean).forEach((dayGroup) => {
    // If day group starts with a valid hour range, prepend with 'Mo-Su'
    if (dayGroup.startsWith('off') || dayGroup.startsWith('open') || dayGroup.match(/^\d/)) {
      dayGroup = `Mo-Su ${dayGroup}`;
    }

    // Check if this is an absolute date range (e.g., "Jan 26,Apr 13")
    if (startsWithAbsoluteDate(dayGroup)) {
      const [joinedDayRanges, joinedHourRanges] = splitAbsoluteDayGroup(dayGroup);
      const absoluteDates = parseAbsoluteDates(joinedDayRanges);

      if (!joinedHourRanges) {
        openingHoursArray.push({
          dates: absoluteDates,
          hours: [{ from: '00:00', to: '24:00' }],
        });
        return;
      }

      const hourRanges = joinedHourRanges.split(/,\s*/) as HourRange[];
      const hourGroups = hourRanges.map(toHourGroup).filter(Boolean) as HourGroup[];

      openingHoursArray.push({
        dates: absoluteDates,
        hours: hourGroups,
      });
      return;
    }

    // Handle recurring weekday ranges
    const [joinedDayRanges, joinedHourRanges] = dayGroup.split(/\b\s+/) as [
      string,
      string | undefined,
    ];

    const weekdayRanges = joinedDayRanges.split(/,\s*/);

    for (const weekdayRange of weekdayRanges) {
      const [fromWeekday, toWeekday = fromWeekday] = weekdayRange.split('-');

      if (!isValidWeekdayName(fromWeekday) || !isValidWeekdayName(toWeekday)) {
        throw new Error(`Invalid weekday range: ${weekdayRange}`);
      }

      if (!joinedHourRanges) {
        openingHoursArray.push({
          from: fromWeekday,
          to: toWeekday,
          hours: [
            {
              from: '00:00',
              to: '24:00',
            },
          ],
        });
        return;
      }

      const hourRanges = joinedHourRanges.split(/,\s*/) as HourRange[];
      const hourGroups = hourRanges.map(toHourGroup).filter(Boolean) as HourGroup[];

      openingHoursArray.push({
        from: fromWeekday,
        to: toWeekday,
        hours: hourGroups,
      });
    }
  });

  return openingHoursArray;
}

export default getOpeningHours;
