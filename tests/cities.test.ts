import { describe, it, expect } from 'vitest';
import { CITIES, getCityBySlug, getAllCitySlugs, searchCitiesLocal } from '../src/data/cities';

describe('Cities Data', () => {
  it('has cities loaded', () => {
    expect(CITIES.length).toBeGreaterThan(10);
  });

  it('each city has required fields', () => {
    for (const city of CITIES) {
      expect(city.slug).toBeTruthy();
      expect(city.name).toBeTruthy();
      expect(city.uf).toHaveLength(2);
      expect(city.state).toBeTruthy();
      expect(city.latitude).not.toBe(0);
      expect(city.longitude).not.toBe(0);
      expect(['Sul', 'Sudeste', 'Centro-Oeste', 'Nordeste', 'Norte']).toContain(city.region);
      expect(city.description.length).toBeGreaterThan(30);
      expect(city.climateType).toBeTruthy();
      expect(city.averageAnnualTemp).toBeGreaterThan(10);
      expect(city.nearbyCities.length).toBeGreaterThan(0);
    }
  });

  it('all slugs are unique', () => {
    const slugs = CITIES.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('all nearbyCities reference valid slugs', () => {
    const allSlugs = new Set(getAllCitySlugs());
    for (const city of CITIES) {
      for (const nearbySlug of city.nearbyCities) {
        expect(allSlugs.has(nearbySlug)).toBe(true);
      }
    }
  });
});

describe('getCityBySlug', () => {
  it('finds Porto Alegre', () => {
    const city = getCityBySlug('porto-alegre-rs');
    expect(city).toBeDefined();
    expect(city?.name).toBe('Porto Alegre');
    expect(city?.uf).toBe('RS');
  });

  it('finds São Paulo', () => {
    const city = getCityBySlug('sao-paulo-sp');
    expect(city).toBeDefined();
    expect(city?.name).toBe('São Paulo');
  });

  it('returns undefined for unknown city', () => {
    const city = getCityBySlug('cidade-inexistente-xx');
    expect(city).toBeUndefined();
  });
});

describe('searchCitiesLocal', () => {
  it('finds cities by name', () => {
    const results = searchCitiesLocal('Porto');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((c) => c.name === 'Porto Alegre')).toBe(true);
  });

  it('finds cities by UF', () => {
    const results = searchCitiesLocal('RS');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((c) => c.uf === 'RS')).toBe(true);
  });

  it('finds cities by accent-insensitive query', () => {
    const results = searchCitiesLocal('sao paulo');
    expect(results.some((c) => c.name === 'São Paulo')).toBe(true);
  });

  it('returns empty for blank query', () => {
    expect(searchCitiesLocal('')).toEqual([]);
    expect(searchCitiesLocal('  ')).toEqual([]);
  });
});
