import getNextOpenAt from './get_next_open_at';

export default function getNextOpenNow(openingHoursString) {
  return getNextOpenAt(openingHoursString, new Date());
}
