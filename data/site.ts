export const siteContact = {
  email: 'info@piesquaretechnologies.com',
  phone: '+977 9715000715',
  phoneHref: 'tel:+9779715000715',
  address: 'Kusunti-13, Lalitpur, Nepal',
  website: 'piesquaretechnologies.com',
} as const;

export const capabilities = ['Telecom', 'Optical Fiber', 'Solar & Energy', 'IT & Digital'] as const;

export type CapabilitySlug = 'telecom' | 'optical-fiber' | 'solar-energy' | 'it-solutions';

export type ProjectStatus = 'COMPLETED' | 'ONGOING';

export type ProjectCategory = 'TELECOM' | 'FIBER' | 'SOLAR' | 'IT';

export type ProjectRecord = Readonly<{
  id: string;
  title: string;
  status: ProjectStatus;
  category: ProjectCategory;
  location: string;
  scope: ReadonlyArray<string>;
  description: string;
  image: string;
  imageAlt: string;
}>;

export type ServiceCapability = Readonly<{
  number: string;
  title: string;
  copy: string;
}>;

export type ServiceOverview = Readonly<{
  number: string;
  title: string;
  summary: string;
  scope: ReadonlyArray<string>;
  href: string;
}>;

export type CareerRole = Readonly<{
  id: string;
  title: string;
  type: 'Full-time' | 'Internship';
  location: string;
  discipline: string;
  description: string;
  requirements: ReadonlyArray<string>;
  applicationSubject: string;
}>;

export type CertificationRecord = Readonly<{
  title: string;
  description: string;
  status: 'Document pending verification';
}>;

export const capabilityRoutes: ReadonlyArray<{ label: (typeof capabilities)[number]; slug: CapabilitySlug; href: string }> = [
  { label: 'Telecom', slug: 'telecom', href: '/capabilities/telecom' },
  { label: 'Optical Fiber', slug: 'optical-fiber', href: '/capabilities/optical-fiber' },
  { label: 'Solar & Energy', slug: 'solar-energy', href: '/capabilities/solar-energy' },
  { label: 'IT & Digital', slug: 'it-solutions', href: '/capabilities/it-solutions' },
] as const;

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/company' },
  { label: 'Projects', href: '/projects' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
] as const;

export const serviceNav = [
  { label: 'Telecom Infrastructure', href: '/capabilities/telecom' },
  { label: 'Fiber Optic Networks', href: '/capabilities/optical-fiber' },
  { label: 'Solar Energy', href: '/capabilities/solar-energy' },
  { label: 'IT Infrastructure', href: '/capabilities/it-solutions' },
] as const;

export const companyLogos = [
  { id: 'nepal-telecom', src: '/media/logos/nepal-telecom.jpg', alt: 'Nepal Telecom', rotation: -8 },
  { id: 'ncell', src: '/media/logos/ncell.png', alt: 'Ncell', rotation: 6 },
  { id: 'cg-net', src: '/media/logos/cg-net.png', alt: 'CG Net', rotation: 12 },
] as const;

export const companyTimeline = [
  { marker: '2019', title: 'Established', copy: 'Field engineering operations begin in Nepal.' },
  { marker: 'Telecom', title: 'Telecom networks', copy: 'Tower, installation, and commissioning services.' },
  { marker: 'Fiber', title: 'Optical fiber', copy: 'Survey, deployment, splicing, and testing.' },
  { marker: 'Energy', title: 'Solar & energy', copy: 'Hybrid power and O&M for infrastructure sites.' },
  { marker: 'IT', title: 'IT & digital', copy: 'Infrastructure, security, and software delivery.' },
  { marker: 'Today', title: 'One partner', copy: 'Multiple infrastructure layers, nationwide delivery.' },
] as const;

export const telecomPhases = [
  'Site survey',
  'Civil foundation',
  'Tower erection',
  'Equipment installation',
  'Power and grounding',
  'Commissioning',
  'Optimization',
] as const;

