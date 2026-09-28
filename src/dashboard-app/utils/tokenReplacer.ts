import { BusinessProject } from '../types/project';

/**
 * Utility to replace tokens like [[NOME]], [[SEGMENTO]], [[CIDADE]], etc.
 * with real project data for contextualizing external AI prompts.
 * If a field is missing, replaces with an explicit placeholder
 * like `[campo pendente: nome do negócio]`.
 */
export function replaceTokens(template: string, p: BusinessProject): string {
  const safe = (val?: string, fieldName?: string) => val?.trim() || `[campo pendente: ${fieldName || 'informação'}]`;

  const servicesText = p.services && p.services.length > 0
    ? p.services.map((s, i) => `${i + 1}. ${s.title} — ${s.description}`).join('\n')
    : '[campo pendente: serviços cadastrados]';

  const differentialsText = p.differentials && p.differentials.length > 0
    ? p.differentials.map((d, i) => `• ${d}`).join('\n')
    : '[campo pendente: diferenciais cadastrados]';

  const briefingText = [
    `Nome: ${safe(p.name, 'nome do negócio')}`,
    `Segmento: ${safe(p.segment, 'segmento de atuação')}`,
    `Localização: ${safe(p.city, 'cidade')} ${p.region ? `(${p.region})` : ''}`,
    `WhatsApp Comercial: ${safe(p.whatsapp, 'WhatsApp comercial')}`,
    `Instagram: ${safe(p.instagram, 'Instagram')}`,
    `Público-Alvo: ${safe(p.targetAudience, 'público-alvo')}`,
    `Objetivo do Site: ${safe(p.siteGoal, 'objetivo do site')}`,
    `Tom de Voz: ${safe(p.communicationTone, 'tom de voz')}`
  ].join('\n');

  return template
    .replace(/\[\[NOME\]\]/g, safe(p.name, 'nome do negócio'))
    .replace(/\[\[SEGMENTO\]\]/g, safe(p.segment, 'segmento de atuação'))
    .replace(/\[\[CIDADE\]\]/g, safe(p.city, 'cidade'))
    .replace(/\[\[REGIAO\]\]/g, safe(p.region, 'região/bairro'))
    .replace(/\[\[WHATSAPP\]\]/g, safe(p.whatsapp, 'WhatsApp comercial'))
    .replace(/\[\[INSTAGRAM\]\]/g, safe(p.instagram, 'Instagram'))
    .replace(/\[\[EMAIL\]\]/g, safe(p.email, 'e-mail'))
    .replace(/\[\[ENDERECO\]\]/g, safe(p.address, 'endereço físico ou atendimento online'))
    .replace(/\[\[PUBLICO\]\]/g, safe(p.targetAudience, 'público-alvo prioritário'))
    .replace(/\[\[OBJETIVO\]\]/g, safe(p.siteGoal, 'objetivo principal do site'))
    .replace(/\[\[TOM\]\]/g, safe(p.communicationTone, 'tom de comunicação'))
    .replace(/\[\[ESTILO_VISUAL\]\]/g, safe(p.visualStyle, 'estilo visual'))
    .replace(/\[\[CORES\]\]/g, p.primaryColor ? `Cor Principal: ${p.primaryColor}, Secundária: ${p.secondaryColor}` : '[campo pendente: paleta de cores]')
    .replace(/\[\[TIPOGRAFIA\]\]/g, safe(p.typography, 'tipografia'))
    .replace(/\[\[HEADLINE\]\]/g, safe(p.heroHeadline, 'headline principal'))
    .replace(/\[\[SUBHEADLINE\]\]/g, safe(p.heroSubheadline, 'subheadline persuasiva'))
    .replace(/\[\[CTA\]\]/g, safe(p.ctaLabel, 'chamada do botão CTA'))
    .replace(/\[\[SOBRE\]\]/g, safe(p.aboutText, 'texto sobre nós'))
    .replace(/\[\[DOMINIO\]\]/g, safe(p.customDomain, 'domínio próprio'))
    .replace(/\[\[SERVICOS\]\]/g, servicesText)
    .replace(/\[\[DIFERENCIAIS\]\]/g, differentialsText)
    .replace(/\[\[BRIEFING\]\]/g, briefingText);
}
