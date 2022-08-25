import { getDay, getDayDiff, isValidHour } from './utils';

function isValidHourObject(hourObject) {
  if (!isValidHour(hourObject.from)) {
    return false;
  }

  if (hourObject.to && !isValidHour(hourObject.to)) {
    return false;
  }

  return true;
}

function toHourRange(hourObject) {
  if (!isValidHourObject(hourObject)) {
    return null;
  }

  if (!hourObject.to) {
    return `${hourObject.from}+`;
  }

  return `${hourObject.from}-${hourObject.to}`;
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

      const validHours = hours.filter(isValidHourObject);
      const weekdayRange = from === to ? from : `${from}-${to}`;

      if (!validHours.length) {
        return `${weekdayRange} off`;
      }

      const hourRanges = validHours.map(toHourRange);
      const joinedHourRanges = hourRanges.join(',');

      const dayDiff = getDayDiff(getDay(from), getDay(to));

      if (dayDiff === 6 && joinedHourRanges === '00:00-24:00') {
        return '24/7';
      }

      return `${weekdayRange} ${joinedHourRanges}`;
    })
    .filter(Boolean)
    .join('; ');
}
