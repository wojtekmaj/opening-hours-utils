import getNextClosedNow from './get_next_closed_now';

import { invalidString1, invalidString2, invalidString3 } from '../test_data';

describe('getNextClosedNow()', () => {
  it('returns null given undefined', () => {
    expect(getNextClosedNow(undefined)).toBe(null);
  });

  it('returns null given empty string', () => {
    expect(getNextClosedNow('')).toBe(null);
  });

  it.each`
    input
    ${invalidString1}
    ${invalidString2}
    ${invalidString3}
  `('throws an error given $input', ({ input }) => {
    expect(() => getNextClosedNow(input)).toThrow();
  });
});
