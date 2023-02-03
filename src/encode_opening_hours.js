import { getDayDiff, getWeekday, isValidHour } from './utils';

function isValidHourGroup(hourGroup) {
  if (!isValidHour(hourGroup.from)) {
    return false;
  }

  if (hourGroup.to && !isValidHour(hourGroup.to)) {
    return false;
  }

  return true;
}

function toHourRange(hourGroup) {
  if (!isValidHourGroup(hourGroup)) {
    return null;
  }

  if (!hourGroup.to) {
    return `${hourGroup.from}+`;
  }

  return `${hourGroup.from}-${hourGroup.to}`;
}

export default function encodeOpeningHours(openingHoursArray) {
  if (!openingHoursArray) {
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

      if (!validHours.length) {
        return weekdayRange;
      }

      const hourRanges = validHours.map(toHourRange);
      const joinedHourRanges = hourRanges.join(',');

      const dayDiff = getDayDiff(getWeekday(from), getWeekday(to));

      if (dayDiff === 6 && joinedHourRanges === '00:00-24:00') {
        return '24/7';
      }

      return `${weekdayRange} ${joinedHourRanges}`;
    })
    .filter(Boolean)
    .join('; ');
}
