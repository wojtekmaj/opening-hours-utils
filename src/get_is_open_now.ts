import getIsOpenAt from './get_is_open_at';

function getIsOpenNow(openingHoursString: ''): null;
function getIsOpenNow(openingHoursString: '24/7'): true;
function getIsOpenNow(openingHoursString: string): boolean;
function getIsOpenNow(openingHoursString: string): boolean | null {
  return getIsOpenAt(openingHoursString, new Date());
}

export default getIsOpenNow;
