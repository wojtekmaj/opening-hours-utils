import encodeOpeningHours from './encode_opening_hours';

import {
  multipleOpeningIntervals,
  openFridayToTuesday,
  openNonStop,
  openNonStopOnWeekends,
  openOnWeekdays,
  openOnWeekends,
} from '../test_data';

describe('getOpeningHours()', () => {
  it.each`
    input                             | expectedResult
    ${openOnWeekdays.array}           | ${openOnWeekdays.string}
    ${multipleOpeningIntervals.array} | ${multipleOpeningIntervals.string}
    ${openOnWeekends.array}           | ${openOnWeekends.string}
    ${openFridayToTuesday.array}      | ${openFridayToTuesday.string}
    ${openNonStop.array}              | ${openNonStop.string}
    ${openNonStopOnWeekends.array}    | ${openNonStopOnWeekends.string}
  `('returns proper object given $input', ({ input, expectedResult }) => {
    const result = encodeOpeningHours(input);

    expect(result).toEqual(expectedResult);
  });
});
