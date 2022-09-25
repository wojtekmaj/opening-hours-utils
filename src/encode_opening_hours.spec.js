import encodeOpeningHours from './encode_opening_hours';

import {
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
} from '../test_data';

describe('encodeOpeningHours()', () => {
  it.each`
    input                               | expectedResult
    ${openOnWeekdays.array}             | ${openOnWeekdays.string}
    ${openOnMondaysAndWednesdays.array} | ${openOnMondaysAndWednesdays.altString}
    ${multipleOpeningIntervals.array}   | ${multipleOpeningIntervals.string}
    ${openOnSaturday.array}             | ${openOnSaturday.string}
    ${openOnWeekends.array}             | ${openOnWeekends.string}
    ${openFridayToTuesday.array}        | ${openFridayToTuesday.string}
    ${openNonStop.array}                | ${openNonStop.string}
    ${openNonStopOnWeekends.array}      | ${openNonStopOnWeekends.string}
    ${unspecifiedClosingTime.array}     | ${unspecifiedClosingTime.string}
    ${overrideWithDifferentHours.array} | ${overrideWithDifferentHours.string}
    ${overrideWithOff.array}            | ${overrideWithOff.string}
  `('returns proper object given $input', ({ input, expectedResult }) => {
    const result = encodeOpeningHours(input);

    expect(result).toEqual(expectedResult);
  });

  it('returns empty string given undefined', () => {
    expect(encodeOpeningHours(undefined)).toBe('');
  });

  it('returns empty string given []', () => {
    expect(encodeOpeningHours([])).toBe('');
  });
});
