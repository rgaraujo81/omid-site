/* Conteúdo do site OMID. Ponto único de verdade — edite aqui e rode `node build.mjs`. */

export const site = {
  name: 'OMID',
  full: 'OMID Solutions',
  url: 'https://omid.com.br',
  tagline: 'Sua cloud do futuro, hoje',
  desc: 'Cloud pública soberana no Brasil, verticalmente integrada, com data centers Tier III próprios, contrato em reais e até 40% de economia na fatura.',
  lang: 'pt-BR'
};

export const contato = {
  comercial:  { tel: '11 99587-9982',  href: 'tel:+5511995879982',  mail: 'comercial@omid.com.br' },
  noc:        { tel: '0800 878 1250',  href: 'tel:08008781250',     alt: '11 4410-4300', altHref: 'tel:+551144104300', wa: '11 99956-2354', mail: 'monitoramento@omid.com.br' },
  parceiros:  { tel: '11 94299-9501',  href: 'tel:+5511942999501',  mail: 'parceiros@omid.com.br' },
  imprensa:   { tel: '11 98625-2202',  href: 'tel:+5511986252202',  mail: 'omid@bursonglobal.com' },
  etica:      { tel: '11 99972-7352',  href: 'tel:+5511999727352',  mail: 'canaldaetica@omidsolutions.com' }
};

export const enderecos = [
  { uf: 'SP', cidade: 'Barueri', linha: 'Av. Aruanã, 452 — Tamboré', cep: '06460-010', rotulo: 'Sede e Data Center SP' },
  { uf: 'RJ', cidade: 'Rio de Janeiro', linha: 'Av. Presidente Vargas, 3131 — Cidade Nova', cep: '20210-030', rotulo: 'Data Center RJ' }
];

