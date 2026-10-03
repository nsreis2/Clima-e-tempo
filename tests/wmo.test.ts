import { describe, it, expect } from 'vitest';
import { getWMOInfo, WMO_CODES } from '../src/services/weather/wmo';

describe('WMO Codes', () => {
  it('returns correct info for clear sky', () => {
    const info = getWMOInfo(0);
    expect(info.description).toBe('Céu limpo');
    expect(info.category).toBe('clear');
  });

  it('returns correct info for rain codes', () => {
    expect(getWMOInfo(61).category).toBe('rain');
    expect(getWMOInfo(63).description).toBe('Chuva moderada');
    expect(getWMOInfo(65).description).toBe('Chuva forte');
  });

  it('returns correct info for thunderstorms', () => {
    expect(getWMOInfo(95).category).toBe('thunderstorm');
    expect(getWMOInfo(95).description).toBe('Tempestade com trovoadas');
  });

  it('handles unknown codes with fallback', () => {
    const info = getWMOInfo(999);
    expect(info.description).toBeTruthy();
    expect(info.category).toBeTruthy();
  });

  it('handles all standard WMO codes', () => {
    const standardCodes = [0, 1, 2, 3, 45, 48, 51, 53, 55, 61, 63, 65, 71, 73, 75, 80, 81, 82, 95, 96, 99];
    for (const code of standardCodes) {
      const info = getWMOInfo(code);
      expect(info.description).toBeTruthy();
      expect(info.code).toBe(code);
    }
  });
});

describe('WMO_CODES map', () => {
  it('has all standard weather codes', () => {
    expect(WMO_CODES[0]).toBeDefined();
    expect(WMO_CODES[95]).toBeDefined();
  });
});
