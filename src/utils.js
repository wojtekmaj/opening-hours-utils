import { WEEKDAY_NAMES } from './constants';

export function getDay(weekday) {
  return Number(Object.entries(WEEKDAY_NAMES).find(([, value]) => value === weekday)[0]);
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
  const [hoursString, minutesString] = hour.split(':');

  const hours = Number(hoursString);
  const minutes = Number(minutesString);

  return hours >= 0 && hours <= 48 && minutes >= 0 && minutes <= 59;
}

export function isValidWeekday(weekday) {
  return Object.values(WEEKDAY_NAMES).includes(weekday);
}