export const produtos = [
  {
    slug: 'omid-smart-cloud',
    nome: 'Omid Smart Cloud®',
    curto: 'Smart Cloud',
    cor: 'var(--c-cyan)',
    tag: 'IaaS',
    resumo: 'Cloud pública soberana de alta disponibilidade, com custo fixo em reais e escala sob demanda.',
    titulo: 'Cloud pública soberana com segurança, controle e previsibilidade real.',
    lead: 'Infraestrutura de alta disponibilidade, performance escalável e custos transparentes para empresas que precisam operar com autonomia, segurança e suporte técnico especializado no Brasil.',
    bullets: [
      'Cloud pública soberana operada 100% no Brasil',
      'Até 40% de redução na fatura mensal',
      'Custos previsíveis em reais, sem variação cambial',
      'Contrato simplificado a custo fixo',
      'Infraestrutura escalável sob demanda',
      'Contratação por VM ou por pool de recursos'
    ],
    blocos: [
      { t: 'Omid Compute Cloud (OC2)', d: 'Cloud pública flexível, escalável e orientada à eficiência operacional. Provisionamento sob demanda, gestão via painel, CLI e API REST, integração com pipelines DevOps e templates prontos para deploy rápido.' },
      { t: 'Data Center as a Service', d: 'Infraestrutura cloud corporativa para quem precisa de alta disponibilidade, previsibilidade operacional e controle total do ambiente, com contrato a custo fixo.' },
      { t: 'Kubernetes gerenciado', d: 'Clusters K8s com orquestração automática, escala horizontal e operação assistida pelo time OMID.' },
      { t: 'Cloud Backup & Data Protection', d: 'Proteção contínua para dados e operações críticas, com políticas de retenção e recuperação garantida.' },
      { t: 'Cloud Storage', d: 'Armazenamento object e block escalável, dimensionado para crescimento contínuo sem reprovisionamento.' },
      { t: 'Inteligência Artificial', d: 'Infraestrutura com aceleração por GPU, pronta para treinamento, inferência e deploy de LLMs e IA generativa.' },
      { t: 'Virtual Desktop (VDI)', d: 'Ambientes virtuais com mais controle, mobilidade e segurança para times distribuídos.' },
      { t: 'Serverless', d: 'Mais agilidade para desenvolver, publicar e escalar aplicações sem gerenciar servidores.' }
    ],
    aplicacoes: [
      'Aplicações corporativas e sistemas críticos',
      'Ambientes DevOps e homologação',
      'Workloads dedicados',
      'Inteligência Artificial e processamento de dados',
      'Backup, Disaster Recovery e continuidade',
      'Trabalho remoto e desktops virtuais'
    ]
  },
  {
    slug: 'omid-smart-colocation',
    nome: 'Omid Smart Colocation®',
    curto: 'Smart Colocation',
    cor: 'var(--c-teal)',
    tag: 'Data Center',
    resumo: 'Data centers Tier III próprios, com Sala Cofre certificada e conectividade de até 100 Gbps.',
    titulo: 'Infraestrutura estratégica exige um data center à altura da sua operação.',
    lead: 'Hospede seus servidores em data centers Tier III próprios, com Sala Cofre certificada ABNT NBR 15.247, alta disponibilidade, conectividade redundante e suporte especializado dentro do site.',
    bullets: [
      'Data centers próprios certificados Tier III',
      'Sala Cofre certificada ABNT NBR 15.247',
      'Sistemas redundantes de elétrica e climatização',
      'Garantia de 99,982% de uptime',
      'Múltiplas operadoras e links lan-to-lan de até 100 Gbps',
      'Único data center do Brasil a oferecer colocation em sala cofre'
    ],
    blocos: [
      { t: 'Data hall compartilhado', d: 'Racks em ambiente compartilhado de alta densidade, com energia e refrigeração redundantes.' },
      { t: 'Cages dedicados', d: 'Áreas fisicamente isoladas e customizadas para requisitos específicos de segurança e capacidade.' },
      { t: 'Wholesale', d: 'Blocos de capacidade dedicada para operações de grande porte e expansão planejada.' },
      { t: 'Sala Cofre Certificada', d: 'Ambiente certificado ABNT NBR 15.247, compatível com requisitos de autoridades certificadoras e PSS credenciado pelo ITI.' },
      { t: 'Smart Hands', d: 'Time técnico dentro do data center executando intervenções físicas sem deslocamento da sua equipe.' },
      { t: 'Data Center Edge', d: 'Expansão escalável com presença distribuída para reduzir latência junto à sua operação.' }
    ],
    aplicacoes: [
      'Ambientes de missão crítica',
      'Autoridades certificadoras e ICP-Brasil',
      'Setor financeiro e regulado',
      'Consolidação de data center próprio',
      'Estratégias híbridas cloud + colocation',
      'Disaster Recovery site secundário'
    ]
  },
  {
    slug: 'omid-smart-it-services',
    nome: 'Omid Smart IT Services®',
    curto: 'Smart IT Services',
    cor: 'var(--c-blue)',
    tag: 'Serviços gerenciados',
    resumo: 'Gestão, monitoramento, migração e sustentação da sua infraestrutura, 24x7x365.',
    titulo: 'Sua operação de TI funcionando com mais controle, continuidade e eficiência.',
    lead: 'Serviços especializados para gerenciamento, monitoramento, migração e sustentação da sua infraestrutura, com suporte técnico contínuo, equipe multidisciplinar e operação preparada para ambientes corporativos de alta demanda.',
    bullets: [
      'NOC dedicado com monitoramento 24x7x365',
      'Gestão e manutenção de infraestrutura',
      'Migração segura de ambientes',
      'Suporte técnico especializado e próximo',
      'Continuidade operacional de TI',
      'Observabilidade assistida por IA'
    ],
    blocos: [
      { t: 'Management Services', d: 'Gestão contínua de sistemas operacionais, banco de dados, firewall, rede e infraestrutura, com suporte técnico ininterrupto para ambientes críticos.' },
      { t: 'NOC 24x7x365', d: 'Observabilidade contínua de redes, servidores e ambientes críticos, garantindo resposta rápida a incidentes e proteção da operação.' },
      { t: 'Data Migration', d: 'Planejamento e execução de migrações de workloads e ambientes com foco em integridade, continuidade e redução de risco.' },
      { t: 'Smart Hands', d: 'Suporte operacional dentro do data center, sem deslocamentos desnecessários da sua equipe.' }
    ],
    aplicacoes: [
      'Times de TI enxutos que precisam escalar',
      'Ambientes híbridos e multicloud',
      'Migração de legado para cloud',
      'Sustentação de sistemas críticos',
      'Operação assistida 24x7',
      'Redução de custo operacional de TI'
    ]
  },
  {
    slug: 'omid-smart-cybersecurity',
    nome: 'Omid Smart CyberSecurity®',
    curto: 'Smart CyberSecurity',
    cor: 'var(--c-magenta)',
    tag: 'SOC 24x7',
    resumo: 'SOC próprio 24x7x365, inteligência de ameaças e resposta a incidentes com IA.',
    titulo: 'Sua operação protegida com inteligência, monitoramento contínuo e resposta avançada a ameaças.',
    lead: 'Proteção cibernética contínua para ambientes corporativos com SOC 24x7x365, inteligência de ameaças e gestão especializada de segurança — em cloud, híbrido ou on-premise.',
    bullets: [
      'SOC especializado com operação ininterrupta',
      'Detecção e resposta rápida a incidentes',
      'Soluções EDR e XDR integradas',
      'Cobertura para cloud, híbrido e on-premise',
      'Detecção avançada de ameaças',
      'Conformidade regulatória e governança'
    ],
    blocos: [
      { t: 'Centro de Defesa Cibernética 24x7x365', d: 'Monitoramento contínuo de ameaças digitais com analistas dedicados e playbooks de resposta.' },
      { t: 'OSR — Omid Safe Restore', d: 'Backups gerenciados com garantia de recuperação e continuidade operacional.' },
      { t: 'Security Incident Monitoring', d: 'Monitoramento contínuo para identificação precoce de ameaças e correlação de eventos.' },
      { t: 'AVS — Automatic Vulnerability Scan', d: 'Varreduras automatizadas para identificação precoce de vulnerabilidades no ambiente.' },
      { t: 'OTI — Omid Threat Intelligence', d: 'Rastreamento de ameaças na web, deep web e ambientes digitais relacionados à sua marca.' },
      { t: 'RCT — Regular Cyberattack Test', d: 'Testes periódicos de intrusão (pentest) com relatório e plano de remediação.' },
      { t: 'Full Managed CyberSecurity', d: 'Gestão completa de segurança com monitoramento e resposta especializada fim a fim.' },
      { t: 'Cyber Security Services', d: 'Serviços consultivos para análise de riscos, arquitetura de segurança e governança.' }
    ],
    aplicacoes: [
      'Setores regulados e auditados',
      'Ambientes com dado sensível e LGPD',
      'Operações expostas à internet',
      'Times sem SOC próprio',
      'Resposta a incidentes e forense',
      'Programas de gestão de vulnerabilidade'
    ]
  },
  {
    slug: 'omid-cloud-cognitiva',
    nome: 'Omid Cloud Cognitiva®',
    curto: 'Cloud Cognitiva',
    cor: 'var(--c-purple)',
    tag: 'IA agêntica',
    resumo: 'A camada de inteligência que faltava na sua cloud: FinOps, performance e risco em IA.',
    titulo: 'A camada de inteligência que faltava na sua cloud.',
    lead: 'Otimize sua infraestrutura com IA aplicada à cloud. Reduza custos, aumente a performance e automatize decisões com agentes especializados em operação, suporte, FinOps, segurança e governança.',
    bullets: [
      'Análise de ambiente, custo, risco e performance',
      'Integração com OMID, multicloud e on-premise',
      'Agentes de IA para operação, FinOps e segurança',
      'Gestão de aplicações',
      'Suporte técnico integrado 24x7',
      'Gestão de segurança e compliance'
    ],
    blocos: [
      { t: 'Gestão inteligente de custos', d: 'Analisa continuamente o consumo da infraestrutura, identifica desperdícios e recomenda otimizações.' },
      { t: 'Performance cognitiva', d: 'Monitora workloads em tempo real e ajusta recursos conforme o comportamento da aplicação.' },
      { t: 'Resiliência preditiva', d: 'Usa análise comportamental para antecipar falhas antes que virem indisponibilidade.' },
      { t: 'Segurança e governança inteligentes', d: 'Monitora riscos e comportamentos anômalos com correlação contínua de eventos.' },
      { t: 'Automação assistida por IA', d: 'Agentes inteligentes que sugerem e executam ações operacionais com trilha de auditoria.' },
      { t: 'Assessment cognitivo', d: 'Mapeamento completo do ambiente para identificar oportunidades de otimização e risco.' }
    ],
    aplicacoes: [
      'Redução inteligente de custos',
      'Performance sob demanda',
      'Prevenção de falhas e incidentes',
      'Segurança e governança contínuas',
      'Automação operacional assistida',
      'Evolução contínua da infraestrutura'
    ]
  }
];

