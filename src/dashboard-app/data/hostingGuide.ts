export interface HostingTutorialStep {
  number: number;
  title: string;
  description: string;
  codeSnippet?: string;
  tip?: string;
  warning?: string;
}

export interface HostingSubMethod {
  id: string;
  label: string;
  shortDesc: string;
  youtubeVideoId?: string; // YouTube Video ID for iframe embed (e.g. 8_KCgW8b7IQ)
  youtubeUrl?: string;
  steps: HostingTutorialStep[];
  primaryCta: {
    label: string;
    url: string;
  };
  secondaryCta?: {
    label: string;
    url: string;
  };
}

export interface HostingPathOption {
  id: 'netlify_gratis' | 'hostinger_tudo' | 'vercel_github' | 'dominio_existente';
  letter: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeType: 'green' | 'cyan' | 'blue' | 'purple';
  icon: 'Upload' | 'ShieldCheck' | 'GitBranch' | 'Server' | 'Globe';
  cost: string;
  timeToLaunch: string;
  forWhom: string;
  overview: string;
  methods: HostingSubMethod[];
}

export const HOSTING_CONCEPTS = {
  domain: {
    title: 'O que é Domínio?',
    metaphor: 'O endereço da sua casa na internet',
    example: 'ex: suaempresa.com.br',
    explanation: 'É o nome que as pessoas digitam no navegador ou clicam para chegar até você. Sem ele, para acessar seu site alguém precisaria digitar uma sequência complicada de números (o endereço IP).'
  },
  hosting: {
    title: 'O que é Hospedagem?',
    metaphor: 'O terreno e as paredes onde seu site mora',
    example: 'Servidores de alta velocidade ligados 24 horas',
    explanation: 'É o computador especial conectado à internet sem parar onde as fotos, textos e arquivos do seu site ficam guardados com segurança para serem exibidos instantaneamente quando alguém acessa seu endereço.'
  },
  analogyNotice: 'Para que seu site funcione na internet, ele precisa de ambos: o endereço (domínio) para ser encontrado e a casa (hospedagem) para guardar seus arquivos. Você pode usar um endereço temporário gratuito ou ter seu próprio domínio profissional.'
};

export const JARGON_BUSTER = [
  {
    term: 'DNS (Sistema de Nomes de Domínio)',
    simple: 'A lista telefônica da internet',
    details: 'Ele apenas traduz o nome fácil do seu site (suaempresa.com.br) para o endereço do computador onde os arquivos estão hospedados.'
  },
  {
    term: 'Propagação de DNS',
    simple: 'Tempo de aviso para a internet toda',
    details: 'Quando você altera seu domínio, os provedores do mundo todo precisam atualizar suas anotações. Isso costuma levar entre 30 minutos e 24 horas.'
  },
  {
    term: 'SSL / HTTPS (Cadeado de Segurança)',
    simple: 'O certificado de segurança obrigatório',
    details: 'Garante que os dados navegam criptografados, protegendo visitantes e evitando que o Google Chrome exiba avisos de "site não seguro".'
  },
  {
    term: 'Nameservers (DNS Master / Slave)',
    simple: 'Os guardiões do seu endereço',
    details: 'Dois endereços (como ns1.dns.hostinger.com) que dizem aos servidores da internet qual empresa cuida do direcionamento do seu site.'
  }
];

