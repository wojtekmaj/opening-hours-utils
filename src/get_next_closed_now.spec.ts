import { describe, expect, it } from 'vitest';

import { invalidString1, invalidString2, invalidString3, invalidString4 } from '../test_data.js';
import getNextClosedNow from './get_next_closed_now.js';

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
    ${invalidString4}
  `('throws an error given $input', ({ input }) => {
    expect(() => getNextClosedNow(input)).toThrow();
  });
});
