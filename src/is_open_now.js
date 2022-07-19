import isOpenAt from './is_open_at';

export default function isOpenNow(openingHoursString) {
  return isOpenAt(openingHoursString, new Date());
}
