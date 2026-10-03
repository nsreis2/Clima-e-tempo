export function formatTemp(celsius: number | null | undefined): string {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return '--°';
  return `${Math.round(celsius)}°C`;
}

export function formatTempNumber(celsius: number | null | undefined): string {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return '--';
  return `${Math.round(celsius)}°`;
}

export function formatWind(kmh: number | null | undefined): string {
  if (kmh === null || kmh === undefined || isNaN(kmh)) return '-- km/h';
  return `${Math.round(kmh)} km/h`;
}

export function formatRain(mm: number | null | undefined): string {
  if (mm === null || mm === undefined || isNaN(mm)) return '0 mm';
  return `${mm.toFixed(1).replace('.', ',')} mm`;
}

export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) return '0%';
  return `${Math.round(value)}%`;
}

export function windDegreeToCardinal(degrees: number | null | undefined): string {
  if (degrees === null || degrees === undefined || isNaN(degrees)) return 'N/D';
  const directions = [
    'Norte', 'NNE', 'Nordeste', 'ENE',
    'Leste', 'ESE', 'Sudeste', 'SSE',
    'Sul', 'SSO', 'Sudoeste', 'OSO',
    'Oeste', 'ONO', 'Noroeste', 'NNO'
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index] || 'N/D';
}

export function formatDayOfWeek(dateStr: string): { full: string; short: string } {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const full = date.toLocaleDateString('pt-BR', { weekday: 'long' });
    const short = date.toLocaleDateString('pt-BR', { weekday: 'short' });
    return {
      full: full.charAt(0).toUpperCase() + full.slice(1),
      short: short.replace('.', '').toUpperCase(),
    };
  } catch {
    return { full: 'Dia', short: 'DIA' };
  }
}

export function formatDateBR(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  } catch {
    return dateStr;
  }
}

export function formatHourBR(isoTimeStr: string): string {
  try {
    if (isoTimeStr.includes('T')) {
      const parts = isoTimeStr.split('T')[1].split(':');
      return `${parts[0]}:${parts[1]}`;
    }
    return isoTimeStr;
  } catch {
    return isoTimeStr;
  }
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
