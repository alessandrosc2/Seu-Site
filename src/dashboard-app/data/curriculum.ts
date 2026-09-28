import { BusinessProject, ModuleDef } from '../types/project';
import { replaceTokens } from '../utils/tokenReplacer';
import { 
  generateMasterPrompt, 
  formatVisualIdentityPrompt, 
  generateVisualIdentity,
  generateGptPalettePrompt 
} from '../utils/visualIdentityGenerator';

export const INITIAL_EMPTY_PROJECT: BusinessProject = {
  name: '',
  segment: '',
  city: '',
  region: '',
  neighborhood: '',
  whatsapp: '',
  instagram: '',
  email: '',
  address: '',
  operatingHours: '',
  services: [],
  targetAudience: '',
  differentials: [],
  siteGoal: '',
  communicationTone: '',
  pages: [
    'Home (Apresentação Principal)',
    'Serviços & Especialidades',
    'Diferenciais Competitivos',
    'Sobre Nós',
    'Dúvidas Frequentes (FAQ)',
    'Localização & Contato'
  ],
  ctaType: 'whatsapp',
  ctaLabel: 'Falar no WhatsApp Agora',
  targetCheckoutUrl: '',
  visualStyle: 'moderno',
  primaryColor: '#00D4E8',
  secondaryColor: '#1769FF',
  accentColor: '#111B36',
  typography: 'Plus Jakarta Sans',
  imageStyle: '',
  visualPositioning: '',
  visualPersonality: '',
  paletteSource: 'custom',
  brandLogoColors: {
    primary: '#00D4E8',
    secondary: '#1769FF',
    complementary: '#38BDF8',
    neutral: '#111B36',
    text: '#F5F7FF',
    accent: '#00E599'
  },
  referenceUrl: '',
  gptPaletteResponse: '',
  desiredColors: '',
  heroHeadline: '',
  heroSubheadline: '',
  aboutText: '',
  differentialsHeadline: '',
  servicesHeadline: '',
  faqItems: [],
  seoTitle: '',
  seoDescription: '',
  reviewChecklist: {
    contentInfoCorrect: false,
    contentPhonesCorrect: false,
    contentLinksWorking: false,
    contentTextReviewed: false,
    designHierarchy: false,
    designSpacing: false,
    designTypography: false,
    designImages: false,
    designConsistency: false,
    conversionClearCta: false,
    conversionWhatsappWorking: false,
    conversionEasyContact: false,
    conversionGoalEvident: false,
    mobileResponsive: false,
    mobileReadable: false,
    mobileButtonsAdequate: false,
    mobileNavWorking: false,
  },
  deploymentMethod: 'pending',
  publishedUrl: '',
  customDomain: '',
  domainRegistered: false,
  googleSearchConsoleConfigured: false,
  sitemapSubmitted: false,
  completedStepIds: [],
  currentModuleId: '01',
  currentStepId: '01-01',
  briefingApproved: true,
  stepOutputs: {},
  lastUpdated: new Date().toISOString()
};

