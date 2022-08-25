import { getDay, isValidHour } from './utils';

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
      if (!from || !hours || !hours.length) {
        return null;
      }

      const validHours = hours.filter(isValidHourObject);

      if (!validHours.length) {
        return null;
      }

      const weekdayRange = from === to ? from : `${from}-${to}`;
      const hourRanges = validHours.map(toHourRange);
      const joinedHourRanges = hourRanges.join(',');

      const dayDiff = (7 + (getDay(to) - getDay(from))) % 7;

      if (dayDiff === 6 && joinedHourRanges === '00:00-24:00') {
        return '24/7';
      }

      return `${weekdayRange} ${joinedHourRanges}`;
    })
    .filter(Boolean)
    .join('; ');
}
