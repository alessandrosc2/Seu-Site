export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BrandLogoColors {
  primary: string;
  secondary?: string;
  complementary?: string;
  neutral?: string;
  text?: string;
  accent?: string;
  background?: string;
  backgroundSecondary?: string;
  textSecondary?: string;
  border?: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
}

export interface VisualIdentity {
  visualPositioning: string;
  visualPersonality: string;
  paletteSource: 'custom' | 'brand_logo';
  brandLogoColors?: BrandLogoColors;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundSecondary: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  ctaPrimary: string;
  ctaPrimaryHover: string;
  ctaSecondary: string;
  ctaSecondaryHover: string;
  link: string;
  linkHover: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  colorDistribution: string;
  headerDirection: string;
  heroDirection: string;
  typographyDirection: string;
  photographyDirection: string;
  imageDirection: string;
  iconDirection: string;
  cardDirection: string;
  sectionDirection: string;
  formDirection: string;
  footerDirection: string;
  creativeConcept?: string;
  visualComposition?: string;
  motionPhilosophy?: string;
  rhythmDensity?: string;
  designRules: string[];
  avoidRules: string[];
  cssTokens: string;
  desiredColors?: string;
  referenceUrl?: string;
  generatedPrompt: string;
}

export interface BusinessProject {
  // 01 — Definição do Negócio
  name: string;
  segment: string;
  city: string;
  region: string;
  neighborhood?: string;
  whatsapp: string;
  instagram: string;
  email: string;
  address: string;
  operatingHours?: string;
  services: ServiceItem[];
  targetAudience: string;
  differentials: string[];
  siteGoal: string;
  communicationTone: string;

  // 02 — Planejamento do Site
  pages: string[];
  ctaType: 'whatsapp' | 'call' | 'form' | 'external_checkout';
  ctaLabel: string;
  targetCheckoutUrl?: string;

  // 05 — Identidade Visual
  visualStyle: 'moderno' | 'minimalista' | 'elegante' | 'corporativo' | 'tecnologico' | 'sofisticado' | 'acolhedor';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  typography: string;
  imageStyle: string;
  visualPositioning?: string;
  visualPersonality?: string;
  paletteSource?: 'custom' | 'brand_logo';
  brandLogoColors?: BrandLogoColors;
  referenceUrl?: string;
  visualIdentity?: VisualIdentity;
  gptPaletteResponse?: string;
  desiredColors?: string;

  // 04 — Conteúdo com IA
  heroHeadline: string;
  heroSubheadline: string;
  aboutText: string;
  differentialsHeadline: string;
  servicesHeadline: string;
  faqItems: FaqItem[];
  seoTitle: string;
  seoDescription: string;

  // 07 — Revisão Checklist
  reviewChecklist: {
    contentInfoCorrect: boolean;
    contentPhonesCorrect: boolean;
    contentLinksWorking: boolean;
    contentTextReviewed: boolean;
    designHierarchy: boolean;
    designSpacing: boolean;
    designTypography: boolean;
    designImages: boolean;
    designConsistency: boolean;
    conversionClearCta: boolean;
    conversionWhatsappWorking: boolean;
    conversionEasyContact: boolean;
    conversionGoalEvident: boolean;
    mobileResponsive: boolean;
    mobileReadable: boolean;
    mobileButtonsAdequate: boolean;
    mobileNavWorking: boolean;
  };

  // 08, 09, 10 — Publicação & Domínio
  deploymentMethod: 'github_vercel' | 'traditional' | 'pending';
  publishedUrl: string;
  customDomain: string;
  domainRegistered: boolean;
  googleSearchConsoleConfigured: boolean;
  sitemapSubmitted: boolean;

  // Progress tracking
  completedStepIds: string[];
  currentModuleId: string;
  currentStepId: string;
  briefingApproved: boolean;
  stepOutputs?: Record<string, string>;
  lastUpdated: string;
}

export type ActiveView = 'dashboard' | 'step' | 'module' | 'briefing' | 'plano_completo' | 'prompts_hub' | 'registro_hospedagem' | 'fase3_seo';

export type ModuleStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface HubPrompt {
  id: string;
  category: 'fundacao' | 'copywriting' | 'identidade' | 'codigo' | 'comercial';
  categoryLabel: string;
  title: string;
  objective: string;
  whenToUse: string;
  generatePrompt: (project: BusinessProject) => string;
  instructions: string[];
  recommendedAi: string;
  linkedStepId?: string;
  outputField?: keyof BusinessProject | string;
}

export interface StepPrompt {
  title: string;
  objective: string;
  whenToUse: string;
  generatePrompt: (project: BusinessProject) => string;
  instructions: string[];
  outputField?: keyof BusinessProject | string;
}

export interface StepDef {
  id: string;
  numberStr: string;
  title: string;
  shortDesc: string;
  whyImportant: string;
  expectedOutcome: string;
  nextStepTeaser: string;
  exampleText?: string;
  exampleBad?: string;
  exampleGood?: string;
  tip?: string;
  warning?: string;
  taskTitle: string;
  taskType: 'text_input' | 'multi_field' | 'services_editor' | 'checklist' | 'prompt_tool' | 'visual_picker' | 'pages_picker' | 'briefing_approval' | 'review_checklist' | 'deployment_selector' | 'domain_calculator' | 'final_celebration' | 'visual_identity' | 'image_guide' | 'art_direction_guide' | 'project_form' | 'content_studio' | 'master_prompt_step' | 'launch_pad';
  prompt?: StepPrompt;
}

export interface ModuleDef {
  id: string;
  number: string;
  name: string;
  shortDesc: string;
  iconName: string;
  steps: StepDef[];
}
