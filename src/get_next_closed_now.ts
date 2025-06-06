import getNextClosedAt from './get_next_closed_at.js';

import type { Hour, WeekdayName } from './types.js';

export default function getNextClosedNow(
  openingHoursString: string,
): `${WeekdayName} ${Hour}` | null {
  return getNextClosedAt(openingHoursString, new Date());
}
