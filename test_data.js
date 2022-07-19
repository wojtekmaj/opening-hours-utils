export const openOnWeekdays = {
  string: 'Mo-Fr 08:00-17:30',
  array: [
    {
      from: 'Mo',
      to: 'Fr',
      hours: [{ from: '08:00', to: '17:30' }],
    },
  ],
  dailyArray: [
    { day: 'Mo', hours: [{ from: '08:00', to: '17:30' }] },
    { day: 'Tu', hours: [{ from: '08:00', to: '17:30' }] },
    { day: 'We', hours: [{ from: '08:00', to: '17:30' }] },
    { day: 'Th', hours: [{ from: '08:00', to: '17:30' }] },
    { day: 'Fr', hours: [{ from: '08:00', to: '17:30' }] },
  ],
};

export const multipleOpeningIntervals = {
  string: 'Mo-Fr 08:00-12:00,13:00-17:30',
  array: [
    {
      from: 'Mo',
      to: 'Fr',
      hours: [
        { from: '08:00', to: '12:00' },
        { from: '13:00', to: '17:30' },
      ],
    },
  ],
  dailyArray: [
    {
      day: 'Mo',
      hours: [
        { from: '08:00', to: '12:00' },
        { from: '13:00', to: '17:30' },
      ],
    },
    {
      day: 'Tu',
      hours: [
        { from: '08:00', to: '12:00' },
        { from: '13:00', to: '17:30' },
      ],
    },
    {
      day: 'We',
      hours: [
        { from: '08:00', to: '12:00' },
        { from: '13:00', to: '17:30' },
      ],
    },
    {
      day: 'Th',
      hours: [
        { from: '08:00', to: '12:00' },
        { from: '13:00', to: '17:30' },
      ],
    },
    {
      day: 'Fr',
      hours: [
        { from: '08:00', to: '12:00' },
        { from: '13:00', to: '17:30' },
      ],
    },
  ],
};

export const openOnWeekends = {
  string: 'Sa 08:00-17:30;Su 08:00-12:00',
  array: [
    {
      from: 'Sa',
      to: 'Sa',
      hours: [{ from: '08:00', to: '17:30' }],
    },
    {
      from: 'Su',
      to: 'Su',
      hours: [{ from: '08:00', to: '12:00' }],
    },
  ],
  dailyArray: [
    { day: 'Sa', hours: [{ from: '08:00', to: '17:30' }] },
    { day: 'Su', hours: [{ from: '08:00', to: '12:00' }] },
  ],
};

export const openFridayToTuesday = {
  string: 'Fr-Tu 08:00-17:30',
  array: [
    {
      from: 'Fr',
      to: 'Tu',
      hours: [{ from: '08:00', to: '17:30' }],
    },
  ],
  dailyArray: [
    { day: 'Fr', hours: [{ from: '08:00', to: '17:30' }] },
    { day: 'Sa', hours: [{ from: '08:00', to: '17:30' }] },
    { day: 'Su', hours: [{ from: '08:00', to: '17:30' }] },
    { day: 'Mo', hours: [{ from: '08:00', to: '17:30' }] },
    { day: 'Tu', hours: [{ from: '08:00', to: '17:30' }] },
  ],
};

export const openNonStop = {
  string: '24/7',
  array: [
    {
      from: 'Mo',
      to: 'Su',
      hours: [{ from: '00:00', to: '24:00' }],
    },
  ],
  dailyArray: [
    { day: 'Mo', hours: [{ from: '00:00', to: '24:00' }] },
    { day: 'Tu', hours: [{ from: '00:00', to: '24:00' }] },
    { day: 'We', hours: [{ from: '00:00', to: '24:00' }] },
    { day: 'Th', hours: [{ from: '00:00', to: '24:00' }] },
    { day: 'Fr', hours: [{ from: '00:00', to: '24:00' }] },
    { day: 'Sa', hours: [{ from: '00:00', to: '24:00' }] },
    { day: 'Su', hours: [{ from: '00:00', to: '24:00' }] },
  ],
};

export const openNonStopOnWeekends = {
  string: 'Sa-Su 00:00-24:00',
  array: [
    {
      from: 'Sa',
      to: 'Su',
      hours: [{ from: '00:00', to: '24:00' }],
    },
  ],
  dailyArray: [
    { day: 'Sa', hours: [{ from: '00:00', to: '24:00' }] },
    { day: 'Su', hours: [{ from: '00:00', to: '24:00' }] },
  ],
};

export const invalidString1 = 'Fo-Ba 08:00-17:30';
export const invalidString2 = 'Mo-Fr 08:00-25:00';
export const invalidString3 = 'Mo-Fr 08:00-17:65';

export const saturdayMidnight = new Date(2022, 0, 1);
export const saturdayEightAm = new Date(2022, 0, 1, 8);
export const saturdayMidday = new Date(2022, 0, 1, 12);

export const mondayMidnight = new Date(2022, 0, 3);
export const mondayMorning = new Date(2022, 0, 3, 8);
export const mondayMidday = new Date(2022, 0, 3, 12);
export const mondayTwelveThirty = new Date(2022, 0, 3, 12, 30);
export const mondayEvening = new Date(2022, 0, 3, 20);
