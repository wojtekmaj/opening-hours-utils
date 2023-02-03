import getNextOpenAt from './get_next_open_at';

import {
  invalidString1,
  invalidString2,
  invalidString3,
  mondayEvening,
  mondayMidday,
  mondayMidnight,
  mondayMorning,
  mondayTwelveThirty,
  multipleOpeningIntervals,
  openFridayToTuesday,
  openNonStop,
  openNonStopOnWeekends,
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
  tuesdayAfternoon,
  unspecifiedClosingTime,
} from '../test_data';

describe('getNextOpenAt()', () => {
  it.each`
    openingHoursString                   | date                  | expectedResult
    ${openOnWeekdays.string}             | ${saturdayMidnight}   | ${'Mo 08:00'}
    ${openOnWeekdays.string}             | ${saturdayEightAm}    | ${'Mo 08:00'}
    ${openOnWeekdays.string}             | ${saturdayMidday}     | ${'Mo 08:00'}
    ${openOnWeekdays.string}             | ${saturdayEvening}    | ${'Mo 08:00'}
    ${openOnWeekdays.string}             | ${mondayMidnight}     | ${'Mo 08:00'}
    ${openOnWeekdays.string}             | ${mondayMorning}      | ${null}
    ${openOnWeekdays.string}             | ${mondayMidday}       | ${null}
    ${openOnWeekdays.string}             | ${mondayTwelveThirty} | ${null}
    ${openOnWeekdays.string}             | ${mondayEvening}      | ${'Tu 08:00'}
    ${openOnMondaysAndWednesdays.string} | ${saturdayMidnight}   | ${'Mo 08:00'}
    ${openOnMondaysAndWednesdays.string} | ${saturdayEightAm}    | ${'Mo 08:00'}
    ${openOnMondaysAndWednesdays.string} | ${saturdayMidday}     | ${'Mo 08:00'}
    ${openOnMondaysAndWednesdays.string} | ${saturdayEvening}    | ${'Mo 08:00'}
    ${openOnMondaysAndWednesdays.string} | ${mondayMidnight}     | ${'Mo 08:00'}
    ${openOnMondaysAndWednesdays.string} | ${mondayMorning}      | ${null}
    ${openOnMondaysAndWednesdays.string} | ${mondayMidday}       | ${null}
    ${openOnMondaysAndWednesdays.string} | ${mondayTwelveThirty} | ${null}
    ${openOnMondaysAndWednesdays.string} | ${mondayEvening}      | ${'We 08:00'}
    ${multipleOpeningIntervals.string}   | ${saturdayMidnight}   | ${'Mo 08:00'}
    ${multipleOpeningIntervals.string}   | ${saturdayEightAm}    | ${'Mo 08:00'}
    ${multipleOpeningIntervals.string}   | ${saturdayMidday}     | ${'Mo 08:00'}
    ${multipleOpeningIntervals.string}   | ${saturdayEvening}    | ${'Mo 08:00'}
    ${multipleOpeningIntervals.string}   | ${mondayMidnight}     | ${'Mo 08:00'}
    ${multipleOpeningIntervals.string}   | ${mondayMorning}      | ${null}
    ${multipleOpeningIntervals.string}   | ${mondayMidday}       | ${null}
    ${multipleOpeningIntervals.string}   | ${mondayTwelveThirty} | ${'Mo 13:00'}
    ${multipleOpeningIntervals.string}   | ${mondayEvening}      | ${'Tu 08:00'}
    ${openOnSaturday.string}             | ${saturdayMidnight}   | ${'Sa 08:00'}
    ${openOnSaturday.string}             | ${saturdayEightAm}    | ${null}
    ${openOnSaturday.string}             | ${saturdayMidday}     | ${null}
    ${openOnSaturday.string}             | ${saturdayEvening}    | ${'Sa 08:00'}
    ${openOnSaturday.string}             | ${mondayMidnight}     | ${'Sa 08:00'}
    ${openOnSaturday.string}             | ${mondayMorning}      | ${'Sa 08:00'}
    ${openOnSaturday.string}             | ${mondayMidday}       | ${'Sa 08:00'}
    ${openOnSaturday.string}             | ${mondayTwelveThirty} | ${'Sa 08:00'}
    ${openOnSaturday.string}             | ${mondayEvening}      | ${'Sa 08:00'}
    ${openOnWeekends.string}             | ${saturdayMidnight}   | ${'Sa 08:00'}
    ${openOnWeekends.string}             | ${saturdayEightAm}    | ${null}
    ${openOnWeekends.string}             | ${saturdayMidday}     | ${null}
    ${openOnWeekends.string}             | ${saturdayEvening}    | ${'Su 08:00'}
    ${openOnWeekends.string}             | ${mondayMidnight}     | ${'Sa 08:00'}
    ${openOnWeekends.string}             | ${mondayMorning}      | ${'Sa 08:00'}
    ${openOnWeekends.string}             | ${mondayMidday}       | ${'Sa 08:00'}
    ${openOnWeekends.string}             | ${mondayTwelveThirty} | ${'Sa 08:00'}
    ${openOnWeekends.string}             | ${mondayEvening}      | ${'Sa 08:00'}
    ${openFridayToTuesday.string}        | ${saturdayMidnight}   | ${'Sa 08:00'}
    ${openFridayToTuesday.string}        | ${saturdayEightAm}    | ${null}
    ${openFridayToTuesday.string}        | ${saturdayMidday}     | ${null}
    ${openFridayToTuesday.string}        | ${saturdayEvening}    | ${'Su 08:00'}
    ${openFridayToTuesday.string}        | ${mondayMidnight}     | ${'Mo 08:00'}
    ${openFridayToTuesday.string}        | ${mondayMorning}      | ${null}
    ${openFridayToTuesday.string}        | ${mondayMidday}       | ${null}
    ${openFridayToTuesday.string}        | ${mondayTwelveThirty} | ${null}
    ${openFridayToTuesday.string}        | ${mondayEvening}      | ${'Tu 08:00'}
    ${openNonStop.string}                | ${saturdayMidnight}   | ${null}
    ${openNonStop.string}                | ${saturdayEightAm}    | ${null}
    ${openNonStop.string}                | ${saturdayMidday}     | ${null}
    ${openNonStop.string}                | ${saturdayEvening}    | ${null}
    ${openNonStop.string}                | ${mondayMidnight}     | ${null}
    ${openNonStop.string}                | ${mondayMorning}      | ${null}
    ${openNonStop.string}                | ${mondayMidday}       | ${null}
    ${openNonStop.string}                | ${mondayTwelveThirty} | ${null}
    ${openNonStop.string}                | ${mondayEvening}      | ${null}
    ${openNonStopOnWeekends.string}      | ${saturdayMidnight}   | ${null}
    ${openNonStopOnWeekends.string}      | ${saturdayEightAm}    | ${null}
    ${openNonStopOnWeekends.string}      | ${saturdayMidday}     | ${null}
    ${openNonStopOnWeekends.string}      | ${saturdayEvening}    | ${null}
    ${openNonStopOnWeekends.string}      | ${mondayMidnight}     | ${'Sa 00:00'}
    ${openNonStopOnWeekends.string}      | ${mondayMorning}      | ${'Sa 00:00'}
    ${openNonStopOnWeekends.string}      | ${mondayMidday}       | ${'Sa 00:00'}
    ${openNonStopOnWeekends.string}      | ${mondayTwelveThirty} | ${'Sa 00:00'}
    ${openNonStopOnWeekends.string}      | ${mondayEvening}      | ${'Sa 00:00'}
    ${unspecifiedClosingTime.string}     | ${saturdayMidnight}   | ${'Sa 10:00'}
    ${unspecifiedClosingTime.string}     | ${saturdayEightAm}    | ${'Sa 10:00'}
    ${unspecifiedClosingTime.string}     | ${saturdayMidday}     | ${null}
    ${unspecifiedClosingTime.string}     | ${saturdayEvening}    | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayMidnight}     | ${'Sa 10:00'}
    ${unspecifiedClosingTime.string}     | ${mondayMorning}      | ${'Sa 10:00'}
    ${unspecifiedClosingTime.string}     | ${mondayMidday}       | ${'Sa 10:00'}
    ${unspecifiedClosingTime.string}     | ${mondayTwelveThirty} | ${'Sa 10:00'}
    ${unspecifiedClosingTime.string}     | ${mondayEvening}      | ${'Sa 10:00'}
    ${overrideWithDifferentHours.string} | ${saturdayMidnight}   | ${'Sa 10:00'}
    ${overrideWithDifferentHours.string} | ${saturdayEightAm}    | ${'Sa 10:00'}
    ${overrideWithDifferentHours.string} | ${saturdayMidday}     | ${null}
    ${overrideWithDifferentHours.string} | ${saturdayEvening}    | ${null}
    ${overrideWithDifferentHours.string} | ${mondayMidnight}     | ${'Mo 10:00'}
    ${overrideWithDifferentHours.string} | ${mondayMorning}      | ${'Mo 10:00'}
    ${overrideWithDifferentHours.string} | ${mondayMidday}       | ${null}
    ${overrideWithDifferentHours.string} | ${mondayTwelveThirty} | ${null}
    ${overrideWithDifferentHours.string} | ${mondayEvening}      | ${null}
    ${overrideWithDifferentHours.string} | ${tuesdayAfternoon}   | ${'We 10:00'}
    ${overrideWithOff.string}            | ${saturdayMidnight}   | ${'Sa 10:00'}
    ${overrideWithOff.string}            | ${saturdayEightAm}    | ${'Sa 10:00'}
    ${overrideWithOff.string}            | ${saturdayMidday}     | ${null}
    ${overrideWithOff.string}            | ${saturdayEvening}    | ${null}
    ${overrideWithOff.string}            | ${mondayMidnight}     | ${'Mo 10:00'}
    ${overrideWithOff.string}            | ${mondayMorning}      | ${'Mo 10:00'}
    ${overrideWithOff.string}            | ${mondayMidday}       | ${null}
    ${overrideWithOff.string}            | ${mondayTwelveThirty} | ${null}
    ${overrideWithOff.string}            | ${mondayEvening}      | ${null}
    ${overrideWithOff.string}            | ${tuesdayAfternoon}   | ${'We 10:00'}
  `(
    'returns $expectedResult given $openingHoursString and $date',
    ({ openingHoursString, date, expectedResult }) => {
      const result = getNextOpenAt(openingHoursString, date, expectedResult);

      expect(result).toBe(expectedResult);
    },
  );

  it('returns null given empty string', () => {
    expect(getNextOpenAt('', mondayMorning)).toBe(null);
  });

  it('throws given no date', () => {
    expect(() => getNextOpenAt(openOnWeekdays.string)).toThrow();
  });

  it.each`
    input
    ${undefined}
    ${null}
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    expect(() => getNextOpenAt(input)).toThrow();
  });
});
