import { describe, expect, it } from 'vitest';

import {
  absoluteDays,
  incompleteString1,
  invalidString1,
  invalidString2,
  invalidString3,
  invalidString4,
  invalidString5,
  invalidString6,
  justHours,
  multipleOpeningIntervals,
  openFridayToTuesday,
  openNonStop,
  openNonStopOnWeekends,
  openNonStopOnWeekends2,
  openNonStopWithAbsoluteDay,
  openOnMondaysAndWednesdays,
  openOnSaturday,
  openOnWeekdays,
  openOnWeekdaysNoZero,
  openOnWeekends,
  overrideWithDifferentHours,
  overrideWithOff,
  spaces,
  unspecifiedClosingTime,
} from '../test_data.js';
import getDailyOpeningHours from './get_daily_opening_hours.js';

describe('getDailyOpeningHours()', () => {
  it.each`
    input                                | expectedResult
    ${openOnWeekdays.string}             | ${openOnWeekdays.dailyArray}
    ${openOnWeekdaysNoZero.string}       | ${openOnWeekdaysNoZero.dailyArray}
    ${openOnMondaysAndWednesdays.string} | ${openOnMondaysAndWednesdays.dailyArray}
    ${multipleOpeningIntervals.string}   | ${multipleOpeningIntervals.dailyArray}
    ${openOnSaturday.string}             | ${openOnSaturday.dailyArray}
    ${openOnWeekends.string}             | ${openOnWeekends.dailyArray}
    ${openFridayToTuesday.string}        | ${openFridayToTuesday.dailyArray}
    ${openNonStop.string}                | ${openNonStop.dailyArray}
    ${openNonStopWithAbsoluteDay.string} | ${openNonStop.dailyArray}
    ${openNonStopOnWeekends.string}      | ${openNonStopOnWeekends.dailyArray}
    ${openNonStopOnWeekends2.string}     | ${openNonStopOnWeekends2.dailyArray}
    ${unspecifiedClosingTime.string}     | ${unspecifiedClosingTime.dailyArray}
    ${overrideWithDifferentHours.string} | ${overrideWithDifferentHours.dailyArray}
    ${overrideWithOff.string}            | ${overrideWithOff.dailyArray}
    ${spaces.string}                     | ${spaces.dailyArray}
    ${justHours.string}                  | ${justHours.dailyArray}
  `('returns proper object given $input', ({ input, expectedResult }) => {
    const result = getDailyOpeningHours(input);

    expect(result).toEqual(expectedResult);
  });

  it('returns null given empty string', () => {
    expect(getDailyOpeningHours('')).toBe(null);
  });

  it('returns empty array given ";;;"', () => {
    expect(getDailyOpeningHours(';;;')).toEqual([]);
  });

  it('returns array with 00:00-24:00 hour range given weekday range without hours', () => {
    expect(getDailyOpeningHours(incompleteString1)).toEqual([
      {
        day: 'Mo',
        hours: [{ from: '00:00', to: '24:00' }],
      },
      {
        day: 'Tu',
        hours: [{ from: '00:00', to: '24:00' }],
      },
      {
        day: 'We',
        hours: [{ from: '00:00', to: '24:00' }],
      },
    ]);
  });

  it('returns array with recurring days only given weekday range with both recurring and absolute hours', () => {
    const result = getDailyOpeningHours(absoluteDays.string);

    expect(result).toEqual([
      {
        day: 'Mo',
        hours: [{ from: '09:00', to: '22:00' }],
      },
      {
        day: 'Tu',
        hours: [{ from: '09:00', to: '22:00' }],
      },
      {
        day: 'We',
        hours: [{ from: '09:00', to: '22:00' }],
      },
      {
        day: 'Th',
        hours: [{ from: '09:00', to: '22:00' }],
      },
      {
        day: 'Fr',
        hours: [{ from: '09:00', to: '22:00' }],
      },
      {
        day: 'Sa',
        hours: [{ from: '09:00', to: '22:00' }],
      },
    ]);
  });

  it.each`
    input
    ${undefined}
    ${null}
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
    ${invalidString4}
    ${invalidString5}
    ${invalidString6}
  `('throws an error given $input', ({ input }) => {
    expect(() => getDailyOpeningHours(input)).toThrow();
  });
});
