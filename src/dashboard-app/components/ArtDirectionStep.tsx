import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Copy, 
  Check, 
  Lightbulb, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Camera, 
  CheckSquare, 
  Square, 
  HelpCircle, 
  Eye, 
  Sun, 
  Users, 
  Store, 
  Wand2, 
  FileText, 
  ExternalLink,
  Info
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export const ArtDirectionStep: React.FC<{
  onComplete?: () => void;
}> = ({ onComplete }) => {
  const { project, completeStep, isStepCompleted } = useProject();
  const isCompleted = isStepCompleted('04-01');

  // Copy states for the 4 prompts
  const [copiedPrompt21, setCopiedPrompt21] = useState(false);
  const [copiedIdeas, setCopiedIdeas] = useState(false);
  const [copiedTransform, setCopiedTransform] = useState(false);
  const [copiedEnhance, setCopiedEnhance] = useState(false);

  // Business info fallback
  const businessName = project.name ? project.name.trim() : 'Minha Empresa';
  const businessSegment = project.segment ? project.segment.trim() : 'Serviços Profissionais';
  const businessCity = project.city ? project.city.trim() : 'Brasil';
  const businessAudience = project.targetAudience ? project.targetAudience.trim() : 'Clientes em busca de serviços confiáveis';
  const businessTone = project.communicationTone ? project.communicationTone.trim() : 'Profissional, acolhedor e seguro';
  const businessDiffs = project.differentials && project.differentials.length > 0
    ? project.differentials.filter(Boolean).join(', ')
    : 'Atendimento humanizado, pontualidade e excelência na entrega';
  const businessServices = project.services && project.services.length > 0
    ? project.services.map(s => s.title).join(', ')
    : 'Serviços especializados do segmento';

  // 1. PROMPT 21 — GUIA DE DIREÇÃO DE ARTE FOTOGRÁFICA
  const prompt21Text = `Atue como diretor de arte e fotógrafo comercial especializado em fotografia para websites profissionais.

Analise as informações deste negócio:

Nome: ${businessName}
Segmento: ${businessSegment}
Cidade: ${businessCity}
Público-alvo: ${businessAudience}
Tom da marca: ${businessTone}
Diferenciais: ${businessDiffs}

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

As recomendações devem ser específicas para este negócio, práticas e fáceis de aplicar.

Não use clichês genéricos de marketing.
Não invente características que não foram fornecidas.
Priorize autenticidade, profissionalismo, coerência visual e qualidade fotográfica.`;

  // 2. PROMPT — IDEIAS DE FOTOGRAFIAS PARA O SITE
  const promptIdeasText = `Atue como diretor de fotografia e estrategista visual para websites profissionais.

Com base nos dados abaixo:

Nome: ${businessName}
Segmento: ${businessSegment}
Cidade: ${businessCity}
Público-alvo: ${businessAudience}
Serviços: ${businessServices}
Diferenciais: ${businessDiffs}
Tom da marca: ${businessTone}

Crie uma lista objetiva de fotografias recomendadas para este website.

Para cada fotografia informe:

1. Nome da fotografia
2. Onde ela pode ser utilizada no site
3. O que deve aparecer na cena
4. Enquadramento recomendado
5. Iluminação recomendada
6. Sensação que a imagem deve transmitir
7. Se é melhor utilizar fotografia real, fotografia gerada por IA ou fotografia real melhorada por IA.

Priorize fotografias que ajudem o visitante a entender o negócio e aumentem a percepção de profissionalismo.

Não invente ambientes, pessoas, equipamentos ou características que não foram informados.`;

  // 3. PROMPT — TRANSFORMAR IDEIA EM PROMPT DE FOTOGRAFIA
  const promptTransformText = `Atue como especialista em fotografia comercial e geração de imagens por inteligência artificial.

Transforme a seguinte ideia de fotografia em um prompt profissional em inglês para um gerador de imagens:

[COLE AQUI A IDEIA DA FOTOGRAFIA]

O prompt deve especificar:

* sujeito principal
* ambiente
* composição
* enquadramento
* perspectiva da câmera
* iluminação
* profundidade de campo
* atmosfera
* estilo fotográfico
* nível de realismo
* espaço negativo quando necessário para textos de website

A imagem deve parecer uma fotografia comercial profissional, natural e realista.

Não adicione características que não estejam presentes na ideia original.

Entregue apenas o prompt final em inglês, pronto para copiar.`;

  // 4. PROMPT — MELHORAR FOTO REAL DO MEU NEGÓCIO
  const promptEnhanceText = `Enhance this real photograph for professional website use while preserving its authenticity.

Preserve the original people, architecture, environment, products, furniture, branding, logos and essential characteristics exactly as they are.

Improve exposure, lighting, sharpness, color balance, dynamic range, image clarity, composition and overall photographic quality.

Correct minor photographic imperfections when appropriate, but do not alter the identity of the business.

Do not invent new people, products, furniture, architectural elements, logos, services or business features.

Keep the result natural, realistic and suitable for a premium professional website.

The final image must still look like a real photograph of the original business, not an artificial recreation.`;

  // Checklist state
  const [checks, setChecks] = useState<{ [key: string]: boolean }>({
    definedStyle: true,
    knowPhotos: true,
    producedOrSelected: false,
    choseBest: false,
    savedFiles: false,
    readyForMasterPrompt: false
  });

  const toggleCheck = (key: string) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2500);
  };

  const handleFinalize = () => {
    completeStep('04-01', true);
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* MAPA DO MÓDULO 04 */}
      <div className="p-4 bg-[#0B1535] border border-[#203252] rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00D4E8]/10 text-[#00D4E8] flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-sm font-bold uppercase tracking-wider text-[#00D4E8]">
              Módulo 04 — Prepare as Imagens
            </span>
            <p className="text-sm text-[#F5F7FF] font-medium">
              Direção de arte fotográfica e comandos profissionais para gerar ou aprimorar imagens com IA:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="p-2.5 rounded-lg bg-[#080D20] border border-[#203252] space-y-0.5">
            <span className="text-[#00D4E8] font-bold block text-sm">Direção de Arte</span>
            <span className="text-[#AAB6CC]">Define <strong>estilo visual e regras</strong> para fotos profissionais e autênticas.</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#111B36] border border-[#00D4E8]/40 space-y-0.5">
            <span className="text-[#00E599] font-bold block text-sm">Prompts Especialistas</span>
            <span className="text-[#F5F7FF]">Prompts para <strong>criar novas fotos ou aprimorar</strong> fotos reais do negócio.</span>
          </div>
        </div>
      </div>

      {/* 1. BÚSSOLA DA ETAPA (5 Perguntas de Orientação) */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-5 md:p-6 shadow-lg shadow-black/20">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#00D4E8]/10 text-[#00D4E8] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#00D4E8]">
              Bússola da Etapa
            </h3>
            <h4 className="text-base md:text-base font-bold text-[#F5F7FF]">
              Antes de escolher ou criar suas fotos, pense nestas 5 perguntas:
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252]/60 space-y-1">
            <span className="text-sm font-bold text-[#00D4E8] block">1. Sensação</span>
            <p className="text-sm text-[#AAB6CC] leading-relaxed">
              Que sensação quero transmitir? Confiança, sofisticação, acolhimento, agilidade?
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252]/60 space-y-1">
            <span className="text-sm font-bold text-[#00D4E8] block">2. Representação</span>
            <p className="text-sm text-[#AAB6CC] leading-relaxed">
              Como meu negócio deve aparecer? Estrutura organizada, moderna e acolhedora.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252]/60 space-y-1">
            <span className="text-sm font-bold text-[#00D4E8] block">3. Destaque</span>
            <p className="text-sm text-[#AAB6CC] leading-relaxed">
              Quais elementos precisam estar em foco? As ferramentas de trabalho e o resultado do serviço.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252]/60 space-y-1">
            <span className="text-sm font-bold text-[#00D4E8] block">4. Luz & Ângulo</span>
            <p className="text-sm text-[#AAB6CC] leading-relaxed">
              Que iluminação e enquadramento combinam com a marca? Luz natural e planos médios limpos.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252]/60 space-y-1">
            <span className="text-sm font-bold text-[#00D4E8] block">5. O que evitar</span>
            <p className="text-sm text-[#AAB6CC] leading-relaxed">
              Evite poses forçadas, fundos bagunçados e visual genérico de banco de imagens americano.
            </p>
          </div>
        </div>
      </div>

      {/* 2. POR QUE ESTA ETAPA É FUNDAMENTAL */}
      <div className="bg-[#0B1535] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-3">
        <div className="flex items-center gap-2 text-[#00D4E8] text-sm font-bold uppercase tracking-wider">
          <Sparkles className="w-5 h-5" />
          <span>Por Que Esta Etapa É Fundamental</span>
        </div>
        <p className="text-sm md:text-sm text-[#F5F7FF] leading-relaxed">
          Fotografias não são apenas decoração. Elas ajudam o visitante a entender o ambiente, os serviços, o profissionalismo e a personalidade do negócio em frações de segundo.
        </p>
        <p className="text-sm md:text-sm text-[#AAB6CC] leading-relaxed">
          Uma identidade visual consistente exige que as fotografias tenham uma linguagem semelhante. Não adianta ter uma imagem sofisticada no topo (Hero), outra com filtro amarelado amador na seção de serviços e outra com estética americana de banco de imagens falso. O segredo é a <strong>coerência visual</strong>.
        </p>
      </div>

      {/* 3. DIFERENCIE FOTO REAL, FOTO GERADA E FOTO MELHORADA */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base md:text-base font-bold text-[#F5F7FF] flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#00D4E8]" />
            <span>Você pode trabalhar com três tipos de imagens</span>
          </h3>
          <p className="text-sm text-[#AAB6CC] mt-1">
            Conheça as três opções disponíveis para compor o acervo visual do seu website:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#00D4E8]">
              <Store className="w-5 h-5" />
              <span>1. Fotografias Reais</span>
            </div>
            <p className="text-sm text-[#AAB6CC] leading-relaxed">
              Fotos feitas pelo próprio negócio, por um fotógrafo contratado ou pela câmera do seu celular com boa luz.
            </p>
            <div className="pt-2 text-sm text-[#00E599] font-medium border-t border-[#203252]/60">
              Ideal para: fachada, equipe real e ambiente físico autêntico.
            </div>
          </div>

          <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#00D4E8]">
              <Sparkles className="w-5 h-5" />
              <span>2. Fotografias Geradas por IA</span>
            </div>
            <p className="text-sm text-[#AAB6CC] leading-relaxed">
              Imagens criadas artificialmente para representar conceitos, detalhes de serviços ou situações comerciais adequadas.
            </p>
            <div className="pt-2 text-sm text-[#00D4E8] font-medium border-t border-[#203252]/60">
              Ideal para: banners conceituais do Hero e ilustrações de serviços.
            </div>
          </div>

          <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#00D4E8]">
              <Wand2 className="w-5 h-5" />
              <span>3. Fotos Reais Melhoradas por IA</span>
            </div>
            <p className="text-sm text-[#AAB6CC] leading-relaxed">
              Fotos reais do seu celular que passam por IA para melhorar iluminação, nitidez, balanço de cores e resolução.
            </p>
            <div className="pt-2 text-sm text-[#F59E0B] font-medium border-t border-[#203252]/60">
              Ideal para: transformar fotos simples em imagens com padrão de estúdio.
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-[#111B36] border-l-4 border-[#00D4E8] rounded-r-xl text-sm text-[#F5F7FF] leading-relaxed">
          <strong className="text-[#00D4E8]">Regra de Ouro da Autenticidade:</strong> Quando o objetivo for representar o espaço ou a equipe real do negócio, fotografias reais são sempre preferíveis, pois evitam criar uma representação falsa do estabelecimento perante os clientes da sua cidade.
        </div>
      </div>

      {/* 4. DEFINA A DIREÇÃO DE ARTE DAS SUAS FOTOGRAFIAS */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base md:text-base font-bold text-[#F5F7FF] flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#00D4E8]" />
            <span>Defina a direção de arte das suas fotografias</span>
          </h3>
          <p className="text-sm text-[#AAB6CC] mt-1">
            Direção de arte significa estabelecer regras visuais antes de produzir, selecionar ou gerar as imagens. Siga estes 4 pilares:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Pilar 1 */}
          <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#00D4E8]">
              <Layers className="w-5 h-5" />
              <span>1. Enquadramento e Composição</span>
            </div>
            <ul className="text-sm text-[#AAB6CC] space-y-1.5 list-disc list-inside">
              <li><strong>Horizontal vs Vertical:</strong> Priorize fotos horizontais (16:9) para banners e Hero; verticais ou quadradas (1:1) para cartões de serviços.</li>
              <li><strong>Espaço Negativo:</strong> Deixe áreas limpas na lateral para que textos e botões fiquem perfeitamente legíveis sobre a foto.</li>
              <li><strong>Distância Focal:</strong> Alterne entre planos abertos (ambiente geral) e planos médios/close-ups (detalhes do serviço).</li>
              <li><strong>Foco Definido:</strong> O elemento principal (profissional ou produto) deve estar nítido, com fundo suavemente desfocado.</li>
            </ul>
          </div>

          {/* Pilar 2 */}
          <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#00D4E8]">
              <Sun className="w-5 h-5" />
              <span>2. Iluminação Profissional</span>
            </div>
            <ul className="text-sm text-[#AAB6CC] space-y-1.5 list-disc list-inside">
              <li><strong>Luz Natural:</strong> Aproveite a luz indireta do dia (perto de janelas ou portas) para tons suaves e acolhedores.</li>
              <li><strong>Evite Sombras Duras:</strong> Não use flash direto de celular, pois ele cria sombras pretas fortes e aspecto amador.</li>
              <li><strong>Tom de Pele Fiel:</strong> Mantenha as cores da pele naturais, sem filtros amarelados, alaranjados ou azuis pesados.</li>
              <li><strong>Ambientes Claros:</strong> Fotografe ambientes bem iluminados para transmitir higiene, modernidade e amplitude.</li>
            </ul>
          </div>

          {/* Pilar 3 */}
          <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#00D4E8]">
              <Users className="w-5 h-5" />
              <span>3. Pessoas e Atendimento</span>
            </div>
            <ul className="text-sm text-[#AAB6CC] space-y-1.5 list-disc list-inside">
              <li><strong>Postura Natural:</strong> Mostre o profissional focado no trabalho ou atendendo com atenção real, sem poses de estátua.</li>
              <li><strong>Expressões Autênticas:</strong> Sorriso leve, acolhedor e olhar confiante transmitem receptividade imediata.</li>
              <li><strong>Vestimenta Coerente:</strong> Uniformes alinhados, crachás limpos ou trajes adequados ao seu segmento de atuação.</li>
              <li><strong>Sem Poses Falsas:</strong> Fuja dos clichês de banco de imagens (como aperto de mãos olhando para a câmera com fundo branco).</li>
            </ul>
          </div>

          {/* Pilar 4 */}
          <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#00D4E8]">
              <Store className="w-5 h-5" />
              <span>4. Ambiente e Detalhes</span>
            </div>
            <ul className="text-sm text-[#AAB6CC] space-y-1.5 list-disc list-inside">
              <li><strong>Organização Impecável:</strong> Retire fios aparentes, papéis espalhados, copos descartáveis e objetos desnecessários.</li>
              <li><strong>Ferramentas de Trabalho:</strong> Destaque os equipamentos, produtos e instrumentos reais que demonstram domínio técnico.</li>
              <li><strong>Limpeza Visual:</strong> Um ambiente clean transmite higiene e organização administrativa do negócio.</li>
              <li><strong>Identidade da Marca:</strong> Quando possível, inclua sutilmente o logotipo ou cores da marca em cartazes, uniformes ou balcões.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. PROMPT 21 — GUIA DE DIREÇÃO DE ARTE FOTOGRÁFICA */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] block">
              Comando Pré-Configurado com Seus Dados
            </span>
            <h4 className="text-base md:text-base font-bold text-[#F5F7FF]">
              PROMPT 21 — GUIA DE DIREÇÃO DE ARTE FOTOGRÁFICA
            </h4>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(prompt21Text, setCopiedPrompt21)}
            className="btn-cta px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {copiedPrompt21 ? (
              <>
                <Check className="w-5 h-5 text-[#00E599]" />
                <span className="text-[#00E599]">Prompt Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>COPIAR PROMPT 21</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-1 text-sm text-[#AAB6CC]">
          <p><strong>Objetivo:</strong> Criar orientações práticas para produzir fotografias coerentes com a identidade do negócio.</p>
          <p><strong>Quando usar:</strong> Antes de fotografar, selecionar ou gerar imagens para o site no ChatGPT, Claude ou Gemini.</p>
        </div>

        <div className="bg-[#080D20] border border-[#203252] rounded-xl p-4 text-sm font-mono text-[#F5F7FF] leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
          {prompt21Text}
        </div>

        <div className="p-3 bg-[#080D20] border border-[#203252] rounded-xl text-sm text-[#AAB6CC] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#00D4E8] shrink-0" />
          <span>A IA responderá com 10 tópicos estratégicos cobrindo enquadramentos, regras de luz e 5 leis visuais inegociáveis para o seu nicho.</span>
        </div>
      </div>

      {/* 6. PROMPT — IDEIAS DE FOTOGRAFIAS PARA O SITE */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] block">
              Mapeamento de Cenas Necessárias
            </span>
            <h4 className="text-base md:text-base font-bold text-[#F5F7FF]">
              PROMPT — IDEIAS DE FOTOGRAFIAS PARA O SITE
            </h4>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(promptIdeasText, setCopiedIdeas)}
            className="btn-cta px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {copiedIdeas ? (
              <>
                <Check className="w-5 h-5 text-[#00E599]" />
                <span className="text-[#00E599]">Prompt Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>COPIAR PROMPT DE IDEIAS</span>
              </>
            )}
          </button>
        </div>

        <p className="text-sm text-[#AAB6CC] leading-relaxed">
          <strong>Objetivo:</strong> Descobrir exatamente quais fotografias o seu negócio precisa ter em cada seção do site (Hero, Serviços, Sobre Nós e Rodapé):
        </p>

        <div className="bg-[#080D20] border border-[#203252] rounded-xl p-4 text-sm font-mono text-[#F5F7FF] leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
          {promptIdeasText}
        </div>

        <div className="p-3 bg-[#080D20] border border-[#203252] rounded-xl text-sm text-[#AAB6CC] flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#F59E0B] shrink-0" />
          <span>A IA informará o nome da foto, onde ela entra no site, o que deve aparecer e se é melhor usar foto real ou gerada.</span>
        </div>
      </div>

      {/* 7. PROMPT — TRANSFORMAR IDEIA EM PROMPT DE FOTOGRAFIA */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] block">
              Gerador de Comandos em Inglês
            </span>
            <h4 className="text-base md:text-base font-bold text-[#F5F7FF]">
              PROMPT — TRANSFORMAR IDEIA EM PROMPT DE FOTOGRAFIA
            </h4>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(promptTransformText, setCopiedTransform)}
            className="btn-cta px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {copiedTransform ? (
              <>
                <Check className="w-5 h-5 text-[#00E599]" />
                <span className="text-[#00E599]">Prompt Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>COPIAR PROMPT GERADOR</span>
              </>
            )}
          </button>
        </div>

        <p className="text-sm text-[#AAB6CC] leading-relaxed">
          Use este comando quando você já souber qual foto deseja criar (ex: <em>"Quero uma foto do meu consultório com uma mesa de atendimento limpa e um profissional sorrindo"</em>) e quiser que a IA transforme sua ideia em um comando técnico em inglês para Midjourney, Leonardo.ai ou Ideogram:
        </p>

        <div className="bg-[#080D20] border border-[#203252] rounded-xl p-4 text-sm font-mono text-[#F5F7FF] leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
          {promptTransformText}
        </div>
      </div>

      {/* 8. JÁ POSSUI FOTOGRAFIAS? + PROMPT MELHORAR FOTO REAL */}
      <div className="bg-[#0B1535] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] block">
              Para Suas Próprias Fotos Reais
            </span>
            <h4 className="text-base md:text-base font-bold text-[#F5F7FF]">
              PROMPT — MELHORAR FOTO REAL DO MEU NEGÓCIO
            </h4>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(promptEnhanceText, setCopiedEnhance)}
            className="btn-cta px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {copiedEnhance ? (
              <>
                <Check className="w-5 h-5 text-[#00E599]" />
                <span className="text-[#00E599]">Prompt Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>COPIAR PROMPT DE MELHORIA</span>
              </>
            )}
          </button>
        </div>

        <p className="text-sm text-[#AAB6CC] leading-relaxed">
          Se você já possui fotografias reais do seu estabelecimento, produtos ou equipe tiradas com o celular, anexe a foto no chat da IA (ChatGPT Plus, Claude, Leonardo etc.) junto com este comando em inglês para aumentar a nitidez, iluminação e aspecto comercial sem alterar o espaço original:
        </p>

        <div className="bg-[#080D20] border border-[#203252] rounded-xl p-4 text-sm font-mono text-[#F5F7FF] leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
          {promptEnhanceText}
        </div>
      </div>

      {/* 9. FERRAMENTAS PARA EXECUTAR */}
      <div className="p-5 bg-[#080D20] border border-[#203252] rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-[#00D4E8] text-sm font-bold uppercase tracking-wider">
          <Layers className="w-5 h-5" />
          <span>Onde utilizar estes prompts</span>
        </div>
        <p className="text-sm text-[#AAB6CC] leading-relaxed">
          Os prompts de <strong>Direção de Arte</strong> e <strong>Ideias de Fotos</strong> são estratégicos e funcionam perfeitamente nos chats gratuitos do <strong>ChatGPT</strong>, <strong>Claude</strong> ou <strong>Google Gemini</strong>.
        </p>
        <p className="text-sm text-[#AAB6CC] leading-relaxed">
          Já os prompts de <strong>Geração ou Melhoria de Imagem</strong> podem ser testados no <strong>Google Flow</strong>, <strong>Leonardo.ai</strong>, <strong>Ideogram</strong>, <strong>Freepik Pikaso</strong>, <strong>Midjourney</strong> ou <strong>Higgsfield</strong>.
        </p>
        <div className="p-3 bg-[#111B36] border border-[#203252] rounded-xl text-sm text-[#F59E0B]">
          <strong>Lembrete:</strong> Você pode testar o mesmo comando em ferramentas diferentes e comparar os resultados. Os planos freemium geralmente oferecem créditos iniciais mais do que suficientes para produzir as fotos necessárias para o site.
        </div>
      </div>

      {/* 10. O QUE VOCÊ FAZ COM OS RESULTADOS (FLUXO EM 8 PASSOS) */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#00D4E8]">
          <Sparkles className="w-5 h-5" />
          <span>Depois de definir sua direção visual: O Fluxo Completo</span>
        </div>

        <p className="text-sm text-[#F5F7FF] leading-relaxed">
          Siga esta sequência prática para ter todas as suas fotografias prontas e organizadas:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-sm">
          <div className="p-3 bg-[#080D20] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">Passo 1</span>
            <p className="text-[#F5F7FF]">Defina a direção de arte com o Prompt 21</p>
          </div>
          <div className="p-3 bg-[#080D20] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">Passo 2</span>
            <p className="text-[#F5F7FF]">Descubra quais fotos seu site precisa</p>
          </div>
          <div className="p-3 bg-[#080D20] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">Passo 3</span>
            <p className="text-[#F5F7FF]">Fotografe, selecione ou gere as imagens</p>
          </div>
          <div className="p-3 bg-[#080D20] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">Passo 4</span>
            <p className="text-[#F5F7FF]">Melhore as fotos existentes com IA</p>
          </div>
          <div className="p-3 bg-[#080D20] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">Passo 5</span>
            <p className="text-[#F5F7FF]">Compare as opções geradas lado a lado</p>
          </div>
          <div className="p-3 bg-[#080D20] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">Passo 6</span>
            <p className="text-[#F5F7FF]">Escolha as melhores para representar a marca</p>
          </div>
          <div className="p-3 bg-[#080D20] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">Passo 7</span>
            <p className="text-[#F5F7FF]">Baixe e guarde os arquivos no computador</p>
          </div>
          <div className="p-3 bg-[#080D20] border border-[#00D4E8] rounded-lg bg-[#00D4E8]/5">
            <span className="text-[#00E599] font-bold block mb-1">Passo 8</span>
            <p className="text-[#00E599] font-medium">Use com o Prompt Mestre Final</p>
          </div>
        </div>
      </div>

      {/* 11. CONEXÃO COM O PROMPT MESTRE FINAL */}
      <div className="bg-[#080D20] border-2 border-[#00D4E8]/40 rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2.5 text-[#00D4E8]">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <h4 className="text-base md:text-base font-bold text-[#F5F7FF]">
            Conexão com o Prompt Mestre Final (Módulo 06)
          </h4>
        </div>

        <p className="text-sm md:text-sm text-[#F5F7FF] leading-relaxed">
          Você <strong>não precisa enviar nem salvar as fotos dentro desta tela</strong>. Guarde os arquivos no seu computador. Quando chegar na etapa de execução do <strong>Prompt Mestre Final</strong>, você anexará essas fotos no chat da ferramenta de IA (Arena.ai, Manus, Google AI Studio, Claude ou Bolt.new).
        </p>

        <div className="p-4 bg-[#111B36] border border-[#203252] rounded-xl space-y-2">
          <span className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] block">
            Instrução que o Prompt Mestre já levará para a IA:
          </span>
          <p className="text-sm font-mono text-[#AAB6CC] leading-relaxed italic">
            "IMAGENS DE REFERÊNCIA FORNECIDAS PELO USUÁRIO: As imagens anexadas a este prompt foram selecionadas pelo proprietário do negócio como referências visuais oficiais para este projeto. Analise cada imagem e utilize-a de maneira coerente na seção correspondente do website. Preserve a identidade visual, características, ambiente, pessoas e elementos relevantes apresentados nas imagens. Não contradiga ou substitua informações visuais reais fornecidas pelo usuário."
          </p>
        </div>
      </div>

      {/* 12. CHECKLIST INTERATIVO DE CONCLUSÃO */}
      <div className="bg-[#080D20] border-2 border-[#203252] rounded-2xl p-5 md:p-6 space-y-5">
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] block">
            Sua Tarefa Interativa
          </span>
          <h4 className="text-base md:text-base font-bold text-[#F5F7FF]">
            Depois de produzir suas imagens: Confirme os passos para avançar
          </h4>
        </div>

        <div className="space-y-2.5">
          {[
            { key: 'definedStyle', label: 'Defini o estilo visual e as regras de iluminação e enquadramento para o negócio' },
            { key: 'knowPhotos', label: 'Sei quais fotografias preciso para cada seção do site (Hero, serviços, ambiente)' },
            { key: 'producedOrSelected', label: 'Produzi, selecionei ou gerei minhas imagens com IA' },
            { key: 'choseBest', label: 'Escolhi as melhores e mais coerentes para compor a página' },
            { key: 'savedFiles', label: 'Baixei e guardei os arquivos em uma pasta no meu computador ou celular' },
            { key: 'readyForMasterPrompt', label: 'Estou pronto para anexá-las posteriormente junto com o Prompt Mestre Final' }
          ].map(item => {
            const isChecked = !!checks[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleCheck(item.key)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-[#111B36] border-[#00D4E8]/50 text-[#F5F7FF]'
                    : 'bg-[#080D20] border-[#203252] text-[#AAB6CC] hover:border-[#203252]'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-[#00D4E8]">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-[#00D4E8]" />
                  ) : (
                    <Square className="w-5 h-5 text-[#71809B]" />
                  )}
                </div>
                <span className="text-sm font-medium leading-relaxed">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#203252]">
          <span className="text-sm text-[#71809B]">
            {isCompleted ? '✓ Etapa concluída no seu progresso.' : 'Marque os passos acima e conclua esta etapa.'}
          </span>

          <button
            type="button"
            onClick={handleFinalize}
            className="btn-cta w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isCompleted ? 'Etapa Concluída (Salvar Novamente)' : 'Concluir Etapa e Continuar'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