export const telecomFrames = [
  ['/media/cinematic/T01-telecom-survey.webp', 'Site survey', '01'],
  ['/media/cinematic/T02-telecom-foundation.webp', 'Civil foundation', '02'],
  ['/media/cinematic/T03-telecom-tower.webp', 'Tower erection', '03'],
  ['/media/cinematic/T04-telecom-equipment.webp', 'Equipment installation', '04'],
  ['/media/cinematic/T06-telecom-power-commissioning.png', 'Power and grounding', '05'],
  ['/media/cinematic/T05-telecom-live.webp', 'Commissioning', '06'],
  ['/media/cinematic/T07-telecom-optimization.png', 'Optimization', '07'],
] as const;

export const fiberSteps = [
  'Route survey',
  'Laying',
  'Splicing',
  'OTDR testing',
  'POP deployment',
  'Customer connection',
] as const;

export const energyPoints = [
  { title: 'Hybrid power', copy: 'Solar-grid-battery systems sized for telecom loads.' },
  { title: 'Off-grid systems', copy: 'Power for remote sites beyond the grid.' },
  { title: 'Battery storage', copy: 'Backup and load optimization for uptime.' },
  { title: 'O&M support', copy: 'Ongoing maintenance for energy assets.' },
] as const;

export const digitalModules = [
  'IT infrastructure',
  'LAN / WAN',
  'Cloud consulting',
  'Cybersecurity',
  'CCTV & access control',
  'Software + web',
] as const;

export const deliveryFlow = ['Survey', 'Design', 'Deploy', 'Test', 'Optimize', 'Maintain'] as const;

export const impactStats = [
  ['3500+', 'RF sites tested'],
  ['115', 'Telecom sites installed'],
  ['2240+ KM', 'Fiber network survey / install / maintenance'],
  ['4', 'Infrastructure disciplines, one partner'],
  ['400 kW', 'Solar O&M project documented in the company profile'],
] as const;

export const projects: ReadonlyArray<ProjectRecord> = [
  {
    id: 'national-backbone-fiber-deployment',
    title: 'National Backbone Fiber Deployment',
    status: 'COMPLETED',
    category: 'FIBER',
    location: 'Multiple Districts, Nepal',
    scope: ['Route Survey', 'OFC Installation', 'Fiber Splicing', 'OTDR Testing', 'Commissioning'],
    description: 'Route survey, OFC installation, fiber splicing, OTDR testing and commissioning across backbone routes.',
    image: '/media/projects/field-tech-1.jpg',
    imageAlt: 'Field engineers deploying optical fiber for the national backbone',
  },
  {
    id: '4g-tower-site-rollout',
    title: '4G Tower Site Rollout',
    status: 'ONGOING',
    category: 'TELECOM',
    location: 'Kathmandu Valley',
    scope: ['Civil Works', 'Tower Installation', 'Equipment Installation', 'Commissioning'],
    description: 'Civil works, tower installation, equipment installation and commissioning across a multi-site rollout.',
    image: '/media/projects/antenna.jpg',
    imageAlt: 'Telecom tower and antenna installation for a 4G site rollout',
  },
  {
    id: 'rural-connectivity-tower-program',
    title: 'Rural Connectivity Tower Program',
    status: 'COMPLETED',
    category: 'TELECOM',
    location: 'Karnali Province',
    scope: ['Site Survey', 'Civil Works', 'Tower Installation', 'Maintenance'],
    description: 'Site survey, civil works, tower installation and ongoing maintenance for rural connectivity.',
    image: '/media/projects/telecom.jpg',
    imageAlt: 'Telecom tower supporting rural connectivity in Nepal',
  },
  {
    id: 'ftth-metro-fiber-expansion',
    title: 'FTTH Metro Fiber Expansion',
    status: 'ONGOING',
    category: 'FIBER',
    location: 'Pokhara',
    scope: ['Fiber Installation', 'Splicing', 'ODF Installation', 'Testing'],
    description: 'Fiber installation, splicing, ODF installation and testing for a growing metro FTTH network.',
    image: '/media/projects/field-tech-2.jpg',
    imageAlt: 'Technician working on a metro fiber network expansion',
  },
  {
    id: 'off-grid-solar-telecom-sites',
    title: 'Off-Grid Solar for Telecom Sites',
    status: 'COMPLETED',
    category: 'SOLAR',
    location: 'Himalayan Region',
    scope: ['Site Survey', 'System Design', 'Solar Installation', 'O&M'],
    description: 'Site survey, system design, solar installation and O&M for remote telecom sites.',
    image: '/media/projects/solar.jpg',
    imageAlt: 'Solar power system supporting a remote telecom site',
  },
  {
    id: 'commercial-rooftop-solar-installation',
    title: 'Commercial Rooftop Solar Installation',
    status: 'COMPLETED',
    category: 'SOLAR',
    location: 'Birgunj',
    scope: ['System Design', 'Installation', 'Testing', 'Commissioning'],
    description: 'System design, rooftop installation, testing and commissioning for a commercial facility.',
    image: '/media/projects/solar.jpg',
    imageAlt: 'Commercial rooftop solar installation',
  },
  {
    id: 'enterprise-data-center-build',
    title: 'Enterprise Data Center Build',
    status: 'COMPLETED',
    category: 'IT',
    location: 'Kathmandu',
    scope: ['Structured Cabling', 'Server Installation', 'Network Infrastructure'],
    description: 'Server, network, structured cabling and data-center infrastructure delivery.',
    image: '/media/projects/rack.jpg',
    imageAlt: 'Enterprise network rack installed for a data center build',
  },
  {
    id: 'campus-network-cctv-deployment',
    title: 'Campus Network & CCTV Deployment',
    status: 'ONGOING',
    category: 'IT',
    location: 'Lalitpur',
    scope: ['LAN/WAN', 'Wi-Fi', 'CCTV & Security', 'IT Maintenance'],
    description: 'Campus network, structured cabling, Wi-Fi and CCTV deployment for an institutional environment.',
    image: '/media/projects/field-tech-2.jpg',
    imageAlt: 'Technician supporting a campus network and security deployment',
  },
] as const;

