import getNextClosedAt from './get_next_closed_at.js';

import type { NextTimeResult } from './types.js';

export default function getNextClosedNow(openingHoursString: string): NextTimeResult | null {
  return getNextClosedAt(openingHoursString, new Date());
}