export const camadas = [
  { n: '04', dot: 'var(--c-magenta)', t: 'Atendimento humano e NOC 24x7', d: 'Especialistas certificados, atendimento em português e foco na experiência. Tempo médio de resposta de 2 minutos.' },
  { n: '03', dot: 'var(--c-purple)',  t: 'Segurança e Cloud Cognitiva',   d: 'Segurança multicamadas, observabilidade por IA, detecção e resposta, compliance, governança e gestão de identidades.' },
  { n: '02', dot: 'var(--c-cyan)',    t: 'Plataforma cloud',              d: 'Orquestração e gestão, compute, storage, rede, virtualização e containers sobre KVM e Kubernetes.' },
  { n: '01', dot: 'var(--c-teal)',    t: 'Data center Tier III próprio',  d: 'Dois sites no Brasil, infraestrutura própria, energia 100% renovável certificada I-REC e redundância total.' }
];

export const numeros = [
  { n: '500', suf: '+',  dot: 'var(--c-teal)',    l: 'empresas confiam sua infraestrutura à OMID' },
  { n: '100', suf: '%',  dot: 'var(--c-cyan)',    l: 'de uptime desde o lançamento da Smart Cloud, em 2020' },
  { n: '40',  suf: '%',  dot: 'var(--c-magenta)', l: 'de redução na fatura frente às nuvens globais' },
  { n: '2',   suf: '',   dot: 'var(--c-amber)',   l: 'data centers Tier III próprios, em São Paulo e no Rio' }
];

