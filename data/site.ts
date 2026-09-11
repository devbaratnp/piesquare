export const siteContact = {
  email: 'info@piesquaretechnologies.com',
  phone: '+977 9715000715',
  phoneHref: 'tel:+9779715000715',
  address: 'Kusunti-13, Lalitpur, Nepal',
  website: 'piesquaretechnologies.com',
} as const;

export const capabilities = ['Telecom', 'Optical Fiber', 'Solar & Energy', 'IT & Digital'] as const;

export type CapabilitySlug = 'telecom' | 'optical-fiber' | 'solar-energy' | 'it-solutions';

export const capabilityRoutes: ReadonlyArray<{ label: (typeof capabilities)[number]; slug: CapabilitySlug; href: string }> = [
  { label: 'Telecom', slug: 'telecom', href: '/capabilities/telecom' },
  { label: 'Optical Fiber', slug: 'optical-fiber', href: '/capabilities/optical-fiber' },
  { label: 'Solar & Energy', slug: 'solar-energy', href: '/capabilities/solar-energy' },
  { label: 'IT & Digital', slug: 'it-solutions', href: '/capabilities/it-solutions' },
] as const;

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Company', href: '/company' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Projects', href: '/projects' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
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

export const projects = [
  ['/media/projects/rf-drive.jpg', '01 / RF testing', 'Drive-test engineering', 'RF drive testing and optimization across live network routes.'],
  ['/media/projects/rack.jpg', '02 / Equipment', 'Network hardware', 'Equipment installation, commissioning, and power integration.'],
  ['/media/projects/field-tech-1.jpg', '03 / Fiber', 'Fiber deployment', 'Fiber laying, splicing, testing, and customer connection.'],
  ['/media/projects/antenna.jpg', '04 / Civil works', 'Tower & antenna systems', 'Foundation, erection, and antenna work in difficult terrain.'],
  ['/media/projects/solar.jpg', '05 / Energy', 'Renewable power', 'Solar O&M, backup, and public infrastructure initiatives.'],
  ['/media/projects/field-tech-2.jpg', '06 / IT systems', 'Field & network support', 'On-site engineering support for network and IT infrastructure.'],
] as const;

export const projectFilters = ['All', 'Telecom', 'Fiber', 'Energy', 'IT systems'] as const;

export const clients = ['Nepal Telecom', 'Ncell', 'CG Net', 'Enterprise + public infrastructure'] as const;

export const whyPieSquare = [
  { title: 'Field experience', copy: 'Crews that work from the Terai plains to high-hill environments.' },
  { title: 'End-to-end delivery', copy: 'Survey, design, deployment, testing, optimization, and maintenance.' },
  { title: 'Multi-disciplinary capability', copy: 'Telecom, fiber, energy, and IT systems under one roof.' },
  { title: 'Ongoing support', copy: 'Operations and maintenance after handover, not just installation.' },
] as const;

export const organizationLevels = [
  { title: 'Leadership', copy: 'Direction, partnerships, and delivery accountability.' },
  { title: 'Engineering', copy: 'Telecom, fiber, energy, and IT delivery teams.' },
  { title: 'Field operations', copy: 'Survey, installation, testing, and maintenance crews.' },
  { title: 'Support', copy: 'Logistics, safety, quality, and client coordination.' },
] as const;

export const serviceDetails: Record<
  CapabilitySlug,
  { title: string; intro: string; lifecycle: ReadonlyArray<string>; scope: ReadonlyArray<string>; proof: string; image: string; imageAlt: string }
> = {
  telecom: {
    title: 'Telecom infrastructure',
    intro: 'Site survey through optimization for mobile network infrastructure.',
    lifecycle: ['Site survey', 'Civil foundation', 'Tower erection', 'Equipment installation', 'Power and grounding', 'Commissioning', 'Optimization'],
    scope: ['RF drive testing', 'Installation & commissioning', 'Power integration', 'Performance optimization'],
    proof: '115 telecom sites installed and 3500+ RF sites tested.',
    image: '/media/cinematic/T03-telecom-tower.webp',
    imageAlt: 'Telecom tower erected in Nepal',
  },
  'optical-fiber': {
    title: 'Optical fiber networks',
    intro: 'Route survey to customer connection for fiber networks.',
    lifecycle: ['Route survey', 'Laying', 'Splicing', 'OTDR testing', 'POP deployment', 'Customer connection'],
    scope: ['Backbone & access fiber', 'Splicing & termination', 'OTDR testing', 'POP deployment'],
    proof: '2240+ KM of fiber network survey, installation, and maintenance.',
    image: '/media/cinematic/F02-fiber-field-deployment.png',
    imageAlt: 'Field team deploying optical fiber in Nepal',
  },
  'solar-energy': {
    title: 'Solar & energy systems',
    intro: 'Hybrid and off-grid power for connectivity infrastructure.',
    lifecycle: ['Load survey', 'System design', 'Installation', 'Battery integration', 'Testing', 'O&M'],
    scope: ['Hybrid power systems', 'Off-grid installations', 'Battery storage', 'Operations & maintenance'],
    proof: '400 kW solar O&M project documented in the company profile.',
    image: '/media/cinematic/E02-solar-hybrid-power.png',
    imageAlt: 'Solar hybrid power installation supporting infrastructure',
  },
  'it-solutions': {
    title: 'IT & digital solutions',
    intro: 'Infrastructure, security, and software for connected organizations.',
    lifecycle: ['Assessment', 'Design', 'Deployment', 'Hardening', 'Handover', 'Support'],
    scope: ['IT infrastructure & LAN/WAN', 'Cloud consulting', 'Cybersecurity', 'CCTV & access control', 'Software + web'],
    proof: 'Delivered alongside field infrastructure for enterprises and institutions.',
    image: '/media/cinematic/D01-digital-operations.png',
    imageAlt: 'Digital operations and network monitoring environment',
  },
};

export const contactServices = ['Telecom', 'Optical Fiber', 'Solar & Energy', 'IT Solutions', 'Other'] as const;

export const companyValues = [
  { title: 'Engineering credibility', copy: 'Documented field work and measured network performance.' },
  { title: 'Nationwide delivery', copy: 'Infrastructure built close to the ground, across Nepal.' },
  { title: 'Dependable handover', copy: 'Tested, commissioned, and supported after go-live.' },
] as const;
