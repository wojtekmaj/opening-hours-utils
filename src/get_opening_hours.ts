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

// Matches absolute dates like "Jan 26" or "Apr 13"
const absoluteDatePattern = /^([A-Z][a-z]{2})\s+(\d+)$/;

// Matches strings starting with absolute dates like "Jan 26"
const startsWithAbsoluteDatePattern = /^[A-Z][a-z]{2}\s+\d/;

// Matches hour start patterns like " 09:00", " off", or " open"
const hourStartPattern = /\s+(\d{1,2}:\d{2}|off|open)/;

function startsWithAbsoluteDate(dayGroup: string): boolean {
  return startsWithAbsoluteDatePattern.test(dayGroup);
}

function parseAbsoluteDate(dateStr: string): AbsoluteDate {
  const match = dateStr.match(absoluteDatePattern);
  const [, monthName, dayStr] = match || [];

  if (!monthName || !dayStr) {
    throw new Error(`Invalid absolute date format: ${dateStr}`);
  }

  const day = Number.parseInt(dayStr, 10);

  if (!isValidMonthName(monthName)) {
    throw new Error(`Invalid month name: ${monthName}`);
  }

  const validMonthName = monthName as MonthName;

  if (!isValidDayOfMonth(day, validMonthName)) {
    throw new Error(`Invalid day of month: ${dayStr} for ${monthName}`);
  }

  return `${validMonthName} ${day}` as AbsoluteDate;
}

function splitAbsoluteDayGroup(dayGroup: string): [string, string?] {
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

    // Check if this is an absolute date range (e.g., "Jan 26" or "Jan 26-Feb 14")
    if (startsWithAbsoluteDate(dayGroup)) {
      const [joinedWeekdayRanges, joinedHourRanges] = splitAbsoluteDayGroup(dayGroup);

      // Parse the date range (could be e.g., "Jan 26" or "Jan 26-Feb 14")
      const [, fromDateStr, toDateStr = fromDateStr] = joinedWeekdayRanges.match(
        /^([A-Z][a-z]{2}\s+\d+)(?:-([A-Z][a-z]{2}\s+\d+))?$/,
      ) as [string, string, string?];

      const fromDate = parseAbsoluteDate(fromDateStr);
      const toDate = parseAbsoluteDate(toDateStr);

      if (joinedHourRanges) {
        const hourRanges = joinedHourRanges.split(/,\s*/) as HourRange[];
        const hourGroups = hourRanges.map(toHourGroup).filter(Boolean) as HourGroup[];

        openingHoursArray.push({
          from: fromDate,
          to: toDate,
          hours: hourGroups,
        });
      } else {
        openingHoursArray.push({
          from: fromDate,
          to: toDate,
          hours: [{ from: '00:00', to: '24:00' }],
        });
      }
    } else {
      // Handle recurring weekday ranges
      const [joinedDayRanges, joinedHourRanges] = dayGroup.split(/\b\s+/) as [string, string?];

      const weekdayRanges = joinedDayRanges.split(/,\s*/);

      for (const weekdayRange of weekdayRanges) {
        const [fromWeekday, toWeekday = fromWeekday] = weekdayRange.split('-');

        if (!isValidWeekdayName(fromWeekday) || !isValidWeekdayName(toWeekday)) {
          throw new Error(`Invalid weekday range: ${weekdayRange}`);
        }

        if (joinedHourRanges) {
          const hourRanges = joinedHourRanges.split(/,\s*/) as HourRange[];
          const hourGroups = hourRanges.map(toHourGroup).filter(Boolean) as HourGroup[];

          openingHoursArray.push({
            from: fromWeekday,
            to: toWeekday,
            hours: hourGroups,
          });
        } else {
          openingHoursArray.push({
            from: fromWeekday,
            to: toWeekday,
            hours: [{ from: '00:00', to: '24:00' }],
          });
        }
      }
    }
  });

  return openingHoursArray;
}

export default getOpeningHours;
