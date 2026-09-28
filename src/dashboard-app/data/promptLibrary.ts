import { BusinessProject, HubPrompt } from '../types/project';
import { MODULES } from './curriculum';
import { replaceTokens } from '../utils/tokenReplacer';

export const PROMPT_CATEGORIES = [
  { id: 'todos', label: 'Todos os Prompts' },
  { id: 'fundacao', label: 'Fundação & Planejamento' },
  { id: 'copywriting', label: 'Copywriting & Textos' },
  { id: 'identidade', label: 'Identidade & Fotos' },
  { id: 'codigo', label: 'Construção & Código com IA' },
  { id: 'comercial', label: 'Comercial (Plano Completo)' },
] as const;

// Helper to determine category
function getCategoryForStep(stepId: string): { category: 'fundacao' | 'copywriting' | 'identidade' | 'codigo' | 'comercial'; label: string } {
  if (stepId === '01-01' || stepId.startsWith('00') || stepId.startsWith('01') || stepId.startsWith('03')) {
    return { category: 'fundacao', label: 'Fundação & Planejamento' };
  }
  if (stepId === '02-01' || stepId.startsWith('04') || stepId === '02-04' || stepId === '10-02') {
    return { category: 'copywriting', label: 'Copywriting & Textos' };
  }
  if (stepId === '03-01' || stepId === '04-01' || stepId.startsWith('05')) {
    return { category: 'identidade', label: 'Identidade & Fotos' };
  }
  if (stepId === '05-01' || stepId === '06-01' || stepId.startsWith('06') || stepId.startsWith('07')) {
    return { category: 'codigo', label: 'Construção & Código com IA' };
  }
  return { category: 'fundacao', label: 'Fundação & Planejamento' };
}

function getRecommendedAi(stepId: string): string {
  if (stepId === '04-01' || stepId === '05-04') return 'Google Flow / Leonardo.ai / Ideogram / Midjourney';
  if (stepId === '05-01' || stepId === '06-02') return 'Google AI Studio / Arena.ai / Manus / Claude Artifacts';
  if (stepId.startsWith('06')) return 'Bolt.new / Arena.ai / ChatGPT';
  return 'ChatGPT / Claude / Gemini';
}

// Extract the 27 official prompts directly from the 87 steps
export const CURRICULUM_27_PROMPTS: HubPrompt[] = [];

MODULES.forEach(mod => {
  mod.steps.forEach(step => {
    if (step.prompt) {
      const { category, label } = getCategoryForStep(step.id);
      CURRICULUM_27_PROMPTS.push({
        id: `prompt-${step.id}`,
        category,
        categoryLabel: label,
        title: step.prompt.title,
        objective: step.prompt.objective,
        whenToUse: step.prompt.whenToUse,
        generatePrompt: step.prompt.generatePrompt,
        instructions: step.prompt.instructions,
        recommendedAi: getRecommendedAi(step.id),
        linkedStepId: step.id,
        outputField: step.prompt.outputField
      });
    }
  });
});

