import { describe, expect, it } from 'vitest';
import getDailyOpeningHours from './get_daily_opening_hours.js';

import {
  invalidString1,
  invalidString2,
  invalidString3,
  invalidString4,
  multipleOpeningIntervals,
  openFridayToTuesday,
  openNonStop,
  openNonStopOnWeekends,
  openOnMondaysAndWednesdays,
  openOnSaturday,
  openOnWeekdays,
  openOnWeekdaysNoZero,
  openOnWeekends,
  unspecifiedClosingTime,
  overrideWithDifferentHours,
  overrideWithOff,
  incompleteString1,
  spaces,
  justHours,
  openNonStopOnWeekends2,
} from '../test_data.js';

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

  it.each`
    input
    ${undefined}
    ${null}
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
    ${invalidString4}
  `('throws an error given $input', ({ input }) => {
    expect(() => getDailyOpeningHours(input)).toThrow();
  });
});
