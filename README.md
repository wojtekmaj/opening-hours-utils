[![npm](https://img.shields.io/npm/v/@wojtekmaj/opening-hours-utils.svg)](https://www.npmjs.com/package/@wojtekmaj/opening-hours-utils) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/opening-hours-utils.svg) [![CI](https://github.com/wojtekmaj/opening-hours-utils/workflows/CI/badge.svg)](https://github.com/wojtekmaj/opening-hours-utils/actions) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# Opening-Hours-Utils

A collection of opening hours-related utilities.

## tl;dr

- Install by executing `npm install @wojtekmaj/opening-hours-utils` or `yarn add @wojtekmaj/opening-hours-utils`.
- Import by adding `import * as openingHoursUtils from '@wojtekmaj/opening-hours-utils'`.
- Do stuff with it!
  ```js
  const openingHoursArray = getOpeningHoursArray('Mo-Fr 08:00-18:00;Sa 08:00-12:00');
  ```

## User guide

### Table of contents

- [`getDailyOpeningHours()`](#getDailyOpeningHours)
- [`getOpeningHours()`](#getOpeningHours)
- [`getNextOpenAt()`](#getNextOpenAt)
- [`getNextOpenNow()`](#getNextOpenNow)
- [`isOpenAt()`](#isOpenAt)
- [`isOpenNow()`](#isOpenNow)

#### `getDailyOpeningHours()`

Parses opening hours string and returns an array of objects with `day` and `hours` properties.

##### Sample usage

```js
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

#### `getOpeningHours()`

Parses opening hours string and returns an array of objects with `from`, `to`, and `hours` properties.

##### Sample usage

```js
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

#### `getNextOpenAt()`

Gets the next opening time for a given date. Returns null if for a given date place is open.

##### Sample usage

```js
import { getNextOpenAt } from '@wojtekmaj/opening-hours-utils';

getNextOpenAt('Mo-Fr 08:00-17:30', saturdayNoon); // 'Mo 08:00'
```

#### `getNextOpenNow()`

Gets the next opening time. Returns null if place is currently open.

##### Sample usage

```js
import { getNextOpenNow } from '@wojtekmaj/opening-hours-utils';

getNextOpenNow('Mo-Fr 08:00-17:30'); // 'Mo 08:00'
```

#### `isOpenAt()`

Checks if place is open at a given date.

##### Sample usage

```js
import { isOpenAt } from '@wojtekmaj/opening-hours-utils';

isOpenAt('Mo-Fr 08:00-17:30', mondayNoon); // true
```

#### `isOpenNow()`

Checks if place is open.

##### Sample usage

```js
import { isOpenNow } from '@wojtekmaj/opening-hours-utils';

isOpenNow('Mo-Fr 08:00-17:30'); // true
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="https://wojtekmaj.pl">https://wojtekmaj.pl</a>
    </td>
  </tr>
</table>
