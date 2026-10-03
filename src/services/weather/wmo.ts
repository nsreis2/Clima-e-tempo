export interface WMOInfo {
  code: number;
  description: string;
  category: 'clear' | 'partly-cloudy' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
  icon: string; // SVG icon identifier or path
}

export const WMO_CODES: Record<number, WMOInfo> = {
  0: { code: 0, description: 'Céu limpo', category: 'clear', icon: 'sun' },
  1: { code: 1, description: 'Predomínio de sol', category: 'clear', icon: 'sun' },
  2: { code: 2, description: 'Parcialmente nublado', category: 'partly-cloudy', icon: 'cloud-sun' },
  3: { code: 3, description: 'Nublado', category: 'cloudy', icon: 'cloud' },
  45: { code: 45, description: 'Nevoeiro', category: 'fog', icon: 'fog' },
  48: { code: 48, description: 'Nevoeiro com geada', category: 'fog', icon: 'fog' },
  51: { code: 51, description: 'Garoa leve', category: 'drizzle', icon: 'drizzle' },
  53: { code: 53, description: 'Garoa moderada', category: 'drizzle', icon: 'drizzle' },
  55: { code: 55, description: 'Garoa densa', category: 'drizzle', icon: 'drizzle' },
  56: { code: 56, description: 'Garoa gelada leve', category: 'drizzle', icon: 'drizzle' },
  57: { code: 57, description: 'Garoa gelada densa', category: 'drizzle', icon: 'drizzle' },
  61: { code: 61, description: 'Chuva fraca', category: 'rain', icon: 'rain-light' },
  62: { code: 62, description: 'Chuva leve', category: 'rain', icon: 'rain-light' },
  63: { code: 63, description: 'Chuva moderada', category: 'rain', icon: 'rain' },
  65: { code: 65, description: 'Chuva forte', category: 'rain', icon: 'rain-heavy' },
  66: { code: 66, description: 'Chuva congelante leve', category: 'rain', icon: 'rain' },
  67: { code: 67, description: 'Chuva congelante forte', category: 'rain', icon: 'rain-heavy' },
  71: { code: 71, description: 'Neve fraca', category: 'snow', icon: 'snow' },
  73: { code: 73, description: 'Neve moderada', category: 'snow', icon: 'snow' },
  75: { code: 75, description: 'Neve forte', category: 'snow', icon: 'snow' },
  77: { code: 77, description: 'Grãos de neve', category: 'snow', icon: 'snow' },
  80: { code: 80, description: 'Pancadas de chuva fracas', category: 'rain', icon: 'rain-light' },
  81: { code: 81, description: 'Pancadas de chuva moderadas', category: 'rain', icon: 'rain' },
  82: { code: 82, description: 'Pancadas de chuva violentas', category: 'rain', icon: 'rain-heavy' },
  85: { code: 85, description: 'Aguaceiros de neve leves', category: 'snow', icon: 'snow' },
  86: { code: 86, description: 'Aguaceiros de neve pesados', category: 'snow', icon: 'snow' },
  95: { code: 95, description: 'Tempestade com trovoadas', category: 'thunderstorm', icon: 'thunderstorm' },
  96: { code: 96, description: 'Tempestade com granizo leve', category: 'thunderstorm', icon: 'thunderstorm' },
  97: { code: 97, description: 'Tempestade severa', category: 'thunderstorm', icon: 'thunderstorm' },
  99: { code: 99, description: 'Tempestade com granizo forte', category: 'thunderstorm', icon: 'thunderstorm' },
};

export function getWMOInfo(code: number): WMOInfo {
  if (WMO_CODES[code]) {
    return WMO_CODES[code];
  }
  // Fallbacks
  if (code >= 1 && code <= 3) return { code, description: 'Nublado', category: 'cloudy', icon: 'cloud' };
  if (code >= 51 && code <= 67) return { code, description: 'Chuva', category: 'rain', icon: 'rain' };
  if (code >= 71 && code <= 77) return { code, description: 'Neve', category: 'snow', icon: 'snow' };
  if (code >= 80 && code <= 82) return { code, description: 'Pancadas de chuva', category: 'rain', icon: 'rain' };
  if (code >= 95 && code <= 99) return { code, description: 'Tempestade', category: 'thunderstorm', icon: 'thunderstorm' };

  return { code, description: 'Condição variável', category: 'partly-cloudy', icon: 'cloud-sun' };
}
