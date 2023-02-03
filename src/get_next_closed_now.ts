import getNextClosedAt from './get_next_closed_at';

export default function getNextClosedNow(openingHoursString: string): string | null {
  return getNextClosedAt(openingHoursString, new Date());
}
