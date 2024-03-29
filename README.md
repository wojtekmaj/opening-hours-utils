[![npm](https://img.shields.io/npm/v/@wojtekmaj/opening-hours-utils.svg)](https://www.npmjs.com/package/@wojtekmaj/opening-hours-utils) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/opening-hours-utils.svg) [![CI](https://github.com/wojtekmaj/opening-hours-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/wojtekmaj/opening-hours-utils/actions)

# Opening-Hours-Utils

A collection of opening hours-related utilities.

## tl;dr

- Install by executing `npm install @wojtekmaj/opening-hours-utils` or `yarn add @wojtekmaj/opening-hours-utils`.
- Import by adding `import * as openingHoursUtils from '@wojtekmaj/opening-hours-utils'`.
- Do stuff with it!
  ```ts
  const openingHours = getOpeningHours('Mo-Fr 08:00-18:00;Sa 08:00-12:00');
  ```

## User guide

### Table of contents

- [`encodeOpeningHours()`](#encodeOpeningHours)
- [`getDailyOpeningHours()`](#getDailyOpeningHours)
- [`getIsOpenAt()`](#getIsOpenAt)
- [`getIsOpenNow()`](#getIsOpenNow)
- [`getNextClosedAt()`](#getNextClosedAt)
- [`getNextClosedNow()`](#getNextClosedNow)
- [`getNextOpenAt()`](#getNextOpenAt)
- [`getNextOpenNow()`](#getNextOpenNow)
- [`getOpeningHours()`](#getOpeningHours)

### `encodeOpeningHours()`

Returns opening hours string given an array of objects with `from`, `to`, and `hours` properties.

#### Sample usage

```ts
import { encodeOpeningHours } from '@wojtekmaj/opening-hours-utils';

encodeOpeningHours([
  {
    from: 'Mo',
    to: 'Fr',
    hours: [{ from: '08:00', to: '17:30' }],
  },
]); // 'Mo-Fr 08:00-17:30'
```

### `getDailyOpeningHours()`

Parses opening hours string and returns an array of objects with `day` and `hours` properties.

#### Sample usage

```ts
import { getDailyOpeningHours } from '@wojtekmaj/opening-hours-utils';

getDailyOpeningHours('Mo-Fr 08:00-17:30');
/**
 * [
 *   { day: 'Mo', hours: [{ from: '08:00', to: '17:30' }] },
 *   { day: 'Tu', hours: [{ from: '08:00', to: '17:30' }] },
 *   { day: 'We', hours: [{ from: '08:00', to: '17:30' }] },
 *   { day: 'Th', hours: [{ from: '08:00', to: '17:30' }] },
 *   { day: 'Fr', hours: [{ from: '08:00', to: '17:30' }] },
 * ]
 */
```

### `getIsOpenAt()`

Checks if place is open at a given date.

#### Sample usage

```ts
import { getIsOpenAt } from '@wojtekmaj/opening-hours-utils';

getIsOpenAt('Mo-Fr 08:00-17:30', mondayNoon); // true
```

### `getIsOpenNow()`

Checks if place is open.

#### Sample usage

```ts
import { getIsOpenNow } from '@wojtekmaj/opening-hours-utils';

getIsOpenNow('Mo-Fr 08:00-17:30'); // true
```

### `getNextClosedAt()`

Gets the next closing time for a given date. Returns null if for a given date place is closed.

#### Sample usage

```ts
import { getNextClosedAt } from '@wojtekmaj/opening-hours-utils';

getNextClosedAt('Mo-Fr 08:00-17:30', mondayNoon); // 'Mo 17:30'
```

### `getNextClosedNow()`

Gets the next closing time. Returns null if place is currently closed.

#### Sample usage

```ts
import { getNextClosedNow } from '@wojtekmaj/opening-hours-utils';

getNextClosedNow('Mo-Fr 08:00-17:30'); // 'Mo 17:30'
```

### `getNextOpenAt()`

Gets the next opening time for a given date. Returns null if for a given date place is open.

#### Sample usage

```ts
import { getNextOpenAt } from '@wojtekmaj/opening-hours-utils';

getNextOpenAt('Mo-Fr 08:00-17:30', saturdayNoon); // 'Mo 08:00'
```

### `getNextOpenNow()`

Gets the next opening time. Returns null if place is currently open.

#### Sample usage

```ts
import { getNextOpenNow } from '@wojtekmaj/opening-hours-utils';

getNextOpenNow('Mo-Fr 08:00-17:30'); // 'Mo 08:00'
```

### `getOpeningHours()`

Parses opening hours string and returns an array of objects with `from`, `to`, and `hours` properties.

#### Sample usage

```ts
import { getOpeningHours } from '@wojtekmaj/opening-hours-utils';

getOpeningHours('Mo-Fr 08:00-17:30');
/**
 * [
 *   {
 *     from: 'Mo',
 *     to: 'Fr',
 *     hours: [{ from: '08:00', to: '17:30' }],
 *   },
 * ]
 */
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td >
      <img src="https://avatars.githubusercontent.com/u/5426427?v=4&s=128" width="64" height="64" alt="Wojciech Maj">
    </td>
    <td>
      <a href="https://github.com/wojtekmaj">Wojciech Maj</a>
    </td>
  </tr>
</table>