export const certificacoes = [
  { t: 'ISO 27001', d: 'Segurança da informação', dot: 'var(--c-teal)' },
  { t: 'ISO 27017', d: 'Segurança em cloud', dot: 'var(--c-cyan)' },
  { t: 'ISO 27018', d: 'Privacidade em cloud', dot: 'var(--c-blue)' },
  { t: 'ISO 9001',  d: 'Gestão da qualidade', dot: 'var(--c-purple)' },
  { t: 'ISO 37001', d: 'Sistema antissuborno', dot: 'var(--c-magenta)' },
  { t: 'Tier III',  d: 'Data center certificado', dot: 'var(--c-red)' },
  { t: 'ABNT NBR 15.247', d: 'Sala cofre certificada', dot: 'var(--c-orange)' },
  { t: 'I-REC',     d: 'Energia 100% renovável', dot: 'var(--c-green)' },
  { t: 'PCI-DSS',   d: 'Meios de pagamento', dot: 'var(--c-amber)' },
  { t: 'LGPD',      d: 'Proteção de dados', dot: 'var(--c-teal)' }
];

export const comparativo = {
  cols: ['', 'OMID', 'Nuvens globais'],
  rows: [
    ['Moeda do contrato', 'Real, valor fixo no contrato', 'Dólar, com exposição cambial'],
    ['Previsibilidade de fatura', 'Custo fixo acordado, sem surpresa no fim do mês', 'Consumo variável e difícil de projetar'],
    ['Tráfego de saída (egress)', 'Sem cobrança na maioria dos serviços', 'Cobrado por GB trafegado'],
    ['Onde os dados moram', 'Data centers próprios no Brasil, sob jurisdição nacional', 'Regiões globais, sujeitas a legislação estrangeira'],
    ['Suporte', 'Time brasileiro, humano, 24x7x365 — resposta média de 2 minutos', 'Ticket com SLA em horas, por níveis pagos'],
    ['Integração da stack', 'Vertical: data center, rede, plataforma e operação são nossos', 'Camadas terceirizadas entre parceiros e regiões'],
    ['Curva de adoção', 'Portal direto, sem exigência de certificação', 'Console extenso, com curva e certificações']
  ]
};