// Additional commercial scripts for Plano Completo
export const COMMERCIAL_SCRIPTS: HubPrompt[] = [
  {
    id: 'hp-11',
    category: 'comercial',
    categoryLabel: 'Comercial (Plano Completo)',
    title: 'Script de Abordagem no WhatsApp para Novos Clientes',
    objective: 'Mensagem de primeiro contato sem parecer vendedor chato ou invasivo.',
    whenToUse: 'No Plano Completo — Módulo 05 para fechar os primeiros clientes de R$ 1.500 a R$ 3.500.',
    recommendedAi: 'Uso Direto no WhatsApp',
    linkedStepId: 'pc-05',
    instructions: [
      '1. Localize no Google Maps empresas da sua cidade com sites desatualizados ou sem site.',
      '2. Personalize o nome do responsável e envie a mensagem.'
    ],
    generatePrompt: (p: BusinessProject) => replaceTokens(`Olá, [Nome do Responsável / Dr(a). Fulano], tudo bem?

Meu nome é [Seu Nome], atuo com posicionamento digital e criação de sites de alta conversão aqui em [[CIDADE]].

Estive pesquisando sobre [[SEGMENTO]] na nossa região e notei que a [Nome da Empresa do Cliente] tem um trabalho excelente, mas hoje quando um cliente pesquisa pelo seu serviço no Google ou Instagram, ele não encontra uma página institucional rápida com botão direto para o WhatsApp.

Eu desenvolvi um modelo de apresentação interativa focado exclusivamente em atrair contatos e agendamentos pelo WhatsApp para este segmento.

Gravei um vídeo rápido de 2 minutos mostrando como ficaria a presença digital da sua empresa. Posso te enviar o link por aqui para você dar uma olhada, sem compromisso nenhum?`, p)
  },
  {
    id: 'hp-12',
    category: 'comercial',
    categoryLabel: 'Comercial (Plano Completo)',
    title: 'Modelo de Proposta Comercial Irrecusável (Escopo Fechado)',
    objective: 'Proposta estruturada que protege contra retrabalho infinito e justifica o valor cobrado.',
    whenToUse: 'No Plano Completo — Módulo 07 para enviar aos clientes interessados.',
    recommendedAi: 'Uso Direto em PDF ou Web',
    linkedStepId: 'pc-07',
    instructions: [
      '1. Preencha os dados do cliente e os valores acordados.',
      '2. Envie em PDF ou página web.',
      '3. Aguarde a confirmação dos 50% de entrada para iniciar.'
    ],
    generatePrompt: (p: BusinessProject) => replaceTokens(`# PROPOSTA COMERCIAL: SITE INSTITUCIONAL DE ALTA CONVERSÃO
Cliente: [Nome da Empresa do Cliente]
Elaborado por: [Seu Nome / Sua Marca]
Data: ${new Date().toLocaleDateString('pt-BR')}

---

## 1. O OBJETIVO DO PROJETO
Construir e colocar no ar o site institucional oficial da [Empresa do Cliente], projetado para transmitir autoridade imediata, carregar com velocidade máxima no celular e canalizar 100% dos visitantes interessados diretamente para o WhatsApp comercial da sua equipe.

---

## 2. ESCOPO DO SITE
- **Página Inicial (Hero Section)**: Apresentação de alto impacto com proposta de valor e botão de agendamento.
- **Seção de Especialidades & Serviços**: Detalhamento dos serviços oferecidos com foco no benefício.
- **Sobre a Empresa / Profissional**: Apresentação da história e credenciais que geram confiança.
- **Diferenciais Competitivos**: Motivos claros para o cliente escolher a sua empresa.
- **Perguntas Frequentes (FAQ)**: Resposta rápida para as 5 principais dúvidas e quebra de objeções.
- **Botão Flutuante de WhatsApp**: Atendimento a 1 clique em todas as páginas.
- **Otimização para Celulares**: Visualização impecável em iPhone e Android.
- **Indexação no Google**: Configuração básica para ser encontrado em pesquisas locais.

---

## 3. PRAZO DE ENTREGA
- **Entrega da versão de aprovação**: 5 dias úteis após recebimento das informações básicas.
- **Ajustes e Publicação Oficial**: 48 horas após sua aprovação.

---

## 4. INVESTIMENTO E FORMAS DE PAGAMENTO
- **Opção à Vista**: R$ 1.800,00 (via Pix com 5% de desconto: R$ 1.710,00)
- **Opção Parcelada**: 50% de entrada (R$ 900,00) na assinatura + 50% na publicação oficial do site no ar.
- *(Também disponível em até 12x no cartão de crédito)*

---

## 5. BÔNUS EXCLUSIVO DESTE MÊS
- **Bônus 1**: Configuração e otimização do Google Meu Negócio / Maps.
- **Bônus 2**: 30 dias de suporte técnico e pequenas alterações inclusos sem custo.`, p)
  },
  {
    id: 'hp-13',
    category: 'comercial',
    categoryLabel: 'Comercial (Plano Completo)',
    title: 'Contrato Simplificado de Prestação de Serviços (Cláusulas de Proteção)',
    objective: 'Modelo de contrato com proteção de escopo, parcelas (50/50), prazos e limites de revisão.',
    whenToUse: 'No Plano Completo — Módulo 10 para formalizar antes de iniciar o desenvolvimento.',
    recommendedAi: 'Uso Direto em Documento',
    linkedStepId: 'pc-10',
    instructions: [
      '1. Use este modelo para proteger seu tempo.',
      '2. A cláusula de limite de 2 rodadas de ajustes evita pedidos eternos de alteração.',
      '3. A regra de 50% de entrada garante seu pagamento inicial.'
    ],
    generatePrompt: (p: BusinessProject) => replaceTokens(`CONTRATO SIMPLIFICADO DE PRESTAÇÃO DE SERVIÇOS DIGITAIS

CONTRATADA: [Seu Nome / Razão Social], CPF/CNPJ: [Seu Documento], residente em [[CIDADE]].
CONTRATANTE: [Nome do Cliente], CPF/CNPJ: [Documento do Cliente], com sede em [Endereço do Cliente].

CLÁUSULA 1ª — DO OBJETO:
A CONTRATADA compromete-se a desenvolver o Site Institucional de Apresentação da CONTRATANTE, composto pelas seções previamente definidas na Proposta Comercial (Hero, Serviços, Sobre, Diferenciais, FAQ e Contato).
Parágrafo Único: Fica expressamente ajustado que o presente contrato NÃO engloba loja virtual, sistemas complexos de estoque, gestão de pagamentos internos ou funções de marketplace.

CLÁUSULA 2ª — DO VALOR E FORMA DE PAGAMENTO:
Pelos serviços acordados, a CONTRATANTE pagará à CONTRATADA o valor total de R$ [Valor Total, ex: 1.800,00], sendo:
a) 50% (R$ [Valor Entrada]) pagos no ato da assinatura deste contrato, antes do início do desenvolvimento;
b) 50% (R$ [Valor Restante]) pagos impreterivelmente na data de entrega e publicação oficial do site.

CLÁUSULA 3ª — DOS PRAZOS E REVISÕES:
A CONTRATADA entregará a prévia do site no ar em até 7 (sete) dias úteis após a entrega das informações por parte da CONTRATANTE.
A CONTRATANTE terá direito a até 2 (duas) rodadas de ajustes pontuais de texto, imagens e cores. Modificações estruturais que fujam ao escopo acordado serão orçadas separadamente.

CLÁUSULA 4ª — DO SUPORTE E MANUTENÇÃO:
A CONTRATADA fornecerá garantia e suporte para correção de eventuais inconsistências por 30 (trinta) dias após o lançamento. Serviços de atualização mensal posterior poderão ser contratados sob plano de manutenção avulso.

[[CIDADE]], [Data].
__________________________           __________________________
CONTRATADA                           CONTRATANTE`, p)
  }
];

export const ALL_HUB_PROMPTS: HubPrompt[] = [
  ...CURRICULUM_27_PROMPTS,
  ...COMMERCIAL_SCRIPTS
];
