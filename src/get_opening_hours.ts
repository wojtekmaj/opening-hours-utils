import { isValidHour, isValidWeekdayName } from './utils';

import type { FromHourPlus, Hour, HourGroup, HourRange, OpeningHoursArray } from './types';

function toHourGroup(hourRange: HourRange): HourGroup | null {
  if (hourRange === 'off') {
    return null;
  }

  if (hourRange === 'open') {
    return {
      from: '00:00',
      to: '24:00',
    };
  }

  if (hourRange.endsWith('+')) {
    const from = (hourRange as FromHourPlus).slice(0, -1) as Hour;

    return { from, to: null };
  }

  const [from, to] = hourRange.split('-') as [Hour, Hour];

  if (!isValidHour(from) || !isValidHour(to)) {
    throw new Error(`Invalid hour range: ${hourRange}`);
  }

  return { from, to };
}

function getOpeningHours(openingHoursString: ''): null;
function getOpeningHours(openingHoursString: string): OpeningHoursArray;
function getOpeningHours(openingHoursString: string): OpeningHoursArray | null {
  if (typeof openingHoursString === 'undefined' || openingHoursString === null) {
    throw new Error('openingHoursString is required');
  }

  if (openingHoursString === '' || openingHoursString === 'off') {
    return null;
  }

  if (openingHoursString === '24/7' || openingHoursString === 'open') {
    openingHoursString = 'Mo-Su 00:00-24:00';
  }

  const dayGroups = openingHoursString.split(/;\s*/);

  const openingHoursArray: OpeningHoursArray = [];

  dayGroups.filter(Boolean).map((dayGroup) => {
    // If day group starts with a valid hour range, prepend with 'Mo-Su'
    if (dayGroup.startsWith('off') || dayGroup.startsWith('open') || dayGroup.match(/^\d/)) {
      dayGroup = `Mo-Su ${dayGroup}`;
    }

    const [joinedWeekdayRanges, joinedHourRanges] = dayGroup.split(/\b\s+/) as [
      string,
      string | undefined,
    ];

    const weekdayRanges = joinedWeekdayRanges.split(/,\s*/);

    weekdayRanges.forEach((weekdayRange) => {
      const [fromWeekday, toWeekday = fromWeekday] = weekdayRange.split('-');

      if (!isValidWeekdayName(fromWeekday) || !isValidWeekdayName(toWeekday)) {
        throw new Error(`Invalid weekday range: ${weekdayRange}`);
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

      const hourRanges = joinedHourRanges.split(/,\s*/) as HourRange[];
      const hourGroups = hourRanges.map(toHourGroup).filter(Boolean) as HourGroup[];

      openingHoursArray.push({
        from: fromWeekday,
        to: toWeekday,
        hours: hourGroups,
      });
    });
  });

  return openingHoursArray;
}

export default getOpeningHours;
