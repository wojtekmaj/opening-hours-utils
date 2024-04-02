import { bench, describe } from 'vitest';
import getOpeningHours from './get_opening_hours.js';

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

describe('getOpeningHours()', () => {
  bench('multipleOpeningIntervals', () => {
    getOpeningHours(multipleOpeningIntervals.string);
  });

  bench('openFridayToTuesday', () => {
    getOpeningHours(openFridayToTuesday.string);
  });

  bench('openNonStop', () => {
    getOpeningHours(openNonStop.string);
  });

  bench('openNonStopOnWeekends', () => {
    getOpeningHours(openNonStopOnWeekends.string);
  });

  bench('openNonStopOnWeekends2', () => {
    getOpeningHours(openNonStopOnWeekends2.string);
  });

  bench('openOnMondaysAndWednesdays', () => {
    getOpeningHours(openOnMondaysAndWednesdays.string);
  });

  bench('openOnSaturday', () => {
    getOpeningHours(openOnSaturday.string);
  });

  bench('openOnWeekdays', () => {
    getOpeningHours(openOnWeekdays.string);
  });

  bench('openOnWeekends', () => {
    getOpeningHours(openOnWeekends.string);
  });

  bench('unspecifiedClosingTime', () => {
    getOpeningHours(unspecifiedClosingTime.string);
  });

  bench('overrideWithDifferentHours', () => {
    getOpeningHours(overrideWithDifferentHours.string);
  });

  bench('overrideWithOff', () => {
    getOpeningHours(overrideWithOff.string);
  });

  bench('spaces', () => {
    getOpeningHours(spaces.string);
  });

  bench('justHours', () => {
    getOpeningHours(justHours.string);
  });
});
