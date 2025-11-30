import getNextOpenAt from './get_next_open_at.js';

import type { NextTimeResult } from './types.js';

export default function getNextOpenNow(openingHoursString: string): NextTimeResult | null {
  return getNextOpenAt(openingHoursString, new Date());
}
