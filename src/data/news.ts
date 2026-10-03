export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: 'clima' | 'brasil' | 'mundo' | 'tecnologia';
  categoryLabel: string;
  summary: string;
  content: string[];
  date: string;
  publishedAtISO: string;
  source: string;
  sourceUrl: string;
  readTime: string;
  imageUrl?: string;
  tags: string[];
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    slug: 'inmet-alerta-frente-fria-sul-sudeste',
    title: 'INMET emite alerta para avanço de nova frente fria com queda acentuada de temperatura no Centro-Sul',
    category: 'clima',
    categoryLabel: 'Clima',
    summary: 'Massa de ar de origem polar deve provocar chuvas pontuais e declínio térmico de até 8°C em áreas do Rio Grande do Sul, Santa Catarina, Paraná e São Paulo.',
    content: [
      'O Instituto Nacional de Meteorologia (INMET) emitiu um aviso meteorológico alertando para o deslocamento de uma frente fria sobre o centro-sul do país nos próximos dias.',
      'O sistema frontal está associado a uma massa de ar de origem polar que deve provocar queda significativa nas temperaturas máximas e mínimas, além de rajadas de vento que podem atingir entre 50 km/h e 70 km/h na faixa litorânea.',
      'Meteorologistas destacam que os maiores acumulados de precipitação devem se concentrar nas áreas serranas e na faixa leste dos estados do Sul, com possibilidade de garoa persistente na Região Metropolitana de São Paulo.',
      'A população é orientada a acompanhar as atualizações diárias dos boletins e os avisos da Defesa Civil estadual para medidas preventivas, especialmente para populações vulneráveis e proteção de animais domésticos.'
    ],
    date: '03 de Outubro de 2026',
    publishedAtISO: '2026-10-03T09:00:00-03:00',
    source: 'INMET / Agência Brasil',
    sourceUrl: 'https://portal.inmet.gov.br',
    readTime: '3 min de leitura',
    tags: ['Frente Fria', 'INMET', 'Previsão', 'Sul', 'Sudeste'],
  },
  {
    id: '2',
    slug: 'monitoramento-el-nino-la-nina-transicao-climatica',
    title: 'Boletim da OMM e NOAA indica padrões de neutralidade climática no Pacífico Equatorial',
    category: 'clima',
    categoryLabel: 'Clima',
    summary: 'Análise oceanográfica e atmosférica aponta transição entre fases dos fenômenos ENOS, com impactos diretos no regime de chuvas para a primavera no Brasil.',
    content: [
      'A Organização Meteorológica Mundial (OMM), em conjunto com a Administração Oceânica e Atmosférica Nacional dos EUA (NOAA), divulgou a atualização mais recente sobre o monitoramento do fenômeno El Niño-Oscilação Sul (ENOS).',
      'As anomalias de Temperatura da Superfície do Mar (TSM) na bacia do Pacífico Centro-Leste mantêm-se em patamares próximos à média histórica, configurando um cenário de neutralidade climática no curto prazo.',
      'No Brasil, períodos de neutralidade climática costumam exigir atenção redobrada das previsões regionais de curto prazo, pois o regime de chuvas passa a ser determinado primordialmente por passagens de sistemas frontais e pela formação da Zona de Convergência do Atlântico Sul (ZCAS).',
      'O setor do agronegócio e os operadores do sistema elétrico nacional acompanham com rigor o início da estação chuvosa no Centro-Oeste e Sudeste para planejamento do plantio e dos reservatórios hidrelétricos.'
    ],
    date: '02 de Outubro de 2026',
    publishedAtISO: '2026-10-02T14:30:00-03:00',
    source: 'OMM / NOAA / CPTEC',
    sourceUrl: 'https://public.wmo.int',
    readTime: '4 min de leitura',
    tags: ['El Niño', 'La Niña', 'Clima Global', 'Agricultura', 'Pacífico'],
  },
  {
    id: '3',
    slug: 'reservatorios-sudeste-centro-oeste-nivel-estavel',
    title: 'Operador Nacional do Sistema Elétrico aponta níveis estáveis nos principais reservatórios hidrelétricos',
    category: 'brasil',
    categoryLabel: 'Brasil',
    summary: 'Apesar do período de estiagem típico nos meses anteriores, volume útil dos reservatórios no subsistema Sudeste/Centro-Oeste garante segurança energética.',
    content: [
      'Dados consolidados do Operador Nacional do Sistema Elétrico (ONS) indicam que a Energia Armazenada (EAR) nas principais bacias hidrográficas brasileiras mantém níveis satisfatórios para o fechamento do período seco.',
      'O planejamento integrado entre geração hidrelétrica, fontes eólicas no Nordeste e o crescimento contínuo da geração solar fotovoltaica permitiu preservar a água dos grandes lagos de acumulação.',
      'Com o início gradual das chuvas convectivas de primavera, a expectativa do setor elétrico é de recuperação gradual dos afluentes nas bacias dos rios Paraná, Grande e Paranaíba sem a necessidade de acionamento maciço de termelétricas mais caras.',
      'A preservação dos níveis também assegura os múltiplos usos das águas, incluindo navegação fluvial, irrigação rural e abastecimento dos grandes centros urbanos.'
    ],
    date: '01 de Outubro de 2026',
    publishedAtISO: '2026-10-01T11:15:00-03:00',
    source: 'ONS / Ministério de Minas e Energia',
    sourceUrl: 'https://www.ons.org.br',
    readTime: '3 min de leitura',
    tags: ['Energia', 'Reservatórios', 'Brasil', 'Sustentabilidade', 'ONS'],
  },
  {
    id: '4',
    slug: 'satelites-meteorologicos-precisao-radar',
    title: 'Nova geração de radares meteorológicos amplia precisão na detecção precoce de tempestades severas',
    category: 'tecnologia',
    categoryLabel: 'Tecnologia',
    summary: 'Tecnologia de dupla polarização e dados de satélites em tempo real aumentam tempo de resposta das defesas civis municipais contra enxurradas.',
    content: [
      'A expansão da malha de radares meteorológicos com tecnologia de polarização dupla no território brasileiro está trazendo avanços notáveis para a meteorologia de curtíssimo prazo (nowcasting).',
      'Diferente dos equipamentos tradicionais, os radares de polarização dupla conseguem distinguir com precisão milimétrica o tipo de hidrometeoro presente nas nuvens — identificando se o conteúdo é chuva líquida, granizo em suspensão ou cristais de gelo.',
      'Essa precisão permite que os centros de gerenciamento de risco e desastres emitam alertas de evacuação preventiva com antecedência de até 45 minutos a uma hora antes da ocorrência do impacto severo no solo.',
      'Além disso, a integração com modelos numéricos de inteligência artificial tem aprimorado a estimativa de vento descendente severo (microexplosões atmosféricas).'
    ],
    date: '30 de Setembro de 2026',
    publishedAtISO: '2026-09-30T16:00:00-03:00',
    source: 'CEMADEN / MCTI',
    sourceUrl: 'https://www.gov.br/cemaden',
    readTime: '4 min de leitura',
    tags: ['Tecnologia', 'Radar', 'Defesa Civil', 'CEMADEN', 'Inovação'],
  },
  {
    id: '5',
    slug: 'cop-acordo-climatico-metas-descarbonizacao',
    title: 'Conferência Climática Internacional discute metas de financiamento para adaptação em países em desenvolvimento',
    category: 'mundo',
    categoryLabel: 'Mundo',
    summary: 'Representantes de mais de 190 países debatem novos aportes globais para prevenção de perdas e danos decorrentes de eventos climáticos extremos.',
    content: [
      'As negociações preparatórias da conferência do clima avançaram nesta semana em Genebra com foco na operacionalização de fundos financeiros destinados à adaptação climática.',
      'A delegação brasileira defendeu a ampliação do acesso facilitado a recursos para cidades de médio e pequeno porte expostas a deslizamentos de encostas e inundações fluviais.',
      'O relatório apresentado pelo Painel Intergovernamental sobre Mudanças Climáticas (IPCC) reforça que cada dólar investido em sistemas de alerta precoce e infraestrutura resiliente economiza cerca de seis dólares em reconstrução emergencial.',
      'Os debates também incluíram a transição para matrizes de transporte elétrico e a recuperação de áreas degradadas com bioeconomia.'
    ],
    date: '28 de Setembro de 2026',
    publishedAtISO: '2026-09-28T10:45:00-03:00',
    source: 'ONU / IPCC',
    sourceUrl: 'https://unfccc.int',
    readTime: '4 min de leitura',
    tags: ['Mundo', 'COP', 'Sustentabilidade', 'ONU', 'Adaptação'],
  },
  {
    id: '6',
    slug: 'primavera-brasileira-caracteristicas-previsao',
    title: 'Primavera no Brasil: entenda como a estação de transição afeta as temperaturas e as chuvas no país',
    category: 'clima',
    categoryLabel: 'Clima',
    summary: 'Marcada pelo aumento progressivo da radiação solar e umidade do ar, a primavera traz de volta as chuvas frequentes no Centro-Oeste e Sudeste.',
    content: [
      'A primavera astronômica no Hemisfério Sul representa o período típico de transição entre o inverno seco e o verão chuvoso na maior parte do Brasil central.',
      'Durante esses meses, o aquecimento da superfície continental favorece a intensificação da convecção térmica, gerando as conhecidas pancadas de chuva de fim de tarde, muitas vezes acompanhadas por rajadas de vento e trovoadas.',
      'No Sul do país, o choque contínuo entre massas de ar quente vindas do interior tropical e massas de ar polar vindas da Antártica costuma produzir frentes frias ativas e temporais isolados.',
      'Já no Nordeste e no semiárido, a estação ainda é marcada por temperaturas altas e baixa umidade relativa até a chegada das primeiras precipitações de verão.'
    ],
    date: '25 de Setembro de 2026',
    publishedAtISO: '2026-09-25T08:30:00-03:00',
    source: 'CPTEC / INPE',
    sourceUrl: 'https://www.cptec.inpe.br',
    readTime: '3 min de leitura',
    tags: ['Primavera', 'Estações do Ano', 'Clima', 'Previsão', 'Brasil'],
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS_ITEMS.find((item) => item.slug === slug);
}

export function getNewsByCategory(category: string): NewsItem[] {
  return NEWS_ITEMS.filter((item) => item.category === category);
}

export function getRecentNews(limit: number = 4): NewsItem[] {
  return NEWS_ITEMS.slice(0, limit);
}