export const segmentos = [
  { t: 'Devs & Startups', dot: 'var(--c-cyan)', d: 'Infraestrutura flexível para equipes que precisam crescer rápido.', pts: ['Provisionamento de ambientes em minutos', 'Automação e controle de custo desde o dia um', 'Escala sem reescrever a arquitetura', 'API REST, CLI e integração com pipelines'] },
  { t: 'PME', dot: 'var(--c-purple)', d: 'Cloud para todo tipo de indústria e segmento, com suporte próximo.', pts: ['Infraestrutura cloud e híbrida sob medida', 'Redução da complexidade operacional', 'Conformidade de dados e continuidade', 'Atendimento consultivo em português'] },
  { t: 'Enterprise', dot: 'var(--c-magenta)', d: 'Ambientes de missão crítica que exigem alta disponibilidade.', pts: ['Segurança e observabilidade com IA', 'Serviços gerenciados e microsserviços sob medida', 'Custo fixo com meta de 40% de redução', 'Suporte 24x7 e NOC dedicado'] }
];

export const faqGrupos = [
  {
    t: 'Geral e conceitos',
    itens: [
      ['O que é cloud computing?', 'Cloud computing é o fornecimento de recursos computacionais como servidores, armazenamento, banco de dados e redes através da internet.'],
      ['A OMID cobra egress?', 'A OMID não cobra egress (tráfego de saída) para a maioria dos serviços, mas é importante consultar a documentação oficial para entender possíveis exceções e regras específicas por produto.'],
      ['A OMID possui data centers próprios?', 'Sim. A OMID opera infraestrutura própria no Brasil, o que permite controle operacional, soberania de dados e atendimento a requisitos de compliance local.'],
      ['Qual a diferença entre cloud pública e cloud privada?', 'Cloud pública é compartilhada entre múltiplos clientes (multitenant) e operada pelo provedor, enquanto cloud privada é dedicada a uma única organização, podendo ser on-premises ou hospedada em ambiente isolado.'],
      ['Cloud pública é segura?', 'Sim. Cloud pública pode ser extremamente segura quando bem configurada, com controles de acesso, criptografia, monitoramento e governança adequados. A OMID oferece recursos para ajudar a proteger dados e aplicações.']
    ]
  },
  {
    t: 'Infraestrutura e tecnologia',
    itens: [
      ['Quais tecnologias a OMID oferece?', 'Máquinas virtuais, Kubernetes, containers, GPU computing, object storage, block storage, backup, disaster recovery, VMware, banco de dados, VPC, VPN, firewall, balanceador de carga, snapshot, DNS, CDN, monitoramento e IAM.'],
      ['Onde ficam os data centers da OMID?', 'A OMID opera infraestrutura em data centers no Brasil, com localizações em diferentes regiões para suportar disponibilidade, baixa latência e soberania de dados.'],
      ['A OMID possui suporte?', 'Sim. A OMID oferece suporte técnico para resolver dúvidas, incidentes e configurações, além de opções de suporte premium e especializado para operações críticas.'],
      ['A OMID aceita VMware?', 'Sim. A OMID suporta VMware e permite a migração e operação de ambientes baseados em VMware, facilitando a adoção da cloud para clientes com investimentos existentes nessa plataforma.'],
      ['A OMID tem backup?', 'Sim. A OMID oferece serviços de backup e recuperação para proteger dados e aplicações, com opções para diferentes cenários e SLAs.'],
      ['Tem Disaster Recovery na OMID?', 'Sim. A OMID oferece soluções de Disaster Recovery (DR) para garantir continuidade de negócios em caso de falhas ou desastres, com opções para replicação e recuperação em diferentes regiões.']
    ]
  },
  {
    t: 'Segurança, soberania e compliance',
    itens: [
      ['Quais são as certificações da OMID?', 'ISO 9001, ISO 27001, ISO 27017, ISO 27018, ISO 37001, I-REC Standard, ABNT NBR 15.247 e PCI-DSS.'],
      ['Quanto custa?', 'O custo varia conforme o serviço, uso e escala. Consulte o simulador ou entre em contato para obter uma estimativa personalizada com base no seu caso de uso.'],
      ['A OMID atende à LGPD?', 'Sim. A OMID atende aos requisitos da LGPD e oferece controles para ajudar os clientes a cumprir suas obrigações de privacidade e proteção de dados.'],
      ['O que é soberania de dados?', 'Soberania de dados refere-se ao controle sobre a localização e o tratamento de dados, garantindo que eles permaneçam sob jurisdição nacional e atendam a regras locais de privacidade e segurança.']
    ]
  },
  {
    t: 'Inteligência Artificial e GPU',
    itens: [
      ['Tem GPU na OMID?', 'Sim. A OMID disponibiliza infraestrutura com aceleração por GPU para projetos que demandam alto desempenho computacional, como inteligência artificial, machine learning, processamento paralelo e aplicações de alta performance.'],
      ['Qual cloud usar para IA?', 'Escolha uma cloud que ofereça infraestrutura escalável, aceleração por GPU, baixa latência e suporte a frameworks de IA. A OMID é uma boa opção para projetos que exigem performance, soberania e suporte local.'],
      ['Posso treinar modelos de IA na OMID?', 'Sim. A OMID permite treinar modelos de IA, desde a prototipagem até a produção, com recursos para escalar computação, armazenamento e rede conforme necessário.'],
      ['A OMID suporta LLMs como Llama, Mistral e DeepSeek?', 'Sim. A OMID suporta o deploy e a execução de LLMs e pode ser configurada para atender às necessidades de computação, memória e latência desses workloads.'],
      ['É possível hospedar aplicações de IA generativa na OMID?', 'Sim. A OMID permite hospedar aplicações de IA generativa, incluindo modelos de texto, imagem e multimídia, com foco em desempenho, escalabilidade e suporte a workloads intensivos.'],
      ['Quais GPUs estão disponíveis?', 'A OMID oferece uma variedade de GPUs para diferentes perfis de uso, incluindo opções da NVIDIA. Consulte a documentação oficial para a lista atual de modelos e capacidades.'],
      ['Como dimensionar uma infraestrutura para IA?', 'Considere o tamanho do modelo, o tipo de treinamento, o dataset, a latência desejada e o volume de inferências. A OMID pode ajudar a dimensionar a infraestrutura certa para o seu caso de uso.'],
      ['Qual a diferença entre GPU e CPU para IA?', 'GPUs são mais adequadas para IA porque oferecem processamento paralelo em larga escala, reduzindo o tempo de treinamento e inferência. CPUs são mais versáteis, mas menos eficientes para cálculos intensivos de IA.']
    ]
  }
];

