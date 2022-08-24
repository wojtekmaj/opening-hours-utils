import getNextClosedAt from './get_next_closed_at';

export default function getNextClosedNow(openingHoursString) {
  return getNextClosedAt(openingHoursString, new Date());
}
