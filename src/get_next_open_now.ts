import getNextOpenAt from './get_next_open_at';

export default function getNextOpenNow(openingHoursString: string): string | null {
  return getNextOpenAt(openingHoursString, new Date());
}