export const parceria = {
  modalidades: [
    { t: 'Finder', dot: 'var(--c-teal)', d: 'Você indica oportunidades qualificadas e a OMID conduz todo o processo comercial.', com: '20% da primeira mensalidade por ano de contrato' },
    { t: 'Reseller com pré-venda', dot: 'var(--c-cyan)', d: 'Você conduz o ciclo comercial completo, da prospecção à negociação, com acesso ao Portal OMID para gerar propostas.', com: '8% a 16% recorrente + 20% no primeiro mês' },
    { t: 'Reseller sem pré-venda', dot: 'var(--c-blue)', d: 'Modelo flexível, com apoio opcional de pré-venda OMID. Indicado para integradores e consultorias em expansão.', com: '5% a 7% recorrente' },
    { t: 'VAR — Value Added Reseller', dot: 'var(--c-magenta)', d: 'Você agrega serviços e software próprios às soluções OMID, mantém a relação direta e fatura o cliente.', com: '5% a 20% de desconto na compra de recursos' },
    { t: 'Sponsor Partner', dot: 'var(--c-orange)', d: 'Expansão por indicação estratégica de novos parceiros, com comissão recorrente sobre a receita gerada por eles.', com: '1,2% sobre as vendas do parceiro indicado' }
  ],
  tiers: [
    ['Certified Partner', 'até R$ 1.000.000'],
    ['Silver',   'R$ 1.000.001 a R$ 5.000.000'],
    ['Gold',     'R$ 5.000.001 a R$ 10.000.000'],
    ['Platinum', 'R$ 10.000.001 a R$ 20.000.000'],
    ['Diamond',  'acima de R$ 20.000.001']
  ],
  beneficios: [
    'Remuneração no mesmo mês do pagamento da fatura do cliente',
    'Sem taxa de entrada e sem custo de licenciamento',
    'Simulador digital de propostas',
    'Suporte humanizado, em português',
    'Assistência técnica 24x7',
    'Campanha de incentivo 2026 com premiação'
  ]
};

