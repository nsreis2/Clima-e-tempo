export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
}

export const SITE_NAME = 'ClimaBrasil';
export const SITE_URL = 'https://climabrasil.com.br';
export const DEFAULT_DESCRIPTION = 'Portal de previsão do tempo em tempo real para todo o Brasil, alertas meteorológicos oficiais, monitoramento de El Niño e ferramentas gratuitas de utilidade pública.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export function getFullTitle(title: string): string {
  if (title.includes(SITE_NAME)) return title;
  return `${title} | ${SITE_NAME}`;
}

export function buildWeatherSchema(params: {
  cityName: string;
  stateUf: string;
  temperature: number;
  condition: string;
  minTemp: number;
  maxTemp: number;
  url: string;
  date: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpecialAnnouncement',
    'name': `Previsão do Tempo em ${params.cityName} - ${params.stateUf}`,
    'description': `Previsão meteorológica para ${params.cityName} (${params.stateUf}): temperatura atual de ${params.temperature}°C, ${params.condition}. Mínima de ${params.minTemp}°C e máxima de ${params.maxTemp}°C.`,
    'url': params.url,
    'datePosted': params.date,
    'category': 'https://en.wikipedia.org/wiki/Weather_forecasting',
    'spatialCoverage': {
      '@type': 'Place',
      'name': `${params.cityName}, ${params.stateUf}, Brasil`,
    },
  };
}

export function buildNewsArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  author: string;
  source: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': params.title,
    'description': params.description,
    'url': params.url,
    'datePublished': params.publishedAt,
    'dateModified': params.publishedAt,
    'author': {
      '@type': 'Organization',
      'name': params.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL,
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_URL}/favicon.svg`,
      },
    },
  };
}

export function buildWebApplicationSchema(params: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': params.name,
    'description': params.description,
    'url': params.url,
    'applicationCategory': params.applicationCategory,
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'BRL',
    },
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