export const MODULES: ModuleDef[] = [
  // ==========================================
  // ETAPA 1 — MEU PROJETO
  // ==========================================
  {
    id: '01',
    number: '01',
    name: 'Meu Projeto',
    shortDesc: 'Cadastre as informações essenciais do seu negócio (fonte de verdade de todo o site).',
    iconName: 'Building2',
    steps: [
      {
        id: '01-01',
        numberStr: '01',
        title: 'Informações do Meu Negócio',
        shortDesc: 'Preencha o nome, segmento, contatos, endereço, serviços e diferenciais da sua empresa.',
        whyImportant: 'Esta é a fonte de verdade do seu projeto. Todas as etapas seguintes usarão estes dados para gerar conteúdo, cores e código sem você precisar redigitar nada.',
        expectedOutcome: 'Briefing estruturado e completo com todas as variáveis comerciais salvas.',
        nextStepTeaser: 'Avançar para a preparação do conteúdo persuasivo.',
        exampleGood: 'Nome, segmento, WhatsApp, endereço e serviços cadastrados com descrições claras dos benefícios.',
        tip: 'Se tiver ponto físico, preencha o endereço completo. Se atender a domicílio ou online, deixe o endereço em branco.',
        taskTitle: 'Preencher Informações em Meu Projeto',
        taskType: 'project_form',
        prompt: {
          title: 'PROMPT — ESTRUTURAÇÃO DO NEGÓCIO COM IA',
          objective: 'Ajudar a mapear os serviços e diferenciais mais atraentes para o seu nicho.',
          whenToUse: 'Caso queira sugestões de como descrever seus serviços e diferenciais.',
          instructions: [
            '1. Copie o prompt abaixo.',
            '2. Cole no ChatGPT ou Claude.',
            '3. Use as ideias para preencher os campos de Serviços e Diferenciais.'
          ],
          generatePrompt: (p) => replaceTokens(`Atue como consultor de negócios e estrategista digital para prestadores de serviços.
Analise este negócio:
- Nome: [[NOME]]
- Segmento: [[SEGMENTO]]
- Cidade: [[CIDADE]]
- Público: [[PUBLICO]]

Sugira:
1. 3 a 4 serviços essenciais com títulos diretos e descrições curtas focadas no benefício para o cliente.
2. 3 diferenciais competitivos fortes que passam segurança e autoridade para quem procura por este serviço na minha cidade.
3. Um objetivo claro de conversão para o site.`, p)
        }
      }
    ]
  },

  // ==========================================
  // ETAPA 2 — PREPARE O CONTEÚDO
  // ==========================================
  {
    id: '02',
    number: '02',
    name: 'Prepare o Conteúdo',
    shortDesc: 'Revise os textos do Hero, Sobre Nós, Serviços, FAQ e SEO Local em um único estúdio.',
    iconName: 'Sparkles',
    steps: [
      {
        id: '02-01',
        numberStr: '02',
        title: 'Copy & Estrutura de Conteúdo',
        shortDesc: 'Textos magnéticos de alta conversão gerados automaticamente a partir do seu projeto.',
        whyImportant: 'Textos claros e objetivos transformam visitantes em mensagens diretas no seu WhatsApp.',
        expectedOutcome: 'Headline, subheadline, chamada de CTA, Sobre Nós, FAQ e SEO Local revisados.',
        nextStepTeaser: 'Avançar para a definição da identidade visual e cores.',
        exampleGood: 'Headline única no topo focada na solução do problema e subheadline de 2 linhas que convida ao WhatsApp.',
        tip: 'Evite jargões complexos e frases longas. Clareza sempre converte mais que sofisticação confusa.',
        taskTitle: 'Revisar Textos no Estúdio de Conteúdo',
        taskType: 'content_studio',
        prompt: {
          title: 'PROMPT — ESTÚDIO DE COPYWRITING & TEXTOS',
          objective: 'Escrever o pacote completo de textos persuasivos para o site.',
          whenToUse: 'Para refinar a headline, a subheadline e o Sobre Nós com uma IA externa.',
          instructions: [
            '1. Copie o prompt.',
            '2. Cole no ChatGPT ou Claude.',
            '3. Ajuste os campos do Estúdio de Conteúdo com as melhores frases.'
          ],
          generatePrompt: (p) => replaceTokens(`Você é um copywriter sênior especialista em páginas de conversão para prestadores de serviços e empresas locais.

Dados do Negócio:
- Empresa: [[NOME]]
- Segmento: [[SEGMENTO]]
- Cidade: [[CIDADE]]
- Público: [[PUBLICO]]
- Tom: [[TOM]]
- Diferenciais: [[DIFERENCIAIS]]

Escreva uma versão única e definitiva dos seguintes textos:
1. Headline Principal do Hero (H1 Único, máximo 12 palavras, claro e impactante)
2. Subheadline de apoio (2 a 3 linhas persuasivas que quebram hesitações)
3. Chamada do botão CTA (ex: "Falar no WhatsApp Agora")
4. Texto da seção Sobre Nós (apresentação humanizada e confiável da empresa)
5. 3 Perguntas Frequentes (FAQ) essenciais que eliminam as maiores dúvidas antes do contato`, p)
        }
      }
    ]
  },

  // ==========================================
  // ETAPA 3 — DEFINA O VISUAL
  // ==========================================
  {
    id: '03',
    number: '03',
    name: 'Defina o Visual',
    shortDesc: 'Gere a melhor paleta cromática com o GPT para seu nicho e de acordo com as cores da sua marca.',
    iconName: 'Palette',
    steps: [
      {
        id: '03-01',
        numberStr: '03',
        title: 'Identidade Visual & Cores',
        shortDesc: 'Copie o prompt especialista para o GPT criar a paleta de cores ideal para o seu nicho e sua marca.',
        whyImportant: 'A combinação cromática errada afasta clientes e enfraquece a credibilidade. Uma paleta profissional calibrada para o seu nicho (com contraste WCAG AA) faz seu negócio transmitir autoridade imediata.',
        expectedOutcome: 'Paleta completa de 8 cores calibradas, códigos HEX aplicados ao construtor e sincronizados com o Prompt Mestre.',
        nextStepTeaser: 'Avançar para a preparação das imagens, estilo fotográfico e ativos visuais.',
        exampleGood: 'Cores que respeitam a regra 60-30-10: fundo calmo, cartões com bordas sutis e botões de WhatsApp de altíssimo contraste.',
        tip: 'Você pode anexar a foto da sua logomarca diretamente no chat do ChatGPT junto com o prompt gerado nesta etapa para que ele extraia os códigos exatos!',
        taskTitle: 'Construir Identidade Visual com o GPT',
        taskType: 'visual_identity',
        prompt: {
          title: 'PROMPT DO DIRETOR DE ARTE — SISTEMA DE CORES PROFISSIONAL PARA WEBSITE',
          objective: 'Fazer o GPT atuar como Diretor de Arte Sênior, analisar o negócio e logotipo e criar o sistema de cores completo para o website.',
          whenToUse: 'Para definir o sistema cromático profissional no ChatGPT/Claude mantendo a fidelidade da marca, contraste WCAG AA e tokens CSS.',
          instructions: [
            '1. Copie o prompt do Diretor de Arte (ele já vem preenchido com todos os dados de Meu Projeto).',
            '2. Abra o ChatGPT (ou Claude), anexe a imagem da sua logomarca (se tiver) e cole o prompt.',
            '3. O GPT analisará o negócio e gerará a leitura da marca, paleta, acessibilidade e os tokens CSS (:root).',
            '4. Cole a resposta do GPT de volta no importador automático desta tela para aplicar instantaneamente!'
          ],
          generatePrompt: (p) => generateGptPalettePrompt(p)
        }
      }
    ]
  },

  // ==========================================
  // ETAPA 4 — PREPARE AS IMAGENS
  // ==========================================
  {
    id: '04',
    number: '04',
    name: 'Prepare as Imagens',
    shortDesc: 'Descubra quais fotos seu site precisa e como gerá-las ou melhorá-las com IA.',
    iconName: 'LayoutGrid',
    steps: [
      {
        id: '04-01',
        numberStr: '04',
        title: 'Estilo Fotográfico & Prompts de IA',
        shortDesc: 'Direção de arte fotográfica e comandos profissionais para gerar ou aprimorar imagens.',
        whyImportant: 'Fotografias autênticas e coerentes aumentam a confiança e valorizam seus serviços perante o cliente.',
        expectedOutcome: 'Guia visual definido, lista de fotos necessárias e comandos de IA copiados.',
        nextStepTeaser: 'Avançar para a etapa central de geração do site com IA.',
        exampleGood: 'Luz natural, enquadramento limpo, pessoas em postura espontânea e fotos reais do ambiente.',
        tip: 'Você não precisa salvar as fotos no aplicativo: guarde os arquivos no computador para anexar no chat da IA do site.',
        taskTitle: 'Definir Direção de Arte e Prompts de Imagem',
        taskType: 'art_direction_guide',
        prompt: {
          title: 'PROMPT 21 — GUIA DE DIREÇÃO DE ARTE FOTOGRÁFICA',
          objective: 'Criar orientações práticas para produzir fotografias coerentes com o negócio.',
          whenToUse: 'Antes de fotografar, selecionar ou gerar imagens para o site.',
          instructions: [
            '1. Copie o prompt abaixo.',
            '2. Cole no ChatGPT, Claude ou Gemini.',
            '3. Use as recomendações práticas para guiar suas fotos reais ou comandos de IA.'
          ],
          generatePrompt: (p) => replaceTokens(`Atue como diretor de arte e fotógrafo comercial especializado em fotografia para websites profissionais.

Analise as informações deste negócio:
Nome: [[NOME]]
Segmento: [[SEGMENTO]]
Cidade: [[CIDADE]]
Público-alvo: [[PUBLICO]]
Tom da marca: [[TOM]]
Diferenciais: [[DIFERENCIAIS]]

Crie um guia prático de direção de arte fotográfica para este negócio.

Organize a resposta em:
1. Estilo fotográfico recomendado
2. Enquadramentos e composição
3. Iluminação
4. Orientação para fotografias de pessoas
5. Orientação para fotografias do ambiente
6. Elementos que devem aparecer
7. Elementos que devem ser evitados
8. Recomendações para fotografias do Hero
9. Recomendações para fotografias dos serviços
10. Lista final de 5 regras visuais que devem ser mantidas em todas as fotografias.

As recomendações devem ser específicas para este negócio, práticas e fáceis de aplicar.`, p)
        }
      }
    ]
  },

  // ==========================================
  // ETAPA 5 — GERE SEU SITE COM IA
  // ==========================================
  {
    id: '05',
    number: '05',
    name: 'Gere Seu Site com IA',
    shortDesc: 'Copie o Prompt Mestre Final e crie seu site completo em uma IA externa em segundos.',
    iconName: 'Code2',
    steps: [
      {
        id: '05-01',
        numberStr: '05',
        title: 'Prompt Mestre Final & Execução',
        shortDesc: 'O briefing definitivo de 25 seções pronto para copiar e colar na ferramenta de IA escolhida.',
        whyImportant: 'É aqui que a mágica acontece: a IA externa lê a especificação técnica e programa o site inteiro para você.',
        expectedOutcome: 'Código do site gerado e funcional no Google AI Studio, Arena.ai, Manus ou Claude.',
        nextStepTeaser: 'Avançar para a checagem final, publicação e configuração de domínio.',
        exampleGood: 'Copiar o prompt, anexar as imagens de referência no chat e enviar.',
        tip: 'Selecione uma das IAs recomendadas (Arena.ai, Manus, Google AI Studio ou Claude) para melhor resultado.',
        taskTitle: 'Copiar Prompt Mestre e Gerar Site na IA',
        taskType: 'master_prompt_step',
        prompt: {
          title: 'PROMPT MESTRE FINAL DE 25 SEÇÕES (CONSTRUÇÃO DO SITE)',
          objective: 'Especificação técnica e comercial completa para programar o website em uma IA.',
          whenToUse: 'Na ferramenta externa de IA (Google AI Studio, Arena.ai, Manus, Claude Artifacts).',
          instructions: [
            '1. Copie o Prompt Mestre Final completo.',
            '2. Abra a IA externa de sua preferência.',
            '3. Anexe as imagens preparadas e cole o prompt.'
          ],
          generatePrompt: (p) => generateMasterPrompt(p)
        }
      }
    ]
  },

  // ==========================================
  // ETAPA 6 — REVISE E PUBLIQUE
  // ==========================================
  {
    id: '06',
    number: '06',
    name: 'Revise e Publique',
    shortDesc: 'Faça a checagem pré-lançamento e prepare os próximos passos de registro de domínio e hospedagem.',
    iconName: 'Award',
    steps: [
      {
        id: '06-01',
        numberStr: '06',
        title: 'Revisão e Próximos Passos',
        shortDesc: 'Checklist pré-lançamento, revisão minuciosa e próximos passos para registro de domínio e hospedagem.',
        whyImportant: 'Garante que todos os botões de WhatsApp funcionem, o site abra rápido no celular e seu negócio seja encontrado.',
        expectedOutcome: 'Site auditado, checklist aprovado e todas as etapas de criação concluídas.',
        nextStepTeaser: 'Avançar para os módulos de registro de domínio e hospedagem.',
        exampleGood: 'Checklist conferido, contatos e botões validados e tudo pronto para registro e publicação.',
        tip: 'Faça uma conferência atenta dos botões de WhatsApp no smartphone antes de prosseguir.',
        taskTitle: 'Revisar Checklist e Concluir Etapa',
        taskType: 'launch_pad',
        prompt: {
          title: 'PROMPT — PRESENÇA NO GOOGLE MEU NEGÓCIO & MAPS',
          objective: 'Otimizar a descrição do Google Meu Negócio com o link do novo site.',
          whenToUse: 'Após colocar o site no ar, para atrair clientes locais na pesquisa do Google.',
          instructions: [
            '1. Copie o prompt.',
            '2. Cole na IA para receber o texto otimizado para o Google Maps.',
            '3. Insira o texto e o link do site no seu perfil do Google.'
          ],
          generatePrompt: (p) => replaceTokens(`Atue como especialista em SEO Local e Google Meu Negócio.
Para o negócio:
- Nome: [[NOME]]
- Segmento: [[SEGMENTO]]
- Cidade: [[CIDADE]]
- Endereço: ${p.address || 'Atendimento local'}
- Diferenciais: [[DIFERENCIAIS]]

Escreva uma descrição profissional de 750 caracteres para o perfil do Google Meu Negócio / Maps, incluindo palavras-chave locais e chamada para visitar o novo site ou agendar no WhatsApp.`, p)
        }
      }
    ]
  }
];