export const projectFilters = ['All', 'Telecom', 'Fiber', 'Solar', 'IT'] as const;

export const clients = ['Nepal Telecom', 'Ncell', 'CG Net', 'Enterprise + public infrastructure'] as const;

export const whyPieSquare = [
  { title: 'End-to-End Execution', copy: 'From survey to installation, testing and maintenance — one accountable partner.' },
  { title: 'Experienced Field Teams', copy: 'Skilled technical personnel capable of working in demanding field environments.' },
  { title: 'Multi-Domain Expertise', copy: 'Telecom, fiber, solar and IT capabilities under one organization.' },
  { title: 'Quality Focus', copy: 'Strong focus on workmanship, testing, documentation and project standards.' },
  { title: 'Safety First', copy: 'Safety-focused field operations and compliance with applicable requirements.' },
  { title: 'Rapid Mobilization', copy: 'Ability to deploy teams and resources efficiently for project requirements.' },
] as const;

export const organizationLevels = [
  { title: 'Leadership', copy: 'Direction, partnerships, and delivery accountability.' },
  { title: 'Engineering', copy: 'Telecom, fiber, energy, and IT delivery teams.' },
  { title: 'Field operations', copy: 'Survey, installation, testing, and maintenance crews.' },
  { title: 'Support', copy: 'Logistics, safety, quality, and client coordination.' },
] as const;

