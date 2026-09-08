export default {
site: {
  tagline: 'The cloud of the future, today',
  desc: 'Sovereign public cloud in Brazil, vertically integrated, with our own Tier III data centers, contracts in Brazilian reais and up to 40% savings on your bill.'
},

nav: { solucoes: 'Solutions', paraQuem: 'Who it\'s for', precos: 'Pricing', partner: 'Partner Program', conteudo: 'Resources', sobre: 'About', faq: 'FAQ', contato: 'Contact', login: 'Log in', cta: 'Talk to an expert', abrirMenu: 'Open menu', idioma: 'Language', trilha: 'Breadcrumb', principal: 'Main', movel: 'Mobile menu', pular: 'Skip to content', inicial: 'OMID — home' },

c: {
  especialista: 'Talk to an expert', solucoes: 'Explore the solutions', simular: 'Run the simulator',
  simularEconomia: 'Estimate the savings', verSolucao: 'View solution', verPlataforma: 'See the platform',
  inicio: 'Home', proximoPasso: 'Next step', agendarDemo: 'Book a demo',
  falarTime: 'Talk to our team', enviar: 'Send message', enviando: 'Sending…',
  simularPreco: 'Estimate price', simularAmbiente: 'Estimate your environment',
  camada: 'Layer',

  enviando: `Sending…`,
  erroCampos: `Please check the highlighted fields before sending.`,
  erroEnvio: `We could not send it right now. Try again in a moment or write to <a href="mailto:comercial@omid.com.br">comercial@omid.com.br</a>.`,
  naoPreencha: `Do not fill in this field`,
  construida: 'Built in',
  criterio: 'Criterion', comecarAgora: 'Start now', obrigatorio: 'required'
},

megaSide: { h: 'An intelligent cloud for teams that want to stay in control.', p: 'Create, scale and manage your infrastructure in minutes — no red tape, at a fixed price in Brazilian reais.' },

footer: {
  desc: 'Sovereign public cloud, vertically integrated and operated 100% in Brazil, on our own Tier III data centers.',
  solucoes: 'Solutions', empresa: 'Company', fale: 'Get in touch',
  cloud: 'Intelligent cloud', precos: 'Price list', cliente: 'Customer login', simulador: 'Simulator',
  grito: 'Talk to the people<br>who run it.',
  direitos: 'All rights reserved.', etica: 'Ethics Hotline', codigo: 'Code of Conduct', privacidade: 'Privacy Policy'
},

cta: {
  h: 'Make the smart call.',
  p: 'Talk to an OMID expert and get an assessment of your environment with a real savings projection.',
  a: 'Talk to an expert', b: 'Run the simulator'
},

soberania: {
  eb: 'Data sovereignty',
  h: 'A cloud is only as sovereign<br>as the law that protects it.',
  p: 'Encryption does not decide jurisdiction. What decides it is where the data physically sits and which legislation reaches whoever operates it. At OMID there is a single answer: Brazil.',
  promessas: [
    ['We do not sell, use or transfer your data.', 'Your data does not become raw material for our products, for model training or for third-party deals. It is yours and it stays yours.'],
    ['Brazilian jurisdiction, end to end.', 'Governed by the LGPD and the Marco Civil da Internet, under Brazilian courts. No exposure to the US CLOUD Act or to foreign authority requests.'],
    ['Infrastructure, operations and support inside the country.', 'The data center is ours, the NOC is ours, and whoever answers your ticket lives here. No layer is handed off abroad.']
  ],
  coordEb: 'Where your data sits, precisely',
  agora: 'Brasília time',
  nota: 'Approximate site coordinates. Technical visits can be arranged with the sales team.'
},

video: {
  id: 'aYfr6EBTU_Y',
  tag: 'Our own data center',
  titulo: 'Omid own data centers: Tier III, redundant, secure, scalable and 100% green',
  meta: 'Tour of the São Paulo site · play on YouTube',
  eb: 'Inside the operation',
  h: 'Not a render.<br>It is our data center.',
  p: 'Redundant power, precision cooling, a certified vault room and the racks your operation will live in. You are welcome to visit in person — but start here.'
},

comparar: {
  cenarios: { rot: 'Start from a scenario', custom: 'Custom',
    itens: { site: 'Website and API', erp: 'ERP', banco: 'Database', k8s: 'Kubernetes' } },
  economiaAno: 'per year less than the cheapest of AWS, Azure and Google',
  economiaAnoNeg: 'per year more than the cheapest of AWS, Azure and Google',
  fraseItem: 'In this configuration, {item} accounts for {pct}% of the gap to {prov}.',
  cambioRot: 'What if the dollar were', cambioHoje: 'back to today\'s rate',
  cambioNota: 'OMID bills in reais. Move the dollar: the others change, OMID\'s contract does not.',
  legenda: 'Each bar shows where the price comes from',
  oracleNota: 'Oracle charges less for compute and nothing for egress up to 10 TB. OMID\'s price includes a 24×7 NOC, a contract in reais and its own data center.',
  copiar: 'Copy a link to this simulation', copiado: 'Link copied',
  rot: 'Live comparison',
  h: 'The same machine, elsewhere.',
  p: 'What you built above, priced at the public on-demand rates of AWS, Azure, Google Cloud and Oracle for the São Paulo region, converted at today\'s exchange rate.',
  provedores: { omid: 'OMID', aws: 'AWS', azure: 'Microsoft Azure', gcp: 'Google Cloud', oci: 'Oracle Cloud' },
  omidInclui: 'contract in BRL · 24×7 NOC · own data center',
  vezes: '× OMID', maisCaro: 'more than OMID', maisBarato: 'less than OMID', referencia: 'reference',
  aoVivo: 'exchange rate and Oracle live', consultado: 'prices retrieved on', cambio: 'PTAX sell rate',
  base: 'Public on-demand list prices, no commitment, São Paulo region. Compute as the equivalent instance (AWS, Azure) or per vCPU and GiB (Google, Oracle); general-purpose SSD; backup as snapshot or object storage; internet egress at the public tiers. Excludes support, IPs, taxes and commitment discounts. Trademarks belong to their owners.',
  fontes: 'Sources and method'
},
regua: {
  rot: 'The proof, in reais',
  h: 'Build it here.<br>This is the price.',
  p: 'Drag and watch the bill recalculate instantly, using OMID public price-list figures. Nothing leaves this page until you decide to order.',
  so: 'Operating system', linux: 'Linux', windows: 'Windows Server',
  vcpu: 'vCPU', ram: 'Memory', ssd: 'SSD storage', backup: 'Backup', egress: 'Outbound traffic',
  mes: '/month', total: 'Monthly estimate',
  partes: { compute: 'Compute', disco: 'Storage', backup: 'Backup', trafego: 'Outbound traffic', licenca: 'Licensing' },
  nota: 'Estimate built from OMID public price-list figures. Taxes and commercial terms in the proposal.',
  btn: 'Order this design', btnNota: 'Ordering opens the OMID portal to provision a profile like this one.',
  btn2: 'Talk to an expert'
},
quieto: 'The best infrastructure is the kind <b>you forget exists</b>.',
numCurto: ['500+ companies', '100% uptime since 2020', 'Up to 40% savings', '2 Tier III data centers'],

simband: {
  eb: 'Cost calculator',
  h: 'Find out in 2 minutes how much<br>your bill could shrink.',
  p: 'Enter the machines, storage and network you run today. The simulator builds the equivalent design on OMID and returns a closed figure in Brazilian reais — no mandatory sign-up and no sales call before you want one.',
  btn: 'Open the calculator',
  btn2: 'Talk to an expert',
  meta: ['Takes about 2 minutes', 'Result in reais, fixed cost', 'No commitment']
},

home: {
  eb: 'Sovereign cloud · operated in Brazil',
  h1a: 'The cloud of<br>the future, ', h1b: 'today',
  lead: 'Sovereign public cloud, vertically integrated and operated 100% in Brazil. Contracts in Brazilian reais, predictable cost and up to 40% off your monthly bill.',
  facts: ['100% Brazilian', 'Our own Tier III data centers', '100% renewable energy', 'NOC 24x7x365'],
  viz: { eb: 'Monthly cost · 12 months', t: 'Your bill, in reais', omid: 'OMID — fixed cost in contract', outros: 'Global cloud — usage billed in USD', meses: ['JAN', 'JUN', 'DEC'],
         alt: 'Monthly cost comparison: the OMID bill stays flat while the global cloud bill climbs and fluctuates across twelve months.',
         floatT: 'NOC 24x7x365', floatP: 'Two-minute average response, staffed by humans' },
  vertical: { eb: 'Vertical integration', h: 'From the data center floor<br>to the person who answers you.',
    p: 'Global clouds run your operation on layers of third parties scattered around the world. At OMID, all four layers are ours — and that is exactly why we can guarantee a fixed price, low latency and answers in minutes.' },
  numeros: { eb: 'By the numbers', h: 'A mature operation, not a promise.' },
  solucoes: { eb: 'Solutions', h: 'Five products.<br>One single operation.',
    p: 'Cloud, data center, managed services, security and artificial intelligence under the same contract, the same console and the same support team.',
    cardH: 'Not sure where to start?', cardP: 'Run the simulator with your current environment and see, in minutes, how much is left in the budget.' },
  cmp: { eb: 'Comparison', h: 'Same workload,<br>a very different invoice.',
    p: 'The difference is not the hardware. It is who controls the stack, which currency the contract is signed in, and who picks up when something breaks.',
    nota: 'Comparison based on the structural characteristics of each contracting model, not on measurements of specific providers. OMID figures and conditions as per the current contract.' },
  cog: { eb: 'Omid Cloud Cognitiva®', h: 'The intelligence layer<br>your cloud was missing.',
    p: 'AI agents specialised in operations, support, FinOps, security and governance continuously analyse your environment — on OMID, multicloud or on-premise — and act before you need to open a ticket.',
    btn: 'Explore Cloud Cognitiva',
    minis: [['Intelligent cost management', 'Spots waste and recommends optimisation, continuously.'],
            ['Predictive resilience', 'Anticipates failures through behavioural analysis, before downtime.'],
            ['Cognitive performance', 'Adjusts resources in real time to how the application behaves.'],
            ['Assisted automation', 'Suggests and executes operational actions with a full audit trail.']] },
  seg: { eb: 'Who it\'s for', h: 'From the first deploy<br>to mission critical.', link: 'See every use case' },
  infra: { eb: 'Infrastructure', h: 'Two Tier III data centers.<br>Neither one is rented.',
    p: 'We broke ground in 2018, switched them on in 2019 and launched Smart Cloud in 2020 — with 100% uptime ever since. I-REC certified energy, full redundancy, and the only certified vault room in Brazil offering colocation.',
    rotulos: ['Headquarters and SP data center', 'RJ data center'],
    dc: [['Tier III certified', 'ABNT NBR 15.247 certified vault room', 'Lan-to-lan links up to 100 Gbps', '99.982% guaranteed uptime'],
         ['Tier III certified', 'Connectivity across multiple carriers', 'Secondary site for Disaster Recovery', 'Low latency across the Southeast']],
    tres: [['100% renewable energy', 'Certified to the I-REC standard, from the rack to the cooling.'],
           ['Data sovereignty', 'Your data stays under Brazilian jurisdiction, no exceptions.'],
           ['Neighbourly latency', 'A short route to the end user, with no international hop.']] },
  partner: { eb: 'Partner Program 2026', h: 'Turn your client base<br>into recurring revenue.',
    p: 'Five partnership models, five tiers, no joining fee and no licensing cost. Your commission lands in the same month the customer pays the invoice.',
    btn: 'Become an OMID partner',
    resumo: [['Finder', '20% of the 1st monthly fee'], ['Reseller', '8% to 16% recurring'], ['VAR', 'up to 20% discount'], ['Sponsor', '1.2% on referrals']] }
},

camadas: [
  { n: '04', dot: 'var(--c-purple)', t: 'Human support · 24x7 NOC',
    d: 'A Brazilian team running the operation, with a two-minute average response.',
    itens: ['Certified specialists', 'Proactive 24x7 NOC', 'Human support', 'Focus on experience'] },
  { n: '03', dot: 'var(--c-teal)', t: 'Security & Cloud Cognitiva',
    d: 'Layered defence and AI observability across the whole environment.',
    itens: ['Multi-layer security', 'AI observability', 'Detection and response', 'Compliance and governance', 'Identity management'] },
  { n: '02', dot: 'var(--c-cyan)', t: 'Sovereign cloud platform',
    d: 'Virtualisation and containers on KVM and Kubernetes, orchestrated by us.',
    itens: ['Orchestration & management', 'Compute', 'Storage', 'Network', 'Database', 'Backup & DR', 'KVM', 'Kubernetes'] },
  { n: '01', dot: 'var(--c-green)', t: 'Physical infrastructure',
    d: 'Our own Tier III data center in Brazil, from the ground up to the rack.',
    itens: ['Tier III certified facility', 'Data center in Brazil', 'Infrastructure we own', '100% data sovereignty'] }
],

numeros: [
  'companies trust their infrastructure to OMID',
  'uptime since Smart Cloud launched, back in 2020',
  'lower monthly bill compared to global clouds',
  'Tier III data centers of our own, in São Paulo and Rio'
],

certificacoes: [
  ['ISO 27001', 'Information security'], ['ISO 27017', 'Cloud security'], ['ISO 27018', 'Cloud privacy'],
  ['ISO 9001', 'Quality management'], ['ISO 37001', 'Anti-bribery system'], ['Tier III', 'Certified data center'],
  ['ABNT NBR 15.247', 'Certified vault room'], ['I-REC', '100% renewable energy'], ['PCI-DSS', 'Payment data'], ['LGPD', 'Data protection']
],

comparativo: {
  cols: ['', 'OMID', 'Global clouds'],
  rows: [
    ['Contract currency', 'Brazilian reais, fixed in the contract', 'US dollars, with FX exposure'],
    ['Bill predictability', 'Agreed fixed cost, no month-end surprises', 'Variable usage, hard to forecast'],
    ['Egress traffic', 'Not charged on most services', 'Billed per GB transferred'],
    ['Where the data lives', 'Our own data centers in Brazil, under national jurisdiction', 'Global regions, subject to foreign legislation'],
    ['Support', 'Brazilian team, human, 24x7x365 — two-minute average response', 'Tickets with SLAs in hours, across paid tiers'],
    ['Stack integration', 'Vertical: data center, network, platform and operations are ours', 'Layers distributed across partners and regions'],
    ['Learning curve', 'Straightforward portal, no certification required', 'Sprawling console, with a curve and certifications']
  ]
},

segmentos: [
  { t: 'Devs & Startups', dot: 'var(--c-cyan)', d: 'Flexible infrastructure for teams that need to grow fast.', pts: ['Environments provisioned in minutes', 'Automation and cost control from day one', 'Scale without rewriting the architecture', 'REST API, CLI and pipeline integration'] },
  { t: 'SMB', dot: 'var(--c-purple)', d: 'Cloud for every industry and segment, with support that stays close.', pts: ['Tailored cloud and hybrid infrastructure', 'Less operational complexity', 'Data compliance and continuity', 'Consultative service in your language'] },
  { t: 'Enterprise', dot: 'var(--c-magenta)', d: 'Mission-critical environments that demand high availability.', pts: ['AI-driven security and observability', 'Managed services and bespoke microservices', 'Fixed cost with a 40% reduction target', '24x7 support and a dedicated NOC'] }
],

produtos: [
  {
    tag: 'IaaS',
    resumo: 'High-availability sovereign public cloud, at a fixed price in reais and scaling on demand.',
    titulo: 'Sovereign public cloud with real security, control and predictability.',
    lead: 'High-availability infrastructure, scalable performance and transparent costs for companies that need to operate with autonomy, security and specialised technical support in Brazil.',
    bullets: ['Sovereign public cloud operated 100% in Brazil', 'Up to 40% off the monthly bill', 'Predictable costs in reais, with no FX swings', 'Simplified fixed-cost contract', 'Infrastructure that scales on demand', 'Buy by VM or by resource pool'],
    blocos: [
      ['Omid Compute Cloud (OC2)', 'A flexible, scalable public cloud built around operational efficiency. On-demand provisioning, management via console, CLI and REST API, DevOps pipeline integration and ready-made templates for fast deployment.'],
      ['Data Center as a Service', 'Corporate cloud infrastructure for teams that need high availability, operational predictability and full control of the environment, on a fixed-cost contract.'],
      ['Managed Kubernetes', 'K8s clusters with automatic orchestration, horizontal scaling and operations assisted by the OMID team.'],
      ['Cloud Backup & Data Protection', 'Continuous protection for critical data and operations, with retention policies and guaranteed recovery.'],
      ['Cloud Storage', 'Scalable object and block storage, sized for continuous growth without re-provisioning.'],
      ['Artificial Intelligence', 'GPU-accelerated infrastructure, ready for training, inference and deployment of LLMs and generative AI.'],
      ['Virtual Desktop (VDI)', 'Virtual environments with more control, mobility and security for distributed teams.'],
      ['Serverless', 'More agility to build, ship and scale applications without managing servers.']
    ],
    aplicacoes: ['Corporate applications and critical systems', 'DevOps and staging environments', 'Dedicated workloads', 'Artificial intelligence and data processing', 'Backup, Disaster Recovery and continuity', 'Remote work and virtual desktops']
  },
  {
    tag: 'Data Center',
    resumo: 'Our own Tier III data centers, with a certified vault room and connectivity up to 100 Gbps.',
    titulo: 'Strategic infrastructure demands a data center worthy of your operation.',
    lead: 'Host your servers in our own Tier III data centers, with an ABNT NBR 15.247 certified vault room, high availability, redundant connectivity and specialised support on site.',
    bullets: ['Our own Tier III certified data centers', 'ABNT NBR 15.247 certified vault room', 'Redundant power and cooling systems', '99.982% guaranteed uptime', 'Multiple carriers and lan-to-lan links up to 100 Gbps', 'The only data center in Brazil offering colocation inside a certified vault room'],
    blocos: [
      ['Shared data hall', 'Racks in a high-density shared environment, with redundant power and cooling.'],
      ['Dedicated cages', 'Physically isolated areas, customised for specific security and capacity requirements.'],
      ['Wholesale', 'Blocks of dedicated capacity for large-scale operations and planned expansion.'],
      ['Certified vault room', 'An ABNT NBR 15.247 certified environment, compatible with certificate authority requirements and PSS accredited by the ITI.'],
      ['Smart Hands', 'A technical team inside the data center performing physical work so yours does not have to travel.'],
      ['Data Center Edge', 'Scalable expansion with distributed presence to cut latency close to your operation.']
    ],
    aplicacoes: ['Mission-critical environments', 'Certificate authorities and ICP-Brasil', 'Financial and regulated sectors', 'Consolidating an in-house data center', 'Hybrid cloud + colocation strategies', 'Secondary Disaster Recovery site']
  },
  {
    tag: 'Managed services',
    resumo: 'Management, monitoring, migration and sustainment of your infrastructure, 24x7x365.',
    titulo: 'Your IT operation running with more control, continuity and efficiency.',
    lead: 'Specialised services for managing, monitoring, migrating and sustaining your infrastructure, with continuous technical support, a multidisciplinary team and an operation built for demanding corporate environments.',
    bullets: ['Dedicated NOC with 24x7x365 monitoring', 'Infrastructure management and maintenance', 'Secure environment migration', 'Specialised technical support that stays close', 'IT operational continuity', 'AI-assisted observability'],
    blocos: [
      ['Management Services', 'Continuous management of operating systems, databases, firewall, network and infrastructure, with uninterrupted technical support for critical environments.'],
      ['NOC 24x7x365', 'Continuous observability of networks, servers and critical environments, ensuring fast incident response and protecting the operation.'],
      ['Data Migration', 'Planning and execution of workload and environment migrations focused on integrity, continuity and risk reduction.'],
      ['Smart Hands', 'Operational support inside the data center, with no unnecessary trips for your team.']
    ],
    aplicacoes: ['Lean IT teams that need to scale', 'Hybrid and multicloud environments', 'Legacy-to-cloud migration', 'Sustaining critical systems', '24x7 assisted operations', 'Lower IT operating cost']
  },
  {
    tag: 'SOC 24x7',
    resumo: 'Our own 24x7x365 SOC, threat intelligence and AI-driven incident response.',
    titulo: 'Your operation protected with intelligence, continuous monitoring and advanced threat response.',
    lead: 'Continuous cyber protection for corporate environments with a 24x7x365 SOC, threat intelligence and specialised security management — in cloud, hybrid or on-premise.',
    bullets: ['Specialised SOC running around the clock', 'Fast incident detection and response', 'Integrated EDR and XDR solutions', 'Coverage for cloud, hybrid and on-premise', 'Advanced threat detection', 'Regulatory compliance and governance'],
    blocos: [
      ['Cyber Defence Centre 24x7x365', 'Continuous monitoring of digital threats with dedicated analysts and response playbooks.'],
      ['OSR — Omid Safe Restore', 'Managed backups with guaranteed recovery and operational continuity.'],
      ['Security Incident Monitoring', 'Continuous monitoring for early threat identification and event correlation.'],
      ['AVS — Automatic Vulnerability Scan', 'Automated scans for early identification of vulnerabilities in the environment.'],
      ['OTI — Omid Threat Intelligence', 'Tracking of threats across the web, the deep web and digital environments tied to your brand.'],
      ['RCT — Regular Cyberattack Test', 'Periodic penetration testing with a report and a remediation plan.'],
      ['Full Managed CyberSecurity', 'End-to-end security management with specialised monitoring and response.'],
      ['Cyber Security Services', 'Advisory services for risk analysis, security architecture and governance.']
    ],
    aplicacoes: ['Regulated and audited sectors', 'Environments with sensitive and personal data', 'Internet-facing operations', 'Teams without an in-house SOC', 'Incident response and forensics', 'Vulnerability management programmes']
  },
  {
    tag: 'Agentic AI',
    resumo: 'The intelligence layer your cloud was missing: FinOps, performance and risk, driven by AI.',
    titulo: 'The intelligence layer your cloud was missing.',
    lead: 'Optimise your infrastructure with AI applied to cloud. Cut costs, raise performance and automate decisions with agents specialised in operations, support, FinOps, security and governance.',
    bullets: ['Analysis of environment, cost, risk and performance', 'Integration with OMID, multicloud and on-premise', 'AI agents for operations, FinOps and security', 'Application management', 'Integrated 24x7 technical support', 'Security and compliance management'],
    blocos: [
      ['Intelligent cost management', 'Continuously analyses infrastructure consumption, identifies waste and recommends optimisations.'],
      ['Cognitive performance', 'Monitors workloads in real time and adjusts resources to how the application behaves.'],
      ['Predictive resilience', 'Uses behavioural analysis to anticipate failures before they become downtime.'],
      ['Intelligent security and governance', 'Monitors risk and anomalous behaviour with continuous event correlation.'],
      ['AI-assisted automation', 'Intelligent agents that suggest and execute operational actions with an audit trail.'],
      ['Cognitive assessment', 'A complete map of the environment to surface optimisation opportunities and risk.']
    ],
    aplicacoes: ['Intelligent cost reduction', 'Performance on demand', 'Preventing failures and incidents', 'Continuous security and governance', 'Assisted operational automation', 'Continuous infrastructure evolution']
  }
],

hub: {
  eb: 'Products and solutions', h: 'An entire stack,<br>under a single contract.',
  p: 'Sovereign public cloud, our own Tier III data center, managed services, cyber defence and an AI layer that sees all of it at once. You choose where to start — the integration is already done.',
  precos: 'See the price list',
  cardH: 'Which combination fits you?', cardP: 'In 30 minutes we map your current environment, point to the right design and show a savings projection with numbers from your own case.', cardBtn: 'Book an assessment',
  escolhaEb: 'How to choose', escolhaH: 'Start from the problem,<br>not from the product.',
  escolha: [
    ['My dollar-denominated bill is unpredictable', 0], ['I own hardware and need somewhere to put it', 1],
    ['My team is too small to run 24x7', 2], ['I have no SOC and no incident response', 3],
    ['I do not know where I am overspending', 4], ['I need GPUs to train models', 0]
  ]
},

prodUI: {
  porque: 'Why choose it', porqueH: 'What changes in your operation with',
  incluso: 'What is included', inclusoH: 'Everything that makes up',
  aplic: 'Applications', aplicH: 'Where', aplicH2: 'usually fits',
  aplicP: 'Recurring scenarios among customers already running this solution. If yours is not listed, it probably still fits — worth a conversation.',
  aplicBtn: 'Discuss my scenario',
  combina: 'Pairs well with', combinaH: 'The other layers of the stack.',
  ctaH: 'Let\'s design your', ctaP: 'An expert reviews your current environment and comes back with architecture, SLA and a cost projection — no strings attached.'
},

paraQuem: {
  eb: 'Who it\'s for', h: 'From the first deploy<br>to mission critical.',
  p: 'The same infrastructure serves the startup provisioning its first environment and the bank that cannot blink. What changes is the level of service around it.',
  usoEb: 'Use cases', usoH: 'Scenarios that reach us<br>every single week.',
  usos: [
    ['Escaping FX exposure', 'Teams that closed the year 30% over budget because of the dollar and need a predictable contract in reais.'],
    ['Leaving the in-house data center', 'Companies done with refreshing hardware, looking for colocation or cloud without losing control of the environment.'],
    ['Compliance and sovereignty', 'Regulated operations that must prove where the data sits and under which jurisdiction it is handled.'],
    ['A lean IT team', 'Departments of two or three people that need 24x7 NOC and SOC without hiring an entire team.'],
    ['AI projects', 'Squads that need GPUs to train, infer and host LLMs with no queue and no international quotas.'],
    ['Continuity and DR', 'Businesses that need a secondary site, replication and a tested recovery plan.']
  ],
  setorEb: 'Sectors', setorH: 'Every kind of industry and segment.',
  setores: ['Financial services', 'Healthcare', 'Retail and e-commerce', 'Manufacturing', 'Education', 'Government and public sector', 'Software and SaaS', 'Logistics', 'Certificate authorities', 'Professional services', 'Telecommunications', 'Agribusiness']
},

cloud: {
  eb: 'Intelligent cloud', h: 'An intelligent cloud for teams<br>that want to stay in control.',
  p: 'Create, scale and manage your infrastructure in minutes. Self-service portal, instant provisioning, real-time monitoring and a bill closed in Brazilian reais.',
  btn: 'Configure your instance', btn2: 'See the price list',
  dorEb: 'The problem', dorH: 'You already know<br>how this month ends.',
  dores: [
    ['A portal that demands certification', 'A console far too broad for a team that just wants to bring an environment up and get back to work.'],
    ['Priced in dollars', 'Budget approved in reais, invoice charged in dollars. The gap comes out of your pocket.'],
    ['Traffic on the meter', 'Every GB leaving the cloud lands on the bill, and the forecast never matches the actual.'],
    ['Support with SLAs in hours', 'A ticket, a queue and paid escalation. Meanwhile the application is still down.']
  ],
  solEb: 'How it works', solH: 'Three steps<br>and the environment is up.',
  passos: [
    ['Create your account', 'Under two minutes, no red tape and no international credit card.'],
    ['Pick the machine', 'Ready-made templates or a bespoke setup of vCPU, memory and disk.'],
    ['Scale when you need to', 'Resource adjustments with no interruption, monitored in real time in the console.']
  ],
  provaEb: 'What you gain',
  provas: [['20% to 40%', 'lower cost with more performance'], ['2 min', 'average support response time'], ['100%', 'human support, 24x7'], ['0', 'FX variation in the contract']]
},

precos: {
  eb: 'Price list', h: 'Published pricing.<br>In reais. No asterisk.',
  p: 'Sale prices per contracted unit. The final composition depends on how the environment is designed — the simulator builds the bill from your scenario in minutes.',
  btn: 'Simulate my environment', btn2: 'Talk to an expert',
  cats: [
    ['Licensing', 'per vCPU pair or per month'],
    ['Compute', 'per vCPU or GiB / month'],
    ['Storage and backup', 'per GB / month'],
    ['Network', 'per month or per GB'],
    ['Managed services', 'per month']
  ],
  colItem: 'Item', colValor: 'Price',
  nota: 'Reference values from the current contract and subject to change. Taxes, allowances and specific commercial conditions are set out in the proposal. Check the official documentation for per-product rules.',
  faqEb: 'Cost questions', faqH: 'What usually drives the bill.',
  faq: [
    ['Does OMID charge for egress?', 'OMID does not charge egress on most services. Check the official documentation for exceptions and per-product rules.'],
    ['Is the contract in Brazilian reais?', 'Yes. The contract is signed in reais at a fixed cost, with no FX variation passed through during its term.'],
    ['How does billing work?', 'You buy by VM or by resource pool. Under OC2, billing follows usage time; under DCaaS, the cost is fixed and predictable.'],
    ['Are there hidden setup or lock-in fees?', 'Commercial conditions — including term, adjustment and any fees — are presented in writing in the proposal before signature.']
  ]
},

sobre: {
  eb: 'About OMID', h: 'A Brazilian cloud<br>built from scratch.',
  p: 'In 2018 we decided Brazil needed a public cloud of its own. We built two data centers, wrote the platform and flipped the switch in 2020. Since then, 100% uptime.',
  linhaEb: 'Timeline',
  linha: [
    ['2018', 'The decision', 'The goal is set: build a 100% Brazilian public cloud option, on infrastructure we own.'],
    ['2019', 'The data centers', 'Two Tier III data centers go live, in São Paulo and Rio de Janeiro, alongside the cloud platform.'],
    ['2020', 'Smart Cloud', 'OMID Smart Cloud launches. Since then, 100% uptime from the very first day of operation.'],
    ['Today', 'More than 500 companies', 'A capitalised operation, with no need to raise funds, spanning cloud, colocation, managed services, SOC and agentic AI.']
  ],
  mvvEb: 'What drives us',
  missao: ['Mission', 'To democratise access to high-quality cloud infrastructure, offering reliable, secure solutions fully suited to the Brazilian reality.'],
  visao: ['Vision', 'To be the national benchmark in cloud computing, recognised for technical excellence, constant innovation and commitment to our customers\' success.'],
  valores: ['Values', 'Transparency in every relationship, technical excellence in every delivery, total customer focus and an unshakeable commitment to data sovereignty.'],
  difEb: 'Differentiators', difH: 'Why OMID<br>is the smart choice.',
  dif: [
    ['Vertical integration', 'We control the whole stack, from the data center to the support desk. Nothing is handed off to third parties.'],
    ['A real public cloud', 'Global public cloud standard — not hosting, and not a private cloud under another name.'],
    ['Financial predictability', 'A fixed contract in reais, with no FX variation during its term.'],
    ['Data sovereignty', 'Infrastructure we own, operated in Brazil, under national jurisdiction.'],
    ['Human support', '24x7 technical support in Brazil, with a two-minute average response.'],
    ['AI-powered management', 'Infrastructure run by specialists and amplified by artificial intelligence agents.']
  ],
  certEb: 'Certifications', certH: 'Audited, not self-declared.',
  certP: 'Certifications and standards that underpin the operation — from information security to renewable energy.'
},

compliance: {
  eb: 'Integrity and Compliance', h: 'Integrity is not a policy.<br>It is a daily practice.',
  p: 'Our compliance programme combines an independent whistleblowing channel, continuous communication, training, leadership commitment and the ongoing strengthening of a culture of integrity.',
  docsEb: 'Documents', docsH: 'Foundations of the programme.',
  docs: [['Code of Ethical Conduct', 'The principles guiding our relationships with customers, partners, suppliers and colleagues.'],
         ['Anti-Corruption Policy', 'Guidelines for preventing, detecting and responding to acts harmful to public and private administration.']],
  docBtn: 'Request document',
  irregEb: 'What to report', irregH: 'What counts as an irregularity.',
  irregP: 'Actions or omissions contrary to the law or to the principles of the Code of Ethics and the Anti-Corruption Policy. Reports are received by the Compliance function, which reports to the Ethics and Integrity Committee independently of management.',
  canalEb: 'Ethics Hotline', canalH: 'How to report.',
  canalTel: ['Phone', 'Available 8 hours a day, 5 days a week, answered by a trained specialist. The reporter\'s identity is kept confidential.'],
  canalMail: ['Email', 'A response within 5 business days from a specialised team. The origin of the email is kept confidential.'],
  garantias: ['Confidentiality of the reporter\'s identity', 'Independence from management', 'Zero tolerance for retaliation of any kind', 'Investigation led by the Ethics and Integrity Committee']
},

partner: {
  eb: 'Partner Program 2026', h: 'Turn your client base into recurring revenue.',
  p: 'Become a strategic partner in the Brazilian cloud ecosystem. Offer infrastructure, cloud, cybersecurity and data center with specialised OMID support — and generate monthly recurring revenue on a national structure.',
  btn: 'Become an OMID partner', btn2: 'Talk to our team',
  modEb: 'Models', modH: 'Five ways in.',
  modP: 'From a simple referral to a reseller layering in its own software. Pick the model that matches your team\'s commercial maturity.',
  comissao: 'Commission',
  mods: [
    ['Finder', 'You refer qualified opportunities and OMID runs the entire commercial process.', '20% of the first monthly fee per contract year'],
    ['Reseller with pre-sales', 'You run the full commercial cycle, from prospecting to negotiation, with access to the OMID Portal to generate proposals.', '8% to 16% recurring + 20% in the first month'],
    ['Reseller without pre-sales', 'A flexible model with optional OMID pre-sales support. Suited to integrators and growing consultancies.', '5% to 7% recurring'],
    ['VAR — Value Added Reseller', 'You add your own services and software to OMID solutions, own the relationship and invoice the customer.', '5% to 20% discount on resource purchases'],
    ['Sponsor Partner', 'Growth through strategic referral of new partners, with recurring commission on the revenue they generate.', '1.2% on the referred partner\'s sales']
  ],
  tierEb: 'Tiers', tierH: 'The more you grow,<br>the bigger your share.',
  tierP: 'Your tier is set by the annual TCV of your OMID portfolio and automatically repositions your commission.',
  tierCol: ['Tier', 'Annual TCV'],
  benEb: 'Benefits', benH: 'What you take home.',
  bens: ['Paid in the same month the customer settles the invoice', 'No joining fee and no licensing cost', 'Digital proposal simulator', 'Human support, in your language', '24x7 technical assistance', '2026 incentive campaign with prizes'],
  clienteEb: 'And for your customer', clienteH: 'The argument is already written.',
  clientes: ['Up to 40% lower cloud cost', 'A local support team, 24x7', 'Data sovereignty on Tier III infrastructure', 'Data centers running on 100% renewable energy'],
  formEb: 'Apply', formH: 'Start building your growth.',
  formP: 'Fill in the form and our channel team will get in touch to design the right model for your business.'
},

partnerOk: {
  eb: 'Application received', h: 'We got your application.',
  p: 'Our channel team will review your profile and get in touch within 2 business days to design the right partnership model for your business.',
  proxEb: 'In the meantime',
  prox: [['Explore the solutions', 'Get to know the portfolio you will take to market.', 'solucoes'],
         ['See the price list', 'The public figures that back your proposal.', 'precos'],
         ['Read the technical content', 'Material to ground the conversation with your customer.', 'docs']],
  volta: 'Back to the home page'
},

conteudo: {
  eb: 'Resources', h: 'Technical material<br>for better decisions.',
  p: 'Articles, case studies, documentation and conversations about infrastructure, sovereign cloud, security and artificial intelligence applied to operations.',
  secoes: [
    ['Blog', 'Articles on cloud, infrastructure, security and applied AI.', 'blog'],
    ['Case studies', 'Real stories of migration, savings and operational continuity.', 'cases'],
    ['Videos and podcasts', 'Conversations with our technical team and with people running mission-critical systems.', 'videos'],
    ['Documentation', 'Technical reference for products, APIs and per-service rules.', 'docs']
  ],
  vazio: 'This section is being prepared. In the meantime, talk to our experts — the answer usually arrives faster than an article.',
  vazioBtn: 'Talk to an expert'
},

blog:   { eb: 'Blog', h: 'Articles and analysis.', p: 'Technical content on sovereign cloud, infrastructure architecture, FinOps, security and artificial intelligence applied to operations.' },
casesData: {
  eb: 'Case studies', itens: [],
  colaborar: 'Your operation could be the next case study',
  colaborarP: 'If OMID has solved something meaningful for you — a migration, savings, continuity — our marketing team would love to tell that story with you, always with your prior approval of the text.',
  colaborarBtn: 'I want to share mine',
  campos: ['Challenge', 'Solution', 'Result']
},

cases:  { eb: 'Case studies', h: 'Stories from teams<br>that ran the numbers.', p: 'Examples of migration, cost reduction, operational continuity and mission-critical projects running on OMID infrastructure.' },
videos: { eb: 'Videos and podcasts', h: 'Conversations with<br>the people who operate.', p: 'Technical chats, platform demos and discussions on data sovereignty, security and AI in infrastructure.' },
docs:   { eb: 'Documentation', h: 'Technical reference.', p: 'Product guides, API reference, per-service limits and specific billing rules. The starting point for whoever will run it.',
          links: [['Getting started', 'Account creation, first project and initial provisioning.'], ['API and CLI', 'REST reference, authentication and resource automation.'], ['Compute and Kubernetes', 'Machine types, resource pools and managed clusters.'], ['Network and security', 'VPC, VPN, firewall, load balancer and traffic rules.'], ['Backup and Disaster Recovery', 'Retention policies, replication and recovery testing.'], ['Billing', 'Per-service rules, egress exceptions and the invoicing cycle.']],
          btn: 'Open the documentation' },

faq: {
  eb: 'Frequently asked questions', h: 'Straight answers.',
  p: 'What we get asked most about sovereign cloud, infrastructure, security, cost and artificial intelligence.',
  grupos: [
    ['General and concepts', [
      ['What is cloud computing?', 'Cloud computing is the delivery of computing resources such as servers, storage, databases and networks over the internet.'],
      ['Does OMID charge for egress?', 'OMID does not charge egress (outbound traffic) on most services, but it is important to consult the official documentation to understand possible exceptions and per-product rules.'],
      ['Does OMID have its own data centers?', 'Yes. OMID operates its own infrastructure in Brazil, which allows operational control, data sovereignty and compliance with local requirements.'],
      ['What is the difference between public and private cloud?', 'A public cloud is shared across multiple customers (multitenant) and operated by the provider, whereas a private cloud is dedicated to a single organisation, either on-premises or hosted in an isolated environment.'],
      ['Is public cloud secure?', 'Yes. A public cloud can be extremely secure when properly configured, with access controls, encryption, monitoring and appropriate governance. OMID provides resources to help protect data and applications.']
    ]],
    ['Infrastructure and technology', [
      ['Which technologies does OMID offer?', 'Virtual machines, Kubernetes, containers, GPU computing, object storage, block storage, backup, disaster recovery, VMware, databases, VPC, VPN, firewall, load balancer, snapshot, DNS, CDN, monitoring and IAM.'],
      ['Where are OMID\'s data centers?', 'OMID operates infrastructure in data centers in Brazil, in different regions to support availability, low latency and data sovereignty.'],
      ['Does OMID provide support?', 'Yes. OMID provides technical support to resolve questions, incidents and configurations, plus premium and specialised support options for critical operations.'],
      ['Does OMID support VMware?', 'Yes. OMID supports VMware and enables the migration and operation of VMware-based environments, easing cloud adoption for customers with existing investments in that platform.'],
      ['Does OMID offer backup?', 'Yes. OMID offers backup and recovery services to protect data and applications, with options for different scenarios and SLAs.'],
      ['Is Disaster Recovery available?', 'Yes. OMID offers Disaster Recovery solutions to guarantee business continuity in the event of failure or disaster, with options for replication and recovery across different regions.']
    ]],
    ['Security, sovereignty and compliance', [
      ['Which certifications does OMID hold?', 'ISO 9001, ISO 27001, ISO 27017, ISO 27018, ISO 37001, I-REC Standard, ABNT NBR 15.247 and PCI-DSS.'],
      ['How much does it cost?', 'Cost varies by service, usage and scale. Use the simulator or get in touch for a tailored estimate based on your use case.'],
      ['Is OMID compliant with Brazil\'s LGPD?', 'Yes. OMID meets LGPD requirements and provides controls to help customers meet their own privacy and data protection obligations.'],
      ['What is data sovereignty?', 'Data sovereignty refers to control over where data is located and how it is processed, ensuring it remains under national jurisdiction and complies with local privacy and security rules.']
    ]],
    ['Artificial Intelligence and GPU', [
      ['Does OMID offer GPUs?', 'Yes. OMID provides GPU-accelerated infrastructure for projects demanding high computational performance, such as artificial intelligence, machine learning, parallel processing and high-performance applications.'],
      ['Which cloud should I use for AI?', 'Choose a cloud offering scalable infrastructure, GPU acceleration, low latency and support for AI frameworks. OMID is a strong option for projects requiring performance, sovereignty and local support.'],
      ['Can I train AI models on OMID?', 'Yes. OMID supports training AI models from prototyping through to production, with resources to scale compute, storage and network as needed.'],
      ['Does OMID support LLMs such as Llama, Mistral and DeepSeek?', 'Yes. OMID supports deploying and running LLMs and can be configured for the compute, memory and latency needs of those workloads.'],
      ['Can I host generative AI applications on OMID?', 'Yes. OMID supports hosting generative AI applications, including text, image and multimedia models, with a focus on performance, scalability and intensive workloads.'],
      ['Which GPUs are available?', 'OMID offers a range of GPUs for different usage profiles, including NVIDIA options. Check the official documentation for the current list of models and capabilities.'],
      ['How do I size infrastructure for AI?', 'Consider model size, training type, dataset, target latency and inference volume. OMID can help size the right infrastructure for your use case.'],
      ['What is the difference between GPU and CPU for AI?', 'GPUs suit AI better because they offer massively parallel processing, cutting training and inference time. CPUs are more versatile but less efficient for intensive AI computation.']
    ]]
  ],
  aindaH: 'Still unsure?', aindaP: 'Talk to an expert. No script, no qualification queue.'
},

contato: {
  eb: 'Contact', h: 'Talk to the people who<br>run the infrastructure.',
  p: 'Sales, NOC, partnerships or press: pick the right channel and the team answers. Technical support runs 24x7x365.',
  canais: [
    ['Sales', 'New projects, proposals and environment simulation.'],
    ['NOC — Technical support', 'Incidents and operations, 24 hours a day, every day of the year.'],
    ['Partnerships', 'Partner Program, channels and resale.'],
    ['Press', 'Press office and communications.']
  ],
  whats: 'WhatsApp', tel: 'Phone', mail: 'Email', gratis: 'Toll-free',
  endEb: 'Where we are', endH: 'Two addresses,<br>two data centers.',
  formEb: 'Form', formH: 'Tell us what you need.',
  formP: 'Describe your scenario and an expert replies within 1 business day with a concrete path — not a catalogue.',
  campos: { nome: 'Name', email: 'Work email', tel: 'Phone', empresa: 'Company', cargo: 'Job title', assunto: 'Subject', msg: 'How can we help?', msgPh: 'Describe your current environment, what is bothering you and what you want to solve.' },
  assuntos: ['Buying cloud', 'Colocation and data center', 'Managed services', 'Cybersecurity', 'Cloud Cognitiva and AI', 'Partner Program', 'Existing customer support', 'Something else'],
  lgpd: 'I authorise OMID to process my data to respond to this request, in line with Brazil\'s LGPD.',
  ok: 'We received your message. An OMID expert will reply within 1 business day.'
},

privacidade: {
  eb: 'Privacy',
  h: 'Privacy Policy',
  p: 'How OMID Solutions collects, uses, shares and protects personal data, in line with Brazilian Law 13.709/2018 (LGPD).',
  aviso: '<strong>Draft for legal review.</strong> The structure below follows LGPD requirements and is a starting point, but it must be validated by OMID legal counsel before publication — especially retention periods, the list of processors and the data protection officer contact.',
  atualizado: 'Last updated',
  secoes: [
    ['Who the controller is', 'OMID Solutions, headquartered at Av. Aruanã, 452 — Tamboré, Barueri (SP), Brazil, 06460-010, is the controller of personal data processed through this website. Within contracted services, OMID acts mostly as a <strong>processor</strong>, handling data on the customer behalf and under their instructions.'],
    ['What we collect', 'On the website: name, work email, phone, company, job title and the content of the message you send us, plus technical browsing data (IP address, device and browser type, pages visited). Within services: account, billing and infrastructure usage data, and the access logs required by the Marco Civil da Internet.'],
    ['What we use it for', 'Responding to sales and support requests; performing and invoicing contracts; ensuring the security and availability of the infrastructure; meeting legal and regulatory obligations; and, with your consent, sending communications about products and content.'],
    ['Our legal bases', 'Performance of a contract and preliminary procedures (art. 7, V), compliance with a legal or regulatory obligation (art. 7, II), legitimate interest for security and fraud prevention (art. 7, IX), and consent for marketing communications (art. 7, I), which can be withdrawn at any time.'],
    ['Who we share it with', 'We do not sell, assign or repurpose your data. Sharing is limited to processors necessary to deliver the service, under contract and confidentiality obligations, and to competent authorities upon a valid legal request in Brazil.'],
    ['Where the data lives', 'In OMID own data centers, located in Brazilian territory, under national jurisdiction. There is no international data transfer as part of the standard operation of our services.'],
    ['How long we keep it', 'For as long as necessary for the purpose that motivated collection and for the applicable legal periods — in particular the access logs required by the Marco Civil da Internet. Once the period ends, data is deleted or anonymised.'],
    ['How we protect it', 'Technical and organisational controls aligned with ISO 27001, 27017 and 27018: encryption, identity and access management, 24x7x365 SOC monitoring, environment segregation and an incident response plan.'],
    ['Cookies', 'We use cookies that are essential to the website and, with your consent, analytics cookies to understand how pages are used. You can review your preferences at any time through your browser settings.'],
    ['Your rights', 'You may request confirmation of processing, access, correction, anonymisation, portability, deletion, information about sharing, and withdrawal of consent. Write to our data protection officer; we respond within the periods set by the LGPD.'],
    ['Data Protection Officer', 'Questions, data subject requests and privacy matters can be sent to the channel below. You may also use the Ethics Hotline.'],
    ['Changes to this policy', 'We may update this document to reflect legal or operational changes. The date of the latest revision is always at the top of this page, and material changes are communicated through official channels.']
  ],
  contatoTitulo: 'Talk about privacy',
  contatoP: 'Data subject requests, questions about this policy or about the processing carried out by OMID.'
}
};
