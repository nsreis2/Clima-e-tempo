export interface CepResult {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  ddd?: string;
  formattedAddress: string;
}

export function cleanCep(cep: string): string {
  return cep.replace(/\D/g, '');
}

export function formatCep(cep: string): string {
  const digits = cleanCep(cep);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
}

export async function fetchCep(rawCep: string): Promise<{ data?: CepResult; error?: string }> {
  const cep = cleanCep(rawCep);

  if (cep.length !== 8) {
    return { error: 'O CEP deve conter exatamente 8 dígitos numéricos.' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return { error: 'Não foi possível consultar o CEP no momento. Verifique sua conexão.' };
    }

    const json = await response.json();

    if (json.erro === true || json.erro === 'true') {
      return { error: 'CEP não encontrado na base de dados dos Correios.' };
    }

    const logradouro = json.logradouro || '';
    const bairro = json.bairro || '';
    const localidade = json.localidade || '';
    const uf = json.uf || '';

    const parts = [logradouro, bairro, `${localidade} - ${uf}`, `CEP ${json.cep || formatCep(cep)}`].filter(Boolean);

    return {
      data: {
        cep: json.cep || formatCep(cep),
        logradouro,
        complemento: json.complemento || '',
        bairro,
        localidade,
        uf,
        ibge: json.ibge,
        ddd: json.ddd,
        formattedAddress: parts.join(', '),
      },
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { error: 'Tempo limite da consulta excedido. Tente novamente.' };
    }
    return { error: 'Erro de comunicação ao consultar o serviço ViaCEP.' };
  }
}