export interface PlanoCompletoModuleDef {
  id: string;
  number: string;
  title: string;
  desc: string;
  keyPoints?: string[];
  actionScriptId?: string;
  actionScriptLabel?: string;
}

export const PLANO_COMPLETO_MODULES: PlanoCompletoModuleDef[] = [
  {
    id: 'pc-01',
    number: '01',
    title: 'A Oportunidade de Mercado: Sites de R$ 1.500 a R$ 3.500',
    desc: 'Como milhares de negócios locais na sua cidade ainda não possuem site profissional ou usam páginas antigas sem conversão.',
    keyPoints: [
      'Por que pequenas empresas preferem pagar por um site pronto do que aprender IA',
      'Margem de lucro e velocidade de entrega com o método estruturado',
      'Diferença entre vender "código" e vender "posicionamento e clientes no WhatsApp"'
    ]
  },
  {
    id: 'pc-02',
    number: '02',
    title: 'Definindo Seu Portfólio Inicial Sem Ter Clientes Anteriores',
    desc: 'Como usar projetos-modelo de alta conversão para demonstrar autoridade imediata na primeira conversa.',
    keyPoints: [
      'Criação de 2 a 3 sites demonstrativos em nichos quentes (Clínica, Barbearia, Escritório)',
      'Apresentação interativa dos modelos em celular na reunião',
      'Estrutura de apresentação visual que gera desejo instantâneo'
    ]
  },
  {
    id: 'pc-03',
    number: '03',
    title: 'Precificação Estratégica: Quanto Cobrar e Como Parcelar',
    desc: 'Tabela de precificação recomendada por nicho e modelo de recebimento (50% de entrada + 50% na entrega).',
    keyPoints: [
      'Pacote Básico de Página Única: R$ 1.500 a R$ 1.800',
      'Pacote Completo com Domínio e Google Meu Negócio: R$ 2.500 a R$ 3.500',
      'Como parcelar em até 12x no cartão repassando as taxas'
    ]
  },
  {
    id: 'pc-04',
    number: '04',
    title: 'Contrato de Prestação de Serviços & Escopo Blindado',
    desc: 'Modelo de contrato simples e seguro para evitar pedidos infinitos de alteração e garantir o pagamento.',
    keyPoints: [
      'Cláusula de escopo fechado e limite de 2 rodadas de ajustes',
      'Termo de aprovação formal e quitação da segunda parcela',
      'Direitos autorais e entrega das senhas de hospedagem'
    ],
    actionScriptId: 'hp-12',
    actionScriptLabel: 'Copiar Modelo de Proposta Comercial'
  },
  {
    id: 'pc-05',
    number: '05',
    title: 'Prospecção Ativa no Google Maps Sem Parecer Chato',
    desc: 'Método para localizar empresas com notas altas no Google Maps mas com sites quebrados ou sem link oficial.',
    keyPoints: [
      'Mapeamento de 20 empresas por dia pelo Google Maps da sua região',
      'Verificação prévia do WhatsApp comercial e do Instagram da empresa',
      'Abordagem consultiva oferecendo uma melhoria pontual'
    ],
    actionScriptId: 'hp-11',
    actionScriptLabel: 'Copiar Script de Abordagem no WhatsApp'
  },
  {
    id: 'pc-06',
    number: '06',
    title: 'Reunião de Fechamento de 15 Minutos via WhatsApp ou Presencial',
    desc: 'Como conduzir a conversa comercial focando em quantas ligações ou mensagens o cliente está perdendo por mês.',
    keyPoints: [
      'Roteiro das 4 perguntas que fazem o cliente admitir a necessidade do site',
      'Demonstração ao vivo do modelo no celular dele',
      'Fechamento imediato com chave Pix para os 50% de entrada'
    ]
  },
  {
    id: 'pc-07',
    number: '07',
    title: 'Coleta de Informações do Cliente em 1 Único Formulário',
    desc: 'Como usar a mesma estrutura do Meu Projeto para coletar nome, fotos, serviços e dados do cliente em minutos.',
    keyPoints: [
      'Envio do briefing objetivo para o WhatsApp do cliente',
      'Instrução para fotos reais do ambiente e equipe',
      'Definição das cores da marca sem debates cansativos'
    ]
  },
  {
    id: 'pc-08',
    number: '08',
    title: 'Montagem Express com o Prompt Mestre em Menos de 48 Horas',
    desc: 'Como executar a geração do site do cliente em ferramentas de IA e entregar a versão preliminar rapidamente.',
    keyPoints: [
      'Geração do código na IA em menos de 10 minutos',
      'Ajustes finos de logo, fotos e textos comerciais',
      'Publicação provisória no Vercel (.vercel.app) para aprovação'
    ]
  },
  {
    id: 'pc-09',
    number: '09',
    title: 'Entrega Oficial, Pagamento Final e Registro de Domínio',
    desc: 'O passo a passo para conectar o domínio próprio do cliente, receber a segunda parcela e transferir o projeto.',
    keyPoints: [
      'Apresentação do link definitivo e verificação do WhatsApp comercial',
      'Confirmação do Pix final de quitação',
      'Configuração das DNS no Registro.br e celebração com o cliente'
    ]
  },
  {
    id: 'pc-10',
    number: '10',
    title: 'Manutenção Mensal e Recorrência: Ganhando R$ 150 a R$ 300/mês',
    desc: 'Como transformar cada cliente de site em uma mensalidade recorrente para cuidar de pequenos ajustes e suporte.',
    keyPoints: [
      'O que incluir no pacote de manutenção (backup, pequenos ajustes de texto e suporte WhatsApp)',
      'Como cobrar de 10 a 20 clientes gerando R$ 2.000 a R$ 4.000 fixos mensais',
      'Fidelização e indicações para outros empresários da cidade'
    ]
  }
];

