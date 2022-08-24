import getIsOpenAt from './get_is_open_at';

export default function getIsOpenNow(openingHoursString) {
  return getIsOpenAt(openingHoursString, new Date());
}
