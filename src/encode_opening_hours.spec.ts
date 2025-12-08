import { describe, expect, it } from 'vitest';

import {
  absoluteDays,
  incompleteArray1,
  incompleteString1,
  justHours,
  leadingZeroAbsoluteDays,
  missingAbsoluteHoursArray,
  missingRecurringHoursArray,
  multipleOpeningIntervals,
  openFridayToTuesday,
  openNonStop,
  openNonStopOnWeekends,
  openNonStopOnWeekends2,
  openOnMondaysAndWednesdays,
  openOnSaturday,
  openOnWeekdays,
  openOnWeekends,
  overrideWithDifferentHours,
  overrideWithOff,
  spaces,
  unspecifiedClosingTime,
} from '../test_data.js';
import encodeOpeningHours from './encode_opening_hours.js';

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
    ${openNonStopOnWeekends2.array}     | ${openNonStopOnWeekends2.altString}
    ${unspecifiedClosingTime.array}     | ${unspecifiedClosingTime.string}
    ${overrideWithDifferentHours.array} | ${overrideWithDifferentHours.string}
    ${overrideWithOff.array}            | ${overrideWithOff.string}
    ${spaces.array}                     | ${spaces.altString}
    ${justHours.array}                  | ${justHours.altString}
  `('returns proper object given $input', ({ input, expectedResult }) => {
    const result = encodeOpeningHours(input);

    expect(result).toEqual(expectedResult);
  });

  it('returns empty string given []', () => {
    expect(encodeOpeningHours([])).toBe('');
  });

  it('returns weekday range without hours given array with no "from" value', () => {
    // @ts-expect-error-next-line
    expect(encodeOpeningHours(incompleteArray1)).toBe(incompleteString1);
  });

  it('skips over missing recurring hours', () => {
    // @ts-expect-error-next-line
    expect(encodeOpeningHours(missingRecurringHoursArray)).toBe('');
  });

  it('skips over missing absolute hours', () => {
    // @ts-expect-error-next-line
    expect(encodeOpeningHours(missingAbsoluteHoursArray)).toBe('');
  });

  it('returns proper string given absolute days array', () => {
    const result = encodeOpeningHours(absoluteDays.array);

    expect(result).toEqual(absoluteDays.string);
  });

  it('returns proper string given leading zero absolute days array', () => {
    const result = encodeOpeningHours(leadingZeroAbsoluteDays.array);

    expect(result).toEqual(leadingZeroAbsoluteDays.string);
  });

  it.each`
    input
    ${undefined}
    ${null}
    ${'some string'}
  `('throws error given $input', ({ input }) => {
    expect(() => encodeOpeningHours(input)).toThrow();
  });
});
