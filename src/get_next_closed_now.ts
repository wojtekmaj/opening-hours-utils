import getNextClosedAt from './get_next_closed_at';

export function getNextClosedNow(openingHoursString: string, returnDate: true): Date;
export function getNextClosedNow(openingHoursString: string, returnDate: false): string | null;
export default function getNextClosedNow(
  openingHoursString: string,
  returnDate = false,
): Date | string | null {
  return getNextClosedAt(openingHoursString, new Date(), returnDate);
}
