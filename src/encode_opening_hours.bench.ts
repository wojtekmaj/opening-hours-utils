import { bench, describe } from 'vitest';
import encodeOpeningHours from './encode_opening_hours.js';

import {
  multipleOpeningIntervals,
  openFridayToTuesday,
  openNonStop,
  openNonStopOnWeekends,
  openNonStopOnWeekends2,
  openOnMondaysAndWednesdays,
  openOnSaturday,
  openOnWeekdays,
  openOnWeekends,
  unspecifiedClosingTime,
  overrideWithDifferentHours,
  overrideWithOff,
  spaces,
  justHours,
} from '../test_data.js';

describe('encodeOpeningHours()', () => {
  bench('multipleOpeningIntervals', () => {
    encodeOpeningHours(multipleOpeningIntervals.array);
  });

  bench('openFridayToTuesday', () => {
    encodeOpeningHours(openFridayToTuesday.array);
  });

  bench('openNonStop', () => {
    encodeOpeningHours(openNonStop.array);
  });

  bench('openNonStopOnWeekends', () => {
    encodeOpeningHours(openNonStopOnWeekends.array);
  });

  bench('openNonStopOnWeekends2', () => {
    encodeOpeningHours(openNonStopOnWeekends2.array);
  });

  bench('openOnMondaysAndWednesdays', () => {
    encodeOpeningHours(openOnMondaysAndWednesdays.array);
  });

  bench('openOnSaturday', () => {
    encodeOpeningHours(openOnSaturday.array);
  });

  bench('openOnWeekdays', () => {
    encodeOpeningHours(openOnWeekdays.array);
  });

  bench('openOnWeekends', () => {
    encodeOpeningHours(openOnWeekends.array);
  });

  bench('unspecifiedClosingTime', () => {
    encodeOpeningHours(unspecifiedClosingTime.array);
  });

  bench('overrideWithDifferentHours', () => {
    encodeOpeningHours(overrideWithDifferentHours.array);
  });

  bench('overrideWithOff', () => {
    encodeOpeningHours(overrideWithOff.array);
  });

  bench('spaces', () => {
    encodeOpeningHours(spaces.array);
  });

  bench('justHours', () => {
    encodeOpeningHours(justHours.array);
  });
});
