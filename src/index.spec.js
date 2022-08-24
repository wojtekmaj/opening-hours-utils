import {
  encodeOpeningHours,
  getDailyOpeningHours,
  getIsOpenAt,
  getIsOpenNow,
  getNextOpenAt,
  getNextOpenNow,
  getOpeningHours,
} from './index';

describe('index', () => {
  it('has encodeOpeningHours exported properly', () => {
    expect(encodeOpeningHours).toBeInstanceOf(Function);
  });

  it('has getDailyOpeningHours exported properly', () => {
    expect(getDailyOpeningHours).toBeInstanceOf(Function);
  });

  it('has getIsOpenAt exported properly', () => {
    expect(getIsOpenAt).toBeInstanceOf(Function);
  });

  it('has getIsOpenNow exported properly', () => {
    expect(getIsOpenNow).toBeInstanceOf(Function);
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
});
