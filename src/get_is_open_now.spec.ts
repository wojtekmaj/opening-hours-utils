import { describe, expect, it } from 'vitest';
import getIsOpenNow from './get_is_open_now.js';

import { invalidString1, invalidString2, invalidString3, invalidString4 } from '../test_data.js';

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
    ${invalidString4}
  `('throws an error given $input', ({ input }) => {
    expect(() => getIsOpenNow(input)).toThrow();
  });
});
