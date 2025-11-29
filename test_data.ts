import type { DayGroups, OpeningHoursArray, RecurringOpeningHours } from './src/types.js';

type TestDataPiece = {
  string: string;
  altString?: string;
  array: RecurringOpeningHours[];
  dailyArray: DayGroups;
};

type AbsoluteTestDataPiece = {
  string: string;
  array: OpeningHoursArray;
};

export const openOnWeekdays: TestDataPiece = {
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
} satisfies TestDataPiece;

export const openOnWeekdaysNoZero: TestDataPiece = {
  string: 'Mo-Fr 8:00-17:30',
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
} satisfies TestDataPiece;

export const openOnMondaysAndWednesdays = {
  string: 'Mo,We 08:00-17:30',
  altString: 'Mo 08:00-17:30; We 08:00-17:30',
  array: [
    {
      from: 'Mo',
      to: 'Mo',
      hours: [{ from: '08:00', to: '17:30' }],
    },
    {
      from: 'We',
      to: 'We',
      hours: [{ from: '08:00', to: '17:30' }],
    },
  ],
  dailyArray: [
    { day: 'Mo', hours: [{ from: '08:00', to: '17:30' }] },
    { day: 'We', hours: [{ from: '08:00', to: '17:30' }] },
  ],
} as const;

export const multipleOpeningIntervals: TestDataPiece = {
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

export const openOnSaturday: TestDataPiece = {
  string: 'Sa 08:00-17:30',
  array: [
    {
      from: 'Sa',
      to: 'Sa',
      hours: [{ from: '08:00', to: '17:30' }],
    },
  ],
  dailyArray: [{ day: 'Sa', hours: [{ from: '08:00', to: '17:30' }] }],
};

export const openOnWeekends: TestDataPiece = {
  string: 'Sa 08:00-17:30; Su 08:00-12:00',
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

export const openFridayToTuesday: TestDataPiece = {
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

export const openNonStop: TestDataPiece = {
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

export const openNonStopOnWeekends: TestDataPiece = {
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

export const openNonStopOnWeekends2: TestDataPiece = {
  string: 'Sa-Su open',
  altString: 'Sa-Su 00:00-24:00',
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

export const unspecifiedClosingTime: TestDataPiece = {
  string: 'Sa 10:00+',
  array: [
    {
      from: 'Sa',
      to: 'Sa',
      hours: [{ from: '10:00', to: null }],
    },
  ],
  dailyArray: [{ day: 'Sa', hours: [{ from: '10:00', to: null }] }],
} satisfies TestDataPiece;

export const overrideWithDifferentHours: TestDataPiece = {
  string: 'Mo-Sa 10:00-20:00; Tu 10:00-14:00',
  array: [
    {
      from: 'Mo',
      to: 'Sa',
      hours: [{ from: '10:00', to: '20:00' }],
    },
    {
      from: 'Tu',
      to: 'Tu',
      hours: [{ from: '10:00', to: '14:00' }],
    },
  ],
  dailyArray: [
    { day: 'Mo', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Tu', hours: [{ from: '10:00', to: '14:00' }] },
    { day: 'We', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Th', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Fr', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Sa', hours: [{ from: '10:00', to: '20:00' }] },
  ],
} satisfies TestDataPiece;

export const overrideWithOff: TestDataPiece = {
  string: 'Mo-Sa 10:00-20:00; Tu off',
  array: [
    {
      from: 'Mo',
      to: 'Sa',
      hours: [{ from: '10:00', to: '20:00' }],
    },
    {
      from: 'Tu',
      to: 'Tu',
      hours: [],
    },
  ],
  dailyArray: [
    { day: 'Mo', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Tu', hours: [] },
    { day: 'We', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Th', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Fr', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Sa', hours: [{ from: '10:00', to: '20:00' }] },
  ],
} satisfies TestDataPiece;

export const spaces: TestDataPiece = {
  string: 'Mo-We, Fr 08:00-12:00, 13:00-17:30',
  altString: 'Mo-We 08:00-12:00,13:00-17:30; Fr 08:00-12:00,13:00-17:30',
  array: [
    {
      from: 'Mo',
      to: 'We',
      hours: [
        { from: '08:00', to: '12:00' },
        { from: '13:00', to: '17:30' },
      ],
    },
    {
      from: 'Fr',
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
      day: 'Fr',
      hours: [
        { from: '08:00', to: '12:00' },
        { from: '13:00', to: '17:30' },
      ],
    },
  ],
} satisfies TestDataPiece;

export const justHours: TestDataPiece = {
  string: '10:00-20:00',
  altString: 'Mo-Su 10:00-20:00',
  array: [
    {
      from: 'Mo',
      to: 'Su',
      hours: [{ from: '10:00', to: '20:00' }],
    },
  ],
  dailyArray: [
    { day: 'Mo', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Tu', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'We', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Th', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Fr', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Sa', hours: [{ from: '10:00', to: '20:00' }] },
    { day: 'Su', hours: [{ from: '10:00', to: '20:00' }] },
  ],
} satisfies TestDataPiece;

export const incompleteString1 = 'Mo-We';

export const incompleteArray1: unknown = [
  {
    from: 'Mo',
    to: 'We',
    hours: [{ to: '17:30' }],
  },
];

export const invalidString1 = 'Fo-Ba 08:00-17:30';
export const invalidString2 = 'Mo-Fr 08:00-49:00';
export const invalidString3 = 'Mo-Fr 08:00-17:65';
export const invalidString4 = 'Mo-Fr lol+';

export const saturdayMidnight: Date = new Date(2022, 0, 1);
export const saturdayEightAm: Date = new Date(2022, 0, 1, 8);
export const saturdayMidday: Date = new Date(2022, 0, 1, 12);
export const saturdayEvening: Date = new Date(2022, 0, 1, 18);

export const mondayMidnight: Date = new Date(2022, 0, 3);
export const mondayMorning: Date = new Date(2022, 0, 3, 8);
export const mondayMidday: Date = new Date(2022, 0, 3, 12);
export const mondayTwelveThirty: Date = new Date(2022, 0, 3, 12, 30);
export const mondayEvening: Date = new Date(2022, 0, 3, 20);

export const tuesdayAfternoon: Date = new Date(2022, 0, 4, 16);

// Absolute days test data (Polish sunday shopping pattern)
export const absoluteDays: AbsoluteTestDataPiece = {
  string: 'Mo-Sa 09:00-22:00; Jan 26,Apr 13 09:00-19:00',
  array: [
    {
      from: 'Mo',
      to: 'Sa',
      hours: [{ from: '09:00', to: '22:00' }],
    },
    {
      dates: ['Jan 26', 'Apr 13'],
      hours: [{ from: '09:00', to: '19:00' }],
    },
  ],
};

export const invalidString5 = 'Jan 32 10:00-18:00';
export const invalidString6 = 'Foo 14 10:00-18:00';

// Dates for testing absolute days
// January 26, 2025 is a Sunday
export const jan26_2025_Midnight: Date = new Date(2025, 0, 26);
export const jan26_2025_Morning: Date = new Date(2025, 0, 26, 9);
export const jan26_2025_Midday: Date = new Date(2025, 0, 26, 12);
export const jan26_2025_Evening: Date = new Date(2025, 0, 26, 20);

// January 25, 2025 is a Saturday (regular recurring day)
export const jan25_2025_Morning: Date = new Date(2025, 0, 25, 10);
export const jan25_2025_Evening: Date = new Date(2025, 0, 25, 21);

// January 27, 2025 is a Monday (regular recurring day)
export const jan27_2025_Morning: Date = new Date(2025, 0, 27, 10);
