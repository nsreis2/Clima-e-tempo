# ClimaBrasil — Portal de Clima, Notícias e Ferramentas Gratuitas

Portal brasileiro independente focado em previsão do tempo em tempo real, alertas meteorológicos, monitoramento de El Niño/La Niña e ferramentas de utilidade pública gratuitas.

Construído com **Astro**, **TypeScript** e **Tailwind CSS v4** — priorizando velocidade, SEO e experiência mobile.

---

## ✨ Funcionalidades

- 🌤️ **Previsão do Tempo** — temperatura, chuva, vento, umidade e UV para 24+ cidades brasileiras
- 📊 **Previsão de 7 dias** — tendência diária com mínima/máxima e probabilidade de precipitação
- ⏰ **Previsão hora a hora** — evolução da temperatura nas próximas 24 horas
- ⚠️ **Alertas Meteorológicos** — boletins de segurança com orientações da Defesa Civil
- 📰 **Notícias** — sínteses informativas sobre clima, Brasil e mundo
- 🌊 **Especial El Niño/La Niña** — monitoramento, impactos regionais e histórico
- 📍 **Consulta de CEP** — busca de endereço via ViaCEP
- 🏢 **Consulta de CNPJ** — dados públicos de empresas via BrasilAPI
- 💱 **Conversor de Moedas** — cotação em tempo real via AwesomeAPI
- 📅 **Calendário de Feriados** — feriados nacionais com cálculo de Páscoa

---

## 🛠️ Requisitos

- **Node.js** >= 22.12.0
- **npm** >= 10.x

---

## 🚀 Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/climabrasil.git
cd climabrasil

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env
```

---

## 💻 Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Abrir no navegador
# http://localhost:4321
```

---

## 🏗️ Build de Produção

```bash
# Gerar site estático
npm run build

# Pré-visualizar build local
npm run preview
```

A saída estática é gerada em `dist/`.

---

## 🧪 Testes

```bash
npm test
```

---

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis (.astro)
│   ├── Header.astro
│   ├── Footer.astro
│   ├── WeatherCard.astro
│   ├── ForecastCard.astro
│   ├── HourlyForecast.astro
│   ├── SearchCity.astro
│   ├── NewsCard.astro
│   ├── ToolCard.astro
│   ├── Breadcrumbs.astro
│   └── AdPlaceholder.astro
├── data/             # Dados curados e datasets
│   ├── cities.ts     # 24 cidades brasileiras com coordenadas
│   ├── news.ts       # Notícias curadas
│   ├── alerts.ts     # Alertas meteorológicos
│   └── elNino.ts     # Dados El Niño/La Niña
├── layouts/          # Layouts base
│   └── BaseLayout.astro
├── pages/            # Rotas/páginas
│   ├── index.astro
│   ├── clima/
│   ├── alertas/
│   ├── noticias/
│   ├── el-nino/
│   ├── ferramentas/
│   ├── sobre.astro
│   ├── contato.astro
│   ├── politica-de-privacidade.astro
│   ├── termos-de-uso.astro
│   └── 404.astro
├── services/         # Camadas de serviço e APIs
│   ├── weather/
│   │   ├── api.ts
│   │   ├── types.ts
│   │   ├── wmo.ts
│   │   └── formatters.ts
│   └── tools/
│       ├── cep.ts
│       ├── cnpj.ts
│       ├── currency.ts
│       └── holidays.ts
├── styles/
│   └── global.css
└── utils/
    └── seo.ts
```

---

## 🌐 APIs Utilizadas

| API | Uso | Chave? | Custo |
|-----|-----|--------|-------|
| [Open-Meteo](https://open-meteo.com) | Previsão do tempo | ❌ Não | Gratuita |
| [Open-Meteo Geocoding](https://geocoding-api.open-meteo.com) | Busca de cidades | ❌ Não | Gratuita |
| [ViaCEP](https://viacep.com.br) | Consulta de CEP | ❌ Não | Gratuita |
| [BrasilAPI](https://brasilapi.com.br) | CNPJ e Feriados | ❌ Não | Gratuita |
| [AwesomeAPI](https://docs.awesomeapi.com.br) | Cotação de moedas | ❌ Não | Gratuita |

> **Nenhuma API exige chave privada no MVP.** Todas as integrações funcionam sem autenticação.

---

## 🔧 Variáveis de Ambiente

Veja `.env.example` para a lista completa. No MVP, nenhuma variável é obrigatória.

Para integrações futuras:

| Variável | Descrição |
|----------|-----------|
| `PUBLIC_GA_MEASUREMENT_ID` | ID do Google Analytics 4 |
| `PUBLIC_ADSENSE_CLIENT_ID` | ID do Google AdSense |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Verificação do Search Console |

---

## ☁️ Deploy

### Cloudflare Pages (Recomendado)

1. Conecte o repositório Git no [Cloudflare Pages](https://pages.cloudflare.com)
2. Configure:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. Deploy automático a cada push

### Outras opções

- **Vercel**: `npm run build` → `dist/`
- **Netlify**: `npm run build` → `dist/`
- **GitHub Pages**: Via GitHub Actions

---

## 🔍 SEO & Google Search Console

1. Acesse o [Google Search Console](https://search.google.com/search-console)
2. Adicione a propriedade do domínio
3. Insira o código de verificação em `PUBLIC_GOOGLE_SITE_VERIFICATION` no `.env`
4. Envie o sitemap: `https://seudominio.com.br/sitemap-index.xml`

---

## 💰 Google AdSense

O layout já possui espaços reservados para anúncios (`AdPlaceholder`). Para ativar:

1. Crie conta no [Google AdSense](https://www.google.com/adsense)
2. Insira o `ca-pub-XXXXXXXXXXXXXXXX` em `PUBLIC_ADSENSE_CLIENT_ID` no `.env`
3. Substitua os componentes `AdPlaceholder` pelos blocos de anúncio oficiais do AdSense

---

## 📋 Solução de Problemas

| Problema | Solução |
|----------|---------|
| Build falha com erro de TypeScript | Verifique se está usando Node.js >= 22.12 |
| APIs não respondem | As APIs públicas têm rate limiting; aguarde alguns segundos |
| Previsão mostra dados de fallback | Normal quando Open-Meteo está indisponível durante o build |
| Sitemap não gerado | Verifique se `site` está configurado em `astro.config.mjs` |

---

## 📜 Licença

Este projeto é proprietário. Todos os direitos reservados.

---

## 🙏 Créditos & Fontes de Dados

- **Open-Meteo** — Dados meteorológicos (CC BY 4.0)
- **INMET** — Instituto Nacional de Meteorologia
- **CPTEC/INPE** — Centro de Previsão de Tempo e Estudos Climáticos
- **ViaCEP** — Consulta de CEP dos Correios
- **BrasilAPI** — Dados públicos brasileiros
- **AwesomeAPI** — Cotações de moedas
