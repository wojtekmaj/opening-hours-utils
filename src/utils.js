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
  return /^(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]|24:00)$/.test(hour);
}

export function isValidWeekday(weekday) {
  return Object.values(WEEKDAY_NAMES).includes(weekday);
}
