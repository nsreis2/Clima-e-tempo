export type AlertSeverity = 'yellow' | 'orange' | 'red';

export interface WeatherAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  severityLabel: string;
  description: string;
  affectedRegions: string[];
  states: string[];
  startDate: string;
  endDate: string;
  risks: string[];
  recommendations: string[];
  source: string;
  sourceUrl: string;
}

export const ACTIVE_ALERTS: WeatherAlert[] = [
  {
    id: 'aviso-declínio-temperatura',
    title: 'Aviso Meteorológico: Declínio de Temperatura e Vento Costeiro',
    severity: 'yellow',
    severityLabel: 'Perigo Potencial (Amarelo)',
    description: 'Avanço de massa de ar frio provoca queda entre 3°C e 5°C na temperatura média, com rajadas de vento moderadas a fortes no litoral.',
    affectedRegions: ['Litoral Gaúcho', 'Serra Catarinense', 'Leste do Paraná', 'Litoral de São Paulo'],
    states: ['RS', 'SC', 'PR', 'SP'],
    startDate: '03/10/2026 06:00',
    endDate: '05/10/2026 18:00',
    risks: [
      'Sensação térmica reduzida durante a noite e primeiras horas do dia',
      'Agitação marítima com ondas de até 2,5 metros no litoral sul',
      'Possibilidade de nevoeiro na madrugada reduzindo visibilidade em rodovias'
    ],
    recommendations: [
      'Mantenha-se agasalhado, especialmente crianças e pessoas idosas',
      'Evite atividades náuticas de pequeno porte em áreas com aviso de ressaca',
      'Em caso de ventos fortes, não se abrigue sob árvores'
    ],
    source: 'INMET / Marinha do Brasil / Defesa Civil',
    sourceUrl: 'https://alertas2.inmet.gov.br',
  },
  {
    id: 'aviso-baixa-umidade-centro-oeste',
    title: 'Aviso Meteorológico: Baixa Umidade Relativa do Ar',
    severity: 'orange',
    severityLabel: 'Perigo (Laranja)',
    description: 'Umidade relativa do ar variando entre 20% e 12%. Risco elevado de incêndios florestais e ressecamento de mucosas.',
    affectedRegions: ['Centro e Norte de Goiás', 'Distrito Federal', 'Leste de Mato Grosso', 'Oeste da Bahia'],
    states: ['GO', 'DF', 'MT', 'BA'],
    startDate: '03/10/2026 12:00',
    endDate: '04/10/2026 19:00',
    risks: [
      'Desconforto respiratório, ressecamento de pele e olhos',
      'Propagação rápida de fogo em vegetação seca',
      'Desidratação em exercícios ao ar livre'
    ],
    recommendations: [
      'Beba bastante líquido (água, sucos naturais e água de coco)',
      'Evite exposição direta ao sol e atividades físicas intensas entre 10h e 16h',
      'Umidifique ambientes fechados com toalhas úmidas ou recipientes com água',
      'Não ateie fogo em lixo ou terrenos baldios sob qualquer hipótese'
    ],
    source: 'INMET / Defesa Civil Nacional',
    sourceUrl: 'https://alertas2.inmet.gov.br',
  }
];

export const EMERGENCY_CONTACTS = [
  { name: 'Defesa Civil', number: '199', desc: 'Atendimento de emergências e desastres climáticos' },
  { name: 'Corpo de Bombeiros', number: '193', desc: 'Resgate, enchentes, alagamentos e incêndios' },
  { name: 'SAMU', number: '192', desc: 'Socorro médico de urgência' },
  { name: 'Polícia Rodoviária Federal', number: '191', desc: 'Emergências e condições de tráfego em rodovias' },
];
