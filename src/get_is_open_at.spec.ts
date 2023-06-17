import { describe, expect, it } from 'vitest';
import getIsOpenAt from './get_is_open_at';

import {
  invalidString1,
  invalidString2,
  invalidString3,
  justHours,
  mondayEvening,
  mondayMidday,
  mondayMidnight,
  mondayMorning,
  mondayTwelveThirty,
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
  saturdayEightAm,
  saturdayEvening,
  saturdayMidday,
  saturdayMidnight,
  spaces,
  tuesdayAfternoon,
  unspecifiedClosingTime,
} from '../test_data';

describe('getIsOpenAt()', () => {
  it.each`
    openingHoursString                   | date                  | expectedResult
    ${openOnWeekdays.string}             | ${saturdayMidnight}   | ${false}
    ${openOnWeekdays.string}             | ${saturdayEightAm}    | ${false}
    ${openOnWeekdays.string}             | ${saturdayMidday}     | ${false}
    ${openOnWeekdays.string}             | ${saturdayEvening}    | ${false}
    ${openOnWeekdays.string}             | ${mondayMidnight}     | ${false}
    ${openOnWeekdays.string}             | ${mondayMorning}      | ${true}
    ${openOnWeekdays.string}             | ${mondayMidday}       | ${true}
    ${openOnWeekdays.string}             | ${mondayTwelveThirty} | ${true}
    ${openOnWeekdays.string}             | ${mondayEvening}      | ${false}
    ${openOnMondaysAndWednesdays.string} | ${saturdayMidnight}   | ${false}
    ${openOnMondaysAndWednesdays.string} | ${saturdayEightAm}    | ${false}
    ${openOnMondaysAndWednesdays.string} | ${saturdayMidday}     | ${false}
    ${openOnMondaysAndWednesdays.string} | ${saturdayEvening}    | ${false}
    ${openOnMondaysAndWednesdays.string} | ${mondayMidnight}     | ${false}
    ${openOnMondaysAndWednesdays.string} | ${mondayMorning}      | ${true}
    ${openOnMondaysAndWednesdays.string} | ${mondayMidday}       | ${true}
    ${openOnMondaysAndWednesdays.string} | ${mondayTwelveThirty} | ${true}
    ${openOnMondaysAndWednesdays.string} | ${mondayEvening}      | ${false}
    ${multipleOpeningIntervals.string}   | ${saturdayMidnight}   | ${false}
    ${multipleOpeningIntervals.string}   | ${saturdayEightAm}    | ${false}
    ${multipleOpeningIntervals.string}   | ${saturdayMidday}     | ${false}
    ${multipleOpeningIntervals.string}   | ${saturdayEvening}    | ${false}
    ${multipleOpeningIntervals.string}   | ${mondayMidnight}     | ${false}
    ${multipleOpeningIntervals.string}   | ${mondayMorning}      | ${true}
    ${multipleOpeningIntervals.string}   | ${mondayMidday}       | ${true}
    ${multipleOpeningIntervals.string}   | ${mondayTwelveThirty} | ${false}
    ${multipleOpeningIntervals.string}   | ${mondayEvening}      | ${false}
    ${openOnSaturday.string}             | ${saturdayMidnight}   | ${false}
    ${openOnSaturday.string}             | ${saturdayEightAm}    | ${true}
    ${openOnSaturday.string}             | ${saturdayMidday}     | ${true}
    ${openOnSaturday.string}             | ${saturdayEvening}    | ${false}
    ${openOnSaturday.string}             | ${mondayMidnight}     | ${false}
    ${openOnSaturday.string}             | ${mondayMorning}      | ${false}
    ${openOnSaturday.string}             | ${mondayMidday}       | ${false}
    ${openOnSaturday.string}             | ${mondayTwelveThirty} | ${false}
    ${openOnSaturday.string}             | ${mondayEvening}      | ${false}
    ${openOnWeekends.string}             | ${saturdayMidnight}   | ${false}
    ${openOnWeekends.string}             | ${saturdayEightAm}    | ${true}
    ${openOnWeekends.string}             | ${saturdayMidday}     | ${true}
    ${openOnWeekends.string}             | ${saturdayEvening}    | ${false}
    ${openOnWeekends.string}             | ${mondayMidnight}     | ${false}
    ${openOnWeekends.string}             | ${mondayMorning}      | ${false}
    ${openOnWeekends.string}             | ${mondayMidday}       | ${false}
    ${openOnWeekends.string}             | ${mondayTwelveThirty} | ${false}
    ${openOnWeekends.string}             | ${mondayEvening}      | ${false}
    ${openFridayToTuesday.string}        | ${saturdayMidnight}   | ${false}
    ${openFridayToTuesday.string}        | ${saturdayEightAm}    | ${true}
    ${openFridayToTuesday.string}        | ${saturdayMidday}     | ${true}
    ${openFridayToTuesday.string}        | ${saturdayEvening}    | ${false}
    ${openFridayToTuesday.string}        | ${mondayMidnight}     | ${false}
    ${openFridayToTuesday.string}        | ${mondayMorning}      | ${true}
    ${openFridayToTuesday.string}        | ${mondayMidday}       | ${true}
    ${openFridayToTuesday.string}        | ${mondayTwelveThirty} | ${true}
    ${openFridayToTuesday.string}        | ${mondayEvening}      | ${false}
    ${openNonStop.string}                | ${saturdayMidnight}   | ${true}
    ${openNonStop.string}                | ${saturdayEightAm}    | ${true}
    ${openNonStop.string}                | ${saturdayMidday}     | ${true}
    ${openNonStop.string}                | ${saturdayEvening}    | ${true}
    ${openNonStop.string}                | ${mondayMidnight}     | ${true}
    ${openNonStop.string}                | ${mondayMorning}      | ${true}
    ${openNonStop.string}                | ${mondayMidday}       | ${true}
    ${openNonStop.string}                | ${mondayTwelveThirty} | ${true}
    ${openNonStop.string}                | ${mondayEvening}      | ${true}
    ${openNonStopOnWeekends.string}      | ${saturdayMidnight}   | ${true}
    ${openNonStopOnWeekends.string}      | ${saturdayEightAm}    | ${true}
    ${openNonStopOnWeekends.string}      | ${saturdayMidday}     | ${true}
    ${openNonStopOnWeekends.string}      | ${saturdayEvening}    | ${true}
    ${openNonStopOnWeekends.string}      | ${mondayMidnight}     | ${false}
    ${openNonStopOnWeekends.string}      | ${mondayMorning}      | ${false}
    ${openNonStopOnWeekends.string}      | ${mondayMidday}       | ${false}
    ${openNonStopOnWeekends.string}      | ${mondayTwelveThirty} | ${false}
    ${openNonStopOnWeekends.string}      | ${mondayEvening}      | ${false}
    ${openNonStopOnWeekends2.string}     | ${saturdayMidnight}   | ${true}
    ${openNonStopOnWeekends2.string}     | ${saturdayEightAm}    | ${true}
    ${openNonStopOnWeekends2.string}     | ${saturdayMidday}     | ${true}
    ${openNonStopOnWeekends2.string}     | ${saturdayEvening}    | ${true}
    ${openNonStopOnWeekends2.string}     | ${mondayMidnight}     | ${false}
    ${openNonStopOnWeekends2.string}     | ${mondayMorning}      | ${false}
    ${openNonStopOnWeekends2.string}     | ${mondayMidday}       | ${false}
    ${openNonStopOnWeekends2.string}     | ${mondayTwelveThirty} | ${false}
    ${openNonStopOnWeekends2.string}     | ${mondayEvening}      | ${false}
    ${unspecifiedClosingTime.string}     | ${saturdayMidnight}   | ${false}
    ${unspecifiedClosingTime.string}     | ${saturdayEightAm}    | ${false}
    ${unspecifiedClosingTime.string}     | ${saturdayMidday}     | ${null}
    ${unspecifiedClosingTime.string}     | ${saturdayEvening}    | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayMidnight}     | ${false}
    ${unspecifiedClosingTime.string}     | ${mondayMorning}      | ${false}
    ${unspecifiedClosingTime.string}     | ${mondayMidday}       | ${false}
    ${unspecifiedClosingTime.string}     | ${mondayTwelveThirty} | ${false}
    ${unspecifiedClosingTime.string}     | ${mondayEvening}      | ${false}
    ${overrideWithDifferentHours.string} | ${saturdayMidnight}   | ${false}
    ${overrideWithDifferentHours.string} | ${saturdayEightAm}    | ${false}
    ${overrideWithDifferentHours.string} | ${saturdayMidday}     | ${true}
    ${overrideWithDifferentHours.string} | ${saturdayEvening}    | ${true}
    ${overrideWithDifferentHours.string} | ${mondayMidnight}     | ${false}
    ${overrideWithDifferentHours.string} | ${mondayMorning}      | ${false}
    ${overrideWithDifferentHours.string} | ${mondayMidday}       | ${true}
    ${overrideWithDifferentHours.string} | ${mondayTwelveThirty} | ${true}
    ${overrideWithDifferentHours.string} | ${mondayEvening}      | ${true}
    ${overrideWithDifferentHours.string} | ${tuesdayAfternoon}   | ${false}
    ${overrideWithOff.string}            | ${saturdayMidnight}   | ${false}
    ${overrideWithOff.string}            | ${saturdayEightAm}    | ${false}
    ${overrideWithOff.string}            | ${saturdayMidday}     | ${true}
    ${overrideWithOff.string}            | ${saturdayEvening}    | ${true}
    ${overrideWithOff.string}            | ${mondayMidnight}     | ${false}
    ${overrideWithOff.string}            | ${mondayMorning}      | ${false}
    ${overrideWithOff.string}            | ${mondayMidday}       | ${true}
    ${overrideWithOff.string}            | ${mondayTwelveThirty} | ${true}
    ${overrideWithOff.string}            | ${mondayEvening}      | ${true}
    ${overrideWithOff.string}            | ${tuesdayAfternoon}   | ${false}
    ${spaces.string}                     | ${saturdayMidnight}   | ${false}
    ${spaces.string}                     | ${saturdayEightAm}    | ${false}
    ${spaces.string}                     | ${saturdayMidday}     | ${false}
    ${spaces.string}                     | ${saturdayEvening}    | ${false}
    ${spaces.string}                     | ${mondayMidnight}     | ${false}
    ${spaces.string}                     | ${mondayMorning}      | ${true}
    ${spaces.string}                     | ${mondayMidday}       | ${true}
    ${spaces.string}                     | ${mondayTwelveThirty} | ${false}
    ${spaces.string}                     | ${mondayEvening}      | ${false}
    ${justHours.string}                  | ${saturdayMidnight}   | ${false}
    ${justHours.string}                  | ${saturdayEightAm}    | ${false}
    ${justHours.string}                  | ${saturdayMidday}     | ${true}
    ${justHours.string}                  | ${saturdayEvening}    | ${true}
    ${justHours.string}                  | ${mondayMidnight}     | ${false}
    ${justHours.string}                  | ${mondayMorning}      | ${false}
    ${justHours.string}                  | ${mondayMidday}       | ${true}
    ${justHours.string}                  | ${mondayTwelveThirty} | ${true}
    ${justHours.string}                  | ${mondayEvening}      | ${true}
    ${justHours.string}                  | ${tuesdayAfternoon}   | ${true}
  `(
    'returns $expectedResult given $openingHoursString and $date',
    ({ openingHoursString, date, expectedResult }) => {
      const result = getIsOpenAt(openingHoursString, date);

      expect(result).toBe(expectedResult);
    },
  );

  it('returns null given empty string', () => {
    expect(getIsOpenAt('', mondayMorning)).toBe(null);
  });

  it('throws given no date', () => {
    // @ts-expect-error-next-line
    expect(() => getIsOpenAt(openOnWeekdays.string)).toThrow();
  });

  it.each`
    input
    ${null}
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    // @ts-expect-error-next-line
    expect(() => getIsOpenAt(input)).toThrow();
  });
});