export const serviceOverview: ReadonlyArray<ServiceOverview> = [
  {
    number: '01',
    title: 'Telecom Infrastructure',
    summary: 'Civil works, tower installation, site deployment, RF drive testing, equipment installation and maintenance for mobile operators and tower companies.',
    scope: ['CIVIL WORKS', 'TOWER INSTALLATION', 'TOWER MAINTENANCE'],
    href: '/capabilities/telecom',
  },
  {
    number: '02',
    title: 'Fiber Optic Networks',
    summary: 'Route surveys, OFC deployment, fiber splicing, testing, commissioning and maintenance for carriers, ISPs and network operators.',
    scope: ['ROUTE SURVEY', 'FIBER INSTALLATION', 'FIBER SPLICING'],
    href: '/capabilities/optical-fiber',
  },
  {
    number: '03',
    title: 'Solar Energy',
    summary: 'Site surveys, system design, installation, testing, commissioning and operation & maintenance for commercial, industrial and telecom solar.',
    scope: ['SITE SURVEY', 'SYSTEM DESIGN', 'SOLAR INSTALLATION'],
    href: '/capabilities/solar-energy',
  },
  {
    number: '04',
    title: 'IT Infrastructure',
    summary: 'Networking, structured cabling, server infrastructure, data center support, CCTV and ongoing IT maintenance for enterprises and institutions.',
    scope: ['NETWORK INFRASTRUCTURE', 'STRUCTURED CABLING', 'SERVER & DATA CENTER'],
    href: '/capabilities/it-solutions',
  },
] as const;

export const serviceDetails: Record<
  CapabilitySlug,
  {
    title: string;
    intro: string;
    lifecycle: ReadonlyArray<string>;
    scope: ReadonlyArray<string>;
    proof: string;
    image: string;
    imageAlt: string;
    capabilities: ReadonlyArray<ServiceCapability>;
    relatedProjectIds: ReadonlyArray<string>;
  }
