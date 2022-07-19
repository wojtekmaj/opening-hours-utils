import getOpeningHours from './get_opening_hours';

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

describe('getOpeningHours()', () => {
  it.each`
    input                              | expectedResult
    ${openOnWeekdays.string}           | ${openOnWeekdays.array}
    ${multipleOpeningIntervals.string} | ${multipleOpeningIntervals.array}
    ${openOnWeekends.string}           | ${openOnWeekends.array}
    ${openFridayToTuesday.string}      | ${openFridayToTuesday.array}
    ${openNonStop.string}              | ${openNonStop.array}
    ${openNonStopOnWeekends.string}    | ${openNonStopOnWeekends.array}
  `('returns proper object given $input', ({ input, expectedResult }) => {
    const result = getOpeningHours(input);

    expect(result).toEqual(expectedResult);
  });

  it.each`
    input
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    expect(() => getOpeningHours(input)).toThrow();
  });
});
