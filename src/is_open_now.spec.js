import isOpenNow from './is_open_now';

import { invalidString1, invalidString2, invalidString3 } from '../test_data';

describe('isOpenNow()', () => {
  it('returns null given undefined', () => {
    expect(isOpenNow(undefined)).toBe(null);
  });

  it('returns null given empty string', () => {
    expect(isOpenNow('')).toBe(null);
  });

  it.each`
    input
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    expect(() => isOpenNow(input)).toThrow();
  });
});
