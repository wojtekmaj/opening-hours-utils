import { describe, expect, it } from 'vitest';
import getNextOpenNow from './get_next_open_now.js';

import { invalidString1, invalidString2, invalidString3, invalidString4 } from '../test_data.js';

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
    ${invalidString4}
  `('throws an error given $input', ({ input }) => {
    expect(() => getNextOpenNow(input)).toThrow();
  });
});
