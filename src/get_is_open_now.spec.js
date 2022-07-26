import getIsOpenNow from './get_is_open_now';

import { invalidString1, invalidString2, invalidString3 } from '../test_data';

describe('getIsOpenNow()', () => {
  it('returns null given undefined', () => {
    expect(getIsOpenNow(undefined)).toBe(null);
  });

  it('returns null given empty string', () => {
    expect(getIsOpenNow('')).toBe(null);
  });

  it.each`
    input
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    expect(() => getIsOpenNow(input)).toThrow();
  });
});
