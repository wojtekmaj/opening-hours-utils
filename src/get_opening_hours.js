import { isValidHour, isValidWeekday } from './utils';

function toHourObject(hourRange) {
  const [from, to] = hourRange.split('-');

  if (!isValidHour(from) || !isValidHour(to)) {
    throw new Error('Invalid hour range');
  }

  return { from, to };
}

export default function getOpeningHours(openingHoursString) {
  if (!openingHoursString) {
    return null;
  }

  if (openingHoursString === '24/7') {
    openingHoursString = 'Mo-Su 00:00-24:00';
  }

  const dayGroups = openingHoursString.split(/;\s*/);

  const openingHoursArray = [];

  dayGroups
    .filter(Boolean)
    .map((dayGroup) => {
      const [joinedWeekdayRanges, joinedHourRanges] = dayGroup.split(' ');

      if (!joinedHourRanges) {
        return null;
      }

      const weekdayRanges = joinedWeekdayRanges.split(',');

      weekdayRanges.forEach((weekdayRange) => {
        const [from, to = from] = weekdayRange.split('-');

        if (!isValidWeekday(from) || !isValidWeekday(to)) {
          throw new Error('Invalid weekday range');
        }

        const hourRanges = joinedHourRanges.split(',');
        const hours = hourRanges.map(toHourObject);

        openingHoursArray.push({
          from,
          to,
          hours,
        });
      });
    })
    .filter(Boolean);

  return openingHoursArray;
}
