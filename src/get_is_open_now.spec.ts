import { describe, expect, it } from 'vitest';
import getIsOpenNow from './get_is_open_now.js';

import { closedOnHolidays, invalidString1, invalidString2, invalidString3 } from '../test_data.js';

describe('getIsOpenNow()', () => {
  it('returns null given empty string', () => {
    expect(getIsOpenNow('')).toBe(null);
  });

  it.each`
    input
    ${undefined}
    ${null}
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    expect(() => getIsOpenNow(input)).toThrow();
  });

  it('throws an error given a string with public holidays and no isPublicHoliday function', () => {
    expect(() => getIsOpenNow(closedOnHolidays.string)).toThrow();
  });

  it('throws an error given a string with school holidays and no isSchoolHoliday function', () => {
    expect(() => getIsOpenNow(closedOnHolidays.string)).toThrow();
  });
});