> = {
  telecom: {
    title: 'Telecom Infrastructure',
    intro: 'Complete telecom site delivery — from greenfield civil works to tower erection, RF equipment installation, drive testing and long-term maintenance. Our field teams work to operator and tower-company specifications across all provinces of Nepal.',
    lifecycle: ['Site survey', 'Civil foundation', 'Tower erection', 'Equipment installation', 'Power and grounding', 'Commissioning', 'Optimization'],
    scope: ['RF drive testing', 'Installation & commissioning', 'Power integration', 'Performance optimization'],
    proof: '115 telecom sites installed and 3500+ RF sites tested.',
    image: '/media/cinematic/T03-telecom-tower.webp',
    imageAlt: 'Telecom tower erected in Nepal',
    capabilities: [
      { number: '01', title: 'Civil Works', copy: 'Foundations, equipment plinths, compound works, access preparation and site civil infrastructure.' },
      { number: '02', title: 'Tower Installation', copy: 'Ground-based and rooftop tower erection, rigging, antenna and feeder line installation.' },
      { number: '03', title: 'Tower Maintenance', copy: 'Preventive and corrective tower maintenance, structural inspection and painting.' },
      { number: '04', title: 'RF Drive Testing', copy: 'Network drive testing, KPI data collection, post-processing and optimization reporting.' },
      { number: '05', title: 'Telecom Site Installation', copy: 'End-to-end site build: power, BTS, microwave, transmission and ancillary systems.' },
      { number: '06', title: 'Equipment Installation', copy: 'BTS/NodeB/eNodeB, microwave radios, rectifiers, batteries and hybrid power systems.' },
      { number: '07', title: 'Testing & Commissioning', copy: 'Site acceptance testing, VSWR/PIM checks, integration and commissioning to go-live.' },
      { number: '08', title: 'Maintenance', copy: 'SLA-driven preventive maintenance, fault attendance and emergency restoration.' },
    ],
    relatedProjectIds: ['4g-tower-site-rollout', 'rural-connectivity-tower-program'],
  },
  'optical-fiber': {
    title: 'Fiber Optic Networks',
    intro: 'Optical fiber network delivery at carrier grade — route engineering, underground and aerial OFC deployment, precision splicing, certified testing and rapid fault restoration for backbone, metro and FTTH networks.',
    lifecycle: ['Route survey', 'Laying', 'Splicing', 'OTDR testing', 'POP deployment', 'Customer connection'],
    scope: ['Backbone & access fiber', 'Splicing & termination', 'OTDR testing', 'POP deployment'],
    proof: '2240+ KM of fiber network survey, installation, and maintenance.',
    image: '/media/cinematic/F02-fiber-field-deployment.png',
    imageAlt: 'Field team deploying optical fiber in Nepal',
    capabilities: [
      { number: '01', title: 'Route Survey', copy: 'Physical route inspection, GIS data collection, obstacle mapping and survey reporting.' },
      { number: '02', title: 'Fiber Route Planning', copy: 'Route engineering, BOQ preparation, duct/pole planning and permit documentation support.' },
      { number: '03', title: 'OFC Installation', copy: 'Trenching, ducting, pulling and blowing of optical fiber cable on backbone and metro routes.' },
      { number: '04', title: 'Underground Fiber', copy: 'Duct laying, HDD coordination, chamber construction and underground cable deployment.' },
      { number: '05', title: 'Aerial Fiber', copy: 'Pole-line aerial cable installation, lashing, ADSS deployment and pole treatment.' },
      { number: '06', title: 'Fiber Splicing', copy: 'High-precision fusion splicing for backbone, distribution and drop networks.' },
      { number: '07', title: 'ODF Installation', copy: 'ODF, FDH and splitter installation, termination, dressing and labeling.' },
      { number: '08', title: 'OTDR Testing', copy: 'Bi-directional OTDR testing, loss budgets, trace analysis and acceptance documentation.' },
      { number: '09', title: 'Fault Localization', copy: 'Rapid fault localization using OTDR and visible fault locators with precise dig-point reporting.' },
      { number: '10', title: 'Maintenance & Restoration', copy: '24/7 fault restoration, preventive maintenance and network relocation support.' },
    ],
    relatedProjectIds: ['national-backbone-fiber-deployment', 'ftth-metro-fiber-expansion'],
  },
  'solar-energy': {
    title: 'Solar Energy',
    intro: "Solar energy systems engineered for Nepal's terrain and grid conditions — rooftop, commercial, ground-mounted and off-grid telecom solar, delivered from survey to long-term operation and maintenance.",
    lifecycle: ['Load survey', 'System design', 'Installation', 'Battery integration', 'Testing', 'O&M'],
    scope: ['Hybrid power systems', 'Off-grid installations', 'Battery storage', 'Operations & maintenance'],
    proof: '400 kW solar O&M project documented in the company profile.',
    image: '/media/cinematic/E02-solar-hybrid-power.png',
    imageAlt: 'Solar hybrid power installation supporting infrastructure',
    capabilities: [
      { number: '01', title: 'Site Survey', copy: 'Irradiance, shading, structural and electrical site assessment with survey reporting.' },
      { number: '02', title: 'Load Assessment', copy: 'Load profiling, consumption analysis and autonomy requirements for off-grid systems.' },
      { number: '03', title: 'System Design', copy: 'PV sizing, inverter and battery selection, SLD preparation and yield estimation.' },
      { number: '04', title: 'BOQ & Estimation', copy: 'Detailed bill of quantities, cost estimation and procurement specification.' },
      { number: '05', title: 'Rooftop Solar', copy: 'Residential and commercial rooftop PV with structural mounting and grid-tie integration.' },
      { number: '06', title: 'Commercial Solar', copy: 'Industrial-scale rooftop and captive power systems for factories and institutions.' },
      { number: '07', title: 'Ground-Mounted Solar', copy: 'Ground-mount PV plants including civil foundations and array structures.' },
      { number: '08', title: 'Installation', copy: 'Mechanical and electrical installation by trained, safety-certified field teams.' },
      { number: '09', title: 'Testing', copy: 'String testing, insulation resistance, earth testing and IV-curve verification.' },
      { number: '10', title: 'Commissioning', copy: 'System energization, grid synchronization, monitoring setup and handover.' },
      { number: '11', title: 'Operation & Maintenance', copy: 'Preventive O&M, cleaning cycles, performance monitoring and fault response.' },
    ],
    relatedProjectIds: ['off-grid-solar-telecom-sites', 'commercial-rooftop-solar-installation'],
  },
  'it-solutions': {
    title: 'IT Infrastructure',
    intro: 'Enterprise IT infrastructure built to standard — structured cabling, LAN/WAN, server and data center environments, Wi-Fi, surveillance and ongoing managed maintenance for corporate and institutional clients.',
    lifecycle: ['Assessment', 'Design', 'Deployment', 'Hardening', 'Handover', 'Support'],
    scope: ['IT infrastructure & LAN/WAN', 'Cloud consulting', 'Cybersecurity', 'CCTV & access control', 'Software + web'],
    proof: 'Delivered alongside field infrastructure for enterprises and institutions.',
    image: '/media/cinematic/D01-digital-operations.png',
    imageAlt: 'Digital operations and network monitoring environment',
    capabilities: [
      { number: '01', title: 'Network Infrastructure', copy: 'Design and deployment of enterprise switching, routing and firewall infrastructure.' },
      { number: '02', title: 'LAN/WAN', copy: 'Campus and branch network deployment with redundancy and segmentation.' },
      { number: '03', title: 'Structured Cabling', copy: 'Cat6/Cat6A and fiber backbone cabling, certified with calibrated test equipment.' },
      { number: '04', title: 'Server Installation', copy: 'Rack, server, storage and UPS installation with documented configuration.' },
      { number: '05', title: 'Data Center Infrastructure', copy: 'Server room and data center build: racks, containment, power and cooling coordination.' },
      { number: '06', title: 'Wi-Fi', copy: 'Enterprise wireless surveys, controller-based Wi-Fi deployment and coverage validation.' },
      { number: '07', title: 'CCTV & Security', copy: 'IP surveillance systems, NVR/VMS setup, access control and perimeter security.' },
      { number: '08', title: 'Hardware', copy: 'Supply, installation and configuration of workstations, printers and peripherals.' },
      { number: '09', title: 'Network Troubleshooting', copy: 'Fault isolation, performance analysis and remediation for live enterprise networks.' },
      { number: '10', title: 'IT Maintenance', copy: 'Annual maintenance contracts, helpdesk support and preventive system health checks.' },
    ],
    relatedProjectIds: ['enterprise-data-center-build', 'campus-network-cctv-deployment'],
  },
};

