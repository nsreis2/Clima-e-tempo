export interface HolidayItem {
  date: string; // YYYY-MM-DD
  name: string;
  type: string;
  dayOfWeek: string;
  day: number;
  month: number;
  monthName: string;
}

export const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export async function fetchHolidays(year: number = 2026): Promise<HolidayItem[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const rawList = await res.json();
    return formatHolidayList(rawList);
  } catch (error) {
    console.warn(`[HolidayService] Erro ao buscar feriados para ${year}, usando lista oficial calculada:`, error);
    return getCalculatedNationalHolidays(year);
  }
}

export function formatHolidayList(rawList: Array<{ date: string; name: string; type?: string }>): HolidayItem[] {
  return rawList.map((item) => {
    const [y, m, d] = item.date.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayOfWeek = dateObj.toLocaleDateString('pt-BR', { weekday: 'long' });

    return {
      date: item.date,
      name: item.name,
      type: item.type === 'national' ? 'Feriado Nacional' : item.type || 'Feriado Nacional',
      dayOfWeek: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
      day: d,
      month: m,
      monthName: MONTH_NAMES[m - 1],
    };
  });
}

export function getCalculatedNationalHolidays(year: number): HolidayItem[] {
  // Fixed national Brazilian holidays
  const fixedHolidays = [
    { month: 1, day: 1, name: 'Confraternização Universal (Ano Novo)' },
    { month: 4, day: 21, name: 'Tiradentes' },
    { month: 5, day: 1, name: 'Dia Mundial do Trabalho' },
    { month: 9, day: 7, name: 'Independência do Brasil' },
    { month: 10, day: 12, name: 'Nossa Senhora Aparecida (Padroeira do Brasil)' },
    { month: 11, day: 2, name: 'Finados' },
    { month: 11, day: 15, name: 'Proclamação da República' },
    { month: 11, day: 20, name: 'Dia Nacional de Zumbi e da Consciência Negra' },
    { month: 12, day: 25, name: 'Natal' },
  ];

  // Calculate Easter (Meeus/Jones/Butcher algorithm)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const easterMonth = Math.floor((h + l - 7 * m + 114) / 31);
  const easterDay = ((h + l - 7 * m + 114) % 31) + 1;

  const easterDate = new Date(year, easterMonth - 1, easterDay);

  // Carnival (47 days before Easter)
  const carnivalDate = new Date(easterDate);
  carnivalDate.setDate(easterDate.getDate() - 47);

  // Good Friday (2 days before Easter)
  const goodFridayDate = new Date(easterDate);
  goodFridayDate.setDate(easterDate.getDate() - 2);

  // Corpus Christi (60 days after Easter)
  const corpusChristiDate = new Date(easterDate);
  corpusChristiDate.setDate(easterDate.getDate() + 60);

  const dynamicHolidays = [
    { date: carnivalDate, name: 'Carnaval (Ponto Facultativo)' },
    { date: goodFridayDate, name: 'Sexta-feira Santa (Paixão de Cristo)' },
    { date: easterDate, name: 'Páscoa' },
    { date: corpusChristiDate, name: 'Corpus Christi' },
  ];

  const all: Array<{ date: string; name: string; type: string }> = [];

  for (const h of fixedHolidays) {
    const dStr = `${year}-${String(h.month).padStart(2, '0')}-${String(h.day).padStart(2, '0')}`;
    all.push({ date: dStr, name: h.name, type: 'Feriado Nacional' });
  }

  for (const d of dynamicHolidays) {
    const y = d.date.getFullYear();
    const mo = String(d.date.getMonth() + 1).padStart(2, '0');
    const da = String(d.date.getDate()).padStart(2, '0');
    all.push({ date: `${y}-${mo}-${da}`, name: d.name, type: 'Feriado Nacional' });
  }

  all.sort((a, b) => a.date.localeCompare(b.date));
  return formatHolidayList(all);
}
