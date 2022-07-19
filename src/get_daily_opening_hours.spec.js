import getDailyOpeningHours from './get_daily_opening_hours';

import {
  invalidString1,
  invalidString2,
  invalidString3,
  multipleOpeningIntervals,
  openFridayToTuesday,
  openNonStop,
  openNonStopOnWeekends,
  openOnWeekdays,
  openOnWeekends,
} from '../test_data';

describe('getDailyOpeningHours()', () => {
  it.each`
    input                              | expectedResult
    ${openOnWeekdays.string}           | ${openOnWeekdays.dailyArray}
    ${multipleOpeningIntervals.string} | ${multipleOpeningIntervals.dailyArray}
    ${openOnWeekends.string}           | ${openOnWeekends.dailyArray}
    ${openFridayToTuesday.string}      | ${openFridayToTuesday.dailyArray}
    ${openNonStop.string}              | ${openNonStop.dailyArray}
    ${openNonStopOnWeekends.string}    | ${openNonStopOnWeekends.dailyArray}
  `('returns proper object given $input', ({ input, expectedResult }) => {
    const result = getDailyOpeningHours(input);

    expect(result).toEqual(expectedResult);
  });

  it('returns null given undefined', () => {
    expect(getDailyOpeningHours(undefined)).toBe(null);
  });

  it('returns null given empty string', () => {
    expect(getDailyOpeningHours('')).toBe(null);
  });

  it.each`
    input
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    expect(() => getDailyOpeningHours(input)).toThrow();
  });
});
