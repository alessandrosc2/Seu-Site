import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  FolderDown, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Lightbulb,
  CheckSquare,
  Square,
  HelpCircle,
  Wand2,
  Image as ImageIcon
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export const ImageGuideStep: React.FC<{
  onComplete?: () => void;
}> = ({ onComplete }) => {
  const { project, completeStep, isStepCompleted } = useProject();
  const isCompleted = isStepCompleted('04-01');

  // Copy states
  const [copiedGen, setCopiedGen] = useState(false);
  const [copiedEnhance, setCopiedEnhance] = useState(false);

  // Business info for prompts
  const businessSegment = project.segment ? project.segment.trim() : 'serviços profissionais';
  const businessName = project.name ? project.name.trim() : 'Minha Empresa';
  const businessCity = project.city ? `${project.city.trim()}, Brasil` : 'Brasil';

  // 1. Generation Prompt
  const promptGeneration = `A high-end commercial photograph for a modern ${businessSegment} named "${businessName}", located in ${businessCity}. Show a realistic professional environment, authentic details, natural human interaction, premium commercial photography, realistic skin texture, natural lighting, sophisticated composition, clean background, professional visual identity, photorealistic, high detail, editorial commercial photography --ar 16:9`;

  // 2. Enhancement Prompt
  const promptEnhancement = `Enhance this real business photograph for professional website use. Preserve the original identity, architecture, people, products, furniture, branding and essential details exactly as they are. Improve lighting, exposure, sharpness, color balance, dynamic range, image clarity and overall photographic quality. Remove distracting visual imperfections only when appropriate. Create a natural, realistic and premium commercial photography look. Do not invent new architectural elements, products, people, logos or business features. Do not alter the identity of the business. Keep the result photorealistic and authentic.`;

  // Checklist state (persisted or local)
  const [checks, setChecks] = useState<{ [key: string]: boolean }>({
    tested: true,
    chosen: true,
    downloaded: false,
    savedForPrompt: false
  });

  const toggleCheck = (key: string) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyGen = () => {
    navigator.clipboard.writeText(promptGeneration);
    setCopiedGen(true);
    setTimeout(() => setCopiedGen(false), 2500);
  };

  const handleCopyEnhance = () => {
    navigator.clipboard.writeText(promptEnhancement);
    setCopiedEnhance(true);
    setTimeout(() => setCopiedEnhance(false), 2500);
  };

  const handleFinalize = () => {
    completeStep('04-01', true);
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. BÚSSOLA DA ETAPA (5 Perguntas de Orientação) */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-5 md:p-6 shadow-lg shadow-black/20">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#00D4E8]/10 text-[#00D4E8] flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8]">
              Bússola da Etapa
            </h3>
            <h4 className="text-sm md:text-base font-bold text-[#F5F7FF]">
              5 Perguntas de Orientação Estratégica
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252]/60 space-y-1">
            <span className="text-[11px] font-bold text-[#00D4E8] block">1. Quais imagens preciso?</span>
            <p className="text-xs text-[#AAB6CC] leading-relaxed">
              Fotos que mostrem seu ambiente de trabalho, profissionais em atendimento e serviços em destaque.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252]/60 space-y-1">
            <span className="text-[11px] font-bold text-[#00D4E8] block">2. Posso criar com IA?</span>
            <p className="text-xs text-[#AAB6CC] leading-relaxed">
              Sim! As IAs modernas geram fotografias comerciais fotorrealistas em segundos sem necessidade de estúdio.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252]/60 space-y-1">
            <span className="text-[11px] font-bold text-[#00D4E8] block">3. Quais ferramentas usar?</span>
            <p className="text-xs text-[#AAB6CC] leading-relaxed">
              Google Flow, Leonardo.ai, Ideogram, Freepik Pikaso, Midjourney ou Higgsfield.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252]/60 space-y-1">
            <span className="text-[11px] font-bold text-[#00D4E8] block">4. Como escolher a melhor?</span>
            <p className="text-xs text-[#AAB6CC] leading-relaxed">
              Priorize iluminação natural, ambiente crível e alinhamento com a realidade do seu público.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252]/60 space-y-1">
            <span className="text-[11px] font-bold text-[#00D4E8] block">5. Como usar no Prompt Mestre?</span>
            <p className="text-xs text-[#AAB6CC] leading-relaxed">
              Guarde os arquivos no computador e anexe-os junto com o Mega-Prompt no Módulo 06.
            </p>
          </div>
        </div>
      </div>

      {/* 2. POR QUE ESTA ETAPA É IMPORTANTE */}
      <div className="bg-[#0B1535] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-3">
        <div className="flex items-center gap-2 text-[#00D4E8] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Por Que Esta Etapa É Fundamental</span>
        </div>
        <p className="text-xs md:text-sm text-[#F5F7FF] leading-relaxed">
          As imagens são uma parte essencial da identidade visual e da percepção de valor do seu negócio na internet. Uma fotografia de alta qualidade ajuda o visitante a visualizar o seu ambiente, conhecer seus serviços, criar empatia instantânea e confiar na sua empresa antes mesmo do primeiro contato no WhatsApp.
        </p>
        <div className="p-3.5 bg-[#111B36] border-l-4 border-[#00D4E8] rounded-r-xl">
          <p className="text-xs md:text-sm text-[#00D4E8] font-medium leading-relaxed italic">
            "Você não precisa ter uma câmera profissional nem contratar um fotógrafo para começar. Hoje é possível criar imagens comerciais realistas utilizando ferramentas de inteligência artificial."
          </p>
        </div>
      </div>

      {/* 3. ONDE CRIAR SUAS IMAGENS (FERRAMENTAS) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm md:text-base font-bold text-[#F5F7FF] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00D4E8]" />
            <span>Onde criar suas imagens</span>
          </h3>
          <p className="text-xs text-[#AAB6CC] mt-1">
            Você pode testar diferentes ferramentas e escolher aquela que apresentar o melhor resultado para o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[
            {
              name: 'Google Flow',
              badge: 'IA Multimodal',
              desc: 'Geração visual intuitiva e experimentação rápida de conceitos e enquadramentos.',
              link: 'https://flow.google.com'
            },
            {
              name: 'Leonardo.ai',
              badge: 'Créditos Diários Grátis',
              desc: 'Excelente para fotografia comercial realista, texturas nítidas e controle de iluminação.',
              link: 'https://leonardo.ai'
            },
            {
              name: 'Ideogram',
              badge: 'Fácil & Gratuito',
              desc: 'Referência em renderizar textos perfeitos em placas, letreiros e cartazes com visual limpo.',
              link: 'https://ideogram.ai'
            },
            {
              name: 'Freepik Pikaso',
              badge: 'Rápido & Prático',
              desc: 'Geração em tempo real com interface simples, ideal para quem nunca mexeu com IA visual.',
              link: 'https://freepik.com/pikaso'
            },
            {
              name: 'Midjourney',
              badge: 'Padrão Editorial',
              desc: 'Padrão ouro em iluminação cinematográfica e realismo, executado via Discord.',
              link: 'https://midjourney.com'
            },
            {
              name: 'Higgsfield',
              badge: 'Comercial & Foco Humano',
              desc: 'Especializada em poses naturais, pessoas realistas e expressões autênticas de atendimento.',
              link: 'https://higgsfield.ai'
            }
          ].map((tool, idx) => (
            <div 
              key={idx}
              className="p-4 bg-[#080D20] border border-[#203252] rounded-xl flex flex-col justify-between hover:border-[#00D4E8]/50 transition-colors group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F5F7FF] group-hover:text-[#00D4E8] transition-colors">
                    {tool.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#111B36] border border-[#203252] text-[#00D4E8] font-medium">
                    {tool.badge}
                  </span>
                </div>
                <p className="text-[11px] text-[#AAB6CC] leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#203252]/60 flex items-center justify-between text-[11px] text-[#71809B]">
                <span>Acesse no navegador</span>
                <a 
                  href={tool.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#00D4E8] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Abrir</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Recomendações práticas */}
        <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2 text-xs">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
            <div className="space-y-1 text-[#AAB6CC]">
              <p>
                <strong>Dica de Economia:</strong> Para criar poucas imagens, os créditos iniciais ou planos gratuitos/freemium dessas ferramentas geralmente já são mais do que suficientes para você testar ideias e produzir as fotos do seu site sem gastar nada.
              </p>
              <p>
                <strong>Estratégia Recomendada:</strong> Você pode criar a mesma ideia em ferramentas diferentes, comparar os resultados lado a lado e escolher as que melhor representam seu negócio.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. O QUE VOCÊ PODE CRIAR (EXEMPLOS POR NICHO) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm md:text-base font-bold text-[#F5F7FF] flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#00D4E8]" />
            <span>O que você pode criar para o seu site</span>
          </h3>
          <p className="text-xs text-[#AAB6CC] mt-1">
            Pense nas imagens que realmente serão necessárias na estrutura do seu site. Veja exemplos por segmento:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00D4E8]">
              <span>✂️ Exemplo: Barbearia</span>
            </div>
            <ul className="text-xs text-[#AAB6CC] space-y-1.5 list-disc list-inside">
              <li>Foto principal do ambiente aconchegante</li>
              <li>Profissional atendendo um cliente</li>
              <li>Corte de cabelo em detalhe nítido</li>
              <li>Cuidado e acabamento com a barba</li>
              <li>Ambiente e estações organizadas</li>
            </ul>
          </div>

          <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00D4E8]">
              <span>🩺 Exemplo: Clínica / Saúde</span>
            </div>
            <ul className="text-xs text-[#AAB6CC] space-y-1.5 list-disc list-inside">
              <li>Recepção acolhedora e moderna</li>
              <li>Profissional em consulta ou atendimento</li>
              <li>Ambiente clínico limpo e iluminado</li>
              <li>Equipamentos de trabalho organizados</li>
              <li>Atenção humanizada e empatia</li>
            </ul>
          </div>

          <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00D4E8]">
              <span>🍽️ Exemplo: Restaurante</span>
            </div>
            <ul className="text-xs text-[#AAB6CC] space-y-1.5 list-disc list-inside">
              <li>Salão principal e mesas preparadas</li>
              <li>Prato estrela com iluminação apetitosa</li>
              <li>Chef ou cozinheiro finalizando pratos</li>
              <li>Atendimento atencioso e receptivo</li>
              <li>Fachada ou entrada convidativa</li>
            </ul>
          </div>
        </div>

        <div className="p-3 bg-[#111B36] border border-[#203252] rounded-xl text-xs text-[#AAB6CC]">
          <span className="text-[#00D4E8] font-bold">Lembrete:</span> Os exemplos acima são apenas ilustrativos. Pense nas imagens que valorizam o seu negócio ({project.name || 'sua empresa'}) e seus serviços cadastrados.
        </div>
      </div>

      {/* 5. PROMPT — GERAÇÃO DE FOTOGRAFIA PROFISSIONAL */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00D4E8] block">
              Comando Pré-Configurado com Seus Dados
            </span>
            <h4 className="text-sm md:text-base font-bold text-[#F5F7FF]">
              PROMPT — GERAÇÃO DE FOTOGRAFIA PROFISSIONAL
            </h4>
          </div>

          <button
            type="button"
            onClick={handleCopyGen}
            className="btn-cta px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {copiedGen ? (
              <>
                <Check className="w-4 h-4 text-[#00E599]" />
                <span className="text-[#00E599]">Prompt Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPIAR PROMPT</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-[#AAB6CC] leading-relaxed">
          Copie o prompt abaixo e cole na ferramenta de geração de imagens que você escolher (Leonardo.ai, Ideogram, Midjourney, Google Flow etc.). Ele está em inglês porque os melhores modelos de IA visual foram treinados nesse idioma:
        </p>

        <div className="relative">
          <div className="bg-[#080D20] border border-[#203252] rounded-xl p-4 text-xs font-mono text-[#F5F7FF] leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
            {promptGeneration}
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-[11px] text-[#71809B]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4E8]"></span>
          <span>Injetado automaticamente com os dados da sua empresa: {project.name || 'Seu Negócio'} ({project.segment || 'Segmento'}).</span>
        </div>
      </div>

      {/* 6. AVISO CRÍTICO: NÃO SALVAR A IMAGEM NESTA ETAPA */}
      <div className="bg-[#080D20] border-2 border-[#00D4E8]/40 rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2.5 text-[#00D4E8]">
          <FolderDown className="w-5 h-5 shrink-0" />
          <h4 className="text-sm md:text-base font-bold text-[#F5F7FF]">
            Depois de gerar suas imagens: O que fazer
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 bg-[#111B36] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">1. Gere opções</span>
            <p className="text-[#AAB6CC]">Gere 3 ou 4 variações usando o prompt acima na ferramenta de sua preferência.</p>
          </div>
          <div className="p-3 bg-[#111B36] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">2. Compare resultados</span>
            <p className="text-[#AAB6CC]">Teste em mais de uma ferramenta gratuita se quiser comparar a nitidez e o estilo.</p>
          </div>
          <div className="p-3 bg-[#111B36] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">3. Escolha as melhores</span>
            <p className="text-[#AAB6CC]">Selecione apenas as imagens que transmitem verdade e alta qualidade comercial.</p>
          </div>
          <div className="p-3 bg-[#111B36] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">4. Baixe os arquivos</span>
            <p className="text-[#AAB6CC]">Faça o download das imagens no seu computador ou celular (em JPG ou PNG).</p>
          </div>
          <div className="p-3 bg-[#111B36] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">5. Guarde em uma pasta</span>
            <p className="text-[#AAB6CC]">Mantenha essas fotos salvas com nomes fáceis (ex: banner-hero, servico-01).</p>
          </div>
          <div className="p-3 bg-[#111B36] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">6. Uso no Prompt Mestre</span>
            <p className="text-[#AAB6CC]">Elas serão anexadas no Módulo 06 quando você for construir o site.</p>
          </div>
        </div>

        {/* Alerta de destaque */}
        <div className="p-4 bg-[#0B1535] border border-[#00D4E8]/50 rounded-xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#00D4E8] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <span className="text-[#00D4E8] font-bold uppercase tracking-wider block">
              IMPORTANTE: Não precisa enviar suas imagens aqui
            </span>
            <p className="text-[#F5F7FF] leading-relaxed">
              Você <strong>não precisa enviar nem salvar as imagens dentro desta tela</strong>. Guarde os arquivos baixados com segurança no seu computador. Quando chegar na etapa de execução do <strong>Prompt Mestre Final (Módulo 06)</strong>, você enviará essas imagens junto com o comando para que a IA externa as utilize como referências visuais do projeto.
            </p>
          </div>
        </div>
      </div>

      {/* 7. VOCÊ TAMBÉM PODE USAR SUAS PRÓPRIAS FOTOS */}
      <div className="bg-[#0B1535] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D4E8]">
          <ImageIcon className="w-4 h-4" />
          <span>Já tem fotos do seu negócio?</span>
        </div>

        <p className="text-xs md:text-sm text-[#F5F7FF] leading-relaxed">
          Você <strong>não precisa obrigatoriamente gerar imagens do zero com IA</strong>. Se você já tem fotografias reais da sua empresa, do seu espaço físico, da sua equipe ou dos seus produtos (mesmo que tenham sido tiradas com um bom celular), você pode utilizá-las diretamente no seu site!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-[#AAB6CC]">
          <div className="p-2.5 bg-[#111B36] border border-[#203252] rounded-lg">✓ Fotos da fachada real</div>
          <div className="p-2.5 bg-[#111B36] border border-[#203252] rounded-lg">✓ Ambiente e instalações</div>
          <div className="p-2.5 bg-[#111B36] border border-[#203252] rounded-lg">✓ Profissionais trabalhando</div>
          <div className="p-2.5 bg-[#111B36] border border-[#203252] rounded-lg">✓ Produtos e pratos reais</div>
          <div className="p-2.5 bg-[#111B36] border border-[#203252] rounded-lg">✓ Atendimento ao cliente</div>
          <div className="p-2.5 bg-[#111B36] border border-[#203252] rounded-lg">✓ Fotos tiradas no celular</div>
        </div>

        <p className="text-xs text-[#AAB6CC] leading-relaxed">
          Além disso, você pode usar a IA para <strong>melhorar a iluminação, nitidez e qualidade fotográfica das fotos que você já possui</strong>, sem alterar as pessoas ou o ambiente real.
        </p>
      </div>

      {/* 8. PROMPT DE MELHORIA DE FOTOGRAFIA */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00D4E8] block">
              Para Fotos Existentes do Celular
            </span>
            <h4 className="text-sm md:text-base font-bold text-[#F5F7FF]">
              PROMPT — MELHORAR FOTOGRAFIA DO MEU NEGÓCIO
            </h4>
          </div>

          <button
            type="button"
            onClick={handleCopyEnhance}
            className="btn-cta px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {copiedEnhance ? (
              <>
                <Check className="w-4 h-4 text-[#00E599]" />
                <span className="text-[#00E599]">Prompt Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPIAR PROMPT</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-[#AAB6CC] leading-relaxed">
          Se você já possui uma fotografia real do seu negócio, envie-a para uma ferramenta de IA (como ChatGPT Plus, Claude, Midjourney ou Leonardo) junto com este comando. A intenção é melhorar iluminação, nitidez, cores e contraste mantendo a identidade 100% autêntica:
        </p>

        <div className="relative">
          <div className="bg-[#080D20] border border-[#203252] rounded-xl p-4 text-xs font-mono text-[#F5F7FF] leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
            {promptEnhancement}
          </div>
        </div>

        <div className="p-3 bg-[#080D20] border border-[#203252] rounded-xl text-xs text-[#AAB6CC] flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-[#00D4E8] shrink-0" />
          <span>Basta fazer upload da foto no chat da IA e colar o prompt acima como mensagem de instrução.</span>
        </div>
      </div>

      {/* 9. CUIDADO COM IMAGENS FALSAS */}
      <div className="p-5 bg-[#080D20] border border-[#EF4444]/40 rounded-2xl space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[#EF4444] uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Cuidado com Imagens Irreais (Orientação Ética e Prática)</span>
        </div>
        <p className="text-xs text-[#AAB6CC] leading-relaxed">
          As imagens geradas por IA devem representar com fidelidade o tipo e o porte do seu negócio. Se uma imagem gerada mostrar uma fachada de arranha-céu luxuoso ou uma equipe de 30 médicos em uma clínica individual, isso criará uma falsa expectativa que destrói a confiança do cliente quando ele visitar seu espaço físico.
        </p>
        <p className="text-xs text-[#AAB6CC] leading-relaxed">
          Priorize sempre fotos que pareçam <strong>autênticas, acolhedoras e compatíveis com a sua estrutura real</strong>.
        </p>
      </div>

      {/* 10. CONEXÃO COM O PROMPT MESTRE FINAL */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D4E8]">
          <Sparkles className="w-4 h-4" />
          <span>E quando eu for criar o site? (O Caminho Até o Site Pronto)</span>
        </div>

        <p className="text-xs md:text-sm text-[#F5F7FF] leading-relaxed">
          As imagens que você gerou ou selecionou agora serão utilizadas mais adiante, junto com o <strong>Prompt Mestre Final (Módulo 06)</strong>. Veja exatamente como funciona o fluxo:
        </p>

        {/* Fluxo visual */}
        <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div className="p-3 bg-[#111B36] rounded-lg border border-[#203252] w-full md:w-auto">
              <span className="text-[10px] text-[#00D4E8] font-bold uppercase block">Etapa 05.4 (Agora)</span>
              <span className="text-xs font-bold text-[#F5F7FF]">Gerar ou Melhorar</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#00D4E8] rotate-90 md:rotate-0 shrink-0" />
            
            <div className="p-3 bg-[#111B36] rounded-lg border border-[#203252] w-full md:w-auto">
              <span className="text-[10px] text-[#00D4E8] font-bold uppercase block">Seleção</span>
              <span className="text-xs font-bold text-[#F5F7FF]">Escolher as Melhores</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#00D4E8] rotate-90 md:rotate-0 shrink-0" />
            
            <div className="p-3 bg-[#111B36] rounded-lg border border-[#203252] w-full md:w-auto">
              <span className="text-[10px] text-[#00D4E8] font-bold uppercase block">Seu Computador</span>
              <span className="text-xs font-bold text-[#F5F7FF]">Baixar e Guardar</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#00D4E8] rotate-90 md:rotate-0 shrink-0" />
            
            <div className="p-3 bg-[#111B36] rounded-lg border border-[#203252] w-full md:w-auto">
              <span className="text-[10px] text-[#00D4E8] font-bold uppercase block">Módulo 06</span>
              <span className="text-xs font-bold text-[#F5F7FF]">Prompt Mestre + Imagens</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#00D4E8] rotate-90 md:rotate-0 shrink-0" />
            
            <div className="p-3 bg-[#0B1535] rounded-lg border border-[#00D4E8] w-full md:w-auto">
              <span className="text-[10px] text-[#00E599] font-bold uppercase block">Resultado Final</span>
              <span className="text-xs font-bold text-[#00E599]">Site com Suas Imagens</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#AAB6CC] leading-relaxed">
          Você poderá enviar <strong>uma ou várias imagens</strong> no chat da ferramenta de IA (ex: uma do banner do topo, outra dos serviços e outra da fachada). A IA analisará todas as fotos anexadas e posicionará cada uma nas seções correspondentes do site.
        </p>
      </div>

      {/* 11. CHECKLIST DE CONCLUSÃO DA TAREFA */}
      <div className="bg-[#080D20] border-2 border-[#203252] rounded-2xl p-5 md:p-6 space-y-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#00D4E8] block">
            Sua Tarefa Interativa
          </span>
          <h4 className="text-sm md:text-base font-bold text-[#F5F7FF]">
            Depois de gerar: Confirme os passos para avançar
          </h4>
        </div>

        <div className="space-y-2.5">
          {[
            { key: 'tested', label: 'Testei algumas opções de imagem em ferramentas de IA (ou separei fotos reais da minha empresa)' },
            { key: 'chosen', label: 'Escolhi as imagens mais profissionais e autênticas para o negócio' },
            { key: 'downloaded', label: 'Baixei os arquivos no meu computador ou celular' },
            { key: 'savedForPrompt', label: 'Guardei as imagens em uma pasta para enviar junto com o Prompt Mestre Final' }
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
                    <CheckSquare className="w-4 h-4 text-[#00D4E8]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#71809B]" />
                  )}
                </div>
                <span className="text-xs font-medium leading-relaxed">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#203252]">
          <span className="text-xs text-[#71809B]">
            {isCompleted ? '✓ Etapa concluída no seu progresso.' : 'Marque os passos acima e conclua esta etapa.'}
          </span>

          <button
            type="button"
            onClick={handleFinalize}
            className="btn-cta w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isCompleted ? 'Etapa Concluída (Salvar Novamente)' : 'Concluir Etapa e Continuar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
