import getNextOpenNow from './get_next_open_now';

import { invalidString1, invalidString2, invalidString3 } from '../test_data';

describe('getNextOpenNow()', () => {
  it('returns null given undefined', () => {
    expect(getNextOpenNow(undefined)).toBe(null);
  });

  it('returns null given empty string', () => {
    expect(getNextOpenNow('')).toBe(null);
  });

  it.each`
    input
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    expect(() => getNextOpenNow(input)).toThrow();
  });
});
