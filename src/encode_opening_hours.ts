import { getDayDiff, getWeekday, isValidHour } from './utils.js';

import type { HourGroup, HourRange, OpeningHoursArray } from './types.js';

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

export default function encodeOpeningHours(openingHoursArray: OpeningHoursArray): string {
  if (typeof openingHoursArray === 'undefined' || openingHoursArray === null) {
    throw new Error('openingHoursArray is required');
  }

  if (!openingHoursArray.length) {
    return '';
  }

  return openingHoursArray
    .map(({ from, to = from, hours }) => {
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
    })
    .filter(Boolean)
    .join('; ');
}
