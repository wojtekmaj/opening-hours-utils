import { describe, expect, it } from 'vitest';
import getNextClosedAt from './get_next_closed_at';

import {
  closeMonday,
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

describe('getNextClosedAt()', () => {
  it.each`
    openingHoursString                   | date                  | expectedResult
    ${openOnWeekdays.string}             | ${saturdayMidnight}   | ${null}
    ${openOnWeekdays.string}             | ${saturdayEightAm}    | ${null}
    ${openOnWeekdays.string}             | ${saturdayMidday}     | ${null}
    ${openOnWeekdays.string}             | ${saturdayEvening}    | ${null}
    ${openOnWeekdays.string}             | ${mondayMidnight}     | ${null}
    ${openOnWeekdays.string}             | ${mondayMorning}      | ${'Mo 17:30'}
    ${openOnWeekdays.string}             | ${mondayMidday}       | ${'Mo 17:30'}
    ${openOnWeekdays.string}             | ${mondayTwelveThirty} | ${'Mo 17:30'}
    ${openOnWeekdays.string}             | ${mondayEvening}      | ${null}
    ${openOnMondaysAndWednesdays.string} | ${saturdayMidnight}   | ${null}
    ${openOnMondaysAndWednesdays.string} | ${saturdayEightAm}    | ${null}
    ${openOnMondaysAndWednesdays.string} | ${saturdayMidday}     | ${null}
    ${openOnMondaysAndWednesdays.string} | ${saturdayEvening}    | ${null}
    ${openOnMondaysAndWednesdays.string} | ${mondayMidnight}     | ${null}
    ${openOnMondaysAndWednesdays.string} | ${mondayMorning}      | ${'Mo 17:30'}
    ${openOnMondaysAndWednesdays.string} | ${mondayMidday}       | ${'Mo 17:30'}
    ${openOnMondaysAndWednesdays.string} | ${mondayTwelveThirty} | ${'Mo 17:30'}
    ${openOnMondaysAndWednesdays.string} | ${mondayEvening}      | ${null}
    ${multipleOpeningIntervals.string}   | ${saturdayMidnight}   | ${null}
    ${multipleOpeningIntervals.string}   | ${saturdayEightAm}    | ${null}
    ${multipleOpeningIntervals.string}   | ${saturdayMidday}     | ${null}
    ${multipleOpeningIntervals.string}   | ${saturdayEvening}    | ${null}
    ${multipleOpeningIntervals.string}   | ${mondayMidnight}     | ${null}
    ${multipleOpeningIntervals.string}   | ${mondayMorning}      | ${'Mo 12:00'}
    ${multipleOpeningIntervals.string}   | ${mondayMidday}       | ${'Mo 12:00'}
    ${multipleOpeningIntervals.string}   | ${mondayTwelveThirty} | ${null}
    ${multipleOpeningIntervals.string}   | ${mondayEvening}      | ${null}
    ${openOnSaturday.string}             | ${saturdayMidnight}   | ${null}
    ${openOnSaturday.string}             | ${saturdayEightAm}    | ${'Sa 17:30'}
    ${openOnSaturday.string}             | ${saturdayMidday}     | ${'Sa 17:30'}
    ${openOnSaturday.string}             | ${saturdayEvening}    | ${null}
    ${openOnSaturday.string}             | ${saturdayEvening}    | ${null}
    ${openOnSaturday.string}             | ${mondayMidnight}     | ${null}
    ${openOnSaturday.string}             | ${mondayMorning}      | ${null}
    ${openOnSaturday.string}             | ${mondayMidday}       | ${null}
    ${openOnSaturday.string}             | ${mondayTwelveThirty} | ${null}
    ${openOnSaturday.string}             | ${mondayEvening}      | ${null}
    ${openOnWeekends.string}             | ${saturdayMidnight}   | ${null}
    ${openOnWeekends.string}             | ${saturdayEightAm}    | ${'Sa 17:30'}
    ${openOnWeekends.string}             | ${saturdayMidday}     | ${'Sa 17:30'}
    ${openOnWeekends.string}             | ${saturdayEvening}    | ${null}
    ${openOnWeekends.string}             | ${mondayMidnight}     | ${null}
    ${openOnWeekends.string}             | ${mondayMorning}      | ${null}
    ${openOnWeekends.string}             | ${mondayMidday}       | ${null}
    ${openOnWeekends.string}             | ${mondayTwelveThirty} | ${null}
    ${openOnWeekends.string}             | ${mondayEvening}      | ${null}
    ${openFridayToTuesday.string}        | ${saturdayMidnight}   | ${null}
    ${openFridayToTuesday.string}        | ${saturdayEightAm}    | ${'Sa 17:30'}
    ${openFridayToTuesday.string}        | ${saturdayMidday}     | ${'Sa 17:30'}
    ${openFridayToTuesday.string}        | ${saturdayEvening}    | ${null}
    ${openFridayToTuesday.string}        | ${mondayMidnight}     | ${null}
    ${openFridayToTuesday.string}        | ${mondayMorning}      | ${'Mo 17:30'}
    ${openFridayToTuesday.string}        | ${mondayMidday}       | ${'Mo 17:30'}
    ${openFridayToTuesday.string}        | ${mondayTwelveThirty} | ${'Mo 17:30'}
    ${openFridayToTuesday.string}        | ${mondayEvening}      | ${null}
    ${openNonStop.string}                | ${saturdayMidnight}   | ${null}
    ${openNonStop.string}                | ${saturdayEightAm}    | ${null}
    ${openNonStop.string}                | ${saturdayMidday}     | ${null}
    ${openNonStop.string}                | ${saturdayEvening}    | ${null}
    ${openNonStop.string}                | ${mondayMidnight}     | ${null}
    ${openNonStop.string}                | ${mondayMorning}      | ${null}
    ${openNonStop.string}                | ${mondayMidday}       | ${null}
    ${openNonStop.string}                | ${mondayTwelveThirty} | ${null}
    ${openNonStop.string}                | ${mondayEvening}      | ${null}
    ${openNonStopOnWeekends.string}      | ${saturdayMidnight}   | ${'Su 24:00'}
    ${openNonStopOnWeekends.string}      | ${saturdayEightAm}    | ${'Su 24:00'}
    ${openNonStopOnWeekends.string}      | ${saturdayMidday}     | ${'Su 24:00'}
    ${openNonStopOnWeekends.string}      | ${saturdayEvening}    | ${'Su 24:00'}
    ${openNonStopOnWeekends.string}      | ${mondayMidnight}     | ${null}
    ${openNonStopOnWeekends.string}      | ${mondayMorning}      | ${null}
    ${openNonStopOnWeekends.string}      | ${mondayMidday}       | ${null}
    ${openNonStopOnWeekends.string}      | ${mondayTwelveThirty} | ${null}
    ${openNonStopOnWeekends.string}      | ${mondayEvening}      | ${null}
    ${openNonStopOnWeekends2.string}     | ${saturdayMidnight}   | ${'Su 24:00'}
    ${openNonStopOnWeekends2.string}     | ${saturdayEightAm}    | ${'Su 24:00'}
    ${openNonStopOnWeekends2.string}     | ${saturdayMidday}     | ${'Su 24:00'}
    ${openNonStopOnWeekends2.string}     | ${saturdayEvening}    | ${'Su 24:00'}
    ${openNonStopOnWeekends2.string}     | ${mondayMidnight}     | ${null}
    ${openNonStopOnWeekends2.string}     | ${mondayMorning}      | ${null}
    ${openNonStopOnWeekends2.string}     | ${mondayMidday}       | ${null}
    ${openNonStopOnWeekends2.string}     | ${mondayTwelveThirty} | ${null}
    ${openNonStopOnWeekends2.string}     | ${mondayEvening}      | ${null}
    ${unspecifiedClosingTime.string}     | ${saturdayMidnight}   | ${null}
    ${unspecifiedClosingTime.string}     | ${saturdayEightAm}    | ${null}
    ${unspecifiedClosingTime.string}     | ${saturdayMidday}     | ${null}
    ${unspecifiedClosingTime.string}     | ${saturdayEvening}    | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayMidnight}     | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayMorning}      | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayMidday}       | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayTwelveThirty} | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayEvening}      | ${null}
    ${overrideWithDifferentHours.string} | ${saturdayMidnight}   | ${null}
    ${overrideWithDifferentHours.string} | ${saturdayEightAm}    | ${null}
    ${overrideWithDifferentHours.string} | ${saturdayMidday}     | ${'Sa 20:00'}
    ${overrideWithDifferentHours.string} | ${saturdayEvening}    | ${'Sa 20:00'}
    ${overrideWithDifferentHours.string} | ${mondayMidnight}     | ${null}
    ${overrideWithDifferentHours.string} | ${mondayMorning}      | ${null}
    ${overrideWithDifferentHours.string} | ${mondayMidday}       | ${'Mo 20:00'}
    ${overrideWithDifferentHours.string} | ${mondayTwelveThirty} | ${'Mo 20:00'}
    ${overrideWithDifferentHours.string} | ${mondayEvening}      | ${'Mo 20:00'}
    ${overrideWithDifferentHours.string} | ${tuesdayAfternoon}   | ${null}
    ${overrideWithOff.string}            | ${saturdayMidnight}   | ${null}
    ${overrideWithOff.string}            | ${saturdayEightAm}    | ${null}
    ${overrideWithOff.string}            | ${saturdayMidday}     | ${'Sa 20:00'}
    ${overrideWithOff.string}            | ${saturdayEvening}    | ${'Sa 20:00'}
    ${overrideWithOff.string}            | ${mondayMidnight}     | ${null}
    ${overrideWithOff.string}            | ${mondayMorning}      | ${null}
    ${overrideWithOff.string}            | ${mondayMidday}       | ${'Mo 20:00'}
    ${overrideWithOff.string}            | ${mondayTwelveThirty} | ${'Mo 20:00'}
    ${overrideWithOff.string}            | ${mondayEvening}      | ${'Mo 20:00'}
    ${overrideWithOff.string}            | ${tuesdayAfternoon}   | ${null}
    ${spaces.string}                     | ${saturdayMidnight}   | ${null}
    ${spaces.string}                     | ${saturdayEightAm}    | ${null}
    ${spaces.string}                     | ${saturdayMidday}     | ${null}
    ${spaces.string}                     | ${saturdayEvening}    | ${null}
    ${spaces.string}                     | ${mondayMidnight}     | ${null}
    ${spaces.string}                     | ${mondayMorning}      | ${'Mo 12:00'}
    ${spaces.string}                     | ${mondayMidday}       | ${'Mo 12:00'}
    ${spaces.string}                     | ${mondayTwelveThirty} | ${null}
    ${spaces.string}                     | ${mondayEvening}      | ${null}
    ${justHours.string}                  | ${saturdayMidnight}   | ${null}
    ${justHours.string}                  | ${saturdayEightAm}    | ${null}
    ${justHours.string}                  | ${saturdayMidday}     | ${'Sa 20:00'}
    ${justHours.string}                  | ${saturdayEvening}    | ${'Sa 20:00'}
    ${justHours.string}                  | ${mondayMidnight}     | ${null}
    ${justHours.string}                  | ${mondayMorning}      | ${null}
    ${justHours.string}                  | ${mondayMidday}       | ${'Mo 20:00'}
    ${justHours.string}                  | ${mondayTwelveThirty} | ${'Mo 20:00'}
    ${justHours.string}                  | ${mondayEvening}      | ${'Mo 20:00'}
    ${justHours.string}                  | ${tuesdayAfternoon}   | ${'Tu 20:00'}
  `(
    'returns $expectedResult given $openingHoursString and $date',
    ({ openingHoursString, date, expectedResult }) => {
      const result = getNextClosedAt(openingHoursString, date);

      expect(result).toBe(expectedResult);
    },
  );

  it.each`
    openingHoursString                   | date                  | expectedResult
    ${openOnWeekdays.string}             | ${mondayMorning}      | ${closeMonday}
    ${openOnWeekdays.string}             | ${mondayMidday}       | ${closeMonday}
    ${openOnWeekdays.string}             | ${mondayTwelveThirty} | ${closeMonday}
    ${openOnMondaysAndWednesdays.string} | ${mondayMorning}      | ${closeMonday}
    ${openOnMondaysAndWednesdays.string} | ${mondayMidday}       | ${closeMonday}
    ${openOnMondaysAndWednesdays.string} | ${mondayTwelveThirty} | ${closeMonday}
    ${openFridayToTuesday.string}        | ${mondayMorning}      | ${closeMonday}
    ${openFridayToTuesday.string}        | ${mondayMidday}       | ${closeMonday}
    ${openFridayToTuesday.string}        | ${mondayTwelveThirty} | ${closeMonday}
    ${openOnMondaysAndWednesdays.string} | ${saturdayEvening}    | ${null}
  `(
    'returns $expectedResult given $openingHoursString and $date',
    ({ openingHoursString, date, expectedResult }) => {
      const result = getNextClosedAt(openingHoursString, date, true);

      expect(result).toEqual(expectedResult);
    },
  );

  it('returns null given empty string', () => {
    expect(getNextClosedAt('', mondayMorning)).toBe(null);
  });

  it('throws given no date', () => {
    // @ts-expect-error-next-line
    expect(() => getNextClosedAt(openOnWeekdays.string)).toThrow();
  });

  it.each`
    input
    ${undefined}
    ${null}
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    // @ts-expect-error-next-line
    expect(() => getNextClosedAt(input)).toThrow();
  });
});
