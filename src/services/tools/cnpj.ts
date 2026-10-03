export interface CnpjResult {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  situacaoCadastral: string;
  dataSituacaoCadastral: string;
  dataInicioAtividade: string;
  cnaePrincipal: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  naturezaJuridica: string;
  porte: string;
  capitalSocial: string;
}

export function cleanCnpj(cnpj: string): string {
  return cnpj.replace(/\D/g, '');
}

export function formatCnpj(cnpj: string): string {
  const digits = cleanCnpj(cnpj);
  if (digits.length !== 14) return cnpj;
  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

export async function fetchCnpj(rawCnpj: string): Promise<{ data?: CnpjResult; error?: string }> {
  const cnpj = cleanCnpj(rawCnpj);

  if (cnpj.length !== 14) {
    return { error: 'O CNPJ deve conter exatamente 14 números.' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });

    clearTimeout(timeoutId);

    if (response.status === 404) {
      return { error: 'CNPJ não encontrado na base pública da Receita Federal.' };
    }

    if (response.status === 429) {
      return { error: 'Limite temporário de requisições excedido. Aguarde alguns instantes e tente novamente.' };
    }

    if (!response.ok) {
      return { error: `Erro na consulta da empresa (Código ${response.status}).` };
    }

    const json = await response.json();

    const formattedCapital = json.capital_social
      ? Number(json.capital_social).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      : 'Não informado';

    return {
      data: {
        cnpj: formatCnpj(json.cnpj || cnpj),
        razaoSocial: json.razao_social || 'Não informada',
        nomeFantasia: json.nome_fantasia || 'Não informado',
        situacaoCadastral: json.descricao_situacao_cadastral || 'ATIVA',
        dataSituacaoCadastral: json.data_situacao_cadastral || '',
        dataInicioAtividade: json.data_inicio_atividade || '',
        cnaePrincipal: json.cnae_fiscal_descricao || 'Não informado',
        logradouro: json.logradouro || '',
        numero: json.numero || 'S/N',
        bairro: json.bairro || '',
        municipio: json.municipio || '',
        uf: json.uf || '',
        cep: json.cep || '',
        naturezaJuridica: json.natureza_juridica || 'Não informada',
        porte: json.porte || 'Não informado',
        capitalSocial: formattedCapital,
      },
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { error: 'Tempo limite da consulta excedido. Tente novamente.' };
    }
    return { error: 'Não foi possível conectar ao serviço de consulta de CNPJ no momento.' };
  }
}
