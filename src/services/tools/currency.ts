export interface CurrencyRate {
  code: string;
  codein: string;
  name: string;
  bid: number; // Compra
  ask: number; // Venda
  high: number;
  low: number;
  pctChange: number;
  create_date: string;
  timestamp: string;
}

export interface ConversionResult {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: number;
  exchangeRate: number;
  formattedResult: string;
  formattedRate: string;
  lastUpdate: string;
  source: string;
  isReferenceRate: boolean;
}

export const SUPPORTED_CURRENCIES = [
  { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$' },
  { code: 'USD', name: 'Dólar Americano', symbol: 'US$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'Libra Esterlina', symbol: '£' },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿' },
];

export async function fetchLiveExchangeRates(): Promise<Record<string, number>> {
  const pairs = 'USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://economia.awesomeapi.com.br/last/${pairs}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    return {
      'BRL': 1.0,
      'USD': parseFloat(data.USDBRL?.bid || '5.50'),
      'EUR': parseFloat(data.EURBRL?.bid || '6.00'),
      'GBP': parseFloat(data.GBPBRL?.bid || '7.10'),
      'BTC': parseFloat(data.BTCBRL?.bid || '350000'),
    };
  } catch (error) {
    console.warn('[CurrencyService] Utilizando cotações de referência de fallback:', error);
    return getFallbackRates();
  }
}

export function getFallbackRates(): Record<string, number> {
  return {
    'BRL': 1.0,
    'USD': 5.50,
    'EUR': 6.00,
    'GBP': 7.15,
    'BTC': 365000,
  };
}

export function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number>
): ConversionResult {
  const fromRateInBrl = rates[from] || 1.0;
  const toRateInBrl = rates[to] || 1.0;

  // Convert from origin to BRL, then BRL to destination
  const amountInBrl = amount * fromRateInBrl;
  const convertedAmount = amountInBrl / toRateInBrl;
  const directRate = fromRateInBrl / toRateInBrl;

  const now = new Date();
  const formattedDate = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const isBtc = to === 'BTC';
  const decimals = isBtc ? 6 : 2;

  return {
    amount,
    fromCurrency: from,
    toCurrency: to,
    convertedAmount,
    exchangeRate: directRate,
    formattedResult: convertedAmount.toLocaleString('pt-BR', {
      minimumFractionDigits: isBtc ? 4 : 2,
      maximumFractionDigits: decimals,
    }),
    formattedRate: `1 ${from} = ${directRate.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: isBtc ? 6 : 4,
    })} ${to}`,
    lastUpdate: formattedDate,
    source: 'AwesomeAPI / Cotações de Mercado Comercial',
    isReferenceRate: true,
  };
}
