import { describe, expect, it } from 'vitest';
import getNextClosedNow from './get_next_closed_now.js';

import { closedOnHolidays, invalidString1, invalidString2, invalidString3 } from '../test_data.js';

describe('getNextClosedNow()', () => {
  it('returns null given empty string', () => {
    expect(getNextClosedNow('')).toBe(null);
  });

  it.each`
    input
    ${undefined}
    ${null}
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    expect(() => getNextClosedNow(input)).toThrow();
  });

  it('throws an error given a string with public holidays and no isPublicHoliday function', () => {
    expect(() => getNextClosedNow(closedOnHolidays.string)).toThrow();
  });

  it('throws an error given a string with school holidays and no isSchoolHoliday function', () => {
    expect(() => getNextClosedNow(closedOnHolidays.string)).toThrow();
  });
});
