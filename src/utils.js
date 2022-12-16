import { WEEKDAY_NAMES } from './constants';

export function getDay(weekday) {
  return Number(Object.entries(WEEKDAY_NAMES).find(([, value]) => value === weekday)[0]);
}

export function getDayDiff(from, to) {
  return (7 + (to - from)) % 7;
}

export function getHourGroups(dayGroups) {
  return dayGroups.reduce((acc, dayGroup) => {
    return acc.concat(dayGroup.hours);
  }, []);
}

export function getMinutesFromMidnightFromDate(date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function getMinutesFromMidnightFromString(hour) {
  const [hours, minutes] = hour.split(':');

  return Number(hours) * 60 + Number(minutes);
}

export function getWeekday(day) {
  return WEEKDAY_NAMES[day];
}

export function isValidHour(hour) {
  if (!hour) {
    return false;
  }

  const [hoursString, minutesString] = hour.split(':');

  const hours = Number(hoursString);
  const minutes = Number(minutesString);

  return hours >= 0 && hours <= 48 && minutes >= 0 && minutes <= 59;
}

export function isValidWeekday(weekday) {
  return Object.values(WEEKDAY_NAMES).includes(weekday);
}
