import type { WEEKDAY_NAMES, WEEKDAYS } from './constants.js';

export type ZeroToSix = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Hour = `${number}:${number}`;

export type FromHourToHour = `${Hour}-${Hour}`;

export type FromHourPlus = `${Hour}+`;

export type Off = 'off';

export type Open = 'open';

export type HourRange = FromHourToHour | FromHourPlus | Off | Open;

export type HourGroup = {
  from: Hour;
  to?: Hour | null;
};

export type HourGroups = HourGroup[];

export type Weekday = (typeof WEEKDAYS)[keyof typeof WEEKDAYS];

export type WeekdayName = (typeof WEEKDAY_NAMES)[keyof typeof WEEKDAY_NAMES];

export type WeekdayRange = `${WeekdayName}-${WeekdayName}` | WeekdayName;

export type DayGroup = {
  day: WeekdayName;
  hours: HourGroups;
};

export type DayGroups = DayGroup[];

export type OpeningHours = {
  from: WeekdayName;
  to: WeekdayName;
  hours: HourGroups;
};

export type OpeningHoursArray = OpeningHours[];
