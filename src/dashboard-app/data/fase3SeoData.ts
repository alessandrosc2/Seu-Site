export interface Fase3TutorialStep {
  number: number;
  title: string;
  description: string;
  tip?: string;
  warning?: string;
  codeSnippet?: string;
}

export interface Fase3Track {
  id: 'google_meu_negocio' | 'search_console' | 'lgpd_privacidade' | 'analytics';
  title: string;
  shortTitle: string;
  subtitle: string;
  tag: string;
  tagType: 'green' | 'cyan' | 'purple' | 'amber';
  icon: 'MapPin' | 'Search' | 'ShieldCheck' | 'BarChart3';
  isBonus?: boolean;
  bonusBadge?: string;
  youtubeVideoId?: string; // YouTube Video ID for iframe embed
  youtubeUrl?: string;
  youtubeSearchTerms?: string[];
  whyImportant: string;
  overview: string;
  howToReadDashboard?: {
    title: string;
    realtimeDesc: string;
    trafficDesc: string;
    goldTip: string;
  };
  gtagSnippet?: string;
  steps: Fase3TutorialStep[];
  checklistItems: {
    key: string;
    label: string;
    description: string;
  }[];
  primaryCta: {
    label: string;
    url: string;
  };
  secondaryCta?: {
    label: string;
    url: string;
  };
}

export interface Fase3DataConfig {
  banner: {
    title: string;
    badge: string;
    metaphor: string;
    pillarsSummary: string;
    pillars: {
      title: string;
      desc: string;
      icon: string;
    }[];
  };
  tracks: Fase3Track[];
}

