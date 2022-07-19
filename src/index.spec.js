import {
  getDailyOpeningHours,
  getNextOpenAt,
  getNextOpenNow,
  getOpeningHours,
  isOpenAt,
  isOpenNow,
} from './index';

describe('index', () => {
  it('has getDailyOpeningHours exported properly', () => {
    expect(getDailyOpeningHours).toBeInstanceOf(Function);
  });

  it('has getNextOpenAt exported properly', () => {
    expect(getNextOpenAt).toBeInstanceOf(Function);
  });

  it('has getNextOpenNow exported properly', () => {
    expect(getNextOpenNow).toBeInstanceOf(Function);
  });

  it('has getOpeningHours exported properly', () => {
    expect(getOpeningHours).toBeInstanceOf(Function);
  });

  it('has isOpenAt exported properly', () => {
    expect(isOpenAt).toBeInstanceOf(Function);
  });

  it('has isOpenNow exported properly', () => {
    expect(isOpenNow).toBeInstanceOf(Function);
  });
});
