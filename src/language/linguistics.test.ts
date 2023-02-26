import { isMonosyllable } from './linguistics';

describe('isMonosyllable', () => {
  it('should return true if the given word is monosyllable', () => {
    expect(isMonosyllable('Драй')).toBe(true);
  });

  it('should return false if the given word is not monosyllable', () => {
    expect(isMonosyllable('Хмара')).toBe(false);
  });
});