export const FASE3_DATA: Fase3DataConfig = {
  banner: {
    title: 'Fase 3: Faça o seu site ser encontrado pelo Google',
    badge: 'EXPANSÃO — SEO LOCAL, BUSCADOR, LGPD & ANALYTICS',
    metaphor: 'Criar um site e não cadastrá-lo no Google é como montar uma loja em uma rua escondida sem colocar placas. Aqui você vai colocar seu negócio no mapa e começar a receber visitantes reais.',
    pillarsSummary: 'Esta fase aborda os pilares essenciais para atrair clientes locais, indexar suas páginas, garantir conformidade legal e medir seus visitantes:',
    pillars: [
      {
        title: '1. SEO Local (Google Maps)',
        desc: 'Apareça quando alguém buscar pelo seu serviço "perto de mim" ou na sua cidade.',
        icon: 'MapPin'
      },
      {
        title: '2. Indexação Oficial (Search Console)',
        desc: 'Apresente oficialmente suas páginas para os robôs do Google indexarem.',
        icon: 'Search'
      },
      {
        title: '3. Confiança Jurídica (LGPD)',
        desc: 'Aviso de cookies e termos transparentes para transmitir máxima segurança.',
        icon: 'ShieldCheck'
      },
      {
        title: '4. Bônus: Visitas (Analytics GA4)',
        desc: 'Descubra quantas pessoas visitam seu site e de onde elas vieram.',
        icon: 'BarChart3'
      }
    ]
  },
  tracks: [
    {
      id: 'google_meu_negocio',
      title: 'Google Meu Negócio (Aparecer no Maps e buscas locais)',
      shortTitle: 'Google Meu Negócio',
      subtitle: 'O cliente procura "serviço perto de mim" ou o nome da sua empresa e encontra telefone, rotas e o link do seu site.',
      tag: 'Essencial para Negócios Locais',
      tagType: 'green',
      icon: 'MapPin',
      youtubeVideoId: 'U_Qe3W2E65g',
      youtubeUrl: 'https://www.youtube.com/watch?v=U_Qe3W2E65g',
      whyImportant: 'Mais de 70% dos clientes que buscam no celular ligam ou mandam mensagem direto do Google Maps para agendar serviços.',
      overview: 'O Perfil da Empresa no Google (antigo Google Meu Negócio) é a ferramenta gratuita mais poderosa do mundo para empresas locais. Ao conectar seu novo site ao perfil, sua nota de relevância sobe e você ultrapassa concorrentes na sua cidade.',
      steps: [
        {
          number: 1,
          title: 'Acesse o Google Perfil da Empresa (Google Meu Negócio)',
          description: 'Abra google.com/business usando sua conta Google principal (a mesma que você usa para a empresa). Clique no botão azul "Fazer login" ou "Gerenciar agora". O serviço é 100% gratuito.',
          tip: 'Use uma conta Google profissional da sua empresa para manter tudo centralizado.'
        },
        {
          number: 2,
          title: 'Digite o nome exato e a categoria do seu negócio',
          description: 'Digite o nome oficial da sua empresa e escolha a categoria mais precisa possível (ex: Barbearia, Clínica de Estética, Eletricista, Pizzaria, etc.).',
          warning: 'Atenção: Não coloque palavras-chave exageradas no nome da empresa (ex: "João Barbearia Corta Cabelo Barato Centro"), pois o Google pode suspender o perfil. Use o nome comercial real!'
        },
        {
          number: 3,
          title: 'Defina seu endereço físico ou área de atendimento',
          description: 'Se você tem ponto comercial aberto ao público, preencha rua, número, bairro e CEP. Se você atende em domicílio ou online, marque a opção "Presto serviços no local do cliente" e selecione as cidades ou bairros que você atende.',
          tip: 'Se você atende em casa e não quer expor seu endereço residencial, marque a opção de área de atendimento sem exibir a rua.'
        },
        {
          number: 4,
          title: 'Insira o Telefone, WhatsApp e a URL do seu Novo Site',
          description: 'No campo "Website", cole o endereço oficial do site que você publicou na Fase 2 (ex: https://suaempresa.com.br ou https://seusite.netlify.app). Insira também o número do telefone comercial com DDD.',
          warning: 'Dica de Ouro: Perfis do Google Maps que possuem link de site verificado recebem até 2.5x mais cliques e passam muito mais credibilidade aos clientes!'
        },
        {
          number: 5,
          title: 'Complete a verificação e adicione fotos reais',
          description: 'Conclua a verificação solicitada pelo Google (pode ser via SMS, vídeo curto do local ou e-mail). Depois, preencha seus horários de funcionamento e suba fotos nítidas da fachada, ambiente e trabalhos realizados.',
          tip: 'Peça para 3 a 5 clientes satisfeitos deixarem as primeiras avaliações 5 estrelas no seu perfil. Isso impulsiona seu ranking imediatamente!'
        }
      ],
      checklistItems: [
        {
          key: 'gmb_created',
          label: 'Perfil criado ou acessado no Google Meu Negócio',
          description: 'Conta configurada com nome comercial e categoria correta.'
        },
        {
          key: 'gmb_site_linked',
          label: 'Link oficial do site inserido no perfil',
          description: 'Endereço da internet apontando para o seu novo site.'
        },
        {
          key: 'gmb_hours_contacts',
          label: 'Telefones e horários de funcionamento preenchidos',
          description: 'Horários reais de abertura e fechamento configurados.'
        },
        {
          key: 'gmb_photos_added',
          label: 'Fotos da empresa e serviços enviadas',
          description: 'Pelo menos 3 a 5 fotos de boa qualidade no perfil.'
        },
        {
          key: 'gmb_verified',
          label: 'Verificação do perfil concluída ou solicitada',
          description: 'Processo de confirmação de titularidade do Google em andamento.'
        }
      ],
      primaryCta: {
        label: 'Abrir Google Meu Negócio (google.com/business)',
        url: 'https://www.google.com/business/'
      },
      secondaryCta: {
        label: 'Suporte Oficial do Google Maps',
        url: 'https://support.google.com/business'
      }
    },
    {
      id: 'search_console',
      title: 'Google Search Console (Colocar as páginas no buscador)',
      shortTitle: 'Google Search Console',
      subtitle: 'Apresentar oficialmente seu site para os robôs do Google indexarem seus links e começarem a monitorar acessos.',
      tag: 'Indexação Oficial',
      tagType: 'cyan',
      icon: 'Search',
      youtubeVideoId: 'f0g0bS2o4X8',
      youtubeUrl: 'https://www.youtube.com/watch?v=f0g0bS2o4X8',
      whyImportant: 'Sem avisar o Google, pode levar semanas até que um robô descubra seu site por acaso. Com o Search Console, você entra na fila de prioridade em minutos.',
      overview: 'O Search Console é o canal oficial de comunicação entre o dono do site e o buscador do Google. Nele você vê quantas vezes seu site apareceu nas buscas, quais palavras as pessoas digitaram e garante que todas as suas páginas estão lidas e indexadas.',
      steps: [
        {
          number: 1,
          title: 'Acesse o Google Search Console',
          description: 'Abra search.google.com/search-console e clique no botão azul "Iniciar agora" logado na sua conta Google.',
          tip: 'Recomendamos usar a mesma conta Google que você utilizou no Google Meu Negócio para facilitar integrações.'
        },
        {
          number: 2,
          title: 'Adicione a propriedade do seu site',
          description: 'O Google mostrará duas opções de cadastro:\n\n• Opção 1 (Domínio): Digite seu domínio próprio (ex: suaempresa.com.br) sem https nem www. Exige inserir um código TXT no DNS onde comprou o domínio (Registro.br ou Hostinger).\n\n• Opção 2 (Prefixo do URL - Mais Fácil para Leigos): Digite a URL completa do seu site (ex: https://meusite.netlify.app ou https://suaempresa.com.br). Permite verificar por Tag HTML de forma imediata.',
          tip: 'Se você publicou na Netlify ou Vercel, a opção "Prefixo do URL" é muito mais rápida de verificar!'
        },
        {
          number: 3,
          title: 'Verifique a titularidade do site',
          description: 'Escolha o método de verificação por "Tag HTML". O Google fornecerá uma linha de código como:\n<meta name="google-site-verification" content="seu-codigo-aqui" />\nBasta colar essa linha dentro do cabeçalho (<head>) do seu arquivo index.html, salvar e clicar no botão "Verificar" no Search Console.',
          tip: 'Se você usa Netlify ou Vercel, também pode adicionar essa tag no painel ou colar o registro TXT no seu DNS.'
        },
        {
          number: 4,
          title: 'Envie o Sitemap do seu site (sitemap.xml)',
          description: 'No menu lateral esquerdo do Search Console, clique em "Sitemaps" (na seção Indexação). No campo "Adicionar um novo sitemap", digite exatamente "sitemap.xml" e clique no botão azul "Enviar".',
          warning: 'Atenção: O sitemap é o mapa com todas as páginas do seu site. O Google levará de 1 a 3 dias para ler e marcar com status verde "Sucesso".'
        },
        {
          number: 5,
          title: 'Inspecione a URL e solicite Indexação Imediata',
          description: 'No topo da tela do Search Console, há uma barra de pesquisa que diz "Inspecionar qualquer URL". Cole o link da sua página inicial e pressione Enter. Em seguida, clique no botão "Solicitar Indexação".',
          tip: 'Isso coloca sua página na fila rápida de rastreamento do Google, acelerando em até 10 vezes o aparecimento nos resultados de busca!'
        }
      ],
      checklistItems: [
        {
          key: 'gsc_property_created',
          label: 'Site cadastrado no Google Search Console',
          description: 'URL adicionada na opção Prefixo do URL ou Domínio.'
        },
        {
          key: 'gsc_verified',
          label: 'Titularidade do site verificada com sucesso',
          description: 'Verificação por Tag HTML ou DNS aprovada com selo verde.'
        },
        {
          key: 'gsc_sitemap_submitted',
          label: 'Sitemap (sitemap.xml) enviado para leitura',
          description: 'Arquivo de mapa de páginas cadastrado na aba Sitemaps.'
        },
        {
          key: 'gsc_indexed_requested',
          label: 'Indexação solicitada na ferramenta de Inspeção',
          description: 'Página inicial enviada para rastreamento prioritário.'
        }
      ],
      primaryCta: {
        label: 'Ir para o Google Search Console',
        url: 'https://search.google.com/search-console'
      },
      secondaryCta: {
        label: 'Testar Resultados Avançados do Google',
        url: 'https://search.google.com/test/rich-results'
      }
    },
    {
      id: 'lgpd_privacidade',
      title: 'LGPD & Políticas de Privacidade (Conformidade Simples)',
      shortTitle: 'LGPD & Privacidade',
      subtitle: 'Deixar o site seguro e dentro da legislação brasileira com aviso de cookies e modelo de termos descomplicado.',
      tag: 'Segurança Jurídica',
      tagType: 'purple',
      icon: 'ShieldCheck',
      youtubeVideoId: '',
      whyImportant: 'A Lei Geral de Proteção de Dados (LGPD) é obrigatória no Brasil. Um site que respeita a privacidade evita penalidades e passa sensação de empresa séria e confiável.',
      overview: 'Para pequenos negócios e sites institucionais, estar em conformidade com a LGPD é muito mais simples do que parece: basta ser transparente com o cliente, informar quais dados são recebidos no formulário/WhatsApp e dar a ele a opção de aceitar os cookies do site.',
      steps: [
        {
          number: 1,
          title: 'Entenda a LGPD em 1 minuto sem juridiquês',
          description: 'A LGPD (Lei nº 13.709) diz apenas que, se você recebe nome, e-mail ou telefone de alguém no seu site, você deve usar esses dados apenas para a finalidade combinada (como responder a um orçamento) e nunca vendê-los ou repassá-los para estranhos.',
          tip: 'Se o seu site só tem botão de WhatsApp e formulário de contato simples, sua conformidade é rápida e descomplicada.'
        },
        {
          number: 2,
          title: 'Adicione o Banner de Aviso de Cookies no rodapé',
          description: 'Sites modernos utilizam cookies técnicos para carregar mais rápido e medir visitas. O banner de aviso deve ser amigável e discreto na parte inferior da tela, informando:\n\n"Utilizamos cookies para proporcionar a melhor experiência no nosso site. Ao continuar navegando, você concorda com nossa Política de Privacidade." com botão "Entendi e Aceito".',
          tip: 'Banners simples com botão de aceite são suficientes para a imensa maioria dos negócios locais.'
        },
        {
          number: 3,
          title: 'Crie o texto da sua Política de Privacidade',
          description: 'Você pode usar geradores gratuitos e confiáveis de Política de Privacidade (como politicaprivacidade.com). O texto deve conter:\n\n• Nome da empresa e canal de contato;\n• Quais dados são coletados (nome, telefone e dados de navegação);\n• Finalidade (atendimento comercial e suporte);\n• Garantia de sigilo e não repasse a terceiros;\n• Como o cliente pode solicitar a exclusão dos seus dados.',
          tip: 'Coloque o texto em uma página simples (ex: /privacidade.html) ou em uma janela modal.'
        },
        {
          number: 4,
          title: 'Insira o link de Privacidade no rodapé de todas as páginas',
          description: 'No rodapé do seu site, ao lado do copyright (ex: "© 2026 Sua Empresa - Todos os direitos reservados"), adicione um link discreto escrito "Políticas de Privacidade".',
          warning: 'Atenção: Esse link no rodapé é um critério de confiança avaliado pelo próprio Google na hora de classificar a autoridade do seu domínio!'
        },
        {
          number: 5,
          title: 'Boas práticas com contatos e WhatsApp',
          description: 'Nunca compre listas prontas de e-mails ou números de WhatsApp para fazer disparos em massa. Comunique-se exclusivamente com pessoas que entraram em contato voluntariamente com o seu negócio.',
          tip: 'O marketing com consentimento real converte 10 vezes mais e mantém a reputação da sua marca impecável.'
        }
      ],
      checklistItems: [
        {
          key: 'lgpd_cookie_banner',
          label: 'Aviso de cookies presente no site',
          description: 'Mensagem informativa com botão de aceite para os visitantes.'
        },
        {
          key: 'lgpd_policy_text',
          label: 'Texto de Política de Privacidade gerado e revisado',
          description: 'Dados da empresa, finalidade da coleta e sigilo descritos.'
        },
        {
          key: 'lgpd_footer_link',
          label: 'Link de Privacidade visível no rodapé do site',
          description: 'Acesso rápido para consulta dos termos em todas as páginas.'
        },
        {
          key: 'lgpd_contact_channel',
          label: 'Canal de suporte e exclusão de dados disponível',
          description: 'E-mail ou WhatsApp para o titular exercer seus direitos.'
        }
      ],
      primaryCta: {
        label: 'Gerador Grátis de Política de Privacidade',
        url: 'https://politicaprivacidade.com'
      },
      secondaryCta: {
        label: 'Guia Oficial da ANPD para Pequenas Empresas',
        url: 'https://www.gov.br/anpd'
      }
    },
    {
      id: 'analytics',
      title: 'Bônus: Descubra Quem Visita Seu Site (Google Analytics 4)',
      shortTitle: 'Bônus: Google Analytics 4',
      subtitle: 'Imagine ter uma câmera na porta da sua loja que conta quantas pessoas entraram, de qual bairro elas vieram e se olharam a vitrine pelo celular ou computador. O Google Analytics é exatamente isso — 100% gratuito e oficial do Google.',
      tag: 'Métricas & Crescimento',
      tagType: 'amber',
      icon: 'BarChart3',
      isBonus: true,
      bonusBadge: 'BÔNUS ESPECIAL',
      youtubeVideoId: 'wQp3fGg2o4E', // Tutorial demonstrativo de GA4 para iniciantes
      youtubeUrl: 'https://www.youtube.com/results?search_query=como+criar+conta+no+google+analytics+4+passo+a+passo',
      youtubeSearchTerms: [
        'como criar conta no google analytics 4 passo a passo',
        'como instalar tag do google analytics 4 no site',
        'google analytics 4 para iniciantes ga4'
      ],
      whyImportant: 'Saber se as pessoas que visitam seu site chegam pelo Instagram, pelo Google ou pelo WhatsApp ajuda você a investir tempo e dinheiro no lugar certo sem adivinhar.',
      overview: 'Visão Geral: Como o Google Analytics Funciona (Sem Jargões)\n\nPara o Google monitorar os acessos, você só precisa de uma "Etiqueta" (chamada de ID de Medição, que começa com G-XXXXXXXX):\n1. Você cria a conta gratuita no Google Analytics.\n2. O Google te entrega essa etiqueta.\n3. Você cola a etiqueta no seu site (ou o código que ele gera).',
      howToReadDashboard: {
        title: 'Como ler o painel sem se perder (Dica de Ouro para Leigos)',
        realtimeDesc: 'Tempo Real: Mostra quantas pessoas estão navegando no seu site exatamente agora, em qual cidade estão e quais páginas estão visualizando.',
        trafficDesc: 'Aquisição de Tráfego: Mostra a origem dos visitantes — se vieram pelo link da bio do Instagram, por conversas do WhatsApp ou por buscas no Google.',
        goldTip: 'Não se assuste com os centenas de gráficos avançados do Google Analytics! Para quem está começando, você só precisa olhar a aba "Tempo real" e a aba "Aquisição de tráfego".'
      },
      gtagSnippet: `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU-ID-AQUI"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'G-SEU-ID-AQUI');\n</script>`,
      steps: [
        {
          number: 1,
          title: 'Criar a Conta no Google Analytics',
          description: 'Acesse o site oficial: analytics.google.com e faça login com seu e-mail do Google.\n\nClique no botão azul "Começar a usar a medição".\n\nNome da Conta: Digite o nome da sua empresa ou o seu nome (ex: Marmoraria Silva) e clique em Avançar.',
          tip: 'Use a mesma conta Google que você já usou no Google Meu Negócio e no Search Console.'
        },
        {
          number: 2,
          title: 'Criar a "Propriedade" (Seu Site)',
          description: 'Nome da Propriedade: Digite o nome do seu site (ex: Site Marmoraria Silva).\n\nFuso horário e Moeda: Selecione Brasil e Real brasileiro (BRL). Isso garante que os relatórios diários fechem no horário certo de Brasília.\n\nClique em Avançar, preencha o tamanho da empresa e os objetivos (pode marcar "Gerar leads" ou "Examinar comportamento do usuário") e clique em Criar. Aceite os termos de serviço do Google marcando as caixas de seleção.',
          tip: 'Marcar moeda BRL e fuso horário do Brasil é fundamental para os dados baterem com o seu expediente.'
        },
        {
          number: 3,
          title: 'Escolher a Plataforma e Pegar a Etiqueta',
          description: 'Na tela "Escolha uma plataforma", clique em Web.\n\nURL do site: Digite o endereço do seu site (ex: seusite.com.br ou meusite.netlify.app).\n\nAtenção: Não digite https:// novamente, pois o Google já coloca isso antes da caixa.\n\nNome do fluxo: Dê um nome simples, como "Site Principal".\n\nDeixe a opção "Métrica otimizada" ativada (ela já mede rolagem de página e cliques automaticamente) e clique em "Criar fluxo".',
          warning: 'Atenção: Não digite "https://" na caixa, pois o Google já preenche essa parte à esquerda.'
        },
        {
          number: 4,
          title: 'Instalar no Site (A Mágica da Etiqueta)',
          description: 'Assim que o fluxo for criado, você verá na tela o seu ID de Medição (um código que começa com G-, por exemplo: G-ABC1234XYZ).\n\nVocê tem duas formas muito simples de colocar isso no ar:\n\n• Opção 1 (Se o seu gerador ou CMS tiver campo de Analytics): Basta copiar o código G-XXXXXXXX, ir no painel do seu site, colar no campo "Google Analytics ID" e salvar.\n\n• Opção 2 (Colar o código HTML manual): Na tela do Analytics, clique em "Instalar manualmente". O Google mostrará o bloco de código gtag.js. Basta copiar todo esse bloco e colar logo abaixo da tag <head> no arquivo index.html do seu site antes de publicar.',
          codeSnippet: `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU-ID-AQUI"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'G-SEU-ID-AQUI');\n</script>`,
          tip: 'Lembre-se de substituir "G-SEU-ID-AQUI" pelo seu código real fornecido pelo Google!'
        },
        {
          number: 5,
          title: 'Testar se Está Funcionando em Tempo Real',
          description: 'Abra o seu site pelo celular ou em uma aba anônima do navegador.\n\nNo painel do Google Analytics, clique no ícone de relatórios no menu esquerdo e selecione "Tempo real".\n\nSe você vir o número "1" na bolinha azul de "Usuários no último minuto", está pronto e funcionando perfeitamente!',
          tip: 'Pode levar de 30 a 60 segundos para o primeiro clique aparecer na bolinha azul do Tempo Real.'
        }
      ],
      checklistItems: [
        {
          key: 'ga4_account_created',
          label: 'Conta e Propriedade criadas no Google Analytics 4',
          description: 'Configuração da conta com fuso horário de Brasília e moeda BRL.'
        },
        {
          key: 'ga4_stream_web',
          label: 'Fluxo Web criado com a URL oficial do site',
          description: 'Fluxo de dados ativo com métrica otimizada habilitada.'
        },
        {
          key: 'ga4_tag_installed',
          label: 'ID de Medição (G-XXXXXXXX) ou código gtag.js instalado',
          description: 'Etiqueta inserida no cabeçalho (<head>) do index.html ou no gerador.'
        },
        {
          key: 'ga4_realtime_tested',
          label: 'Contador de visitas verificado no relatório de Tempo Real',
          description: 'Pelo menos 1 visitante ativo detectado no painel ao acessar pelo celular.'
        }
      ],
      primaryCta: {
        label: 'Acessar o Google Analytics (analytics.google.com)',
        url: 'https://analytics.google.com/'
      },
      secondaryCta: {
        label: 'Pesquisar Tutoriais de GA4 no YouTube',
        url: 'https://www.youtube.com/results?search_query=como+criar+conta+no+google+analytics+4+passo+a+passo'
      }
    }
  ]
};
