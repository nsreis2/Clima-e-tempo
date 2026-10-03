import { describe, it, expect } from 'vitest';
import { cleanCep, formatCep } from '../src/services/tools/cep';
import { cleanCnpj, formatCnpj } from '../src/services/tools/cnpj';
import { convertCurrency, getFallbackRates, SUPPORTED_CURRENCIES } from '../src/services/tools/currency';
import { getCalculatedNationalHolidays, MONTH_NAMES } from '../src/services/tools/holidays';

describe('CEP Service', () => {
  it('cleanCep removes non-digits', () => {
    expect(cleanCep('93010-170')).toBe('93010170');
    expect(cleanCep('01001000')).toBe('01001000');
    expect(cleanCep('01.001-000')).toBe('01001000');
  });

  it('formatCep adds dash', () => {
    expect(formatCep('93010170')).toBe('93010-170');
    expect(formatCep('01001-000')).toBe('01001-000');
  });
});

describe('CNPJ Service', () => {
  it('cleanCnpj removes non-digits', () => {
    expect(cleanCnpj('00.000.000/0001-91')).toBe('00000000000191');
  });

  it('formatCnpj formats correctly', () => {
    expect(formatCnpj('00000000000191')).toBe('00.000.000/0001-91');
  });
});

describe('Currency Service', () => {
  it('has supported currencies defined', () => {
    expect(SUPPORTED_CURRENCIES.length).toBeGreaterThanOrEqual(4);
    expect(SUPPORTED_CURRENCIES.find((c) => c.code === 'BRL')).toBeDefined();
    expect(SUPPORTED_CURRENCIES.find((c) => c.code === 'USD')).toBeDefined();
  });

  it('getFallbackRates returns valid rates', () => {
    const rates = getFallbackRates();
    expect(rates['BRL']).toBe(1.0);
    expect(rates['USD']).toBeGreaterThan(1);
    expect(rates['EUR']).toBeGreaterThan(1);
  });

  it('converts BRL to BRL correctly', () => {
    const rates = getFallbackRates();
    const result = convertCurrency(100, 'BRL', 'BRL', rates);
    expect(result.convertedAmount).toBeCloseTo(100, 1);
  });

  it('converts USD to BRL', () => {
    const rates = getFallbackRates();
    const result = convertCurrency(1, 'USD', 'BRL', rates);
    expect(result.convertedAmount).toBeGreaterThan(4);
    expect(result.convertedAmount).toBeLessThan(10);
  });

  it('converts BRL to USD', () => {
    const rates = getFallbackRates();
    const result = convertCurrency(100, 'BRL', 'USD', rates);
    expect(result.convertedAmount).toBeGreaterThan(10);
    expect(result.convertedAmount).toBeLessThan(30);
  });

  it('includes source and isReferenceRate in result', () => {
    const rates = getFallbackRates();
    const result = convertCurrency(1, 'USD', 'BRL', rates);
    expect(result.source).toContain('AwesomeAPI');
    expect(result.isReferenceRate).toBe(true);
  });
});

describe('Holidays Service', () => {
  it('MONTH_NAMES has 12 months in Portuguese', () => {
    expect(MONTH_NAMES).toHaveLength(12);
    expect(MONTH_NAMES[0]).toBe('Janeiro');
    expect(MONTH_NAMES[11]).toBe('Dezembro');
  });

  it('calculates 2026 national holidays', () => {
    const holidays = getCalculatedNationalHolidays(2026);
    expect(holidays.length).toBeGreaterThanOrEqual(12);

    // Fixed holidays that must exist
    const names = holidays.map((h) => h.name);
    expect(names).toContain('Confraternização Universal (Ano Novo)');
    expect(names).toContain('Tiradentes');
    expect(names).toContain('Independência do Brasil');
    expect(names).toContain('Natal');
    expect(names).toContain('Páscoa');
    expect(names).toContain('Sexta-feira Santa (Paixão de Cristo)');
    expect(names).toContain('Carnaval (Ponto Facultativo)');
  });

  it('holidays are sorted by date', () => {
    const holidays = getCalculatedNationalHolidays(2026);
    for (let i = 1; i < holidays.length; i++) {
      expect(holidays[i].date >= holidays[i - 1].date).toBe(true);
    }
  });

  it('each holiday has dayOfWeek', () => {
    const holidays = getCalculatedNationalHolidays(2026);
    for (const h of holidays) {
      expect(h.dayOfWeek).toBeTruthy();
      expect(h.day).toBeGreaterThanOrEqual(1);
      expect(h.month).toBeGreaterThanOrEqual(1);
      expect(h.month).toBeLessThanOrEqual(12);
    }
  });

  it('calculates Easter correctly for 2026', () => {
    const holidays = getCalculatedNationalHolidays(2026);
    const easter = holidays.find((h) => h.name === 'Páscoa');
    expect(easter).toBeDefined();
    // Easter 2026 is April 5
    expect(easter?.date).toBe('2026-04-05');
  });
});
