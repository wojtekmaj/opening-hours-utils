import getNextClosedAt from './get_next_closed_at.js';

export default function getNextClosedNow(openingHoursString: string): string | null {
  return getNextClosedAt(openingHoursString, new Date());
}
