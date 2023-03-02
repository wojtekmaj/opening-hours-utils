import { describe, expect, it } from 'vitest';
import getOpeningHours from './get_opening_hours';

import {
  invalidString1,
  invalidString2,
  invalidString3,
  multipleOpeningIntervals,
  openFridayToTuesday,
  openNonStop,
  openNonStopOnWeekends,
  openOnMondaysAndWednesdays,
  openOnSaturday,
  openOnWeekdays,
  openOnWeekends,
  unspecifiedClosingTime,
  overrideWithDifferentHours,
  overrideWithOff,
  incompleteString1,
} from '../test_data';

describe('getOpeningHours()', () => {
  it.each`
    input                                | expectedResult
    ${openOnWeekdays.string}             | ${openOnWeekdays.array}
    ${openOnMondaysAndWednesdays.string} | ${openOnMondaysAndWednesdays.array}
    ${multipleOpeningIntervals.string}   | ${multipleOpeningIntervals.array}
    ${openOnSaturday.string}             | ${openOnSaturday.array}
    ${openOnWeekends.string}             | ${openOnWeekends.array}
    ${openFridayToTuesday.string}        | ${openFridayToTuesday.array}
    ${openNonStop.string}                | ${openNonStop.array}
    ${openNonStopOnWeekends.string}      | ${openNonStopOnWeekends.array}
    ${unspecifiedClosingTime.string}     | ${unspecifiedClosingTime.array}
    ${overrideWithDifferentHours.string} | ${overrideWithDifferentHours.array}
    ${overrideWithOff.string}            | ${overrideWithOff.array}
  `('returns proper object given $input', ({ input, expectedResult }) => {
    const result = getOpeningHours(input);

    expect(result).toEqual(expectedResult);
  });

  it('returns null given empty string', () => {
    expect(getOpeningHours('')).toBe(null);
  });

  it('returns empty array given ";;;"', () => {
    expect(getOpeningHours(';;;')).toEqual([]);
  });

  it('returns array with 00:00-24:00 hour range given weekday range without hours', () => {
    expect(getOpeningHours(incompleteString1)).toEqual([
      {
        from: 'Mo',
        to: 'We',
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
  `('throws an error given $input', ({ input }) => {
    expect(() => getOpeningHours(input)).toThrow();
  });
});
