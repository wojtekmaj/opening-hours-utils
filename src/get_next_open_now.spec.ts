import { describe, expect, it } from 'vitest';

import {
  invalidString1,
  invalidString2,
  invalidString3,
  invalidString4,
  invalidString5,
} from '../test_data.js';
import getNextOpenNow from './get_next_open_now.js';

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
    ${invalidString5}
  `('throws an error given $input', ({ input }) => {
    expect(() => getNextOpenNow(input)).toThrow();
  });
});