export const HOSTING_OPTIONS: HostingPathOption[] = [
  {
    id: 'netlify_gratis',
    letter: 'A',
    title: 'Netlify (Arrastar e Soltar a Pasta)',
    subtitle: 'Coloque seu site no ar sem mexer em código. Basta arrastar a pasta dos arquivos para o navegador e receber um link gratuito (.netlify.app).',
    badge: 'Recomendado para Leigos & 100% Grátis',
    badgeType: 'green',
    icon: 'Upload',
    cost: 'R$ 0,00 (Totalmente Gratuito)',
    timeToLaunch: 'Menos de 2 minutos',
    forWhom: 'Ideal para quem não sabe programar, não usa Git e quer apenas arrastar a pasta do site gerada pela IA e ver a página funcionando na hora com link ativo.',
    overview: 'A Netlify é a plataforma de ponta que mantém nativo e ativo o recurso de Drag & Drop no painel. Você não precisa de terminal, nem de conta no GitHub: basta soltar a pasta com os arquivos e o site vai ao ar com certificado SSL automático.',
    methods: [
      {
        id: 'netlify-drop',
        label: 'Passo a Passo: Netlify Drop (Arrastar e Soltar)',
        shortDesc: 'Veja o vídeo oficial e siga os passos simples para arrastar a pasta do site para o painel.',
        youtubeVideoId: '8_KCgW8b7IQ',
        youtubeUrl: 'https://www.youtube.com/watch?v=8_KCgW8b7IQ',
        steps: [
          {
            number: 1,
            title: 'Prepare a pasta dos arquivos do seu site no computador',
            description: 'Tenha a pasta com o seu site descompactada no seu computador. Verifique se o arquivo principal se chama exatamente "index.html" e está na raiz da pasta, ao lado das pastas de imagens e estilos.',
            tip: 'Se você baixou um arquivo zip da IA ou do seu gerador, clique com botão direito e escolha "Extrair tudo".'
          },
          {
            number: 2,
            title: 'Acesse o Netlify Drop ou crie sua conta gratuita',
            description: 'Abra a página oficial do Netlify Drop em app.netlify.com/drop. Você pode se cadastrar gratuitamente em segundos com seu e-mail pessoal ou conta Google.',
            tip: 'O plano Starter da Netlify é 100% grátis e inclui 100GB de tráfego por mês, mais do que suficiente para sites institucionais.'
          },
          {
            number: 3,
            title: 'Arraste a pasta inteira para a área indicada',
            description: 'Arraste a pasta descompactada do seu computador diretamente para o círculo pontilhado com a mensagem "Drag and drop your site output folder here".',
            warning: 'Não arraste apenas arquivos soltos: arraste a pasta inteira contendo o index.html.'
          },
          {
            number: 4,
            title: 'Site publicado instantaneamente com link seguro',
            description: 'Em cerca de 15 segundos, a Netlify finaliza o upload e gera um link oficial gratuito com certificado SSL seguro (HTTPS).',
            tip: 'Para personalizar o nome do link, clique em "Site configuration > Change site name" e digite o nome da sua empresa (ex: suaempresa.netlify.app).'
          }
        ],
        primaryCta: {
          label: 'Abrir Netlify Drop (app.netlify.com/drop)',
          url: 'https://app.netlify.com/drop'
        },
        secondaryCta: {
          label: 'Acessar Netlify Oficial',
          url: 'https://www.netlify.com'
        }
      }
    ]
  },
  {
    id: 'hostinger_tudo',
    letter: 'B',
    title: 'Hostinger (Domínio Próprio + Hospedagem + E-mail)',
    subtitle: 'Contratar domínio próprio (.com.br) + hospedagem profissional na Hostinger (domínio grátis no plano anual + e-mails profissionais).',
    badge: 'Mais Profissional & Sem Dores de Cabeça',
    badgeType: 'cyan',
    icon: 'ShieldCheck',
    cost: 'Aprox. R$ 12 a R$ 15 / mês no plano anual (Domínio Grátis)',
    timeToLaunch: '10 a 15 minutos',
    forWhom: 'Para quem busca presença comercial sólida e definitiva: site com seu próprio endereço oficial (.com.br), e-mails corporativos (contato@suaempresa.com.br) e suporte 24h em português.',
    overview: 'A Hostinger oferece a solução completa tudo-em-um para empresas. Ao assinar o plano anual, o registro do domínio .com.br sai totalmente gratuito no primeiro ano, poupando a necessidade de gerenciar múltiplos provedores.',
    methods: [
      {
        id: 'hostinger-setup',
        label: 'Passo a Passo: Ativação Completa na Hostinger',
        shortDesc: 'Contrate o plano anual com domínio grátis e suba seus arquivos pelo Gerenciador visual.',
        youtubeVideoId: '', // Placeholder for YouTube Video ID
        youtubeUrl: 'https://www.hostinger.com.br',
        steps: [
          {
            number: 1,
            title: 'Escolha o plano anual na Hostinger',
            description: 'Acesse o site da Hostinger e selecione o plano de Hospedagem Web (Premium ou Business). Ao optar pelo ciclo anual, o registro do domínio próprio (.com.br ou .com) sai com custo ZERO no primeiro ano.',
            tip: 'O plano anual evita ter que pagar o registro separado de domínio e já inclui e-mails profissionais com seu nome.'
          },
          {
            number: 2,
            title: 'Registre seu Domínio Gratuito oficial',
            description: 'No assistente de configuração, digite o nome desejado para o seu site (ex: suaempresa.com.br). O sistema confirma a disponibilidade e faz a titularidade oficial do domínio.'
          },
          {
            number: 3,
            title: 'Abra o Gerenciador de Arquivos (public_html)',
            description: 'No painel visual hPanel da Hostinger, entre em "Sites > Gerenciador de Arquivos". Navegue até a pasta "public_html".'
          },
          {
            number: 4,
            title: 'Faça o Upload dos arquivos do seu site',
            description: 'Clique no botão "Upload", selecione a pasta ou arquivos do seu site (com o index.html) e envie. O site fica publicado automaticamente no seu domínio.',
            warning: 'O certificado SSL (HTTPS) é ativado automaticamente pela Hostinger em poucos minutos, sem necessidade de configuração manual.'
          },
          {
            number: 5,
            title: 'Crie suas contas de e-mail profissionais',
            description: 'No menu "E-mails", crie caixas comerciais como contato@suaempresa.com.br para passar máxima credibilidade em orçamentos e propostas.'
          }
        ],
        primaryCta: {
          label: 'Contratar Hostinger com Domínio Grátis',
          url: 'https://www.hostinger.com.br/hospedagem-de-sites'
        },
        secondaryCta: {
          label: 'Verificador de Disponibilidade de Domínio',
          url: 'https://www.hostinger.com.br/verificador-de-dominio'
        }
      }
    ]
  },
  {
    id: 'vercel_github',
    letter: 'C',
    title: 'Vercel (Conectar via GitHub)',
    subtitle: 'Para quem quer hospedar grátis conectando a conta do GitHub com deploy automático a cada atualização (.vercel.app).',
    badge: 'Gratuito via GitHub',
    badgeType: 'blue',
    icon: 'GitBranch',
    cost: 'R$ 0,00 (Plano Hobby Gratuito)',
    timeToLaunch: '3 a 5 minutos',
    forWhom: 'Indicado para quem tem ou deseja conectar um repositório no GitHub para usufruir de deploys automáticos em cada commit e infraestrutura de ponta.',
    overview: 'A Vercel é a líder mundial para projetos web modernos conectados ao GitHub. Toda vez que você envia uma atualização para o repositório, a Vercel compila e atualiza o site na internet instantaneamente.',
    methods: [
      {
        id: 'vercel-git-deploy',
        label: 'Guia Completo: GitHub + Vercel Passo a Passo',
        shortDesc: 'Aprenda a criar sua conta no GitHub, subir o projeto (pela IA ou pelo navegador), conectar à Vercel e colocar o site no ar.',
        youtubeVideoId: '', // Placeholder for YouTube Video ID
        youtubeUrl: 'https://vercel.com',
        steps: [
          {
            number: 1,
            title: 'Crie sua conta gratuita no GitHub (github.com)',
            description: 'O GitHub é o "Google Drive" dos desenvolvedores — onde os arquivos do seu site ficam guardados com segurança na nuvem. Acesse github.com, clique em "Sign Up", insira seu e-mail, crie uma senha e escolha um nome de usuário. O plano gratuito é ilimitado e sem custos.',
            tip: 'Confirme o código de verificação recebido no seu e-mail para ativar sua conta do GitHub.'
          },
          {
            number: 2,
            title: 'Suba o projeto para o GitHub (2 formas simples)',
            description: 'Você pode subir os arquivos do site para o GitHub de duas maneiras muito simples, sem precisar de terminal:\n\n• Forma A (Direto pela IA que gerou seu site): Se você usou ferramentas como Lovable, Lovable, v0, Cursor ou Windsurf, localize o botão "GitHub" ou "Export / Push to GitHub" no canto superior da tela. Clique nele, autorize sua conta e a própria IA criará o repositório e enviará os arquivos em 5 segundos!\n\n• Forma B (Pelo próprio site do GitHub): No GitHub, clique no botão verde "+ New" (ou "Create repository"). Digite o nome do projeto (ex: meu-site) e clique em "Create repository". Na tela seguinte, clique no link "uploading an existing file", arraste a pasta com os arquivos do site (com o index.html) e clique no botão verde "Commit changes".',
            tip: 'Se a ferramenta de IA que você usou tiver o botão "Push to GitHub", use ele! É a forma mais rápida de todas.'
          },
          {
            number: 3,
            title: 'Acesse a Vercel e conecte com seu GitHub',
            description: 'Abra o site oficial vercel.com. Clique no botão "Sign Up" (ou "Log In") e selecione obrigatoriamente a opção "Continue with GitHub". Em seguida, clique em "Authorize Vercel" para autorizar a conexão entre as duas contas.',
            tip: 'Ao entrar com o GitHub, você não precisa criar outra senha e a Vercel já reconhece todos os seus projetos automaticamente.'
          },
          {
            number: 4,
            title: 'Escolha o repositório do seu projeto na Vercel',
            description: 'No painel da Vercel (vercel.com/dashboard), clique no botão azul "+ Add New... > Project". Na lista de repositórios exibida em "Import Git Repository", localize o repositório do seu site que acabou de criar e clique no botão azul "Import" ao lado dele.',
            warning: 'Se o seu repositório não aparecer na lista, clique no link "Adjust GitHub App Permissions" e selecione "All repositories" para liberar o acesso da Vercel.'
          },
          {
            number: 5,
            title: 'Clique em "Deploy" e veja o site entrar no ar',
            description: 'Na tela de configuração do projeto na Vercel, deixe o Framework Preset no padrão (se for HTML puro ou Vite/React, a Vercel detecta sozinha). Clique no botão azul "Deploy". Em cerca de 30 segundos, seu site estará publicado com certificado de segurança SSL e um link oficial gratuito (ex: meu-site.vercel.app).',
            warning: 'A mágica do GitHub + Vercel: Toda vez que você ou a IA fizer uma alteração e subir no GitHub, a Vercel republica seu site na internet automaticamente!'
          }
        ],
        primaryCta: {
          label: 'Acessar Vercel (vercel.com)',
          url: 'https://vercel.com'
        },
        secondaryCta: {
          label: 'Criar Conta no GitHub (github.com)',
          url: 'https://github.com/signup'
        }
      }
    ]
  },
  {
    id: 'dominio_existente',
    letter: 'D',
    title: 'Já Tenho Domínio e Quero Apontar',
    subtitle: 'Configurar domínio próprio já registrado (Registro.br, GoDaddy ou similar) apontando para a Hostinger ou para Netlify/Vercel.',
    badge: 'Domínio Existente & Apontamento DNS',
    badgeType: 'purple',
    icon: 'Server',
    cost: 'R$ 40/ano (anuidade oficial do Registro.br)',
    timeToLaunch: '10 minutos + propagação DNS',
    forWhom: 'Para quem já garantiu o domínio próprio registrado no Registro.br, GoDaddy ou Locaweb e deseja conectá-lo à sua hospedagem escolhida.',
    overview: 'Se você já é dono do seu domínio, basta fazer o apontamento de DNS no painel onde comprou o domínio para a hospedagem onde os arquivos do site estão guardados.',
    methods: [
      {
        id: 'apontamento-hostinger',
        label: 'Opção 1: Apontar para Hostinger via Nameservers (Recomendado)',
        shortDesc: 'A maneira mais simples: copie os dois Nameservers da Hostinger e cole no Registro.br.',
        youtubeVideoId: '', // Placeholder for YouTube Video ID
        steps: [
          {
            number: 1,
            title: 'Copie os Nameservers da Hostinger',
            description: 'No painel hPanel da Hostinger, copie os endereços dos servidores DNS da sua conta:',
            codeSnippet: 'Servidor 1 (Master): ns1.dns.hostinger.com\nServidor 2 (Slave 1): ns2.dns.hostinger.com'
          },
          {
            number: 2,
            title: 'Acesse o Registro.br e selecione seu domínio',
            description: 'Faça login em registro.br com seu CPF e senha. Clique em cima do domínio que deseja configurar.'
          },
          {
            number: 3,
            title: 'Altere os Servidores DNS',
            description: 'Na seção "DNS", clique em "Alterar Servidores DNS". No campo Master, cole ns1.dns.hostinger.com. No campo Slave 1, cole ns2.dns.hostinger.com e clique em Salvar.',
            warning: 'Atenção: A propagação de DNS costuma levar de 30 minutos a 4 horas no Brasil. Durante esse período, o site começará a responder pela Hostinger.'
          }
        ],
        primaryCta: {
          label: 'Acessar Registro.br',
          url: 'https://registro.br'
        },
        secondaryCta: {
          label: 'Abrir Painel Hostinger (hPanel)',
          url: 'https://hpanel.hostinger.com'
        }
      },
      {
        id: 'apontamento-netlify-vercel',
        label: 'Opção 2: Apontar Registro.br para Netlify ou Vercel (Registros A e CNAME)',
        shortDesc: 'Como usar seu domínio oficial no plano gratuito da Netlify ou Vercel.',
        youtubeVideoId: '', // Placeholder for YouTube Video ID
        steps: [
          {
            number: 1,
            title: 'Adicione o domínio no painel da Netlify ou Vercel',
            description: 'No painel do seu projeto publicado (Netlify em "Domain management" ou Vercel em "Settings > Domains"), adicione seu domínio próprio (ex: suaempresa.com.br).'
          },
          {
            number: 2,
            title: 'Copie os registros de DNS fornecidos',
            description: 'A plataforma fornecerá duas entradas que devem ser inseridas no Registro.br:',
            codeSnippet: 'Entrada 1 (Vercel): Tipo A | Nome: @ | IP: 76.76.21.21\nEntrada 2 (Vercel): Tipo CNAME | Nome: www | Valor: cname.vercel-dns.com\n---\nEntrada 1 (Netlify): Tipo A | Nome: @ | IP: 75.2.60.5\nEntrada 2 (Netlify): Tipo CNAME | Nome: www | Valor: seusite.netlify.app',
            tip: 'Esses dois registros fazem o site abrir tanto digitando com "www" quanto sem "www".'
          },
          {
            number: 3,
            title: 'Configure na Zona DNS do Registro.br',
            description: 'No Registro.br, vá na seção DNS, clique em "Configurar Zona DNS" e adicione as duas entradas correspondentes.',
            warning: 'Aguarde o prazo de propagação (normalmente de 1 a 6 horas) e o certificado SSL será gerado automaticamente pela plataforma.'
          }
        ],
        primaryCta: {
          label: 'Acessar Registro.br',
          url: 'https://registro.br'
        },
        secondaryCta: {
          label: 'Abrir Netlify Domains',
          url: 'https://app.netlify.com'
        }
      }
    ]
  }
];