export const technicalWorkforce = [
  'Civil Engineers',
  'Telecom Engineers',
  'RF Engineers',
  'Fiber Technicians',
  'Solar Technicians',
  'IT Engineers',
  'Project Managers',
  'Safety Personnel',
] as const;

export const industries = [
  'Telecommunications',
  'Internet Service Providers',
  'Fiber Network Operators',
  'EPC & Infrastructure Companies',
  'Renewable Energy',
  'Data Centers',
  'Government Infrastructure',
  'Commercial & Industrial',
  'Enterprise IT',
] as const;

export const companyApproach = [
  'Survey-backed engineering',
  'Certified test results',
  'Safety briefings and method statements',
  'Dedicated project coordination and reporting',
] as const;

export const companyValuesDetailed = [
  { title: 'Integrity', copy: 'We work transparently, keep our commitments and make decisions that stand up in the field.' },
  { title: 'Safety', copy: 'Every deployment begins with the people, precautions and procedures that make good work possible.' },
  { title: 'Quality', copy: 'We pair disciplined workmanship with measured testing, documentation and reliable handover.' },
  { title: 'Accountability', copy: 'One project team owns communication, coordination and delivery from survey to support.' },
  { title: 'Innovation', copy: 'We adopt practical tools and methods that improve uptime, efficiency and field decisions.' },
  { title: 'Customer Focus', copy: 'We listen closely, explain clearly and shape delivery around the outcome our clients need.' },
] as const;

