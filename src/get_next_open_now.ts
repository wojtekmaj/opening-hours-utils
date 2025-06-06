import getNextOpenAt from './get_next_open_at.js';

import type { Hour, WeekdayName } from './types.js';

export default function getNextOpenNow(
  openingHoursString: string,
): `${WeekdayName} ${Hour}` | null {
  return getNextOpenAt(openingHoursString, new Date());
}
