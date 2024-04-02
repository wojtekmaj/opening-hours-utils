import { describe, expect, it } from 'vitest';
import getNextOpenNow from './get_next_open_now.js';

import { closedOnHolidays, invalidString1, invalidString2, invalidString3 } from '../test_data.js';

describe('getNextOpenNow()', () => {
  it('returns null given empty string', () => {
    expect(getNextOpenNow('')).toBe(null);
  });

  it.each`
    input
    ${undefined}
    ${null}
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    expect(() => getNextOpenNow(input)).toThrow();
  });

  it('throws an error given a string with public holidays and no isPublicHoliday function', () => {
    expect(() => getNextOpenNow(closedOnHolidays.string)).toThrow();
  });

  it('throws an error given a string with school holidays and no isSchoolHoliday function', () => {
    expect(() => getNextOpenNow(closedOnHolidays.string)).toThrow();
  });
});