export const careerRoles: ReadonlyArray<CareerRole> = [
  {
    id: 'telecom-tower-rigger-technician',
    title: 'Telecom Tower Rigger / Technician',
    type: 'Full-time',
    location: 'Multiple Sites, Nepal',
    discipline: 'Telecom',
    description: 'Tower erection, rigging, antenna and feeder installation on live and greenfield sites.',
    requirements: ['2+ years tower rigging experience', 'Work-at-height certification preferred', 'Physically fit for field deployment', 'Willing to travel nationwide'],
    applicationSubject: 'Application: Telecom Tower Rigger / Technician - Pie Square Technologies',
  },
  {
    id: 'fiber-splicing-technician',
    title: 'Fiber Splicing Technician',
    type: 'Full-time',
    location: 'Kathmandu / Field',
    discipline: 'Fiber',
    description: 'Fusion splicing, ODF/FDH termination and OTDR testing on backbone and FTTH networks.',
    requirements: ['Hands-on fusion splicer experience', 'OTDR trace analysis skills', 'Attention to documentation quality', 'Field-ready with valid driving license preferred'],
    applicationSubject: 'Application: Fiber Splicing Technician - Pie Square Technologies',
  },
  {
    id: 'rf-drive-test-engineer',
    title: 'RF Drive Test Engineer',
    type: 'Full-time',
    location: 'Kathmandu',
    discipline: 'Telecom',
    description: 'RF drive testing, data collection, post-processing and optimization reporting for mobile networks.',
    requirements: ['Experience with drive test tools (TEMS, Nemo or similar)', 'Understanding of GSM/UMTS/LTE KPIs', 'Report writing in English', 'Willingness for extended field travel'],
    applicationSubject: 'Application: RF Drive Test Engineer - Pie Square Technologies',
  },
  {
    id: 'solar-installation-technician',
    title: 'Solar Installation Technician',
    type: 'Full-time',
    location: 'Field Sites, Nepal',
    discipline: 'Solar',
    description: 'PV array, inverter and battery installation for rooftop, commercial and off-grid telecom solar systems.',
    requirements: ['Electrical or solar installation background', 'Knowledge of DC/AC safety practices', 'Ability to read SLDs and BOQs', 'Field deployment readiness'],
    applicationSubject: 'Application: Solar Installation Technician - Pie Square Technologies',
  },
  {
    id: 'it-network-engineer',
    title: 'IT / Network Engineer',
    type: 'Full-time',
    location: 'Kathmandu',
    discipline: 'IT',
    description: 'Structured cabling, LAN/WAN deployment, server installation and enterprise network support.',
    requirements: ['CCNA or equivalent knowledge', 'Structured cabling and certification testing experience', 'Server and storage fundamentals', 'Customer-facing communication skills'],
    applicationSubject: 'Application: IT / Network Engineer - Pie Square Technologies',
  },
  {
    id: 'project-management-intern',
    title: 'Project Management Intern',
    type: 'Internship',
    location: 'Kathmandu',
    discipline: 'Projects',
    description: 'Support project coordinators in documentation, site reporting and resource tracking across active deployments.',
    requirements: ['Engineering or management student/recent graduate', 'Strong documentation skills', 'Interest in infrastructure projects', 'Proficiency with spreadsheets and reports'],
    applicationSubject: 'Application: Project Management Intern - Pie Square Technologies',
  },
] as const;

export const certifications: ReadonlyArray<CertificationRecord> = [
  { title: 'Company Registration', description: 'Legal registration records for Pie Square Technologies.', status: 'Document pending verification' },
  { title: 'PAN / VAT Registration', description: 'Tax registration documents for the operating entity.', status: 'Document pending verification' },
  { title: 'Operating Licenses', description: 'Permits and operating licenses relevant to infrastructure delivery.', status: 'Document pending verification' },
  { title: 'ISO Certifications', description: 'Quality, environmental and information-security certifications.', status: 'Document pending verification' },
  { title: 'Safety Certifications', description: 'Work-at-height, electrical and field safety certifications.', status: 'Document pending verification' },
  { title: 'Vendor Registrations', description: 'Approved vendor and partner registrations.', status: 'Document pending verification' },
  { title: 'Technical Certifications', description: 'Team and equipment certifications supporting project delivery.', status: 'Document pending verification' },
] as const;

export const contactServices = ['Telecom', 'Optical Fiber', 'Solar & Energy', 'IT Solutions', 'Other'] as const;

export const companyValues = [
  { title: 'Engineering credibility', copy: 'Documented field work and measured network performance.' },
  { title: 'Nationwide delivery', copy: 'Infrastructure built close to the ground, across Nepal.' },
  { title: 'Dependable handover', copy: 'Tested, commissioned, and supported after go-live.' },
] as const;
