import { isValidHour, isValidWeekdayName } from './utils';

function toHourGroup(hourRange) {
  if (hourRange === 'off') {
    return null;
  }

  if (hourRange.endsWith('+')) {
    const from = hourRange.slice(0, -1);

    return { from, to: null };
  }

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

      const weekdayRanges = joinedWeekdayRanges.split(',');

      weekdayRanges.forEach((weekdayRange) => {
        const [fromWeekday, toWeekday = fromWeekday] = weekdayRange.split('-');

        if (!isValidWeekdayName(fromWeekday) || !isValidWeekdayName(toWeekday)) {
          throw new Error('Invalid weekday range');
        }

        if (!joinedHourRanges) {
          return openingHoursArray.push({
            from: fromWeekday,
            to: toWeekday,
            hours: [
              {
                from: '00:00',
                to: '24:00',
              },
            ],
          });
        }

        const hourRanges = joinedHourRanges.split(',');
        const hourGroups = hourRanges.map(toHourGroup).filter(Boolean);

        openingHoursArray.push({
          from: fromWeekday,
          to: toWeekday,
          hours: hourGroups,
        });
      });
    })
    .filter(Boolean);

  return openingHoursArray;
}