export const precos = [
  {
    cat: 'Licenciamento',
    unidade: 'por par de vCPU / mês',
    linhas: [
      ['Windows Server', 'par de vCPU', 'R$ 98,26'],
      ['SQL Server — faixa inicial', 'par de vCPU', 'R$ 223,97'],
      ['SQL Server — faixa superior', 'par de vCPU', 'R$ 1.492,48'],
      ['Linux enterprise', 'mês', 'R$ 308,00 a R$ 951,08']
    ]
  },
  {
    cat: 'Compute',
    unidade: 'por vCPU ou GiB / mês',
    linhas: [
      ['CPU Eco', 'vCPU', 'R$ 32,42'],
      ['CPU UMax', 'vCPU', 'R$ 356,56'],
      ['Memória — padrão', 'GiB', 'R$ 11,60'],
      ['Memória — Kubernetes', 'GiB', 'R$ 29,00']
    ]
  },
  {
    cat: 'Armazenamento e backup',
    unidade: 'por GB / mês',
    linhas: [
      ['Disco NL-SAS', 'GB', 'R$ 0,12'],
      ['Disco SSD', 'GB', 'R$ 0,72'],
      ['Backup as a Service', 'GB', 'R$ 0,09']
    ]
  },
  {
    cat: 'Rede',
    unidade: 'por mês ou GB',
    linhas: [
      ['Rede isolada', 'mês', 'R$ 49,90 a R$ 999,90'],
      ['Tráfego de saída', 'GB', 'R$ 0,016'],
      ['Tráfego de entrada', 'GB', 'R$ 0,10'],
      ['Endereço IP', 'mês', 'R$ 25,00']
    ]
  },
  {
    cat: 'Serviços gerenciados',
    unidade: 'por mês',
    linhas: [
      ['Gestão de banco de dados — faixa A', 'mês', 'R$ 4.084,05'],
      ['Gestão de banco de dados — faixa C', 'mês', 'R$ 12.184,22'],
      ['Monitoramento por unidade de compute', 'mês', 'R$ 89,90'],
      ['Gestão de Microsoft AD', 'mês', 'R$ 1.090,00'],
      ['Agente de SOC', 'mês', 'R$ 400,00 a R$ 500,00']
    ]
  }
];
