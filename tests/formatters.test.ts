import { describe, it, expect } from 'vitest';
import { formatTemp, formatWind, formatRain, formatPercent, windDegreeToCardinal, slugify, formatDayOfWeek, formatDateBR, formatHourBR } from '../src/services/weather/formatters';

describe('formatTemp', () => {
  it('formats normal temperature', () => {
    expect(formatTemp(25.4)).toBe('25°C');
    expect(formatTemp(25.5)).toBe('26°C');
    expect(formatTemp(0)).toBe('0°C');
    expect(formatTemp(-5.3)).toBe('-5°C');
  });

  it('handles null/undefined', () => {
    expect(formatTemp(null)).toBe('--°');
    expect(formatTemp(undefined)).toBe('--°');
  });
});

describe('formatWind', () => {
  it('formats wind speed', () => {
    expect(formatWind(12.7)).toBe('13 km/h');
    expect(formatWind(0)).toBe('0 km/h');
  });

  it('handles null/undefined', () => {
    expect(formatWind(null)).toBe('-- km/h');
  });
});

describe('formatRain', () => {
  it('formats rain correctly', () => {
    expect(formatRain(0)).toBe('0,0 mm');
    expect(formatRain(5.2)).toBe('5,2 mm');
    expect(formatRain(12.75)).toBe('12,8 mm');
  });

  it('handles null/undefined', () => {
    expect(formatRain(null)).toBe('0 mm');
  });
});

describe('formatPercent', () => {
  it('formats percentage', () => {
    expect(formatPercent(50)).toBe('50%');
    expect(formatPercent(0)).toBe('0%');
    expect(formatPercent(100)).toBe('100%');
  });

  it('handles null/undefined', () => {
    expect(formatPercent(null)).toBe('0%');
    expect(formatPercent(undefined)).toBe('0%');
  });
});

describe('windDegreeToCardinal', () => {
  it('returns correct cardinal directions', () => {
    expect(windDegreeToCardinal(0)).toBe('Norte');
    expect(windDegreeToCardinal(90)).toBe('Leste');
    expect(windDegreeToCardinal(180)).toBe('Sul');
    expect(windDegreeToCardinal(270)).toBe('Oeste');
    expect(windDegreeToCardinal(360)).toBe('Norte');
  });

  it('handles intermediate directions', () => {
    expect(windDegreeToCardinal(45)).toBe('Nordeste');
    expect(windDegreeToCardinal(135)).toBe('Sudeste');
    expect(windDegreeToCardinal(225)).toBe('Sudoeste');
    expect(windDegreeToCardinal(315)).toBe('Noroeste');
  });

  it('handles null/undefined', () => {
    expect(windDegreeToCardinal(null)).toBe('N/D');
    expect(windDegreeToCardinal(undefined)).toBe('N/D');
  });
});

describe('slugify', () => {
  it('slugifies Brazilian city names', () => {
    expect(slugify('Porto Alegre')).toBe('porto-alegre');
    expect(slugify('São Paulo')).toBe('sao-paulo');
    expect(slugify('São Leopoldo')).toBe('sao-leopoldo');
    expect(slugify('Florianópolis')).toBe('florianopolis');
    expect(slugify('Brasília')).toBe('brasilia');
    expect(slugify('Goiânia')).toBe('goiania');
    expect(slugify('Cuiabá')).toBe('cuiaba');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });
});

describe('formatDayOfWeek', () => {
  it('returns day of week in Portuguese', () => {
    const result = formatDayOfWeek('2026-10-03');
    expect(result.full).toBeTruthy();
    expect(result.short).toBeTruthy();
    expect(result.full.length).toBeGreaterThan(2);
  });
});

describe('formatDateBR', () => {
  it('formats ISO date to BR format', () => {
    expect(formatDateBR('2026-10-03')).toBe('03/10/2026');
    expect(formatDateBR('2026-01-15')).toBe('15/01/2026');
  });
});

describe('formatHourBR', () => {
  it('extracts HH:MM from ISO datetime', () => {
    expect(formatHourBR('2026-10-03T14:30')).toBe('14:30');
    expect(formatHourBR('2026-10-03T09:00')).toBe('09:00');
  });
});
