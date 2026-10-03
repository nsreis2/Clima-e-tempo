import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(__dirname, '../dist');

describe('SEO & Build Output Validation', () => {
  it('dist directory exists', () => {
    expect(fs.existsSync(distDir)).toBe(true);
  });

  it('sitemap and robots.txt exist', () => {
    expect(fs.existsSync(path.join(distDir, 'sitemap-index.xml'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'robots.txt'))).toBe(true);

    const robots = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf-8');
    expect(robots).toContain('Sitemap: https://climabrasil.com.br/sitemap-index.xml');
  });

  it('homepage contains SEO tags, Schema.org and single H1', () => {
    const indexPath = path.join(distDir, 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
    const html = fs.readFileSync(indexPath, 'utf-8');

    expect(html).toContain('<title>');
    expect(html).toContain('name="description"');
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:description"');
    expect(html).toContain('name="twitter:card"');
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('https://schema.org');

    // Exactly one h1 on the page
    const h1Matches = html.match(/<h1[^>]*>/g);
    expect(h1Matches?.length).toBe(1);
  });

  it('city weather pages contain Weather/SpecialAnnouncement Schema and proper H1', () => {
    const poaPath = path.join(distDir, 'clima/porto-alegre-rs/index.html');
    expect(fs.existsSync(poaPath)).toBe(true);
    const html = fs.readFileSync(poaPath, 'utf-8');

    expect(html).toContain('Previsão do tempo em Porto Alegre - RS');
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('SpecialAnnouncement');
    expect(html).toContain('Porto Alegre');

    const h1Matches = html.match(/<h1[^>]*>/g);
    expect(h1Matches?.length).toBe(1);
  });

  it('tool pages exist and contain WebApplication Schema', () => {
    const cepPath = path.join(distDir, 'ferramentas/cep/index.html');
    const cnpjPath = path.join(distDir, 'ferramentas/cnpj/index.html');
    const moedasPath = path.join(distDir, 'ferramentas/moedas/index.html');
    const feriadosPath = path.join(distDir, 'ferramentas/feriados/index.html');

    expect(fs.existsSync(cepPath)).toBe(true);
    expect(fs.existsSync(cnpjPath)).toBe(true);
    expect(fs.existsSync(moedasPath)).toBe(true);
    expect(fs.existsSync(feriadosPath)).toBe(true);

    const cepHtml = fs.readFileSync(cepPath, 'utf-8');
    expect(cepHtml).toContain('WebApplication');
    expect(cepHtml).toContain('ViaCEP');
  });

  it('news pages exist and contain NewsArticle Schema', () => {
    const articlePath = path.join(distDir, 'noticias/inmet-alerta-frente-fria-sul-sudeste/index.html');
    expect(fs.existsSync(articlePath)).toBe(true);
    const html = fs.readFileSync(articlePath, 'utf-8');

    expect(html).toContain('NewsArticle');
    expect(html).toContain('INMET');
  });

  it('institutional and legal pages exist', () => {
    expect(fs.existsSync(path.join(distDir, 'sobre/index.html'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'contato/index.html'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'politica-de-privacidade/index.html'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'termos-de-uso/index.html'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, '404.html'))).toBe(true);
  });
});
