import getNextOpenAt from './get_next_open_at';

export function getNextOpenNow(openingHoursString: string, returnDate: true): Date;
export function getNextOpenNow(openingHoursString: string, returnDate: false): string | null;
export default function getNextOpenNow(
  openingHoursString: string,
  returnDate = false,
): Date | string | null {
  return getNextOpenAt(openingHoursString, new Date(), returnDate);
}
