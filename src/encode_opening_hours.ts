import {
  getDayDiff,
  getWeekday,
  isAbsoluteOpeningHours,
  isRecurringOpeningHours,
  isValidHour,
} from './utils.js';

import type {
  AbsoluteOpeningHours,
  HourGroup,
  HourRange,
  OpeningHours,
  OpeningHoursArray,
  RecurringOpeningHours,
} from './types.js';

function isValidHourGroup(hourGroup: HourGroup): hourGroup is HourGroup {
  if (typeof hourGroup !== 'object' || hourGroup === null) {
    return false;
  }

  if (!hourGroup.from || !isValidHour(hourGroup.from)) {
    return false;
  }

  if (hourGroup.to && !isValidHour(hourGroup.to)) {
    return false;
  }

  return true;
}

function toHourRange(hourGroup: HourGroup): HourRange {
  if (!hourGroup.to) {
    return `${hourGroup.from}+`;
  }

  return `${hourGroup.from}-${hourGroup.to}`;
}

function encodeRecurringOpeningHours(openingHours: RecurringOpeningHours): string | null {
  const { from, to = from, hours } = openingHours;

  if (!from || !hours) {
    return null;
  }

  const weekdayRange = from === to ? from : `${from}-${to}`;

  if (!hours.length) {
    return `${weekdayRange} off`;
  }

  const validHours = hours.filter(isValidHourGroup);

  const hourRanges = validHours.map(toHourRange);
  const joinedHourRanges = hourRanges.join(',');

  const dayDiff = getDayDiff(getWeekday(from), getWeekday(to));

  if (dayDiff === 6 && joinedHourRanges === '00:00-24:00') {
    return '24/7';
  }

  if (!joinedHourRanges) {
    return weekdayRange;
  }

  return `${weekdayRange} ${joinedHourRanges}`;
}

function encodeAbsoluteOpeningHours(openingHours: AbsoluteOpeningHours): string | null {
  const { from, to = from, hours } = openingHours;

  const dateRange = from === to ? from : `${from}-${to}`;

  if (!hours.length) {
    return `${dateRange} off`;
  }

  const validHours = hours.filter(isValidHourGroup);

  const hourRanges = validHours.map(toHourRange);
  const joinedHourRanges = hourRanges.join(',');

  if (!joinedHourRanges) {
    return dateRange;
  }

  return `${dateRange} ${joinedHourRanges}`;
}

function encodeOpeningHoursEntry(openingHours: OpeningHours): string | null {
  if (isAbsoluteOpeningHours(openingHours)) {
    return encodeAbsoluteOpeningHours(openingHours);
  }

  if (isRecurringOpeningHours(openingHours)) {
    return encodeRecurringOpeningHours(openingHours);
  }

  return null;
}

export default function encodeOpeningHours(openingHoursArray: OpeningHoursArray): string {
  if (typeof openingHoursArray === 'undefined' || openingHoursArray === null) {
    throw new Error('openingHoursArray is required');
  }

  if (!openingHoursArray.length) {
    return '';
  }

  return openingHoursArray.map(encodeOpeningHoursEntry).filter(Boolean).join('; ');
}
