import getNextClosedAt from './get_next_closed_at';

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
  openOnWeekdays,
  openOnWeekends,
  saturdayEightAm,
  saturdayMidday,
  saturdayMidnight,
  unspecifiedClosingTime,
} from '../test_data';

describe('getNextClosedAt()', () => {
  it.each`
    openingHoursString                   | date                  | expectedResult
    ${openOnWeekdays.string}             | ${saturdayMidnight}   | ${null}
    ${openOnWeekdays.string}             | ${saturdayEightAm}    | ${null}
    ${openOnWeekdays.string}             | ${saturdayMidday}     | ${null}
    ${openOnWeekdays.string}             | ${mondayMidnight}     | ${null}
    ${openOnWeekdays.string}             | ${mondayMorning}      | ${'Mo 17:30'}
    ${openOnWeekdays.string}             | ${mondayMidday}       | ${'Mo 17:30'}
    ${openOnWeekdays.string}             | ${mondayTwelveThirty} | ${'Mo 17:30'}
    ${openOnWeekdays.string}             | ${mondayEvening}      | ${null}
    ${openOnMondaysAndWednesdays.string} | ${saturdayMidnight}   | ${null}
    ${openOnMondaysAndWednesdays.string} | ${saturdayEightAm}    | ${null}
    ${openOnMondaysAndWednesdays.string} | ${saturdayMidday}     | ${null}
    ${openOnMondaysAndWednesdays.string} | ${mondayMidnight}     | ${null}
    ${openOnMondaysAndWednesdays.string} | ${mondayMorning}      | ${'Mo 17:30'}
    ${openOnMondaysAndWednesdays.string} | ${mondayMidday}       | ${'Mo 17:30'}
    ${openOnMondaysAndWednesdays.string} | ${mondayTwelveThirty} | ${'Mo 17:30'}
    ${openOnMondaysAndWednesdays.string} | ${mondayEvening}      | ${null}
    ${multipleOpeningIntervals.string}   | ${saturdayMidnight}   | ${null}
    ${multipleOpeningIntervals.string}   | ${saturdayEightAm}    | ${null}
    ${multipleOpeningIntervals.string}   | ${saturdayMidday}     | ${null}
    ${multipleOpeningIntervals.string}   | ${mondayMidnight}     | ${null}
    ${multipleOpeningIntervals.string}   | ${mondayMorning}      | ${'Mo 12:00'}
    ${multipleOpeningIntervals.string}   | ${mondayMidday}       | ${'Mo 12:00'}
    ${multipleOpeningIntervals.string}   | ${mondayTwelveThirty} | ${null}
    ${multipleOpeningIntervals.string}   | ${mondayEvening}      | ${null}
    ${openOnWeekends.string}             | ${saturdayMidnight}   | ${null}
    ${openOnWeekends.string}             | ${saturdayEightAm}    | ${'Sa 17:30'}
    ${openOnWeekends.string}             | ${saturdayMidday}     | ${'Sa 17:30'}
    ${openOnWeekends.string}             | ${mondayMidnight}     | ${null}
    ${openOnWeekends.string}             | ${mondayMorning}      | ${null}
    ${openOnWeekends.string}             | ${mondayMidday}       | ${null}
    ${openOnWeekends.string}             | ${mondayTwelveThirty} | ${null}
    ${openOnWeekends.string}             | ${mondayEvening}      | ${null}
    ${openFridayToTuesday.string}        | ${saturdayMidnight}   | ${null}
    ${openFridayToTuesday.string}        | ${saturdayEightAm}    | ${'Sa 17:30'}
    ${openFridayToTuesday.string}        | ${saturdayMidday}     | ${'Sa 17:30'}
    ${openFridayToTuesday.string}        | ${mondayMidnight}     | ${null}
    ${openFridayToTuesday.string}        | ${mondayMorning}      | ${'Mo 17:30'}
    ${openFridayToTuesday.string}        | ${mondayMidday}       | ${'Mo 17:30'}
    ${openFridayToTuesday.string}        | ${mondayTwelveThirty} | ${'Mo 17:30'}
    ${openFridayToTuesday.string}        | ${mondayEvening}      | ${null}
    ${openNonStop.string}                | ${saturdayMidnight}   | ${null}
    ${openNonStop.string}                | ${saturdayEightAm}    | ${null}
    ${openNonStop.string}                | ${saturdayMidday}     | ${null}
    ${openNonStop.string}                | ${mondayMidnight}     | ${null}
    ${openNonStop.string}                | ${mondayMorning}      | ${null}
    ${openNonStop.string}                | ${mondayMidday}       | ${null}
    ${openNonStop.string}                | ${mondayTwelveThirty} | ${null}
    ${openNonStop.string}                | ${mondayEvening}      | ${null}
    ${openNonStopOnWeekends.string}      | ${saturdayMidnight}   | ${'Su 24:00'}
    ${openNonStopOnWeekends.string}      | ${saturdayEightAm}    | ${'Su 24:00'}
    ${openNonStopOnWeekends.string}      | ${saturdayMidday}     | ${'Su 24:00'}
    ${openNonStopOnWeekends.string}      | ${mondayMidnight}     | ${null}
    ${openNonStopOnWeekends.string}      | ${mondayMorning}      | ${null}
    ${openNonStopOnWeekends.string}      | ${mondayMidday}       | ${null}
    ${openNonStopOnWeekends.string}      | ${mondayTwelveThirty} | ${null}
    ${openNonStopOnWeekends.string}      | ${mondayEvening}      | ${null}
    ${unspecifiedClosingTime.string}     | ${saturdayMidnight}   | ${null}
    ${unspecifiedClosingTime.string}     | ${saturdayEightAm}    | ${null}
    ${unspecifiedClosingTime.string}     | ${saturdayMidday}     | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayMidnight}     | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayMorning}      | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayMidday}       | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayTwelveThirty} | ${null}
    ${unspecifiedClosingTime.string}     | ${mondayEvening}      | ${null}
  `(
    'returns $expectedResult given $openingHoursString and $date',
    ({ openingHoursString, date, expectedResult }) => {
      const result = getNextClosedAt(openingHoursString, date, expectedResult);

      expect(result).toBe(expectedResult);
    },
  );

  it('returns null given undefined', () => {
    expect(getNextClosedAt(undefined, mondayMorning)).toBe(null);
  });

  it('returns null given empty string', () => {
    expect(getNextClosedAt('', mondayMorning)).toBe(null);
  });

  it('throws given no date', () => {
    expect(() => getNextClosedAt(openOnWeekdays.string)).toThrow();
  });

  it.each`
    input
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    expect(() => getNextClosedAt(input)).toThrow();
  });
});
