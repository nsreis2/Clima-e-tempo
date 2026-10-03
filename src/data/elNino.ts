export interface ElNinoImpact {
  region: string;
  phenomenon: 'El Niño' | 'La Niña';
  temperatureTrend: string;
  rainfallTrend: string;
  details: string;
}

export const EL_NINO_OVERVIEW = {
  currentPhase: 'Fase Neutra (Transição Climatológica)',
  monitoringPeriod: 'Primavera 2026 / Verão 2027',
  officialSources: [
    { name: 'INMET (Instituto Nacional de Meteorologia)', url: 'https://portal.inmet.gov.br' },
    { name: 'CPTEC/INPE (Centro de Previsão de Tempo e Estudos Climáticos)', url: 'https://www.cptec.inpe.br' },
    { name: 'NOAA (Climate Prediction Center)', url: 'https://www.cpc.ncep.noaa.gov' },
    { name: 'OMM (Organização Meteorológica Mundial)', url: 'https://public.wmo.int' },
  ],
  lastUpdate: 'Outubro de 2026',
  summary: 'O monitoramento oceânico no Pacífico Equatorial indica temperaturas de superfície do mar próximas da média histórica. As projeções dos principais modelos climáticos globais apontam para continuidade de condições de neutralidade climática ou leve tendência de resfriamento (condições neutras a La Niña fraca) nos próximos trimestres.',
};

export const REGIONAL_IMPACTS: ElNinoImpact[] = [
  {
    region: 'Região Sul (RS, SC, PR)',
    phenomenon: 'El Niño',
    temperatureTrend: 'Temperaturas amenas a moderadas',
    rainfallTrend: 'Chuvas acima da média histórica',
    details: 'Sob a influência do El Niño, o Sul do Brasil costuma registrar passagens frequentes de frentes frias bloqueadas, gerando tempestades severas, enchentes e acumulados pluviométricos extraordinários.',
  },
  {
    region: 'Região Sul (RS, SC, PR)',
    phenomenon: 'La Niña',
    temperatureTrend: 'Maior oscilação com entradas de frio polar no inverno',
    rainfallTrend: 'Chuvas abaixo da média (risco de estiagem)',
    details: 'Durante a La Niña, o padrão de circulação empurra as chuvas para o norte, causando frequentemente estiagens prolongadas no verão gaúcho e catarinense, com impacto direto nas safras de grãos.',
  },
  {
    region: 'Região Sudeste (SP, RJ, MG, ES)',
    phenomenon: 'El Niño',
    temperatureTrend: 'Temperaturas acima da média e ondas de calor',
    rainfallTrend: 'Chuvas irregulares com tempestades pontuais',
    details: 'Tendência de primaveras e verões mais quentes. As chuvas costumam ser convectivas e concentradas em temporais rápidos de alta intensidade.',
  },
  {
    region: 'Região Sudeste (SP, RJ, MG, ES)',
    phenomenon: 'La Niña',
    temperatureTrend: 'Verões com temperaturas mais amenas',
    rainfallTrend: 'Favorece episódios de ZCAS (chuvas contínuas)',
    details: 'Condições propícias para a formação da Zona de Convergência do Atlântico Sul (ZCAS), com períodos de vários dias nublados e chuvosos nas bacias do Rio Doce, Paraíba do Sul e Grande.',
  },
  {
    region: 'Região Nordeste (Semiárido e Litoral)',
    phenomenon: 'El Niño',
    temperatureTrend: 'Calor acima do normal',
    rainfallTrend: 'Seca pronunciada no semiárido',
    details: 'Inibe a descida da Zona de Convergência Intertropical (ZCIT), reduzindo drasticamente as chuvas no sertão e diminuindo os volumes dos açudes.',
  },
  {
    region: 'Região Nordeste (Semiárido e Litoral)',
    phenomenon: 'La Niña',
    temperatureTrend: 'Temperaturas próximas da média',
    rainfallTrend: 'Chuvas generosas e boa quadra chuvosa',
    details: 'Geralmente traz alívio hídrico ao semiárido nordestino, com chuvas bem distribuídas entre fevereiro e maio que beneficiam a agricultura familiar e os mananciais.',
  },
  {
    region: 'Região Norte (Amazônia)',
    phenomenon: 'El Niño',
    temperatureTrend: 'Calor recorde e ar mais seco',
    rainfallTrend: 'Déficit severo de precipitação',
    details: 'Reduz a evapotranspiração da floresta e o volume dos grandes rios amazônicos, elevando o perigo de queimadas e vazante histórica.',
  },
  {
    region: 'Região Norte (Amazônia)',
    phenomenon: 'La Niña',
    temperatureTrend: 'Temperaturas normais a ligeiramente amenas',
    rainfallTrend: 'Chuvas abundantes e cheias nos rios',
    details: 'Aumento expressivo dos índices de umidade e das chuvas regulares, podendo ocasionar cheias expressivas nos rios Negro, Solimões e Amazonas.',
  },
  {
    region: 'Região Centro-Oeste (GO, MT, MS, DF)',
    phenomenon: 'El Niño',
    temperatureTrend: 'Temperaturas elevadas',
    rainfallTrend: 'Início irregular da estação chuvosa',
    details: 'Retarda o plantio da soja no Centro-Oeste devido à má distribuição das chuvas de primavera, alternando períodos de veranico com dias de calor intenso.',
  },
  {
    region: 'Região Centro-Oeste (GO, MT, MS, DF)',
    phenomenon: 'La Niña',
    temperatureTrend: 'Temperaturas ligeiramente abaixo da média no inverno',
    rainfallTrend: 'Chuvas bem distribuídas a partir de outubro',
    details: 'Favorece o calendário agrícola de grãos com reposição regular de umidade no solo do Cerrado e no Pantanal.',
  },
];

export const HISTORICAL_EVENTS = [
  {
    period: '2023 - 2024',
    event: 'Super El Niño',
    consequences: 'Calor recorde global, enchentes históricas e catástrofe climática no Rio Grande do Sul (maio de 2024), severa seca na Amazônia e no Pantanal.',
  },
  {
    period: '2020 - 2023',
    event: 'La Niña Tripla ("Triple-Dip")',
    consequences: 'Três anos consecutivos de La Niña que provocaram estiagem severa e perdas agrícolas históricas na safra do Sul do Brasil e na Argentina.',
  },
  {
    period: '2015 - 2016',
    event: 'El Niño "Godzilla"',
    consequences: 'Um dos episódios mais intensos do século XX e XXI, desencadeando secas graves no Norte e Nordeste do Brasil e fortes inundações no Sul.',
  },
  {
    period: '1997 - 1998',
    event: 'Super El Niño Histórico',
    consequences: 'Referência oceanográfica de aquecimento extremo da bacia do Pacífico, com perturbações climáticas globais de larga escala.',
  },
];
