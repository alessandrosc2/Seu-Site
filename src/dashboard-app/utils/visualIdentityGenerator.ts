import { BusinessProject, VisualIdentity, BrandLogoColors } from '../types/project';

export interface ParsedGptPalette {
  primary?: string;
  secondary?: string;
  accent?: string;
  neutral?: string;
  text?: string;
  textSecondary?: string;
  border?: string;
  background?: string;
  backgroundSecondary?: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  rawFoundHexes: string[];
}

/**
 * Analisa e extrai códigos HEX da resposta fornecida pelo GPT/ChatGPT.
 * Segue rigorosamente a hierarquia de prioridades:
 * 1. CSS tokens explicitamente nomeados (:root --color-*)
 * 2. Campos semanticamente nomeados em português e inglês
 * 3. Tabelas Markdown e estruturas claramente identificadas
 * 4. Fallback sequencial SOMENTE quando não houver qualquer identificação semântica
 */
export function parsePaletteFromGptResponse(text: string): ParsedGptPalette {
  const result: ParsedGptPalette = {
    rawFoundHexes: []
  };

  if (!text) return result;

  // 1. Extração de Tokens CSS (:root { --color-primary: #...; })
  const cssPrimary = text.match(/--color-primary\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);
  const cssSecondary = text.match(/--color-secondary\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);
  const cssAccent = text.match(/--color-accent\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);
  const cssBackground = text.match(/--color-background\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);
  const cssBackgroundSecondary = text.match(/--color-background-secondary\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);
  const cssText = text.match(/--color-text\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);
  const cssTextSecondary = text.match(/--color-text-secondary\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);
  const cssBorder = text.match(/--color-border\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);
  const cssSuccess = text.match(/--color-success\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);
  const cssWarning = text.match(/--color-warning\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);
  const cssError = text.match(/--color-error\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);
  const cssInfo = text.match(/--color-info\s*:\s*(#[0-9A-Fa-f]{3,6})\b/i);

  if (cssPrimary) result.primary = normalizeHex(cssPrimary[1], '');
  if (cssSecondary) result.secondary = normalizeHex(cssSecondary[1], '');
  if (cssAccent) result.accent = normalizeHex(cssAccent[1], '');
  if (cssBackground) result.background = normalizeHex(cssBackground[1], '');
  if (cssBackgroundSecondary) result.backgroundSecondary = normalizeHex(cssBackgroundSecondary[1], '');
  if (cssText) result.text = normalizeHex(cssText[1], '');
  if (cssTextSecondary) result.textSecondary = normalizeHex(cssTextSecondary[1], '');
  if (cssBorder) result.border = normalizeHex(cssBorder[1], '');
  if (cssSuccess) result.success = normalizeHex(cssSuccess[1], '');
  if (cssWarning) result.warning = normalizeHex(cssWarning[1], '');
  if (cssError) result.error = normalizeHex(cssError[1], '');
  if (cssInfo) result.info = normalizeHex(cssInfo[1], '');

  // Helper para buscar HEX associado semanticamente por seções ou linhas
  const extractSemanticHex = (patterns: RegExp[]): string | undefined => {
    for (const pat of patterns) {
      // Formato Seção: "### [Nome]\n...HEX: #XXXXXX"
      const sectionMatch = text.match(new RegExp(`(?:###?\\s*${pat.source})[^\\n#]*\\n(?:[^\\n#]*\\n){0,5}?[^\\n]*?(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3})\\b`, 'i'));
      if (sectionMatch) return normalizeHex(sectionMatch[1], '');

      // Formato Chave-Valor: "[Nome]: #XXXXXX" ou "[Nome] - #XXXXXX" ou "[Nome] (HEX: #XXXXXX)"
      const kvMatch = text.match(new RegExp(`(?:^|[\\n\\*\\-\\•])\\s*${pat.source}\\s*(?:[:\\-=|]|\\s+HEX\\s*[:\\-=]?|\\s*\\([A-Za-z0-9\\s]*\\)?[:\\-=]?)\\s*(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3})\\b`, 'im'));
      if (kvMatch) return normalizeHex(kvMatch[1], '');

      // Formato Tabela Markdown: "| [Nome] | #XXXXXX |"
      const tableMatch = text.match(new RegExp(`\\|\\s*${pat.source}[^|\\n]*\\|\\s*(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3})\\b`, 'i'));
      if (tableMatch) return normalizeHex(tableMatch[1], '');
    }
    return undefined;
  };

  // 2. Extração semântica rotulada por seções, linhas e tabelas (PT e EN)
  if (!result.primary) {
    result.primary = extractSemanticHex([
      /Cor\s+Prim[aá]ria/i,
      /PRIMARY\b/i,
      /COR\s*1\b/i,
      /Cor\s+Principal/i,
      /Principal\b/i,
      /Primary\s+Color/i
    ]);
  }

  if (!result.secondary) {
    result.secondary = extractSemanticHex([
      /Cor\s+Secund[aá]ria/i,
      /SECONDARY\b/i,
      /COR\s*2\b/i,
      /Secund[aá]ria\b/i,
      /Secondary\s+Color/i
    ]);
  }

  if (!result.accent) {
    result.accent = extractSemanticHex([
      /Cor\s+de\s+Destaque/i,
      /ACCENT\b/i,
      /COR\s*3\b/i,
      /Destaque\b/i,
      /Realce\b/i,
      /Complementar\b/i,
      /Accent\s+Color/i
    ]);
  }

  if (!result.background) {
    result.background = extractSemanticHex([
      /Fundo\s+Principal/i,
      /BACKGROUND\b/i,
      /FUNDO\b/i,
      /Canvas\b/i,
      /Cor\s+do\s+Fundo/i,
      /Main\s+Background/i
    ]);
  }

  if (!result.backgroundSecondary) {
    result.backgroundSecondary = extractSemanticHex([
      /Fundo\s+Secund[aá]rio/i,
      /BACKGROUND_SECONDARY\b/i,
      /Superf[ií]cie\b/i,
      /Fundo\s+de\s+Apoio/i,
      /Cards?\s+e\s+Superf[ií]cie/i,
      /Secondary\s+Background/i,
      /Surface\b/i
    ]);
  }

  if (!result.text) {
    result.text = extractSemanticHex([
      /Texto\s+Principal/i,
      /TEXT_PRIMARY\b/i,
      /Cor\s+do\s+Texto/i,
      /T[ií]tulos?\b/i,
      /Primary\s+Text/i,
      /\bTEXT\b/i
    ]);
  }

  if (!result.textSecondary) {
    result.textSecondary = extractSemanticHex([
      /Texto\s+Secund[aá]rio/i,
      /TEXT_SECONDARY\b/i,
      /Subt[ií]tulos?\b/i,
      /Texto\s+Muted/i,
      /Par[aá]grafos?\b/i,
      /Secondary\s+Text/i
    ]);
  }

  if (!result.border) {
    result.border = extractSemanticHex([
      /Bordas?\s+e\s+Divisores?/i,
      /Bordas?\b/i,
      /BORDER\b/i,
      /Divisor(?:es)?\b/i,
      /Border\s+Color/i,
      /Linhas?\s+Divis[oó]rias?/i
    ]);
  }

  if (!result.success) {
    result.success = extractSemanticHex([
      /Sucesso\b/i,
      /SUCCESS\b/i,
      /Cor\s+de\s+Sucesso/i
    ]);
  }

  if (!result.warning) {
    result.warning = extractSemanticHex([
      /Aviso\b/i,
      /Alerta\b/i,
      /WARNING\b/i,
      /Cor\s+de\s+Aviso/i
    ]);
  }

  if (!result.error) {
    result.error = extractSemanticHex([
      /Erro\b/i,
      /Perigo\b/i,
      /ERROR\b/i,
      /Cor\s+de\s+Erro/i
    ]);
  }

  if (!result.info) {
    result.info = extractSemanticHex([
      /Informa[cç][aã]o\b/i,
      /INFO\b/i,
      /Cor\s+de\s+Informa[cç][aã]o/i
    ]);
  }

  // 3. Extrai todos os HEX válidos do texto completo
  const allHexMatches = text.match(/#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b/g) || [];
  const uniqueHexes = Array.from(new Set(allHexMatches.map(h => normalizeHex(h, h))));
  result.rawFoundHexes = uniqueHexes;

  // 4. Fallback sequencial: EXCLUSIVAMENTE quando nenhuma identificação semântica ou token foi encontrada
  const hasAnySemantic = Boolean(
    result.primary ||
    result.secondary ||
    result.accent ||
    result.background ||
    result.text ||
    result.border
  );

  if (!hasAnySemantic && uniqueHexes.length > 0) {
    // Apenas se o texto for uma lista desestruturada de HEX sem qualquer contexto semântico
    if (uniqueHexes[0]) result.primary = uniqueHexes[0];
    if (uniqueHexes[1]) result.secondary = uniqueHexes[1];
    if (uniqueHexes[2]) result.accent = uniqueHexes[2];
    if (uniqueHexes[3]) result.background = uniqueHexes[3];
    if (uniqueHexes[4]) result.backgroundSecondary = uniqueHexes[4];
    if (uniqueHexes[5]) result.text = uniqueHexes[5];
    if (uniqueHexes[6]) result.border = uniqueHexes[6];
  }

  // neutral mapeia para backgroundSecondary ou background se presente
  result.neutral = result.backgroundSecondary || result.background || (result.primary ? lightenDarken(result.primary, -80) : '#111B36');

  return result;
}

export interface ExtractedGptDetails {
  creativeConcept?: string;
  visualComposition?: string;
  colorDistribution?: string;
  headerDirection?: string;
  heroDirection?: string;
  cardDirection?: string;
  sectionDirection?: string;
  formDirection?: string;
  footerDirection?: string;
  designRules?: string[];
  avoidRules?: string[];
  cssTokens?: string;
}

/**
 * Extrai seções narrativas e diretrizes de design completas da resposta do GPT/Claude.
 */
export function parseGptVisualIdentityDetails(text: string): ExtractedGptDetails {
  const details: ExtractedGptDetails = {};
  if (!text) return details;

  // 1. Tokens CSS
  const cssMatch = text.match(/```css\s*([\s\S]*?:root[\s\S]*?})\s*```/i) || text.match(/(:root\s*\{[\s\S]*?\})/i);
  if (cssMatch) {
    details.cssTokens = cssMatch[1].trim();
  }

  // 2. Distribuição Visual (Seção 5)
  const distMatch = text.match(/##\s*5\.?\s*DISTRIBUIÇÃO\s+VISUAL[\s\S]*?\n([\s\S]*?)(?=\n##|\n---|$)/i);
  if (distMatch && distMatch[1].trim().length > 20) {
    details.colorDistribution = distMatch[1].trim();
  }

  // 3. Conceito Criativo / Direção visual em uma frase (Seção 9 ou Seção 1)
  const phraseMatch = text.match(/\*\*Direção\s+visual\s+em\s+uma\s+frase:?\*\*\s*([^\n\r]+)/i)
    || text.match(/Direção\s+visual\s+em\s+uma\s+frase:?\s*([^\n\r]+)/i);
  if (phraseMatch && phraseMatch[1].trim()) {
    details.creativeConcept = phraseMatch[1].trim();
  } else {
    const readingMatch = text.match(/##\s*1\.?\s*LEITURA\s+DA\s+IDENTIDADE[\s\S]*?\n([\s\S]*?)(?=\n##|\n---|$)/i);
    if (readingMatch && readingMatch[1].trim().length > 30) {
      const firstPara = readingMatch[1].trim().split('\n\n')[0].replace(/^[\*\-\•]\s*/, '').trim();
      if (firstPara.length > 20) {
        details.creativeConcept = firstPara.substring(0, 220);
      }
    }
  }

  // 4. Aplicação no Website (Seção 6)
  const extractApplication = (keyword: string): string | undefined => {
    const m = text.match(new RegExp(`(?:^|\\n)[\\*\\-\\•]?\\s*\\**${keyword}\\**:?\\s*([^\\n]+)`, 'i'));
    return m ? m[1].trim() : undefined;
  };

  const headerDir = extractApplication('Header');
  if (headerDir) details.headerDirection = headerDir;

  const heroDir = extractApplication('Hero');
  if (heroDir) details.heroDirection = heroDir;

  const cardDir = extractApplication('Cards?');
  if (cardDir) details.cardDirection = cardDir;

  const secDir = extractApplication('Seção\\s+de\\s+serviços') || extractApplication('Serviços');
  if (secDir) details.sectionDirection = secDir;

  const formDir = extractApplication('Formulários?');
  if (formDir) details.formDirection = formDir;

  const footerDir = extractApplication('Footer') || extractApplication('Rodapé');
  if (footerDir) details.footerDirection = footerDir;

  // 5. Regras de Uso: FAÇA (Seção 7)
  const facaMatch = text.match(/###?\s*FAÇA[\s\S]*?\n([\s\S]*?)(?=###?\s*EVITE|##|\n---|$)/i);
  if (facaMatch) {
    const lines = facaMatch[1]
      .split('\n')
      .map(l => l.replace(/^[\d+\.\)\*\-\•]\s*/, '').trim())
      .filter(l => l.length > 5 && !/^(5\s+regras|regras)/i.test(l));
    if (lines.length > 0) details.designRules = lines.slice(0, 6);
  }

  // 6. Regras de Uso: EVITE (Seção 7)
  const eviteMatch = text.match(/###?\s*EVITE[\s\S]*?\n([\s\S]*?)(?=##|\n---|$)/i);
  if (eviteMatch) {
    const lines = eviteMatch[1]
      .split('\n')
      .map(l => l.replace(/^[\d+\.\)\*\-\•]\s*/, '').trim())
      .filter(l => l.length > 5 && !/^(5\s+erros|erros)/i.test(l));
    if (lines.length > 0) details.avoidRules = lines.slice(0, 6);
  }

  return details;
}

/**
 * Gera o Prompt Especialista em Branding, UI/UX e Sistema de Cores para Websites Profissionais
 * rigorosamente baseado no template fornecido, preenchendo todos os dados de "Meu Projeto"
 * e das etapas anteriores da jornada.
 */
export function generateGptPalettePrompt(
  project: BusinessProject,
  options?: {
    userNotes?: string;
    attachLogoMode?: boolean;
    nicheOverride?: string;
  }
): string {
  // 1. Resolução dos dados dinâmicos do projeto
  const nome = project.name?.trim() || '[Nome da Empresa / Profissional]';
  const segmento = (options?.nicheOverride || project.segment || '').trim() || '[Segmento de Atuação]';
  
  // Cidade + Região / Bairro se disponíveis
  const localParts = [project.neighborhood, project.city, project.region].filter(Boolean);
  const cidade = localParts.length > 0 ? localParts.join(', ') : (project.city?.trim() || '[Cidade / Região]');

  const publico = project.targetAudience?.trim() || '[Público-alvo / Perfil dos Clientes]';
  const tom = project.communicationTone?.trim() || 'Profissional, acolhedor, transparente e direto';

  // Personalidade visual + estilo / posicionamento
  const personalidades: string[] = [];
  if (project.visualPersonality?.trim()) personalidades.push(project.visualPersonality.trim());
  if (project.visualPositioning?.trim()) personalidades.push(`Posicionamento: ${project.visualPositioning.trim()}`);
  if (project.visualStyle?.trim() && !project.visualPositioning?.toLowerCase().includes(project.visualStyle.toLowerCase())) {
    personalidades.push(`Estilo: ${project.visualStyle}`);
  }
  const personalidadeVisual = personalidades.length > 0 
    ? personalidades.join(' | ') 
    : '[A ser definida pelo Diretor de Arte a partir do segmento, público e tom de comunicação informados]';

  // Diferenciais
  let diferenciais = '[Diferenciais competitivos do negócio]';
  if (project.differentials && project.differentials.filter(Boolean).length > 0) {
    diferenciais = project.differentials.filter(Boolean).join('; ');
  }

  // Cores oficiais informadas pelo usuário
  let coresMarca = '';
  const brandColors = project.brandLogoColors;
  const hasCustomBrandColors = project.paletteSource === 'brand_logo' && brandColors?.primary;

  if (hasCustomBrandColors) {
    const list: string[] = [];
    if (brandColors?.primary) list.push(`Cor Principal: ${brandColors.primary}`);
    if (brandColors?.secondary) list.push(`Cor Secundária: ${brandColors.secondary}`);
    if (brandColors?.accent || brandColors?.complementary) list.push(`Cor de Destaque/Realce: ${brandColors.accent || brandColors.complementary}`);
    if (brandColors?.background || brandColors?.neutral) list.push(`Fundo/Superfície: ${brandColors.background || brandColors.neutral}`);
    if (brandColors?.text) list.push(`Texto: ${brandColors.text}`);
    if (brandColors?.border) list.push(`Borda: ${brandColors.border}`);
    coresMarca = list.join(' | ');
  } else if (project.primaryColor) {
    coresMarca = `Cor Principal: ${project.primaryColor}${project.secondaryColor ? ` | Cor Secundária: ${project.secondaryColor}` : ''}${project.accentColor ? ` | Destaque: ${project.accentColor}` : ''}`;
  }

  if (options?.attachLogoMode) {
    coresMarca = coresMarca 
      ? `${coresMarca} (IMPORTANTE: Estou anexando a imagem da logomarca oficial a esta mensagem. Analise visualmente a imagem para extrair com fidelidade as cores exatas).`
      : 'Estou anexando a imagem da logomarca oficial a esta mensagem. Analise visualmente a imagem para extrair com fidelidade as cores exatas da marca.';
  } else if (!coresMarca) {
    coresMarca = 'Nenhuma cor prévia informada. Crie um sistema de cores completo a partir do segmento, público, posicionamento e personalidade visual informados.';
  }

  if (options?.userNotes?.trim()) {
    coresMarca += ` (Observação do cliente: "${options.userNotes.trim()}")`;
  }

  // Cores específicas que o cliente gostaria de utilizar (campo opcional)
  const coresDesejadas = (project.desiredColors || '').trim();
  const linhaCoresDesejadas = coresDesejadas
    ? `\n\nCores específicas que você gostaria de utilizar (preferência opcional do cliente): "${coresDesejadas}"`
    : '';

  const secaoDiretrizCoresDesejadas = coresDesejadas
    ? `\n\nCOMPORTAMENTO PARA AS CORES ESPECÍFICAS INFORMADAS PELO CLIENTE:
O cliente indicou a seguinte preferência de cores: "${coresDesejadas}".
Analise essas cores em conjunto com: segmento, contexto do negócio, público-alvo, posicionamento, personalidade visual, estilo, logo, cores oficiais existentes e objetivo do website.
NÃO aplique simplesmente todas as cores sugeridas de forma automática.
Decida profissionalmente:
1. Quais cores devem ser preservadas;
2. Quais podem ser utilizadas como principais;
3. Quais funcionam melhor como secundárias;
4. Quais devem ser usadas apenas como destaque;
5. Quais precisam de uma variação para acessibilidade (WCAG AA);
6. Quais não são adequadas para determinadas aplicações da interface web;
7. Quais cores adicionais são necessárias para completar o sistema.
A preferência do usuário deve ser respeitada, mantendo o resultado técnico, profissional e equilibrado.`
    : '';

  // Template fiel e exato conforme solicitado pelo usuário
  return `Você é um diretor de arte, especialista em branding, UI/UX e sistemas de cores para websites profissionais.

Sua tarefa é analisar o negócio e a identidade visual fornecida e criar um SISTEMA DE CORES PROFISSIONAL para o website.

IMPORTANTE:

Não quero apenas uma paleta bonita.

Quero um sistema de cores que preserve a identidade da marca e funcione corretamente em uma interface web profissional.

HIERARQUIA DAS FONTES DE VERDADE (PRIORIDADE OBRIGATÓRIA):
1. Cores HEX explicitamente informadas pelo usuário (Cores Oficiais da Marca).
2. Cores identificadas na logo ou imagem oficial enviada.
3. Identidade visual já definida pelo usuário.
4. Personalidade visual, posicionamento, estilo, segmento e público.
5. Cores adicionais criadas pelo Diretor de Arte apenas quando necessárias para completar o sistema.

REGRA FUNDAMENTAL:
Nunca substitua automaticamente uma cor explicitamente informada pelo usuário por uma cor genérica associada ao nicho.
Se o usuário informou cores (ex.: Primary, Secondary, Accent), essas cores devem ser consideradas parte oficial da identidade fornecida pelo usuário.
A IA pode criar cores complementares quando necessário, mas deve deixar claro que são cores complementares criadas para o sistema de interface.

DIFERENCIAÇÃO ENTRE CORES DA MARCA E CORES FUNCIONAIS:
Diferencie com clareza:
- Cor oficial da marca;
- Cor complementar;
- Cor funcional de interface (fundo, superfícies, textos, bordas, estados);
- Variação de acessibilidade;
- Cor criada especificamente para determinado componente.

Não transforme uma variação criada para melhorar contraste em uma nova "cor oficial da marca".
A variação funcional pode ser utilizada em determinado botão, texto ou elemento de interface quando a cor original não atingir o contraste necessário (WCAG AA).
${secaoDiretrizCoresDesejadas}

ANALISE PRIMEIRO:

1. O segmento e o contexto do negócio.
2. O público-alvo.
3. O posicionamento da marca.
4. A personalidade visual desejada.
5. A logo ou imagem da marca enviada neste chat.
6. As cores existentes na marca, quando houver.
7. A relação entre as cores existentes e a utilização delas em um website.

Se uma logo ou imagem foi enviada, ANALISE VISUALMENTE ESSA IMAGEM antes de definir as cores.

NÃO substitua automaticamente as cores existentes da marca por cores genéricas associadas ao nicho.

Se as cores atuais forem adequadas, preserve-as.

Se forem necessárias cores adicionais, crie-as de forma harmoniosa com a identidade existente.

DADOS DO NEGÓCIO:

Nome: ${nome}

Segmento: ${segmento}

Cidade: ${cidade}

Público-alvo: ${publico}

Tom de comunicação: ${tom}

Personalidade visual: ${personalidadeVisual}

Diferenciais: ${diferenciais}

Cores informadas pelo usuário, caso existam: ${coresMarca}${linhaCoresDesejadas}

---

## 1. LEITURA DA IDENTIDADE

Explique brevemente:

* quais características visuais a marca transmite;
* quais cores são identificadas na logo;
* quais características dessas cores devem ser preservadas;
* quais oportunidades existem para transformar essa identidade em um sistema visual para website.

Não invente elementos que não estejam presentes na imagem ou nos dados fornecidos.

---

## 2. PALETA PRINCIPAL

Crie uma paleta profissional contendo:

### Cor Primária

* Nome da cor
* HEX
* Função no website
* Justificativa

### Cor Secundária

* Nome da cor
* HEX
* Função no website
* Justificativa

### Cor de Destaque

* Nome da cor
* HEX
* Função no website
* Justificativa

### Fundo Principal

* Nome da cor
* HEX
* Função no website

### Fundo Secundário

* Nome da cor
* HEX
* Função no website

### Texto Principal

* Nome da cor
* HEX
* Função no website

### Texto Secundário

* Nome da cor
* HEX
* Função no website

### Bordas e Divisores

* Nome da cor
* HEX
* Função no website

---

## 3. CORES FUNCIONAIS DA INTERFACE

Defina também, quando fizer sentido:

* Sucesso
* Aviso
* Erro
* Informação

Essas cores devem permanecer visualmente coerentes com a identidade da marca.

---

## 4. CONTRASTE E ACESSIBILIDADE

Analise as principais combinações de cores que serão utilizadas no website.

Verifique especialmente:

* texto sobre fundo;
* títulos sobre fundo;
* texto de botão;
* botão primário;
* botão secundário;
* links;
* elementos importantes da interface.

Sempre que uma cor da marca não apresentar contraste suficiente para determinado uso, NÃO descarte a cor.

Crie uma variação mais clara ou mais escura da própria cor para aquela aplicação.

Informe quais combinações são adequadas para:

* texto normal;
* texto grande;
* elementos de interface;
* fundos;
* botões.

Priorize pelo menos WCAG AA para texto normal, considerando contraste mínimo de 4,5:1.

---

## 5. DISTRIBUIÇÃO VISUAL

Defina como as cores devem ser distribuídas visualmente no website.

Explique:

* quais cores devem dominar;
* quais devem aparecer apenas como apoio;
* quais devem ser utilizadas com moderação;
* onde utilizar a cor de destaque;
* quais cores não devem ser utilizadas em excesso.

O objetivo é criar hierarquia visual e evitar que o website fique visualmente carregado.

---

## 6. APLICAÇÃO NO WEBSITE

Explique especificamente onde cada cor deve ser utilizada:

* Header
* Navegação
* Hero
* Títulos
* Textos
* Botão principal
* Botão secundário
* Links
* Cards
* Seção de serviços
* Seção sobre
* Depoimentos, se existirem
* FAQ
* Formulários
* Footer
* Elementos de destaque
* Estados de interação

Não invente seções que não façam sentido para o negócio. As recomendações devem ser adaptáveis à estrutura do website.

---

## 7. REGRAS DE USO

Crie:

### FAÇA

5 regras objetivas para utilização correta das cores.

### EVITE

5 erros que devem ser evitados.

---

## 8. TOKENS PARA DESENVOLVIMENTO

Ao final, entregue os principais tokens em formato CSS:

\`\`\`css
:root {
  --color-primary: #XXXXXX;
  --color-secondary: #XXXXXX;
  --color-accent: #XXXXXX;

  --color-background: #XXXXXX;
  --color-background-secondary: #XXXXXX;

  --color-text: #XXXXXX;
  --color-text-secondary: #XXXXXX;

  --color-border: #XXXXXX;

  --color-success: #XXXXXX;
  --color-warning: #XXXXXX;
  --color-error: #XXXXXX;
  --color-info: #XXXXXX;
}
\`\`\`

Os códigos HEX devem corresponder exatamente às cores recomendadas anteriormente.

---

## 9. RESUMO FINAL

Finalize com uma tabela:

| Cor | HEX | Função principal | Uso recomendado |
| --- | --- | ---------------- | --------------- |

Depois apresente:

**Direção visual em uma frase:**
Uma frase curta descrevendo como o sistema de cores deve fazer o website parecer.

IMPORTANTE:

Não crie uma identidade visual completamente diferente da marca existente.

O objetivo é transformar a identidade existente em um sistema profissional, coerente, funcional e adequado para website.

Se não houver logo ou cores existentes, desenvolva a direção cromática a partir do segmento, público, posicionamento e personalidade visual informados.`;
}

// Color utilities
function normalizeHex(hex: string, fallback: string): string {
  if (!hex) return fallback;
  let clean = hex.trim();
  if (!clean.startsWith('#')) clean = `#${clean}`;
  if (/^#[0-9A-Fa-f]{6}$/.test(clean)) return clean.toUpperCase();
  if (/^#[0-9A-Fa-f]{3}$/.test(clean)) {
    return `#${clean[1]}${clean[1]}${clean[2]}${clean[2]}${clean[3]}${clean[3]}`.toUpperCase();
  }
  return fallback;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const norm = normalizeHex(hex, '#000000');
  const num = parseInt(norm.replace('#', ''), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function getLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function lightenDarken(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r + amount, g + amount, b + amount);
}

// Generates complete, structured visual identity based on business project data
export function generateVisualIdentity(project: BusinessProject): VisualIdentity {
  const segment = (project.segment || '').toLowerCase();
  const name = project.name || 'Empresa';
  const positioning = project.visualPositioning || (project.visualStyle ? project.visualStyle.charAt(0).toUpperCase() + project.visualStyle.slice(1) : '');
  const personality = project.visualPersonality || '';
  const paletteSource = project.paletteSource || (project.brandLogoColors?.primary ? 'brand_logo' : 'custom');
  const referenceUrl = project.referenceUrl?.trim() || '';

  // Brand Logo Flow (Opção 2)
  if (paletteSource === 'brand_logo' && project.brandLogoColors?.primary) {
    const userAccent = project.brandLogoColors.accent || project.brandLogoColors.complementary;
    const rawPrimary = normalizeHex(project.brandLogoColors.primary, '#00D4E8');
    const rawSecondary = project.brandLogoColors.secondary ? normalizeHex(project.brandLogoColors.secondary, '') : '';
    const rawAccent = userAccent ? normalizeHex(userAccent, '') : '';
    const rawNeutral = normalizeHex(project.brandLogoColors.neutral || '', '#111B36');
    const rawText = normalizeHex(project.brandLogoColors.text || '', '#F5F7FF');

    const primaryLum = getLuminance(rawPrimary);
    const isLightBrand = primaryLum > 0.4;

    const userBg = project.brandLogoColors?.background;
    const userBgSec = project.brandLogoColors?.backgroundSecondary;
    const userNeutral = project.brandLogoColors?.neutral;
    const userText = project.brandLogoColors?.text;
    const userTextSec = project.brandLogoColors?.textSecondary;
    const userBorder = project.brandLogoColors?.border;
    const userSuccess = project.brandLogoColors?.success;
    const userWarning = project.brandLogoColors?.warning;
    const userError = project.brandLogoColors?.error;
    const userInfo = project.brandLogoColors?.info;

    // Detect if the brand/user specified a light or dark background
    let isLightBackground = false;
    if (userBg) {
      isLightBackground = getLuminance(normalizeHex(userBg, '#FFFFFF')) > 0.45;
    } else if (userNeutral && getLuminance(normalizeHex(userNeutral, '#111B36')) > 0.6) {
      isLightBackground = true;
    } else if (userText && getLuminance(normalizeHex(userText, '#F5F7FF')) < 0.35) {
      isLightBackground = true;
    }

    const background = userBg 
      ? normalizeHex(userBg, isLightBackground ? '#FFFFFF' : '#0B0F19') 
      : (isLightBackground ? '#FFFFFF' : '#0B0F19');
    
    const backgroundSecondary = userBgSec
      ? normalizeHex(userBgSec, isLightBackground ? '#F8FAFC' : '#131A26')
      : (userNeutral && normalizeHex(userNeutral, '') !== background 
          ? normalizeHex(userNeutral, isLightBackground ? '#F8FAFC' : '#131A26') 
          : (isLightBackground ? '#F1F5F9' : lightenDarken(background, 12)));

    const primary = rawPrimary;
    const secondary = rawSecondary || (isLightBackground ? lightenDarken(rawPrimary, -30) : lightenDarken(rawPrimary, 25));
    const accent = rawAccent || (isLightBrand ? (isLightBackground ? rawPrimary : '#38BDF8') : rawPrimary);
    
    const textPrimary = userText && (isLightBackground ? getLuminance(userText) < 0.55 : getLuminance(userText) > 0.45)
      ? normalizeHex(userText, isLightBackground ? '#0F172A' : '#F8FAFC')
      : (isLightBackground ? '#0F172A' : '#F8FAFC');

    const textSecondary = userTextSec 
      ? normalizeHex(userTextSec, isLightBackground ? '#475569' : '#94A3B8')
      : (isLightBackground ? '#475569' : '#94A3B8');

    const border = userBorder 
      ? normalizeHex(userBorder, isLightBackground ? '#E2E8F0' : '#232D3F')
      : (isLightBackground ? '#E2E8F0' : lightenDarken(background, 28));

    const ctaPrimary = rawPrimary;
    const ctaPrimaryHover = isLightBrand ? lightenDarken(rawPrimary, -25) : lightenDarken(rawPrimary, 30);
    const ctaSecondary = 'transparent';
    const ctaSecondaryHover = backgroundSecondary;

    const link = accent;
    const linkHover = lightenDarken(accent, 20);

    const success = userSuccess || (isLightBackground ? '#16A34A' : '#22C55E');
    const warning = userWarning || (isLightBackground ? '#D97706' : '#F59E0B');
    const error = userError || (isLightBackground ? '#DC2626' : '#EF4444');
    const info = userInfo || (isLightBackground ? '#2563EB' : '#3B82F6');

    const distribution = `Distribuição balanceada baseada nas cores oficiais da marca ${name}:
- 60% Fundo (${background}): Garante legibilidade absoluta e contraste WCAG AA para leitura relaxada.
- 30% Superfícies & Cartões (${backgroundSecondary}): Estrutura os blocos de conteúdo e serviços com separadores sutis em ${border}.
- 10% Ação e Destaque (${ctaPrimary} e ${accent}): Reservado com exclusividade para botões de conversão e elementos interativos.`;

    const avoidRules = [
      'NÃO aplicar as cores da logo desordenadamente como fundos gigantes ou em textos longos sem contraste.',
      'NÃO substituir as cores fornecidas da marca por paletas genéricas de IA ou tons padrão de biblioteca.',
      'NÃO utilizar azul/roxo genérico de SaaS no lugar da identidade oficial da marca.'
    ];

    const designRules = [
      `Manter a cor primária da marca (${primary}) como ponto focal de identidade e nos botões de conversão.`,
      `Respeitar a hierarquia dos tokens CSS oficiais definidos na folha de estilo.`,
      'Utilizar espaçamento generoso (padding de 80px a 120px em seções no desktop e 48px a 64px no mobile).',
      'Assegurar contraste de texto superior a 4.5:1 em todos os elementos informativos.'
    ];

    const typographyDirection = `Personalidade tipográfica: Moderna, limpa e de alta precisão.
Títulos (H1 e H2): Fonte Sans-serif geométrica com peso 700/800 (sugestão: Plus Jakarta Sans ou Inter) para autoridade instantânea.
Corpo de texto: Sans-serif neutra com peso 400/500, line-height 1.6 e espaçamento relaxado.
Hierarquia recomendada: H1 (36px a 48px desktop / 28px mobile), H2 (24px a 32px), H3 (18px a 20px), Corpo (15px a 16px).`;

    const photographyDirection = `Estilo fotográfico: Fotos comerciais de alta resolução, iluminação natural direcional sem superexposição.
Composição: Enquadramentos limpos com profundidade de campo suave (bokeh), destacando os profissionais em ação ou produtos com nitidez.
Pessoas: Postura autêntica, sorriso acolhedor e vestimenta alinhada ao segmento ${project.segment || 'do negócio'}.
Harmonia cromática: As fotografias devem dialogar com a tonalidade da marca (${primary}), evitando filtros vintage artificiais ou dessaturação excessiva.`;

    const cssTokens = `:root {
  --color-primary: ${primary};
  --color-secondary: ${secondary};
  --color-accent: ${accent};

  --color-background: ${background};
  --color-background-secondary: ${backgroundSecondary};

  --color-text: ${textPrimary};
  --color-text-secondary: ${textSecondary};
  --color-border: ${border};

  --color-button-primary: ${ctaPrimary};
  --color-button-primary-hover: ${ctaPrimaryHover};

  --color-button-secondary: ${ctaSecondary};
  --color-button-secondary-hover: ${ctaSecondaryHover};

  --color-link: ${link};
  --color-link-hover: ${linkHover};

  --color-success: ${success};
  --color-warning: ${warning};
  --color-error: ${error};
  --color-info: ${info};
}`;

    const creativeConcept = `Expressão digital autêntica para ${name} no segmento de ${project.segment || 'serviços'}, equilibrando autoridade profissional, acolhimento e clareza de conversão.`;
    const visualComposition = isLightBackground
      ? 'Composição clara, arejada e estruturada com amplos espaços negativos, superfícies suaves e tipografia em alto contraste.'
      : 'Composição profunda, envolvente e sofisticada com superfícies escuras texturizadas e destaques luminosos.';
    const motionPhilosophy = 'Framer Motion com coreografia em 3 níveis (microinterações táteis nos botões, transições suaves entre seções e entradas expressivas no Hero e nos serviços). Respeito total a prefers-reduced-motion.';
    const rhythmDensity = 'Ritmo equilibrado e contínuo durante o scroll, alternando entre grandes momentos visuais e blocos informativos objetivos.';

    const vi: VisualIdentity = {
      visualPositioning: positioning,
      visualPersonality: personality,
      paletteSource: 'brand_logo',
      brandLogoColors: {
        primary: rawPrimary,
        secondary: rawSecondary,
        complementary: project.brandLogoColors.complementary || rawAccent,
        neutral: rawNeutral,
        text: rawText,
        accent: rawAccent,
        background,
        backgroundSecondary,
        textSecondary,
        border,
        success,
        warning,
        error,
        info
      },
      primary,
      secondary,
      accent,
      background,
      backgroundSecondary,
      textPrimary,
      textSecondary,
      border,
      ctaPrimary,
      ctaPrimaryHover,
      ctaSecondary,
      ctaSecondaryHover,
      link,
      linkHover,
      success,
      warning,
      error,
      info,
      colorDistribution: distribution,
      headerDirection: isLightBackground
        ? `Fundo semi-transparente em ${backgroundSecondary} com backdrop-blur, borda inferior sutil em ${border}, logotipo oficial à esquerda e botão de contato com contraste em ${ctaPrimary}.`
        : `Fundo semi-transparente em ${backgroundSecondary} com backdrop-blur, borda inferior em ${border}, logotipo oficial à esquerda e botão de contato em ${ctaPrimary}.`,
      heroDirection: `Fundo em ${background}, headline em ${textPrimary}, subheadline em ${textSecondary} e botão de conversão em ${ctaPrimary} com contraste WCAG AA testado.`,
      typographyDirection,
      photographyDirection,
      imageDirection: `Imagens com cantos arredondados (rounded-2xl), borda sutil de 1px em ${border} e leve sombra para profundidade.`,
      iconDirection: `Ícones Lucide React com traço fino de 1.75px em ${accent} dentro de badges com fundo sutil.`,
      cardDirection: `Cards em ${backgroundSecondary} com borda de 1px em ${border}, cantos arredondados e padding confortável de 24px.`,
      sectionDirection: `Alternância suave entre ${background} e ${backgroundSecondary} para criar ritmo dinâmico na rolagem.`,
      formDirection: `Inputs com fundo de superfície, texto nítido em ${textPrimary} e anel de foco em ${accent}.`,
      footerDirection: `Rodapé em ${backgroundSecondary} com divisores em ${border}, informações de contato completas e copyright.`,
      creativeConcept,
      visualComposition,
      motionPhilosophy,
      rhythmDensity,
      designRules,
      avoidRules,
      cssTokens,
      desiredColors: project.desiredColors?.trim() || undefined,
      referenceUrl,
      generatedPrompt: ''
    };

    if (project.gptPaletteResponse) {
      const gptDetails = parseGptVisualIdentityDetails(project.gptPaletteResponse);
      if (gptDetails.colorDistribution) vi.colorDistribution = gptDetails.colorDistribution;
      if (gptDetails.creativeConcept) vi.creativeConcept = gptDetails.creativeConcept;
      if (gptDetails.headerDirection) vi.headerDirection = gptDetails.headerDirection;
      if (gptDetails.heroDirection) vi.heroDirection = gptDetails.heroDirection;
      if (gptDetails.cardDirection) vi.cardDirection = gptDetails.cardDirection;
      if (gptDetails.sectionDirection) vi.sectionDirection = gptDetails.sectionDirection;
      if (gptDetails.formDirection) vi.formDirection = gptDetails.formDirection;
      if (gptDetails.footerDirection) vi.footerDirection = gptDetails.footerDirection;
      if (gptDetails.designRules && gptDetails.designRules.length > 0) vi.designRules = gptDetails.designRules;
      if (gptDetails.avoidRules && gptDetails.avoidRules.length > 0) vi.avoidRules = gptDetails.avoidRules;
      if (gptDetails.cssTokens) vi.cssTokens = gptDetails.cssTokens;
    }

    vi.generatedPrompt = formatVisualIdentityPrompt(vi, project);
    return vi;
  }

  // Automatic Custom Palette Flow (Opção 1)
  // Intelligent niche & positioning analysis
  let primary = '#00D4E8';
  let secondary = '#1769FF';
  let accent = '#38BDF8';
  let background = '#080D20';
  let backgroundSecondary = '#111B36';
  let textPrimary = '#F5F7FF';
  let textSecondary = '#94A3B8';
  let border = '#203252';
  let ctaPrimary = '#00D4E8';
  let ctaPrimaryHover = '#00B8CC';

  let customAvoid: string[] = [];
  let customPhoto = '';
  let customTypo = '';

  const isBarber = segment.includes('barbearia') || segment.includes('barber') || segment.includes('barba') || segment.includes('cabelo');
  const isHealth = segment.includes('saúde') || segment.includes('saude') || segment.includes('médic') || segment.includes('clinic') || segment.includes('fisioterap') || segment.includes('psicol') || segment.includes('odonto') || segment.includes('estétic');
  const isLaw = segment.includes('advoc') || segment.includes('jurídic') || segment.includes('direito') || segment.includes('contabil') || segment.includes('consultor');
  const isFood = segment.includes('restaurante') || segment.includes('gastronom') || segment.includes('café') || segment.includes('lanche') || segment.includes('pizz');
  const isConst = segment.includes('engenhar') || segment.includes('arquitet') || segment.includes('reforma') || segment.includes('marcenar');

  if (isBarber) {
    // Barbearia Real / Barbearia Elegante
    background = '#0B0F17';
    backgroundSecondary = '#131A26';
    primary = '#C5A880'; // Warm Bronze / Âmbar Nobre
    secondary = '#8C6D46';
    accent = '#D8C29D';
    textPrimary = '#F8FAFC';
    textSecondary = '#94A3B8';
    border = '#232D3F';
    ctaPrimary = '#C5A880';
    ctaPrimaryHover = '#B3946B';

    customAvoid = [
      'NÃO utilizar clichês retrô desgastados como caveiras, navalhas ensanguentadas, bigodes caricatos ou textura de madeira rústica escura suja.',
      'NÃO utilizar preto 100% puro (#000000 chapado) nem dourado cintilante cafona.',
      'NÃO aplicar azul neon ou ciano padrão de software/SaaS.'
    ];

    customPhoto = `Direção Fotográfica Específica para Barbearia:
- Fotos reais com iluminação direcional suave valorizando o acabamento da lâmina e a tesoura.
- Barbeiro com vestimenta profissional alinhada, avental de corte impecável e postura concentrada.
- Ambiente limpo, espelhos bem iluminados e produtos de grooming organizados.
- Enquadramentos de meio-corpo e closes nos detalhes da barba e degradê, com fundo desfocado.`;

    customTypo = `Direção Tipográfica para Barbearia:
- Títulos: Fonte contemporânea com presença firme e autoridade (ex: Plus Jakarta Sans / Montserrat / Oswald com tracking refinado).
- Textos: Sans-serif geométrica limpa (Inter) com entrelinha confortável.
- Sensação: Masculinidade refinada, precisão técnica e cuidado estético sem excessos.`;

  } else if (isHealth) {
    background = '#081520';
    backgroundSecondary = '#0E2233';
    primary = '#00C2CB'; // Turquesa / Teal Clínico
    secondary = '#0284C7';
    accent = '#34D399';
    textPrimary = '#F0FDF4';
    textSecondary = '#93C5FD';
    border = '#1B3B54';
    ctaPrimary = '#00C2CB';
    ctaPrimaryHover = '#00A3AB';

    customAvoid = [
      'NÃO utilizar modelos de banco de imagens genéricos apontando para pranchetas.',
      'NÃO utilizar verde hospitalar desbotado ou vermelho alarmante em botões.',
      'NÃO poluir a tela com ilustrações 3D infantis de dentes ou órgãos.'
    ];

    customPhoto = `Direção Fotográfica para Saúde e Bem-Estar:
- Luz natural suave do dia, transmitindo acolhimento, biossegurança e higiene.
- Profissional em atendimento humanizado, olhando nos olhos do paciente com sorriso genuíno.
- Consultório organizado, claro e acolhedor, valorizando a infraestrutura moderna.`;

    customTypo = `Direção Tipográfica para Saúde:
- Títulos e textos em sans-serif humanista (ex: Plus Jakarta Sans ou Manrope).
- Traços arredondados e amigáveis, transmitindo segurança, serenidade e cuidado.`;

  } else if (isLaw) {
    background = '#0A0F1D';
    backgroundSecondary = '#121B30';
    primary = '#38BDF8';
    secondary = '#1E40AF';
    accent = '#C9A227'; // Ouro mate sóbrio
    textPrimary = '#F8FAFC';
    textSecondary = '#94A3B8';
    border = '#1E2D4A';
    ctaPrimary = '#38BDF8';
    ctaPrimaryHover = '#0284C7';

    customAvoid = [
      'NÃO utilizar martelos de juiz de madeira ou balanças douradas cintilantes.',
      'NÃO utilizar fundo de estante de livros antigos com capa de couro empoeirada.',
      'NÃO utilizar texto em cinza escuro sobre fundo preto gerando ilegibilidade.'
    ];

    customPhoto = `Direção Fotográfica Corporativa e Jurídica:
- Fotos em escritório corporativo moderno com luz natural e profundidade suave.
- Advogado/consultor com traje alinhado, expressão de seriedade empática e segurança.`;

    customTypo = `Direção Tipográfica Corporativa:
- Títulos com tipografia sóbria e refinada (Inter ou combinação com serifada clássica como Playfair Display / Cormorant para detalhes).
- Corpo em sans-serif de alta legibilidade técnica.`;

  } else if (isFood) {
    background = '#140F0D';
    backgroundSecondary = '#221915';
    primary = '#E07A5F'; // Terracota / Âmbar Quente
    secondary = '#F4A261';
    accent = '#E76F51';
    textPrimary = '#FFF7ED';
    textSecondary = '#FED7AA';
    border = '#3D2A22';
    ctaPrimary = '#E07A5F';
    ctaPrimaryHover = '#C9654C';

    customAvoid = [
      'NÃO utilizar amarelo berrante e vermelho estridente estilo fast-food infantil.',
      'NÃO usar fotos de banco de comida com brilho de plástico artificial.'
    ];

    customPhoto = `Direção Fotográfica Gastronômica:
- Luz quente direcional destacando texturas reais dos pratos preparados.
- Foco em vapor, crocância e ingredientes frescos.`;

    customTypo = `Direção Tipográfica Gastronômica:
- Títulos calorosos e convidativos (ex: Plus Jakarta Sans / Fraunces suave).`;

  } else {
    // Default tailored to positioning
    if (positioning.toLowerCase().includes('elegante') || positioning.toLowerCase().includes('sofisticado') || positioning.toLowerCase().includes('premium')) {
      background = '#090D16';
      backgroundSecondary = '#111726';
      primary = '#C5A880'; // Bronze refinado
      secondary = '#60A5FA';
      accent = '#E2D9C8';
      textPrimary = '#F8FAFC';
      textSecondary = '#94A3B8';
      border = '#1F293D';
      ctaPrimary = '#C5A880';
      ctaPrimaryHover = '#B3946B';
    } else if (positioning.toLowerCase().includes('acolhedor') || positioning.toLowerCase().includes('artesanal')) {
      background = '#0C1615';
      backgroundSecondary = '#142422';
      primary = '#34D399';
      secondary = '#10B981';
      accent = '#6EE7B7';
      textPrimary = '#F0FDF4';
      textSecondary = '#A7F3D0';
      border = '#1E3B36';
      ctaPrimary = '#34D399';
      ctaPrimaryHover = '#10B981';
    }
  }

  const ctaSecondary = 'transparent';
  const ctaSecondaryHover = backgroundSecondary;
  const link = primary;
  const linkHover = lightenDarken(primary, 25);

  const distribution = `Distribuição cromática personalizada para o nicho de ${project.segment || 'serviços'}:
- 60% Fundo (${background}): Fundo escuro imersivo que destaca os conteúdos e elimina cansaço visual.
- 30% Estrutura dos Cards e Seções (${backgroundSecondary}): Caixas de serviços, diferenciais e depoimentos com borda sutil em ${border}.
- 10% Ação Principal e Conversão (${ctaPrimary}): Exclusivo para os botões de contato no WhatsApp, garantindo taxa de clique máxima.
- Acentos (${accent}): Ícones técnicos e badges de destaque que conduzem o olhar na rolagem.`;

  const designRules = [
    `Utilizar exclusivamente a paleta cromática definida (${primary}, ${secondary}, ${accent}, ${background}, ${backgroundSecondary}).`,
    `Manter a cor de ação (${ctaPrimary}) em todos os botões que levam para o WhatsApp comercial.`,
    'Preservar espaçamento vertical amplo entre seções (mínimo de 80px no desktop e 48px no mobile).',
    'Garantir contraste de texto superior a 4.5:1 (WCAG AA) em qualquer resolução de tela.',
    'Nunca criar um visual genérico de template; todos os componentes devem refletir a personalidade do negócio.'
  ];

  const defaultAvoid = [
    'NÃO utilizar as cores padrão de dashboards ou ferramentas de IA (como azul/ciano genérico ou roxo neon).',
    'NÃO usar gradientes coloridos multicoloridos de baixa legibilidade.',
    'NÃO usar ilustrações abstratas sem sentido para o público do negócio.',
    'NÃO misturar mais de 2 famílias tipográficas na mesma página.'
  ];

  const avoidRules = customAvoid.length > 0 ? [...customAvoid, ...defaultAvoid] : defaultAvoid;

  const typographyDirection = customTypo || `Personalidade tipográfica: ${positioning} e altamente legível.
Títulos (H1 e H2): Sans-serif moderna e com peso destacado (ex: Plus Jakarta Sans / Inter).
Corpo e parágrafos: Fonte limpa e espaçada para facilitar leitura rápida em smartphones.
Hierarquia: H1 (40px desktop / 28px mobile), H2 (28px / 22px), Corpo (16px / 15px).`;

  const photographyDirection = customPhoto || `Direção Fotográfica para ${project.segment || 'o negócio'}:
- Fotos reais de alta qualidade com iluminação natural.
- Profissionais em atendimento real, gerando conexão humana e confiança imediata.
- Espaço físico limpo, contemporâneo e organizado.
- Sem filtros artificiais ou saturação excessiva.`;

  const cssTokens = `:root {
  --color-primary: ${primary};
  --color-secondary: ${secondary};
  --color-accent: ${accent};

  --color-background: ${background};
  --color-background-secondary: ${backgroundSecondary};

  --color-text: ${textPrimary};
  --color-text-secondary: ${textSecondary};
  --color-border: ${border};

  --color-button-primary: ${ctaPrimary};
  --color-button-primary-hover: ${ctaPrimaryHover};

  --color-button-secondary: ${ctaSecondary};
  --color-button-secondary-hover: ${ctaSecondaryHover};

  --color-link: ${link};
  --color-link-hover: ${linkHover};

  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
}`;

  const vi: VisualIdentity = {
    visualPositioning: positioning,
    visualPersonality: personality,
    paletteSource: 'custom',
    primary,
    secondary,
    accent,
    background,
    backgroundSecondary,
    textPrimary,
    textSecondary,
    border,
    ctaPrimary,
    ctaPrimaryHover,
    ctaSecondary,
    ctaSecondaryHover,
    link,
    linkHover,
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    colorDistribution: distribution,
    headerDirection: `Header fixo com fundo em ${backgroundSecondary} e efeito backdrop-blur, borda inferior fina em ${border}, logo da ${name} à esquerda e botão de ação em ${ctaPrimary}.`,
    heroDirection: `Hero Section marcante em ${background}, títulos em ${textPrimary}, subtítulo em ${textSecondary} e botão CTA em ${ctaPrimary}.`,
    typographyDirection,
    photographyDirection,
    imageDirection: `Imagens e fotografias com cantos arredondados (rounded-2xl) e borda de 1px em ${border}.`,
    iconDirection: `Ícones Lucide em traço fino na cor ${accent} com fundo suave.`,
    cardDirection: `Cards em ${backgroundSecondary} com borda sutil em ${border} e cantos arredondados (rounded-xl).`,
    sectionDirection: `Alternância elegante entre blocos em ${background} e blocos em ${backgroundSecondary}.`,
    formDirection: `Campos de entrada com fundo escurecido e anel de foco em ${accent}.`,
    footerDirection: `Rodapé completo em ${backgroundSecondary} com links de navegação e WhatsApp.`,
    designRules,
    avoidRules,
    cssTokens,
    desiredColors: project.desiredColors?.trim() || undefined,
    referenceUrl,
    generatedPrompt: ''
  };

  if (project.gptPaletteResponse) {
    const gptDetails = parseGptVisualIdentityDetails(project.gptPaletteResponse);
    if (gptDetails.colorDistribution) vi.colorDistribution = gptDetails.colorDistribution;
    if (gptDetails.creativeConcept) vi.creativeConcept = gptDetails.creativeConcept;
    if (gptDetails.headerDirection) vi.headerDirection = gptDetails.headerDirection;
    if (gptDetails.heroDirection) vi.heroDirection = gptDetails.heroDirection;
    if (gptDetails.cardDirection) vi.cardDirection = gptDetails.cardDirection;
    if (gptDetails.sectionDirection) vi.sectionDirection = gptDetails.sectionDirection;
    if (gptDetails.formDirection) vi.formDirection = gptDetails.formDirection;
    if (gptDetails.footerDirection) vi.footerDirection = gptDetails.footerDirection;
    if (gptDetails.designRules && gptDetails.designRules.length > 0) vi.designRules = gptDetails.designRules;
    if (gptDetails.avoidRules && gptDetails.avoidRules.length > 0) vi.avoidRules = gptDetails.avoidRules;
    if (gptDetails.cssTokens) vi.cssTokens = gptDetails.cssTokens;
  }

  vi.generatedPrompt = formatVisualIdentityPrompt(vi, project);
  return vi;
}

// Generates the standalone "Prompt de Direção Visual" exactly as requested in Section 18
export function formatVisualIdentityPrompt(vi: VisualIdentity, project: BusinessProject): string {
  const referenceBlock = vi.referenceUrl
    ? `\nSITE DE REFERÊNCIA ESTÉTICA:\n${vi.referenceUrl}\n(AVISO OBRIGATÓRIO: Use o site somente como referência estética. Não copie sua identidade visual, layout, textos, imagens, logotipo ou combinação exata de cores.)\n`
    : '';

  return `DIREÇÃO VISUAL PARA O SITE

Nicho:
${project.segment || 'Serviços Profissionais'}

Posicionamento visual:
${vi.visualPositioning}

Personalidade visual:
${vi.visualPersonality}
${referenceBlock}
PALETA DE CORES

Primary: ${vi.primary}
Secondary: ${vi.secondary}
Accent: ${vi.accent}
Background: ${vi.background}
Background Secondary: ${vi.backgroundSecondary}
Text Primary: ${vi.textPrimary}
Text Secondary: ${vi.textSecondary}
Border: ${vi.border}

Interface:
CTA Primary: ${vi.ctaPrimary}
CTA Primary Hover: ${vi.ctaPrimaryHover}
CTA Secondary: ${vi.ctaSecondary}
CTA Secondary Hover: ${vi.ctaSecondaryHover}
Link: ${vi.link}
Link Hover: ${vi.linkHover}
Success: ${vi.success}
Warning: ${vi.warning}
Error: ${vi.error}
Info: ${vi.info}

DISTRIBUIÇÃO DAS CORES

${vi.colorDistribution}

APLICAÇÃO NO SITE

Header:
${vi.headerDirection}

Hero:
${vi.heroDirection}

Títulos:
Utilize ${vi.textPrimary} com peso bold/extrabold e tracking refinado para Headlines H1 e H2.

Textos:
Utilize ${vi.textSecondary} para parágrafos, descrições e itens informativos com line-height 1.6.

CTAs:
Utilize ${vi.ctaPrimary} com texto de alto contraste para o botão principal de conversão no WhatsApp.

Botões:
Botões principais em ${vi.ctaPrimary}; botões secundários em formato outline com borda em ${vi.border}.

Cards:
${vi.cardDirection}

Seções:
${vi.sectionDirection}

Formulários:
${vi.formDirection}

Imagens:
${vi.imageDirection}

Ícones:
${vi.iconDirection}

Footer:
${vi.footerDirection}

DIREÇÃO FOTOGRÁFICA

${vi.photographyDirection}

DIREÇÃO TIPOGRÁFICA

${vi.typographyDirection}

REGRAS DE DESIGN

${vi.designRules.map(r => `- ${r}`).join('\n')}

EVITAR

${vi.avoidRules.map(a => `- ${a}`).join('\n')}

TOKENS CSS

${vi.cssTokens}

INSTRUÇÃO FINAL

Aplique integralmente esta direção visual na criação do site.

Esta direção visual é específica para o negócio informado.

Não substitua esta identidade visual pela identidade visual do aplicativo, dashboard, ferramenta ou ambiente utilizado para gerar o site.

Não utilize automaticamente cores, gradientes, componentes ou estilos da ferramenta de IA que estiver criando o site.

Não substitua a paleta por uma paleta genérica do nicho.

Mantenha consistência entre todas as seções, componentes, botões, imagens, tipografia e elementos de interface.

A identidade visual deve parecer criada especificamente para este negócio.`;
}

// Helper to sanitize single approved headline from multiple options
export function sanitizeSingleHeadline(input?: string, businessName?: string, businessSegment?: string): string {
  if (!input || !input.trim()) {
    return businessName 
      ? `Excelência e Precisão em ${businessSegment || 'Serviços Especializados'}`
      : 'Apresentação Profissional de Alto Padrão';
  }

  const lines = input
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0 && !/^#+\s*/.test(l) && !/^headline\s*principal/i.test(l));

  if (lines.length === 0) {
    return businessName 
      ? `Excelência e Precisão em ${businessSegment || 'Serviços Especializados'}`
      : 'Apresentação Profissional de Alto Padrão';
  }

  // Find the first option line
  let chosen = lines[0];

  // If the first line is just a label like "Opções de Headline:", take the next line
  if (/^(opções|opção|headlines|opcoes)/i.test(chosen) && lines.length > 1) {
    chosen = lines[1];
  }

  // Remove leading numbering or option angle prefixes:
  // e.g. "1. Foco na Solução do Problema Principal: Barbearia Clássica..."
  // or "1. Opção 1: Barbearia Clássica..."
  // or "Opção 1 - Barbearia Clássica..."
  chosen = chosen.replace(/^(?:\d+[\.\)\-]\s*)?(?:opção\s*\d+[:\-]?\s*)?(?:foco\s+[^:\-]+[:\-]\s*)?/i, '');
  chosen = chosen.replace(/^(?:headline\s*(?:principal)?\s*\d*[:\-]?\s*)/i, '');
  chosen = chosen.replace(/^[\*\-\•]\s*/, '');
  // Remove surrounding quotes
  chosen = chosen.replace(/^["'“](.*)["'”]$/, '$1');
  chosen = chosen.trim();

  // If after cleaning it's too short or empty, fallback
  if (chosen.length < 3) {
    return businessName 
      ? `Excelência e Precisão em ${businessSegment || 'Serviços Especializados'}`
      : 'Apresentação Profissional de Alto Padrão';
  }

  return chosen;
}

// Helper to sanitize single approved subheadline
export function sanitizeSingleSubheadline(input?: string, city?: string): string {
  if (!input || !input.trim()) {
    return `Atendimento de excelência em ${city || 'sua região'}. Agende seu horário ou tire suas dúvidas diretamente pelo WhatsApp comercial.`;
  }

  const lines = input
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0 && !/^#+\s*/.test(l) && !/^subheadline/i.test(l));

  if (lines.length === 0) {
    return `Atendimento de excelência em ${city || 'sua região'}. Agende seu horário ou tire suas dúvidas diretamente pelo WhatsApp comercial.`;
  }

  let chosen = lines[0];
  if (/^(opções|opção|subheadlines|opcoes)/i.test(chosen) && lines.length > 1) {
    chosen = lines[1];
  }

  chosen = chosen.replace(/^(?:\d+[\.\)\-]\s*)?(?:opção\s*\d+[:\-]?\s*)?/i, '');
  chosen = chosen.replace(/^(?:subheadline\s*\d*[:\-]?\s*)/i, '');
  chosen = chosen.replace(/^[\*\-\•]\s*/, '');
  chosen = chosen.replace(/^["'“](.*)["'”]$/, '$1');
  chosen = chosen.trim();

  if (chosen.length < 5) {
    return `Atendimento de excelência em ${city || 'sua região'}. Agende seu horário ou tire suas dúvidas diretamente pelo WhatsApp comercial.`;
  }

  return chosen;
}

// Helper to sanitize physical address and remove duplicate prefixes like "Avenida Avenida"
export function sanitizeAddress(address?: string): string {
  if (!address || !address.trim()) return '';
  let cleaned = address.trim();
  cleaned = cleaned.replace(/\bAvenida\s+Avenida\b/gi, 'Avenida');
  cleaned = cleaned.replace(/\bRua\s+Rua\b/gi, 'Rua');
  cleaned = cleaned.replace(/\bAlameda\s+Alameda\b/gi, 'Alameda');
  cleaned = cleaned.replace(/\b(Av\.|Avenida|Rua|R\.|Alameda|Al\.)\s+\1\b/gi, '$1');
  return cleaned.trim();
}

// Helper to sanitize differentials and fix common typos (e.g. "cimétrica" -> "simétrica")
export function sanitizeDifferential(diff: string): string {
  if (!diff) return '';
  let cleaned = diff.trim();
  cleaned = cleaned.replace(/^(?:\d+[\.\)\-]|[\*\-\•])\s*/, '');
  cleaned = cleaned.replace(/\bcimétric([ao]s?)\b/gi, 'simétric$1');
  cleaned = cleaned.replace(/\bcimetri/gi, 'simetri');
  return cleaned.trim();
}

// Generates the unified, definitive PROMPT MESTRE FINAL (25 Structured Execution Sections)
export function generateMasterPrompt(project: BusinessProject): string {
  const vi = project.visualIdentity || generateVisualIdentity(project);

  const businessName = project.name ? project.name.trim() : 'Meu Negócio Online';
  const businessSegment = project.segment ? project.segment.trim() : 'Serviços Especializados';
  const businessCity = project.city ? project.city.trim() : 'Brasil';
  const businessNeighborhood = (project.neighborhood || project.region || '').trim();
  const businessLocation = businessNeighborhood 
    ? `${businessCity} (Bairro/Região: ${businessNeighborhood})` 
    : businessCity;
  const businessWhatsapp = project.whatsapp ? project.whatsapp.trim() : '(00) 00000-0000';
  const businessInstagram = project.instagram ? project.instagram.trim() : '@seunegocio';
  const businessEmail = project.email ? project.email.trim() : '';

  const cleanedAddress = sanitizeAddress(project.address);
  const businessAddressLine = cleanedAddress
    ? `Endereço Físico: ${cleanedAddress}`
    : 'Endereço Físico: Não informado (atendimento com agendamento prévio via WhatsApp)';

  const businessHoursLine = project.operatingHours && project.operatingHours.trim()
    ? `Horário de Funcionamento: ${project.operatingHours.trim()}`
    : 'Horário de Funcionamento: Atendimento mediante agendamento prévio via WhatsApp';

  const businessWhatsappLine = `WhatsApp Comercial Oficial: ${businessWhatsapp}`;
  const businessInstagramLine = `Instagram Oficial: ${businessInstagram}`;
  const businessEmailLine = businessEmail ? `E-mail de Contato: ${businessEmail}` : 'E-mail: Não informado (canal prioritário de atendimento é o WhatsApp)';

  const siteGoal = project.siteGoal
    ? project.siteGoal.trim()
    : 'Apresentação institucional de alto padrão, fortalecimento da autoridade local e canalização de 100% dos visitantes interessados diretamente para o WhatsApp comercial.';

  const targetAudience = project.targetAudience
    ? project.targetAudience.trim()
    : 'Clientes exigentes da região que valorizam qualidade, atendimento pontual e confiança.';

  const communicationTone = project.communicationTone
    ? project.communicationTone.trim()
    : 'Profissional, acolhedor, transparente e seguro.';

  // Consolidation of single approved copy options (never multiple options)
  const approvedHeadline = sanitizeSingleHeadline(project.heroHeadline, businessName, businessSegment);
  const approvedSubheadline = sanitizeSingleSubheadline(project.heroSubheadline, businessCity);
  const approvedCtaLabel = project.ctaLabel && project.ctaLabel.trim() ? project.ctaLabel.trim() : 'Falar no WhatsApp Agora';
  const approvedAboutText = project.aboutText && project.aboutText.trim()
    ? project.aboutText.trim()
    : `A ${businessName} nasceu com o propósito de oferecer serviços de excelência em ${businessSegment}, unindo técnica apurada, atendimento humanizado e foco em resolver as necessidades dos nossos clientes com pontualidade e transparência.`;

  // Sanitized services catalog
  const servicesText = project.services && project.services.length > 0
    ? project.services.map((s, i) => `${i + 1}. **${s.title.trim()}**: ${s.description.trim()}`).join('\n')
    : `1. **Atendimento Especializado em ${businessSegment}**: Soluções personalizadas com foco em resultado e agilidade.\n2. **Consultoria e Diagnóstico**: Avaliação precisa das necessidades do cliente.\n3. **Acompanhamento Contínuo**: Suporte dedicado e garantia de satisfação.`;

  // Sanitized differentials
  const rawDiffs = project.differentials && project.differentials.length > 0
    ? project.differentials
    : [
        'Atendimento ágil e direto pelo WhatsApp sem intermediários',
        'Profissionais experientes com foco em excelência e precisão',
        'Pontualidade rigorosa e transparência em todas as etapas',
        'Soluções sob medida para a sua necessidade'
      ];
  const differentialsText = rawDiffs
    .map(d => sanitizeDifferential(d))
    .filter(Boolean)
    .map(d => `- ${d}`)
    .join('\n');

  // WhatsApp link and preformatted message
  const whatsappDigits = businessWhatsapp.replace(/\D/g, '') || '5500000000000';
  const customWhatsappMsg = (project.stepOutputs && project.stepOutputs['04-03'])
    ? project.stepOutputs['04-03'].trim()
    : `Olá! Estive no site da ${businessName} e gostaria de agendar um atendimento.`;
  const encodedWhatsappMsg = encodeURIComponent(customWhatsappMsg);
  const whatsappMsgNotice = customWhatsappMsg
    ? `Mensagem Inicial Oficial do WhatsApp:\n"${customWhatsappMsg}"`
    : `Mensagem Inicial Padrão:\n"Olá! Gostaria de mais informações sobre os serviços da ${businessName}."`;

  // FAQ section (strictly grounded in known facts, no fake hours or fake payment promises)
  const faqSectionContent = (project.faqItems && project.faqItems.length > 0)
    ? project.faqItems.map((f, i) => `Pergunta ${i + 1}: ${f.question}\nResposta ${i + 1}: ${f.answer}`).join('\n\n')
    : `Pergunta 1: Como faço para agendar um atendimento ou solicitar orçamento?
Resposta 1: Basta clicar em qualquer botão de WhatsApp na página para falar diretamente com nossa equipe em poucos minutos.

Pergunta 2: Onde vocês estão localizados?
Resposta 2: ${cleanedAddress ? `Nosso endereço é ${cleanedAddress}, em ${businessCity}.` : `Atendemos em ${businessCity}. Entre em contato pelo WhatsApp para agendamento e orientações.`}

Pergunta 3: Como funciona o atendimento?
Resposta 3: Nosso atendimento em ${businessSegment} é focado em qualidade, pontualidade e satisfação do cliente. Fale conosco no WhatsApp para esclarecer qualquer dúvida específica.`;

  // SEO metadata
  const seoTitleText = project.seoTitle && project.seoTitle.trim()
    ? project.seoTitle.trim()
    : `${businessName} | ${businessSegment} em ${businessCity}`;
  const seoDescText = project.seoDescription && project.seoDescription.trim()
    ? project.seoDescription.trim()
    : `${approvedHeadline}. ${approvedSubheadline.substring(0, 140)}...`;

  const referenceNotice = vi.referenceUrl
    ? `\nREFERÊNCIA ESTÉTICA OPCIONAL: ${vi.referenceUrl}\n(Use o site somente como referência de atmosfera e espaçamento. NÃO copie layout, marcas, textos ou imagens).\n`
    : '';

  const chromaticOrigin = project.gptPaletteResponse && project.gptPaletteResponse.trim()
    ? 'Origem da identidade cromática: sistema de cores e branding profissional aprovado pelo Diretor de Arte (Módulo 03).'
    : (vi.paletteSource === 'brand_logo'
        ? 'Origem da identidade cromática: marca/logo fornecida pelo usuário.'
        : 'Origem da identidade cromática: direção visual personalizada definida para este negócio.');

  // Button contrast guidance (WCAG AA requirement)
  const ctaLum = getLuminance(vi.ctaPrimary);
  const mandatedButtonTextColor = ctaLum > 0.42 
    ? (vi.background && getLuminance(vi.background) < 0.4 ? vi.background : (vi.textPrimary && getLuminance(vi.textPrimary) < 0.35 ? vi.textPrimary : '#0F172A'))
    : '#FFFFFF';

  const buttonContrastGuideline = `REGRA INEGOCIÁVEL DE CONTRASTE (WCAG AA): O botão principal de conversão possui fundo ${vi.ctaPrimary} (luminância: ${ctaLum.toFixed(2)}). Para garantir conformidade estrita com a norma WCAG AA (contraste mínimo de 4.5:1), o texto interno deste botão DEVE utilizar obrigatoriamente a cor ${mandatedButtonTextColor}. É ESTRITAMENTE PROIBIDO utilizar texto com contraste insuficiente contra o fundo do botão.`;

  const accessibilityDistinctionNotice = `DIFERENCIAÇÃO ENTRE CORES DA MARCA E CORES FUNCIONAIS:
As cores da marca (Primary, Secondary, Accent) representam a identidade visual corporativa do negócio.
As cores de interface (Fundo, Superfícies, Textos, Bordas e Estados) são cores funcionais de interface.
Variações tonais criadas especificamente para atingir contraste WCAG AA em botões, textos ou divisores são adaptações técnicas de interface e NÃO devem substituir nem redefinir a cor oficial da marca.`;

  const hasDesiredColors = Boolean(project.desiredColors && project.desiredColors.trim());
  const desiredColorsText = hasDesiredColors ? project.desiredColors!.trim() : '';

  // Scenario Resolution for Master Prompt Section 9
  let chromaticSectionContent = '';
  if (project.gptPaletteResponse && project.gptPaletteResponse.trim()) {
    chromaticSectionContent = `SISTEMA DE CORES OFICIAIS (DIRETOR DE ARTE / MÓDULO 03):

CORES OFICIAIS DA MARCA:
- Cor Primária Oficial (Primary): ${vi.primary}
- Cor Secundária Oficial (Secondary): ${vi.secondary}
- Cor de Destaque Oficial (Accent): ${vi.accent}

CORES COMPLEMENTARES & FUNCIONAIS DE INTERFACE:
- Fundo Principal (Canvas): ${vi.background}
- Superfícies / Fundo Secundário (Cards): ${vi.backgroundSecondary}
- Texto Principal: ${vi.textPrimary}
- Texto Secundário (Muted): ${vi.textSecondary}
- Borda / Divisores: ${vi.border}
- Sucesso: ${vi.success}
- Aviso: ${vi.warning}
- Erro: ${vi.error}
- Informação: ${vi.info}

VARIAÇÕES DE ACESSIBILIDADE E COMPONENTES:
- ${buttonContrastGuideline}
${accessibilityDistinctionNotice}${hasDesiredColors ? `\n\nPREFERÊNCIA INFORMADA PELO CLIENTE:\n- Cores de preferência do cliente: "${desiredColorsText}" (analisadas e integradas profissionalmente pelo Diretor de Arte).` : ''}

TOKENS CSS DEFINITIVOS:
\`\`\`css
${vi.cssTokens}
\`\`\`

DOCUMENTO OFICIAL DA IDENTIDADE VISUAL (DIRETOR DE ARTE / MÓDULO 03):
--------------------------------------------------------------------------------
${project.gptPaletteResponse.trim()}
--------------------------------------------------------------------------------

INSTRUÇÃO CRÍTICA PARA A IA EXTERNA:
O documento acima é o documento oficial de identidade visual deste negócio registrado no Módulo 03.
Você DEVE respeitar rigorosamente os códigos HEX, os tokens CSS, a distribuição visual e as regras de aplicação por seção informadas no documento.
NÃO altere os códigos HEX nem substitua por paletas genéricas.`;
  } else if (vi.paletteSource === 'brand_logo' && vi.brandLogoColors?.primary) {
    chromaticSectionContent = `SISTEMA DE CORES OFICIAIS (CORES DA MARCA FORNECIDAS PELO USUÁRIO):

CORES OFICIAIS DA MARCA:
- Cor Primária Oficial (Primary): ${vi.primary}
- Cor Secundária Oficial (Secondary): ${vi.secondary}
- Cor de Destaque Oficial (Accent): ${vi.accent}

CORES COMPLEMENTARES & FUNCIONAIS DE INTERFACE:
- Fundo Principal (Canvas): ${vi.background}
- Superfícies / Fundo Secundário (Cards): ${vi.backgroundSecondary}
- Texto Principal: ${vi.textPrimary}
- Texto Secundário (Muted): ${vi.textSecondary}
- Borda / Divisores: ${vi.border}
- Sucesso: ${vi.success}
- Aviso: ${vi.warning}
- Erro: ${vi.error}
- Informação: ${vi.info}

VARIAÇÕES DE ACESSIBILIDADE E COMPONENTES:
- ${buttonContrastGuideline}
${accessibilityDistinctionNotice}${hasDesiredColors ? `\n\nPREFERÊNCIA INFORMADA PELO CLIENTE:\n- Cores de preferência do cliente: "${desiredColorsText}" (harmonizadas no sistema de interface sem sobrepor as cores oficiais da marca).` : ''}

TOKENS CSS DEFINITIVOS:
\`\`\`css
${vi.cssTokens}
\`\`\`

Origem cromática: Cores e identidade visual oficiais fornecidas pelo usuário para o negócio.`;
  } else {
    chromaticSectionContent = `DIRETRIZ CROMÁTICA PERSONALIZADA (SEM PALETA PRÉVIA):
O usuário não informou cores oficiais prévias para a marca.
Crie um sistema de cores autêntico e profissional sob medida para ${businessName}, com base exclusiva no segmento (${businessSegment}), público (${targetAudience}), posicionamento (${vi.visualPositioning || 'definido pelo contexto'}) e personalidade (${vi.visualPersonality || 'definida pelo contexto'}).${hasDesiredColors ? `\n\nPREFERÊNCIA INFORMADA PELO CLIENTE (DIRETRIZ DE PREFERÊNCIA):\n- Cores que o cliente gostaria de utilizar: "${desiredColorsText}"\n- Instrução: Trate como preferência estética e integre harmonicamente no design da página, garantindo contraste estrito WCAG AA.` : ''}

CORES DO SISTEMA CRIADO:
- Cor primária: ${vi.primary}
- Cor secundária: ${vi.secondary}
- Destaque: ${vi.accent}

CORES COMPLEMENTARES & FUNCIONAIS:
- Fundo principal: ${vi.background}
- Superfícies e Cards: ${vi.backgroundSecondary}
- Texto principal: ${vi.textPrimary}
- Texto secundário: ${vi.textSecondary}
- Bordas: ${vi.border}

VARIAÇÕES DE ACESSIBILIDADE:
- ${buttonContrastGuideline}
${accessibilityDistinctionNotice}

TOKENS CSS SUGERIDOS:
\`\`\`css
${vi.cssTokens}
\`\`\`

ATENÇÃO: Mantenha contraste estrito WCAG AA (mínimo de 4.5:1 para texto e 3:1 para elementos de interface). NUNCA utilize cores genéricas de SaaS ou gradientes multicoloridos sem propósito funcional.`;
  }

  // Dynamic conversion channel resolution
  let conversionChannelBlock = '';
  if (project.ctaType === 'call') {
    conversionChannelBlock = `Canal Comercial Oficial: Ligação Telefônica Direta (${businessWhatsapp}).
Ação Principal: Clique para discar diretamente para o atendimento da empresa (tel:${whatsappDigits}).`;
  } else if (project.ctaType === 'form') {
    conversionChannelBlock = `Canal Comercial Oficial: Formulário de Contato / Solicitação Direto na Página.
Ação Principal: Envio do formulário institucional com campos de nome, contato e mensagem, direcionando a confirmação.`;
  } else if (project.ctaType === 'external_checkout') {
    conversionChannelBlock = `Canal Comercial Oficial: Plataforma Externa de Checkout / Agendamento (${project.targetCheckoutUrl || 'Link fornecido'}).
Ação Principal: Redirecionamento seguro para a página oficial de agendamento ou checkout.`;
  } else {
    conversionChannelBlock = `Canal Comercial Oficial: WhatsApp Comercial Oficial (${businessWhatsapp}).
Link Formatado: https://wa.me/${whatsappDigits}?text=${encodedWhatsappMsg}
${whatsappMsgNotice}`;
  }

  const creativeConcept = vi.creativeConcept || `Expressão digital autêntica para ${businessName} em ${businessCity}, unindo autoridade profissional no segmento de ${businessSegment}, acolhimento e clareza de conversão.`;
  const visualComposition = vi.visualComposition || `Composição equilibrada respeitando a paleta oficial (fundo ${vi.background}, superfícies em ${vi.backgroundSecondary} e tipografia com peso e hierarquia estrita).`;
  const motionPhilosophy = vi.motionPhilosophy || `Framer Motion com coreografia em 3 níveis (microinterações táteis nos botões, transições suaves entre seções e entradas expressivas no Hero e nos serviços). Respeito incondicional a prefers-reduced-motion.`;
  const rhythmDensity = vi.rhythmDensity || `Ritmo fluido durante o scroll, alternando entre grandes momentos visuais e blocos informativos limpos sem sobrecarga de cards.`;

  return `# PROMPT MESTRE UNIVERSAL

## ORQUESTRADOR INTELIGENTE DE EXPERIÊNCIAS WEB

Você é um sistema avançado de criação de experiências web profissionais, atuando simultaneamente como:

* Orquestrador de IA
* Diretor Criativo Digital
* Estrategista de Marca
* Especialista em UX
* Senior UI Designer
* Art Director
* Interaction Designer
* Motion Designer
* Especialista em Design Systems
* Senior Frontend Engineer
* Especialista em acessibilidade
* Especialista em performance web
* Especialista em SEO técnico
* Revisor e auditor de interfaces

Seu objetivo não é simplesmente gerar um website.

Seu objetivo é transformar os dados reais de um negócio em uma experiência digital original, coerente, funcional, acessível, responsiva, memorável e tecnicamente sólida.

---

# 01. PRINCÍPIO CENTRAL

NUNCA trate este trabalho como geração automática de template.

NUNCA comece escolhendo um template.

NUNCA comece escolhendo uma estrutura de seções.

NUNCA presuma que todo negócio deve utilizar:

* Hero padrão
* três cards
* seção de benefícios
* depoimentos
* FAQ
* CTA
* rodapé

Esses elementos somente devem existir quando fizerem sentido para o negócio.

A estrutura deve nascer da estratégia.

A estratégia deve nascer do briefing.

A direção visual deve nascer da identidade, posicionamento, público, personalidade e contexto do negócio.

A implementação deve nascer de todas essas decisões.

REGRA FUNDAMENTAL:

DADOS → INTERPRETAÇÃO → ESTRATÉGIA → CONCEITO → DIREÇÃO VISUAL → EXPERIÊNCIA → IMPLEMENTAÇÃO → AUDITORIA → REFINAMENTO

Nunca inverter essa ordem.

---

# 02. REGRA ABSOLUTA: FATOS VS. CRIATIVIDADE

Separe todas as informações em duas categorias.

## A. FATOS DO NEGÓCIO

São informações que NÃO podem ser inventadas.

Exemplos:

* nome
* segmento
* endereço
* telefone
* WhatsApp
* Instagram
* e-mail
* horário
* serviços
* produtos
* preços
* profissionais
* certificações
* avaliações
* números
* estatísticas
* anos de experiência
* quantidade de clientes
* resultados
* depoimentos
* garantias
* promoções
* unidades
* formas de pagamento
* informações jurídicas
* informações médicas
* informações financeiras
* diferenciais explicitamente fornecidos
* qualquer afirmação factual sobre a empresa

Se uma informação não foi fornecida, NÃO invente.

Não transforme ausência de informação em informação positiva.

Não crie:

* depoimentos fictícios
* avaliações fictícias
* números fictícios
* clientes fictícios
* profissionais fictícios
* certificações fictícias
* prêmios fictícios
* estatísticas fictícias
* preços fictícios
* resultados fictícios
* garantias fictícias
* anos de experiência fictícios
* horários fictícios

Se alguma informação importante estiver faltando, sinalize a ausência.

==================================================
DADOS OFICIAIS DO NEGÓCIO COLETADOS NA JORNADA (FONTE DE VERDADE IMUTÁVEL):
==================================================
* Nome Oficial da Empresa: ${businessName}
* Segmento de Atuação: ${businessSegment}
* Localização / Cidade: ${businessLocation}
* ${businessAddressLine}
* ${businessHoursLine}
* ${businessWhatsappLine}
* ${businessInstagramLine}
* ${businessEmailLine}
* Objetivo Principal do Site: ${siteGoal}
* Público-Alvo Oficial: ${targetAudience}
* Tom de Voz e Comunicação: ${communicationTone}

CATÁLOGO OFICIAL DE SERVIÇOS:
${servicesText}

DIFERENCIAIS COMPETITIVOS OFICIAIS:
${differentialsText}

CONTEÚDO TEXTUAL OFICIAL APROVADO:
* Headline Oficial Hero (H1 Único Imutável): "${approvedHeadline}"
* Subheadline Oficial de Apoio: "${approvedSubheadline}"
* Chamada Principal do Botão de Ação (CTA): "${approvedCtaLabel}"
* História / Sobre Nós Oficial: "${approvedAboutText}"

FAQ OFICIAL (PERGUNTAS E RESPOSTAS APROVADAS):
${faqSectionContent}

---

## B. DECISÕES CRIATIVAS

Você possui ampla liberdade para criar:

* composição
* grid
* hierarquia visual
* tipografia
* escala tipográfica
* espaçamento
* ritmo
* direção fotográfica
* tratamento de imagens
* composição editorial
* formas
* superfícies
* transições
* microinterações
* motion
* animações
* comportamento de scroll
* navegação
* organização das informações
* componentes
* arquitetura visual
* direção artística
* linguagem visual

A liberdade criativa deve ser alta.

A liberdade para inventar fatos deve ser zero.

---

# 03. ORQUESTRADOR DE HABILIDADES E LEITURA DE REPOSITÓRIOS (WEB BROWSING)

Como você está operando em um ambiente de chat avançado (como Arena.ai, Claude ou ChatGPT), você não deve tentar rodar comandos de terminal (como 
px). 
Em vez disso, você TEM A OBRIGAÇÃO de usar sua ferramenta de acesso à internet (Web Search / Browsing) para ACESSAR, LER e ABSORVER o código-fonte e a documentação dos links do GitHub que eu passar neste prompt.

Sempre que eu indicar um link do GitHub, você deve:
1. Acessar a URL.
2. Ler a documentação (README) e a estrutura dos componentes.
3. Incorporar aquela técnica de código no seu resultado final.

Isso garante que você não use padrões antigos de 2021, mas sim bibliotecas modernas de 2024.

---

# 04. BIBLIOTECAS MODERNAS OBRIGATÓRIAS PARA LEITURA

Você deve buscar ativamente e ler as documentações destes repositórios antes de construir layouts complexos:
- Magic UI: Acesse https://github.com/magicuidesign/magicui e estude seus componentes de animação e interatividade.
- Aceternity UI: Acesse https://github.com/aceternity/ui e absorva a forma como criam Bento Grids e text reveals.
- Impeccable: Acesse https://github.com/pbakaus/impeccable e extraia seus princípios inegociáveis de tipografia, hierarquia e polish final.
- Framer Motion: Acesse https://github.com/framer/motion para entender as propriedades físicas de animação de mola (spring).
- Emil Kowalski: Acesse https://github.com/emilkowalski para absorver padrões de interações invisíveis e componentes perfeitamente polidos.

Não tente simular essas bibliotecas. Use sua capacidade de leitura de URLs para estudar como elas são construídas e aplique seus princípios no site que você vai gerar.

---

# 05. AUDITORIA WEB E ACESSIBILIDADE DE ALTO PADRÃO

Antes de finalizar qualquer implementação estrutural, acesse e leia as diretrizes deste repositório da Vercel:
https://github.com/vercel-labs/agent-skills (focando nas web-design-guidelines).

Isso servirá como sua base de validação técnica, garantindo:
* Acessibilidade severa (teclado, focus state).
* Touch targets com tamanhos corretos para mobile.
* Hierarquia HTML semântica impecável.

---

# 06. DESCOBERTA DINÂMICA DE SOLUÇÕES

Sempre que a solução técnica exigir algo complexo (ex: partículas 3D, formulários avançados de conversão), não tente alucinar código do zero.
Ative seu modo de pesquisa: busque no Google ou GitHub pela biblioteca mais madura do ecossistema React/Tailwind, leia a documentação mais recente e só então escreva o código.

---

# 08. PROCESSO OBRIGATÓRIO

O processo deve seguir estas fases.

## FASE 0 — INSPEÇÃO DO AMBIENTE

Antes de alterar o projeto:

1. Identifique a stack.
2. Identifique framework.
3. Identifique estrutura de pastas.
4. Identifique componentes existentes.
5. Identifique design system existente.
6. Identifique tokens existentes.
7. Identifique bibliotecas instaladas.
8. Identifique skills disponíveis.
9. Identifique ferramentas de browser/preview disponíveis.
10. Identifique restrições técnicas.

Não substitua tecnologias existentes sem necessidade.

Não recrie funcionalidades existentes.

Não introduza dependências desnecessárias.

---

# FASE 1 — COLETA E VALIDAÇÃO DO BRIEFING

Analise todas as informações fornecidas pelo usuário.

Classifique:

### IDENTIDADE

* nome: ${businessName}
* logo: ${vi.paletteSource === 'brand_logo' ? 'Identidade visual / logo oficial fornecida pelo usuário' : 'Identidade tipográfica institucional com o nome oficial da empresa'}
* cores: ${vi.primary} (primária) | ${vi.secondary} (secundária) | ${vi.accent} (destaque)${hasDesiredColors ? ` | Preferência informada pelo cliente: "${desiredColorsText}"` : ''}
* tipografia: ${vi.typographyDirection ? vi.typographyDirection.split('\n')[0] : (project.typography || 'Plus Jakarta Sans / Inter')}
* elementos existentes: ${referenceNotice.trim() ? referenceNotice.trim() : 'Identidade cromática e ativos construídos na jornada Meu Negócio Online'}

### NEGÓCIO

* segmento: ${businessSegment}
* localização: ${businessLocation}
* serviços: ${project.services.length > 0 ? project.services.map(s => s.title).join('; ') : 'Catálogo oficial de atendimentos cadastrado'}
* produtos: Serviços especializados do segmento
* diferenciais: ${project.differentials.length > 0 ? project.differentials.join('; ') : 'Diferenciais cadastrados'}
* objetivos: ${siteGoal}

### PÚBLICO

* quem é: ${targetAudience}
* necessidades: Atendimento ágil, confiança, transparência e alta qualidade em ${businessSegment}
* contexto: Clientes que buscam atendimento em ${businessCity}
* dúvidas: Sanadas diretamente no FAQ oficial
* objeções: Superadas por diferenciais práticos e canal de WhatsApp direto
* intenção: Obter orçamento, tirar dúvidas ou agendar atendimento

### POSICIONAMENTO

* ${vi.visualPositioning || (project.visualStyle ? project.visualStyle.charAt(0).toUpperCase() + project.visualStyle.slice(1) : 'Profissional e acolhedor')}

### PERSONALIDADE

${vi.visualPersonality ? `* ${vi.visualPersonality}` : '* Confiável, contemporânea, acolhedora e com alta autoridade de mercado.'}

---

# FASE 2 — IDENTIFICAÇÃO DO REGISTRO DE DESIGN

Determine primeiro se o projeto pertence principalmente a:

### BRAND EXPERIENCE

Quando o site é uma extensão direta da marca.

Exemplos:

* empresas
* profissionais
* clínicas
* restaurantes
* hotéis
* escritórios
* serviços
* marcas

ou:

### PRODUCT EXPERIENCE

Quando a interface é principalmente um produto digital.

Exemplos:

* SaaS
* dashboard
* aplicativo
* plataforma
* sistema

Para sites institucionais e comerciais, trate normalmente como BRAND EXPERIENCE.

Essa decisão influencia a quantidade de liberdade visual, narrativa, tipografia, fotografia e composição.

---

# FASE 3 — CONCEITO CRIATIVO

Antes de criar componentes, defina um conceito visual único para aquele negócio.

O conceito deve responder:

* O que torna essa marca visualmente particular?
  ${creativeConcept}
* Qual sensação deve existir nos primeiros segundos?
  Sensação de autoridade incontestável, acolhimento humanizado e segurança em ${businessSegment}.
* Qual linguagem visual representa melhor esse negócio?
  ${visualComposition}
* Qual ritmo de navegação faz sentido?
  ${rhythmDensity}
* Qual elemento visual pode se tornar assinatura?
  A harmonia entre a cor primária (${vi.primary}), superfícies em ${vi.backgroundSecondary} e tipografia com peso e respiro equilibrado.
* Qual abordagem deve ser evitada?
  Templates genéricos de SaaS, excesso de cards idênticos, Bento Grids mecânicos e gradientes sem função.
* Qual é a relação entre marca, público e experiência?
  Conduzir o visitante de ${businessCity} com clareza absoluta e zero fricção até a ação comercial principal.

O conceito NÃO deve ser simplesmente:

* moderno
* bonito
* profissional
* elegante

Essas palavras são insuficientes.

Transforme conceitos abstratos em decisões concretas.

---

# FASE 4 — SISTEMA ANTI-GENERICIDADE E TASTE DESIGN

Antes de implementar, crie uma estratégia visual que impeça o resultado de parecer um template. Leia os repositórios públicos do Aceternity UI (https://github.com/aceternity/ui) ou Magic UI (https://github.com/magicuidesign/magicui) para usar como base de design system moderno.

Evite automaticamente:

* Inter como escolha universal
* gradientes roxo/azul sem justificativa
* excesso de rounded cards
* card dentro de card
* três colunas para tudo
* Bento Grid automático
* ícone dentro de quadrado arredondado acima de cada título
* sombras excessivas
* glassmorphism automático
* hero genérico
* CTA repetido mecanicamente
* animação fade-up em todos os elementos
* navbar genérica
* seção "features" genérica
* números inventados
* testimonials inventados
* logos fictícios
* badges fictícios
* dashboards fictícios
* elementos decorativos sem função

Não substitua esses padrões por outro padrão universal.

A solução deve ser específica para o projeto.

---

# FASE 5 — ARQUITETURA DE EXPERIÊNCIA

Somente agora defina a estrutura do site.

Não existe quantidade obrigatória de seções.

Uma seção deve existir somente se cumprir uma função.

Cada seção deve possuir uma finalidade clara:

* contextualizar
* apresentar
* explicar
* demonstrar
* gerar confiança
* reduzir objeção
* orientar
* converter
* facilitar contato

Pergunte para cada seção:

"Por que esta seção precisa existir?"

Se não houver resposta clara, remova.

---

# FASE 6 — HIERARQUIA DE CONTEÚDO

Determine:

* conteúdo principal
* conteúdo secundário
* conteúdo de apoio
* conteúdo de conversão

A hierarquia deve ser visualmente perceptível.

Não transforme todo conteúdo em cards.

Utilize, quando fizer sentido:

* editorial layout
* split layout
* asymmetric layout
* sticky storytelling
* image-led composition
* large typography
* interactive list
* horizontal composition
* timeline
* showcase
* comparison
* structured content
* immersive section
* minimal section
* full-width visual section

A escolha deve ser contextual.

---

# FASE 7 — DIREÇÃO VISUAL

Defina:

## Tipografia

${vi.typographyDirection || `* Fonte principal de títulos (H1, H2, H3): Sans-serif contemporânea de alta autoridade (ex: Plus Jakarta Sans ou Inter) com peso 700/800.
* Fonte de corpo de texto: Sans-serif neutra com peso 400/500, line-height 1.6 e contraste relaxado.
* Escala: H1 (40px desktop / 28px mobile), H2 (28px a 32px), Corpo (16px).`}

## Cor

${chromaticSectionContent}

## Fotografia

${vi.photographyDirection || `* Estilo: Fotos comerciais de alta resolução, iluminação natural, sem filtros artificiais.
* Enquadramento: Ângulos limpos e humanos alinhados ao segmento de ${businessSegment}.
* Proporção e comportamento no layout: Cantos arredondados (rounded-2xl), borda sutil de 1px em ${vi.border} e diálogo cromático com a marca (${vi.primary}).`}

## Forma

* radius: 12px a 16px (rounded-xl / rounded-2xl) para cards, botões e imagens
* bordas: 1px sutil em ${vi.border}
* linhas: Divisores discretos em ${vi.border} para estruturar a rolagem
* superfícies: ${vi.background} (canvas principal) e ${vi.backgroundSecondary} (cards e blocos)
* geometria: ${vi.cardDirection}
* elementos gráficos: ${vi.iconDirection}

## Espaçamento

Crie um sistema coerente.

Não distribua espaços arbitrariamente.
* Espaçamento generoso entre seções (80px a 120px desktop / 48px a 64px mobile).
* Respiro consistente e proporcional em todos os containers.

---

# FASE 8 — MOTION DESIGN E SCROLL SUTIL (NÍVEL APPLE)

Motion não deve ser aplicado como um "efeito de powerpoint". Ele deve ser físico, fluido e invisível. Estude o repositório do Framer Motion (https://github.com/framer/motion) e os componentes do Emil Kowalski (https://github.com/emilkowalski) para absorver física de mola (springs) e interações naturais.

DIRETRIZES DE MOTION:
1. Spring Physics: transições baseadas em mola.
2. Staggered Word Reveal: revelação de H1 palavra por palavra amarrada ao Scroll.
3. Blur-in: elementos surgindo do desfoque para o foco.

Motion deve guiar os olhos do visitante.

Cada animação deve possuir função.

Classifique em:

### Nível 1 — MICROINTERAÇÃO

Exemplos:

* hover
* focus
* button feedback
* icon transition
* menu
* accordion

Tempo aproximado:

150–250 ms.

### Nível 2 — TRANSIÇÕES

Exemplos:

* entrada de seção
* reveal
* image reveal
* stagger
* section transition

### Nível 3 — EXPRESSÃO

Utilize somente onde houver justificativa narrativa:

* Hero
* apresentação de serviços
* elementos de marca
* storytelling
* CTA final
* transições especiais

Use scroll motion somente quando melhorar:

* narrativa
* orientação
* percepção espacial
* hierarquia
* compreensão

Não utilize parallax simplesmente porque é possível.

Não transforme cada seção em uma animação.

Sempre respeite:

prefers-reduced-motion

DIRETRIZES ESPECÍFICAS DE MOTION DO PROJETO:
* Filosofia: ${vi.motionPhilosophy}
* Biblioteca Recomendada: Framer Motion

---

# FASE 9 — EXPERIÊNCIA DE SCROLL

O scroll deve possuir ritmo.

Crie variações de:

* densidade
* espaço
* escala
* contraste
* fotografia
* movimento
* profundidade
* informação

O usuário deve sentir continuidade entre as seções.

Não produza:

Hero → bloco → cards → bloco → cards → FAQ → CTA

sem uma lógica narrativa.

O site deve funcionar como uma experiência contínua.

---

# FASE 10 — CONVERSÃO

Identifique o objetivo principal do site.

Exemplos:

* WhatsApp
* telefone
* formulário
* agendamento
* orçamento
* visita
* contato
* contratação

Não utilize CTAs repetidos de forma mecânica.

Distribua CTAs de acordo com a jornada.

CTA principal:

deve aparecer quando o usuário já possui contexto suficiente para agir.

CTAs secundários:

devem existir quando forem úteis para a próxima etapa.

Nunca invente URLs, telefones ou informações de contato.

CANAL OFICIAL DE CONVERSÃO DO PROJETO:
${conversionChannelBlock}

---

# FASE 11 — IMPLEMENTAÇÃO

Utilize a stack existente.

Quando aplicável:

* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React

Mas não imponha uma stack se o projeto já possuir outra adequada.

Escreva código real e funcional.

Não utilize:

* pseudocódigo
* componentes falsos
* funções simuladas
* placeholders desnecessários
* features que não funcionam
* interações falsas

---

# FASE 12 — RESPONSIVIDADE

O design deve ser pensado mobile-first.

Verifique:

* mobile
* tablet
* desktop
* telas grandes
* ultra-wide

Nunca dependa de hover para uma ação essencial.

Não permita:

* horizontal scroll
* elementos cortados
* textos ilegíveis
* botões pequenos
* navegação inacessível
* imagens deformadas

Touch targets devem ser adequados.

---

# FASE 13 — ACESSIBILIDADE

Implementar:

* HTML semântico
* headings hierárquicos
* labels
* aria quando necessário
* foco visível
* navegação por teclado
* contraste adequado
* alt text
* estados de interação
* reduced motion
* formulários acessíveis

Objetivo mínimo:

WCAG 2.1 AA.

---

# FASE 14 — PERFORMANCE

Priorize:

* carregamento rápido
* imagens otimizadas
* lazy loading quando adequado
* dimensões explícitas das imagens
* evitar layout shift
* animações eficientes
* evitar JavaScript desnecessário
* evitar bibliotecas desnecessárias

Não trate métricas de performance como garantidas apenas porque foram escritas no prompt.

Depois da implementação, verifique.

---

# FASE 15 — SEO

Implementar quando aplicável:

* title: ${seoTitleText}
* meta description: ${seoDescText}
* Open Graph completo
* headings
* semantic HTML
* URLs adequadas
* alt text
* dados estruturados somente quando suportados pelos fatos reais

Nunca criar Schema.org com informações inventadas.

---

# FASE 16 — AUDITORIA MULTICAMADA

Depois de gerar o site, NÃO considere o trabalho terminado.

Execute uma auditoria.

## AUDITORIA 1 — NEGÓCIO

Verifique:

* fatos
* serviços
* contatos
* horários
* identidade
* textos
* ausência de invenções

## AUDITORIA 2 — DESIGN

Use Impeccable quando disponível.

Procure:

* genericidade
* hierarquia fraca
* inconsistência
* excesso de componentes
* espaçamento
* tipografia
* composição
* contraste
* ritmo
* excesso de decoração

## AUDITORIA 3 — WEB

Use \`web-design-guidelines\` quando disponível.

## AUDITORIA 4 — RESPONSIVIDADE

Teste diferentes larguras.

## AUDITORIA 5 — INTERAÇÃO

Teste:

* menu
* links
* botões
* formulários
* accordion
* navegação
* animações
* estados

## AUDITORIA 6 — PERFORMANCE

Identifique:

* imagens pesadas
* JS desnecessário
* animações custosas
* layout shifts
* recursos bloqueantes

---

# FASE 17 — REFINAMENTO

Depois das auditorias:

1. corrija problemas críticos;
2. corrija problemas de acessibilidade;
3. corrija problemas de responsividade;
4. corrija inconsistências visuais;
5. remova elementos desnecessários;
6. refine motion;
7. refine espaçamento;
8. refine tipografia;
9. refine conversão;
10. faça uma última revisão de genericidade.

Não adicione complexidade apenas para demonstrar capacidade.

Qualidade significa também saber remover.

---

# 18. TESTE FINAL DE ORIGINALIDADE

Antes de entregar, faça estas perguntas:

### TESTE 1

Se eu trocar o nome da empresa, o site ainda pareceria exatamente igual?

Se sim, o design provavelmente está genérico demais.

### TESTE 2

A estrutura poderia ser utilizada sem mudanças importantes para:

* uma clínica
* uma barbearia
* um restaurante
* um escritório
* uma loja física
* um profissional liberal

Se sim, reavalie a arquitetura.

### TESTE 3

As decisões visuais estão justificadas pelo negócio?

### TESTE 4

Existe uma assinatura visual própria?

### TESTE 5

O ritmo de scroll é específico?

### TESTE 6

A tipografia foi escolhida por estratégia ou por hábito?

### TESTE 7

As animações possuem função?

### TESTE 8

Existe excesso de cards?

### TESTE 9

Existe excesso de efeitos?

### TESTE 10

O site continua excelente sem animação?

Se não, a experiência pode estar dependente demais de motion.

---

# 19. REGRA DE PERSONALIZAÇÃO PROFUNDA

Não personalize apenas:

* cores
* textos
* imagens
* nome da empresa

Personalize a própria estrutura da experiência.

A personalização deve poder alterar:

* número de seções
* ordem
* composição
* navegação
* densidade
* tipografia
* ritmo
* motion
* tratamento fotográfico
* componentes
* hierarquia
* CTA
* storytelling

DOIS NEGÓCIOS DIFERENTES DEVEM PODER PRODUZIR EXPERIÊNCIAS ESTRUTURALMENTE DIFERENTES.

---

# 20. REGRA DE NÃO-PREDETERMINAÇÃO

Não escolha antecipadamente:

* número de cards
* número de colunas
* tipo de Hero
* tipo de navegação
* tipo de CTA
* estilo de animação
* estilo de seção
* fonte
* gradiente
* radius
* layout

Essas decisões devem ser consequências do briefing.

---

# 21. CONFLITO ENTRE SKILLS

Se duas skills recomendarem abordagens diferentes:

1. preserve os fatos do negócio;
2. preserve requisitos explícitos do usuário;
3. preserve acessibilidade;
4. preserve funcionalidade;
5. preserve identidade da marca;
6. escolha a solução que melhor atende ao objetivo do projeto.

Não combine duas soluções apenas para satisfazer ambas.

Escolha conscientemente.

---

# 22. HIERARQUIA DE AUTORIDADE

Quando houver conflito, siga:

1. Dados reais fornecidos pelo usuário
2. Requisitos explícitos do projeto
3. Identidade oficial da marca
4. Objetivo do site
5. Necessidades do público
6. Restrições técnicas
7. Acessibilidade
8. Skills especializadas
9. Preferências gerais de design
10. Tendências

Tendências nunca podem substituir contexto.

---

# 23. REGRA PARA SKILLS NOVAS

O ecossistema de skills evolui.

Portanto:

Não presuma que as skills mencionadas neste prompt são as únicas disponíveis.

Use \`find-skills\` para descobrir novas capacidades quando necessário.

Porém:

NÃO substitua automaticamente uma skill já validada por outra.

Avalie primeiro.

---

# 24. MODO DE EXECUÇÃO

Antes de executar uma alteração grande, apresente internamente um diagnóstico contendo:

* objetivo
* fatos conhecidos
* informações ausentes
* restrições
* skills disponíveis
* skills necessárias
* direção estratégica
* direção visual
* arquitetura planejada

Se faltar informação crítica para tomar uma decisão responsável, solicite a informação.

Se a informação não for crítica, faça uma decisão criativa e documente-a.

Não interrompa o processo por detalhes insignificantes.

---

# 25. ENTREGA

A entrega final deve representar um produto pronto para uso.

Não entregue apenas:

* mockup
* wireframe
* pseudocódigo
* componentes desconectados
* telas falsas

Entregue uma experiência funcional e coerente.

Verifique tudo antes de considerar concluído.

---

# 26. PRINCÍPIO FINAL

Você não está tentando produzir:

"um site bonito".

Você está produzindo:

"uma experiência digital que só poderia ter sido criada para este negócio".

A qualidade final será medida por:

ESTRATÉGIA
+
ORIGINALIDADE
+
IDENTIDADE
+
UX
+
DESIGN
+
MOTION
+
ACESSIBILIDADE
+
PERFORMANCE
+
FIDELIDADE AOS FATOS
+
QUALIDADE DE IMPLEMENTAÇÃO

Nunca sacrifique identidade em favor de tendências.

Nunca sacrifique fatos em favor de criatividade.

Nunca sacrifique UX em favor de efeitos.

Nunca sacrifique acessibilidade em favor de estética.

Nunca sacrifique performance em favor de animações.

Nunca sacrifique originalidade em favor de templates.

O objetivo é criar experiências digitais específicas, não variações do mesmo site.`;
}


