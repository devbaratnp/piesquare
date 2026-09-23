export const siteContact = {
  email: 'info@piesquaretechnologies.com',
  phone: '+977 9715000715',
  phoneHref: 'tel:+9779715000715',
  address: 'Lalitpur, Nepal',
  mapUrl: 'https://maps.app.goo.gl/c1qiB9XLx6HiBsWu9?g_st=ic',
  facebook: 'https://www.facebook.com/share/14rqRmyzjqT/?mibextid=wwXIfr',
  website: 'piesquaretechnologies.com',
} as const;

export const capabilities = ['Telecom', 'Fiber', 'Solar & Electrical', 'IT Solutions'] as const;

export type CapabilitySlug = 'telecom' | 'optical-fiber' | 'solar-energy' | 'it-solutions';
export type ProjectStatus = 'COMPLETED' | 'ONGOING';
export type ProjectCategory = 'TELECOM' | 'FIBER' | 'SOLAR' | 'IT';

export type ProjectMetric = Readonly<{ value: string; label: string }>;
export type ProjectScopeGroup = Readonly<{ title: string; items: ReadonlyArray<string> }>;

export type ProjectRecord = Readonly<{
  id: string;
  title: string;
  status: ProjectStatus;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  duration: string;
  scope: ReadonlyArray<string>;
  description: string;
  image: string;
  imageAlt: string;
  client?: string;
  operator?: string;
  projectName?: string;
  endClient?: string;
  projectDate?: string;
  coverage?: string;
  coverageDetails?: ReadonlyArray<string>;
  metrics?: ReadonlyArray<ProjectMetric>;
  overview?: ReadonlyArray<string>;
  scopeGroups?: ReadonlyArray<ProjectScopeGroup>;
  role?: string;
  deliveryFocus?: ReadonlyArray<ProjectMetric>;
}>;

export type ServiceCapability = Readonly<{ number: string; title: string; copy: string }>;
export type ServiceOverview = Readonly<{ number: string; title: string; summary: string; scope: ReadonlyArray<string>; href: string }>;
export type CareerRole = Readonly<{
  id: string;
  title: string;
  type: 'Full-time' | 'Internship';
  location: string;
  discipline: string;
  description: string;
  responsibilities: ReadonlyArray<string>;
  requirements: ReadonlyArray<string>;
  applicationSubject: string;
}>;

export const capabilityRoutes: ReadonlyArray<{ label: (typeof capabilities)[number]; slug: CapabilitySlug; href: string }> = [
  { label: 'Telecom', slug: 'telecom', href: '/capabilities/telecom' },
  { label: 'Fiber', slug: 'optical-fiber', href: '/capabilities/optical-fiber' },
  { label: 'Solar & Electrical', slug: 'solar-energy', href: '/capabilities/solar-energy' },
  { label: 'IT Solutions', slug: 'it-solutions', href: '/capabilities/it-solutions' },
] as const;

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/company' },
  { label: 'Projects', href: '/projects' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
] as const;

export const serviceNav = [
  { label: 'Telecom', href: '/capabilities/telecom' },
  { label: 'Fiber', href: '/capabilities/optical-fiber' },
  { label: 'Solar & Electrical', href: '/capabilities/solar-energy' },
  { label: 'IT Solutions', href: '/capabilities/it-solutions' },
] as const;

export const companyTimeline = [
  { marker: '2019', title: 'Established', copy: 'Engineering solutions since 2019.' },
  { marker: 'Telecom', title: 'Telecom', copy: 'Telecom infrastructure, testing and commissioning.' },
  { marker: 'Fiber', title: 'Fiber', copy: 'Fiber deployment, operations and maintenance.' },
  { marker: 'Energy', title: 'Solar & Electrical', copy: 'Solar, electrical installation and O&M.' },
  { marker: 'IT', title: 'IT & Digital', copy: 'Digital infrastructure, security and software.' },
  { marker: 'Today', title: 'One integrated partner', copy: 'One integrated infrastructure partner.' },
] as const;

export const telecomPhases = ['Site survey', 'Civil foundation', 'Tower erection', 'Equipment installation', 'Power and grounding', 'Commissioning', 'Optimization'] as const;
export const telecomFrames = [
  ['/media/cinematic/T01-telecom-survey.webp', 'Site survey', '01'],
  ['/media/cinematic/T02-telecom-foundation.webp', 'Civil foundation', '02'],
  ['/media/cinematic/T03-telecom-tower.webp', 'Tower erection', '03'],
  ['/media/cinematic/T04-telecom-equipment.webp', 'Equipment installation', '04'],
  ['/media/cinematic/T06-telecom-power-commissioning.png', 'Power and grounding', '05'],
  ['/media/cinematic/T05-telecom-live.webp', 'Commissioning', '06'],
  ['/media/cinematic/T07-telecom-optimization.png', 'Optimization', '07'],
] as const;
export const fiberSteps = ['Route survey', 'Fiber deployment', 'Splicing & termination', 'OTDR testing', 'POP deployment', 'Customer connection'] as const;
export const energyPoints = [
  { title: 'Solar PV', copy: 'Site assessment, design, installation and commissioning.' },
  { title: 'Electrical systems', copy: 'Distribution, transformers, testing and maintenance.' },
  { title: 'Hybrid power', copy: 'Battery and hybrid systems for infrastructure loads.' },
  { title: 'O&M support', copy: 'Annual operations, monitoring and fault response.' },
] as const;
export const digitalModules = ['IT consulting & infrastructure', 'Networking & cloud', 'CCTV & security', 'Software & web'] as const;
export const deliveryFlow = ['Survey', 'Design', 'Deploy', 'Test', 'Optimize', 'Maintain'] as const;

export const impactStats = [
  ['3500+', 'RF sites tested', 'SSV & Cluster Drive Testing'],
  ['115', 'Telecom sites installed', 'Equipment Installation & Commissioning'],
  ['4', 'New telecom tower sites', 'Foundation • Erection • Power • Grounding • Fencing'],
  ['2,240+ KM', 'Fiber network delivery', 'Installation • Survey • Managed Service & LMC'],
  ['400 kW', 'Solar O&M under management', 'Annual Maintenance & Operations'],
] as const;

const fiberOperations: ProjectRecord = {
  id: 'fiber-network-operations-maintenance',
  title: 'Fiber Network Operations & Maintenance',
  status: 'ONGOING',
  category: 'FIBER',
  categoryLabel: 'FIBER',
  location: 'Eastern Nepal · Biratnagar · Itahari · Duhabi · Dharan · Lahan',
  duration: 'April 2024 - Present',
  scope: ['Network Maintenance', 'End user Support', 'Customer Connectivity', 'POP Support'],
  description: 'Managed Fiber Network Delivery & Field Operations',
  image: '/media/projects/field-tech-2.jpg',
  imageAlt: 'Field team supporting a fiber network in Eastern Nepal',
  client: 'CG Communications Limited (CGNET)',
  coverage: '1,166.731 km Network · 16 POPs · 5 Locations',
  coverageDetails: ['1,166.731 km network', '16 POPs / network sites', 'Biratnagar, Itahari, Duhabi, Dharan and Lahan'],
  metrics: [
    { value: '1,166.731 KM', label: 'Fiber Network' },
    { value: '16', label: 'POPs / Network Sites' },
    { value: '5', label: 'Operational Locations' },
    { value: 'Since April 2024', label: 'Ongoing Operations' },
  ],
  overview: [
    'Pie Square Technologies provides fiber network operations and maintenance services supporting network availability, fault response, customer connectivity, POP support and approved network expansion activities across Eastern Nepal.',
    'The project involves field-based maintenance and operational support, including fault restoration, optical-power rectification, customer connectivity, network modifications, POP support and approved expansion work.',
  ],
  scopeGroups: [
    { title: 'Fiber network maintenance', items: ['Fiber network breakdown maintenance', 'Preventive network maintenance and patrolling', 'Optical-power rectification', 'ADB / CDB maintenance', 'Fiber repair and restoration', 'Patch-cord and POP cabling management'] },
    { title: 'Network expansion & modification', items: ['ADB / CDB additions and modifications', 'Fiber network expansion', 'Network re-routing', 'Customer support-related network modifications', 'Implementation of approved route changes'] },
    { title: 'Customer connectivity', items: ['ONT installation', 'IPTV installation', 'Drop-cable installation', 'Customer connection support', 'CDB port mapping and network updates'] },
    { title: 'POP & network support', items: ['SFP replacement and maintenance', 'Aggregation and access-link support', 'OLT-related maintenance', 'Power and battery support', 'Network documentation and reporting'] },
    { title: 'Additional fiber works', items: ['ADSS / Figure-8 OFC works', 'Splicing and termination', 'DB box and enclosure installation', 'ODF installation', 'Expansion and rerouting works'] },
  ],
  role: 'Field execution, network maintenance, fault response, network modification, customer connectivity support and associated technical reporting.',
  deliveryFocus: [
    { value: 'Network availability', label: 'Operational fiber infrastructure and service continuity.' },
    { value: 'Field execution', label: 'Maintenance, restoration and approved modifications.' },
    { value: 'Quality & documentation', label: 'Measured work, network records and clear reporting.' },
    { value: 'Customer service', label: 'Timely installation, restoration and connectivity support.' },
  ],
};

const fiberDeployment: ProjectRecord = {
  id: 'fiber-network-deployment-odn-implementation',
  title: 'Fiber Network Deployment & ODN Implementation',
  status: 'COMPLETED',
  category: 'FIBER',
  categoryLabel: 'FIBER',
  location: 'Kathmandu Valley',
  duration: 'November 2021 - June 2023',
  scope: ['Fiber Deployment', 'ODN Installation', 'Splicing', 'Testing', 'Commissioning'],
  description: 'End-to-End Fiber Network Deployment',
  image: '/media/projects/field-tech-1.jpg',
  imageAlt: 'Field engineers deploying fiber network infrastructure in Kathmandu Valley',
  client: 'C.C.S. Nepal Private Limited',
  operator: 'CGNET',
  coverage: '218 KM Fiber Network',
  coverageDetails: ['218 km fiber network', 'Kathmandu Valley'],
  metrics: [{ value: '218 KM', label: 'Fiber network' }, { value: 'Completed', label: 'November 2021 - June 2023' }],
  overview: ['Deployment and installation of fiber optic network infrastructure for broadband connectivity, covering fiber cable pulling, ODN installation, splicing, distribution, testing and commissioning across project sites within Kathmandu Valley.'],
  scopeGroups: [
    { title: 'Fiber cable deployment', items: ['Fiber optic cable pulling, laying and routing', 'Cable route implementation and field coordination', 'Fiber distribution and connectivity works'] },
    { title: 'ODN implementation', items: ['ODN installation and setup', 'DB box installation, termination and connectivity', 'Splitter installation and fiber distribution', 'Joint closure installation'] },
    { title: 'Fiber splicing & testing', items: ['Fiber splicing', 'OTDR testing', 'Optical power testing', 'Link verification and quality checks'] },
    { title: 'Documentation & handover', items: ['Network labeling and identification', 'As-built documentation', 'Installation records', 'Project completion and handover'] },
  ],
  role: 'Field-level execution for fiber network deployment, covering ODN installation, fiber splicing, distribution, testing and commissioning.',
};

const rfDriveTest: ProjectRecord = {
  id: 'rf-drive-test-network-optimization',
  title: 'RF Drive Test & Network Optimization',
  status: 'COMPLETED',
  category: 'TELECOM',
  categoryLabel: 'TELECOM',
  location: 'Nepal - Terai · Mid-Hill · High-Hill · Kathmandu',
  duration: '17 November 2019 - 20 May 2024',
  scope: ['SSV', 'Drive Test', 'KPI Analysis', 'Site Audit', 'Physical RF Optimization'],
  description: 'Single-Site Verification & RF Optimization. [1,214 Sites]',
  image: '/media/projects/rf-drive.jpg',
  imageAlt: 'RF drive test vehicle on a Nepal field route',
  client: 'C.C.S. Nepal Private Limited',
  operator: 'Nepal Telecom',
  projectName: 'NT 4G LTE Project',
  coverage: '1,214 Sites',
  coverageDetails: ['Terai: 423 sites', 'Mid-Hill: 442 sites', 'High-Hill: 24 sites', 'Kathmandu: 325 sites'],
  metrics: [{ value: '1,214 Sites', label: 'Total coverage' }, { value: '4G LTE', label: 'Network project' }, { value: '4 Regions', label: 'Field execution' }],
  overview: ['Pie Square Technologies conducted site-level RF Drive Test, network verification, physical parameter verification, optimization and technical reporting across designated locations in Nepal.'],
  scopeGroups: [{ title: 'RF testing & optimization', items: ['Single-Site Verification', 'Drive Test execution', 'KPI analysis', 'Physical RF parameter verification', 'Approved optimization recommendations', 'Pre-drive and post-drive reporting'] }],
  role: 'Field Drive Test execution, RF performance assessment, physical verification, optimization activities and technical reporting.',
};

const clusterOptimization: ProjectRecord = {
  id: 'cluster-drive-test-optimization',
  title: 'Cluster Drive Test & Optimization',
  status: 'COMPLETED',
  category: 'TELECOM',
  categoryLabel: 'TELECOM',
  location: 'Nepal - 7 Provinces',
  duration: '17 November 2019 - 01 August 2024',
  scope: ['Cluster Drive Test', 'KPI Analysis', 'Physical Verification', 'RF Optimization'],
  description: 'Cluster-Level RF Performance Testing & Optimization [62 Clusters, 1,659 Sites]',
  image: '/media/projects/telecom.jpg',
  imageAlt: 'Telecom tower supporting cluster network optimization',
  client: 'C.C.S. Nepal Private Limited',
  operator: 'Nepal Telecom',
  projectName: 'NT 4G LTE Project',
  coverage: '62 Clusters · 1,659 Sites',
  coverageDetails: ['Terai: 1,068 sites', 'Mid-Hill: 544 sites', 'High-Hill: 47 sites', '62 clusters'],
  metrics: [{ value: '62 Clusters', label: 'Cluster-level RF testing' }, { value: '1,659 Sites', label: 'Commissioned 4G LTE sites' }, { value: '3 Regions', label: 'Terai · Mid-Hill · High-Hill' }],
  overview: ['Pie Square Technologies completed cluster-level RF Drive Test and Optimization across commissioned base stations and designated routes, including trunk roads and expressways within the assigned areas.'],
  scopeGroups: [{ title: 'Cluster testing & optimization', items: ['Pre-drive log analysis', 'Cluster Drive Test', 'KPI and optimization analysis', 'Physical RF verification', 'Pre- and post-optimization comparison', 'Technical reporting'] }],
  role: 'Field Drive Test execution, RF performance assessment, physical verification, optimization activities and technical reporting for designated clusters and sites.',
};

const ncellVerification: ProjectRecord = {
  id: 'ssv-drive-testing-ncell',
  title: 'SSV Drive Testing & Network Verification - Ncell',
  status: 'COMPLETED',
  category: 'TELECOM',
  categoryLabel: 'TELECOM',
  location: 'Madhesh Province · Koshi Province · Lumbini Province',
  duration: 'Completed',
  scope: ['SSV Drive Test', 'Network Verification', 'KPI Analysis', 'Site Validation'],
  description: '381 Sites · GSM · UMTS · LTE',
  image: '/media/projects/antenna.jpg',
  imageAlt: 'Ncell site equipment used for single-site verification',
  client: 'ZTE Nepal Pvt. Ltd.',
  operator: 'Ncell',
  coverage: '381 Sites · GSM · UMTS · LTE',
  coverageDetails: ['381 sites', 'Madhesh, Koshi and Lumbini Provinces', 'GSM, UMTS, LTE, L900, L2100, 4T4R, multisector and POC categories'],
  metrics: [{ value: '381 Sites', label: 'SSV drive tested' }, { value: '3 Provinces', label: 'Madhesh · Koshi · Lumbini' }, { value: '3 Technologies', label: 'GSM · UMTS · LTE' }],
  overview: ['Pie Square Technologies completed SSV drive testing and network verification for 381 Ncell sites across Madhesh, Koshi and Lumbini Provinces under the ZTE project.'],
  scopeGroups: [{ title: 'Site and technology verification', items: ['SSV drive testing', 'GSM, UMTS and LTE verification', 'L900 and L2100 testing', '4T4R and multisector verification', 'KPI analysis and reporting'] }],
  role: 'SSV drive testing, network verification, technical data collection, issue identification, re-testing and reporting.',
};

const solarOandM: ProjectRecord = {
  id: '400-kwp-ground-mount-solar',
  title: '400 kWp Ground-Mount Solar Power Plant',
  status: 'ONGOING',
  category: 'SOLAR',
  categoryLabel: 'SOLAR & ELECTRICAL',
  location: 'Simar, Bara, Nepal',
  duration: 'October 2025 - Present',
  scope: ['Solar PV O&M', 'Electrical Maintenance', 'Performance Monitoring', 'Fault Response'],
  description: 'Solar PV Operation & Maintenance',
  image: '/media/projects/solar.jpg',
  imageAlt: 'Ground-mounted solar power plant in Simar, Bara',
  client: 'Surya Nepal Private Limited',
  coverage: '400 kWp Solar PV Plant',
  coverageDetails: ['400 kWp ground-mounted Solar PV plant', 'Simar Cigarette Factory, Simar, Bara, Nepal'],
  metrics: [{ value: '400 kWp', label: 'Plant capacity' }, { value: '100%', label: 'Target plant availability' }, { value: '48 hours', label: 'Target fault response' }],
  overview: ['Pie Square Technologies provides comprehensive operation and maintenance services for a 400 kWp ground-mounted solar PV plant at Surya Nepal Private Limited.'],
  scopeGroups: [{ title: 'Solar PV plant maintenance', items: ['Routine inspection', 'Preventive and corrective maintenance', 'Inverter inspection', 'Breakdown response and fault rectification', 'Performance monitoring', 'Technical reporting'] }, { title: 'Electrical systems & compliance', items: ['Electrical system support', 'Safety-controlled field work', 'Maintenance records and reporting', 'Availability and response tracking'] }],
  role: 'Solar PV operation and maintenance, electrical maintenance, performance monitoring, preventive and corrective maintenance, fault response and technical reporting.',
  deliveryFocus: [{ value: 'Plant availability', label: 'Target availability of 100% through planned maintenance.' }, { value: 'Performance & reliability', label: 'Generation and equipment monitoring.' }, { value: 'Fault response', label: 'Target response within 48 hours.' }, { value: 'Safety & documentation', label: 'Safe work practices and operational records.' }],
};

const popSurvey: ProjectRecord = {
  id: 'pop-odn-ring-survey',
  title: 'POP & ODN Ring Survey',
  status: 'COMPLETED',
  category: 'FIBER',
  categoryLabel: 'FIBER',
  location: 'Palpa · Kawasoti · Pragatinagar · Nawalpur · Bharatpur · Ratnanagar · Hetauda',
  duration: 'January 2022 - February 2022',
  scope: ['POP Survey', 'ODN Route Survey', 'GPS Verification', 'Route Mapping'],
  description: 'Fiber Network Survey & Deployment Planning',
  image: '/media/projects/field-tech-1.jpg',
  imageAlt: 'Fiber route survey fieldwork in Nepal',
  client: 'C.C.S. Nepal Private Limited',
  operator: 'CGNET',
  coverage: '864 KM Network Route Survey',
  coverageDetails: ['864 km ODN ring route survey', 'Palpa, Kawasoti, Pragatinagar, Nawalpur, Bharatpur, Ratnanagar and Hetauda'],
  metrics: [{ value: '864 KM', label: 'ODN ring route survey' }, { value: '7', label: 'Project locations' }, { value: '2 Months', label: 'Survey & planning period' }],
  overview: ['Pie Square Technologies conducted field surveys and route planning for POP locations and ODN ring networks to support FTTH network deployment across multiple project areas in Nepal.'],
  scopeGroups: [{ title: 'Survey and reporting', items: ['POP location identification and verification', 'ODN ring route survey', 'Pole and duct route verification', 'GPS data collection', 'Route mapping and technical documentation'] }],
  role: 'Field survey, physical verification, route assessment, GPS data collection and technical documentation for network planning.',
};

const electricalDistribution: ProjectRecord = {
  id: 'electrical-distribution-transformer-installation',
  title: 'Electrical Distribution Network & Transformer Installation',
  status: 'COMPLETED',
  category: 'SOLAR',
  categoryLabel: 'SOLAR & ELECTRICAL',
  location: 'Nabrajpur Rural Municipality, Siraha, Madhesh Province',
  duration: 'June 2025 - July 2025',
  scope: ['Electrical Distribution', 'Conductor Stringing', 'Earthing', 'Testing & Commissioning'],
  description: 'Transformer Installation · LT Distribution · PSC Pole Erection',
  image: '/media/projects/solar.jpg',
  imageAlt: 'Electrical distribution infrastructure installation',
  client: 'Teleconstruct Developers Pvt. Ltd.',
  endClient: 'Nabrajpur Rural Municipality',
  projectName: 'Nabrajpur Rural Municipality electrical infrastructure',
  projectDate: 'June 2025 - July 2025',
  coverage: 'Transformer installation · LT distribution · PSC pole erection',
  coverageDetails: ['Transformer installation', 'LT distribution', 'PSC pole erection'],
  metrics: [{ value: 'Transformer', label: 'Installation & commissioning' }, { value: 'LT network', label: 'Distribution line construction' }, { value: 'Completed', label: 'June - July 2025' }],
  overview: ['Pie Square Technologies, as a subcontractor to Teleconstruct Developers Pvt. Ltd., executed electrical distribution infrastructure works for Nabrajpur Rural Municipality in Siraha, Madhesh Province.'],
  scopeGroups: [{ title: 'Electrical infrastructure', items: ['Transformer installation and commissioning', 'PSC pole erection', 'LT distribution line construction', 'Conductor stringing', 'Earthing and protection', 'Electrical testing and handover'] }],
  role: 'Field execution and technical manpower for material handling, pole erection, transformer installation, distribution-line construction, earthing, conductor stringing, testing and site completion.',
};

const websiteContent: ProjectRecord = {
  id: 'website-content-development-doit',
  title: 'Website Content Development, Update & Management',
  status: 'COMPLETED',
  category: 'IT',
  categoryLabel: 'IT & DIGITAL',
  location: 'Janakpurdham, Dhanusha, Nepal',
  duration: 'April 2025 - May 2025',
  scope: ['Website Content', 'DoIT Template', 'Page Updates', 'Information Management'],
  description: 'Website Content Management & DoIT Template Customization',
  image: '/media/projects/rack.jpg',
  imageAlt: 'Digital content and website management project',
  client: 'Provincial and Local Infrastructure Development Project',
  coverage: 'Institutional website content and page management',
  coverageDetails: ['Website content management', 'Page updates and information organization', 'DoIT template customization'],
  metrics: [{ value: 'Website', label: 'Content development' }, { value: 'DoIT', label: 'Template customization' }],
  overview: ['Website content development, page updates and information management within the existing government-provided website template.'],
  scopeGroups: [{ title: 'Digital content', items: ['Content development', 'Page-wise updates', 'Information organization', 'Template customization'] }],
  role: 'Website content development, update and management within the supplied template.',
};

const websiteManagement: ProjectRecord = {
  id: 'website-content-management-janakpur',
  title: 'Website Content Management & DoIT Template Customization',
  status: 'COMPLETED',
  category: 'IT',
  categoryLabel: 'IT & DIGITAL',
  location: 'Janakpur, Dhanusha, Nepal',
  duration: 'May 2025 - June 2025',
  scope: ['Website Content', 'DoIT Template', 'Page Updates', 'Staff Training'],
  description: 'Website Content Development & Management',
  image: '/media/projects/rack.jpg',
  imageAlt: 'Website content management and digital systems work',
  client: 'Purbanchal Bikas Nirdeshanalaya',
  coverageDetails: ['Website content development and management', 'DoIT template customization', 'Staff training'],
  metrics: [{ value: 'Website', label: 'Content management' }, { value: 'DoIT', label: 'Template customization' }, { value: 'Training', label: 'Client enablement' }],
  overview: ['Website content management, page updates, information organization and client enablement for routine website administration.'],
  scopeGroups: [{ title: 'Client enablement', items: ['Page updates', 'Content organization', 'Template customization', 'Staff training and technical guidance'] }],
  role: 'Content management, template customization and client enablement.',
};

const digitalPromotion: ProjectRecord = {
  id: 'digital-media-social-media-seo',
  title: 'Digital Media, Social Media & Online Promotion Services',
  status: 'COMPLETED',
  category: 'IT',
  categoryLabel: 'IT & DIGITAL',
  location: 'Singha Durbar, Kathmandu, Nepal',
  duration: 'July 2021',
  scope: ['Digital Content', 'Social Media', 'Online Promotion', 'SEO'],
  description: 'Digital Marketing, Social Media Management & SEO',
  image: '/media/projects/clients.jpg',
  imageAlt: 'Digital media and online promotion work',
  client: 'National Reconstruction Authority (NRA)',
  projectDate: 'July 2021',
  coverageDetails: ['Digital content', 'Social media', 'Online promotion', 'SEO'],
  metrics: [{ value: 'Digital', label: 'Content and media' }, { value: 'SEO', label: 'Online promotion' }],
  overview: ['Digital content, social media management, online promotion and SEO services supporting institutional communication and online visibility.'],
  scopeGroups: [{ title: 'Digital communication', items: ['Digital content', 'Social media management', 'Online promotion', 'SEO', 'Performance monitoring'] }],
  role: 'Digital content, social media, online promotion and SEO delivery.',
};

const complaintOptimization: ProjectRecord = {
  id: 'rf-customer-complaint-analysis-optimization',
  title: 'RF Customer Complaint Analysis & Optimization',
  status: 'COMPLETED',
  category: 'TELECOM',
  categoryLabel: 'TELECOM',
  location: 'All Seven Provinces of Nepal',
  duration: '17 November 2019 - 20 May 2024',
  scope: ['Customer Complaint Investigation', 'Drive Test', 'KPI Analysis', 'RF Optimization'],
  description: 'Drive Test-Based Customer Complaint Resolution',
  image: '/media/projects/rf-drive.jpg',
  imageAlt: 'RF drive test field investigation in Nepal',
  client: 'C.C.S. Nepal Private Limited',
  operator: 'Nepal Telecom',
  projectName: 'NT 4G LTE Project',
  coverage: 'Customer complaint-based RF investigation',
  metrics: [{ value: 'All 7 Provinces', label: 'Nationwide field coverage' }, { value: 'Drive Test', label: 'Field-based investigation' }, { value: 'Completed', label: 'Analysis · Optimization · Resolution' }],
  overview: ['Pie Square Technologies carried out RF field investigation and optimization activities to address customer complaints at various locations across Nepal under the NT 4G LTE Project.'],
  scopeGroups: [{ title: 'Complaint analysis & optimization', items: ['Customer complaint investigation', 'Drive Test and network testing', 'KPI analysis', 'Physical and logical optimization', 'Re-testing and validation', 'Technical reporting'] }],
  role: 'Field-based RF testing, customer complaint investigation, Drive Test execution, KPI analysis, optimization and technical reporting.',
};

export const projects: ReadonlyArray<ProjectRecord> = [rfDriveTest, clusterOptimization, ncellVerification, fiberOperations, fiberDeployment, solarOandM, popSurvey, electricalDistribution, websiteContent, websiteManagement, digitalPromotion, complaintOptimization];
export const projectFilters = ['All', 'Telecom', 'Fiber', 'Solar', 'IT'] as const;
export const clients = ['Nepal Telecom', 'Ncell', 'CGNET', 'Surya Nepal', 'ZTE Nepal', 'CCS Nepal'] as const;

export const trustedClientLogoFiles = [
  { name: 'Nepal Telecom', src: '/media/logos/nepal-telecom-final.jpeg', alt: 'Nepal Telecom' },
  { name: 'Ncell', src: '/media/logos/ncell-final.jpeg', alt: 'Ncell' },
  { name: 'CGNET', src: '/media/logos/cgnet-final.jpeg', alt: 'CGNET' },
  { name: 'Surya Nepal', src: '/media/logos/surya-nepal-final.jpeg', alt: 'Surya Nepal' },
  { name: 'ZTE Nepal', src: '/media/logos/zte-final.jpeg', alt: 'ZTE Nepal' },
  { name: 'CCS Nepal', src: '/media/logos/china-comservice-final.jpeg', alt: 'CCS Nepal' },
] as const;

export const whyPieSquare = [
  { title: 'Multi-domain expertise', copy: 'Telecom, fiber, solar and IT capabilities under one organization.' },
  { title: 'Expert Workforce', copy: 'Highly experienced professionals with strong expertise spanning field operations, technical execution, project management and leadership.' },
  { title: 'End-to-End Execution', copy: 'From survey, engineering and procurement to installation, testing, commissioning and O&M.' },
  { title: 'Nationwide Reach', copy: 'The people, resources and operational capability to deliver projects across Nepal.' },
  { title: 'Quality & Safety', copy: 'Strong emphasis on workmanship, testing, documentation, safety and compliance with project requirements.' },
  { title: 'Built for Partnerships', copy: 'Responsive coordination, dependable support and a long-term approach to every client relationship.' },
] as const;

export const companyIntro = 'Pie Square Technologies delivers integrated infrastructure solutions across telecom, fiber optics, solar & renewable energy and IT. With experienced technical teams, specialized equipment, and a field-focused approach, we work with telecom operators, ISPs, EPC contractors, technology companies, enterprises and government agencies, supporting infrastructure projects from survey, installation, testing, commissioning and long-term maintenance. Our focus is simple: quality execution, safe operations, timely delivery, and dependable long-term service.' as const;
export const companyTeamIntro = 'Our multidisciplinary workforce brings together engineering, technical and field expertise to deliver infrastructure projects safely, efficiently and reliably across Nepal.' as const;
export const companyApproachIntro = 'Every project follows a structured process, from site survey and planning to safe execution, testing, documentation and handover. We combine engineering discipline with practical field execution to deliver reliable, measurable results.' as const;

export const organizationLevels = [
  { title: 'Leadership', copy: 'Direction, partnerships and delivery accountability.' },
  { title: 'Engineering', copy: 'Telecom, fiber, energy and IT delivery teams.' },
  { title: 'Field operations', copy: 'Survey, installation, testing and maintenance crews.' },
  { title: 'Support', copy: 'Logistics, safety, quality and client coordination.' },
] as const;

export const serviceOverview: ReadonlyArray<ServiceOverview> = [
  { number: '01', title: 'Telecom', summary: 'Telecom Infrastructure — complete site delivery covering civil works, tower installation, equipment deployment, RF drive testing, commissioning, maintenance and field support.', scope: ['CIVIL WORKS', 'TOWER INSTALLATION', 'EQUIPMENT DEPLOYMENT', 'RF TESTING', 'COMMISSIONING', 'MAINTENANCE'], href: '/capabilities/telecom' },
  { number: '02', title: 'Fiber', summary: 'Fiber Optic Networks — reliable connectivity from route surveying and planning to fiber deployment, precision splicing, testing, fault restoration and network maintenance.', scope: ['ROUTE SURVEY', 'OFC INSTALLATION', 'SPLICING', 'TESTING', 'FAULT RESTORATION', 'NETWORK MAINTENANCE'], href: '/capabilities/optical-fiber' },
  { number: '03', title: 'Solar & Electrical', summary: "Solar and Electrical systems engineered for Nepal's terrain and grid conditions, from assessment and design through installation, commissioning and O&M.", scope: ['SOLAR PV', 'SYSTEM DESIGN', 'INSTALLATION', 'BATTERY INTEGRATION', 'TRANSFORMER INSTALLATION', 'ELECTRICAL INSTALLATION', 'O&M'], href: '/capabilities/solar-energy' },
  { number: '04', title: 'IT Solutions', summary: 'Delivering reliable IT consulting, network and cloud infrastructure, CCTV and security systems, and customized software and web solutions to support secure, efficient, and connected business operations.', scope: ['IT CONSULTING & INFRASTRUCTURE', 'NETWORKING & CLOUD', 'CCTV & SECURITY', 'SOFTWARE & WEB SOLUTIONS'], href: '/capabilities/it-solutions' },
] as const;

const fiberCapabilities: ReadonlyArray<ServiceCapability> = [
  ['01', 'Route Survey', 'Physical route inspection, GIS data collection, obstacle mapping and survey reporting.'],
  ['02', 'Fiber Route Planning', 'Route engineering, BOQ preparation, duct/pole planning and permit documentation support.'],
  ['03', 'OFC Installation', 'Trenching, ducting, pulling and blowing of optical fiber cable on backbone and metro routes.'],
  ['04', 'Underground Fiber', 'Duct laying, HDD coordination, chamber construction and underground cable deployment.'],
  ['05', 'Aerial Fiber', 'Pole-line cable installation, lashing, ADSS deployment and pole treatment.'],
  ['06', 'Fiber Splicing', 'Precision fusion splicing for backbone, distribution and access networks.'],
  ['07', 'ODF & Distribution Installation', 'ODF, FDH, FDB and splitter installation, termination, dressing and labeling.'],
  ['08', 'FTTH & Drop Fiber', 'FTTH deployment, drop-cable installation, customer connections and network extensions.'],
  ['09', 'OTDR & Link Testing', 'Bi-directional OTDR testing, power measurement, loss-budget verification and trace analysis.'],
  ['10', 'Fault Localization', 'Rapid fault localization using OTDR and visible fault locators with precise dig-point reporting.'],
  ['11', 'Testing & Acceptance', 'End-to-end fiber testing, documentation, as-built records and network acceptance.'],
  ['12', 'Maintenance & Restoration', 'Preventive maintenance, fault response, fiber repair, restoration and service recovery.'],
].map(([number, title, copy]) => ({ number, title, copy }));

const solarCapabilities: ReadonlyArray<ServiceCapability> = [
  ['01', 'Solar Site Survey & Load Assessment', 'Solar potential, shading, structural conditions, electrical loads and site requirements.'],
  ['02', 'Solar System Design', 'PV sizing, inverter and battery selection, SLD preparation, system design and yield estimation.'],
  ['03', 'Solar BOQ & Estimation', 'Detailed BOQ, cost estimation, equipment specifications and procurement support.'],
  ['04', 'Rooftop Solar', 'Residential, commercial and industrial rooftop PV systems with structural mounting and grid integration.'],
  ['05', 'Ground-Mounted Solar', 'Ground-mounted PV plants including civil foundations, structures, array installation and electrical integration.'],
  ['06', 'Solar Installation & Commissioning', 'Module installation, DC/AC cabling, inverter installation, testing, grid synchronization and handover.'],
  ['07', 'Solar Monitoring & O&M', 'Performance monitoring, cleaning, preventive maintenance, troubleshooting and fault response.'],
  ['08', 'Transformer Installation', 'Transformer installation, cabling, protection, earthing, testing and commissioning.'],
  ['09', 'Electrical Distribution', 'Electrical poles, distribution lines, cabling, panels, DB/MDB and associated infrastructure.'],
  ['10', 'Transmission & Distribution Expansion', 'Pole erection, line extension, network expansion and associated electrical infrastructure.'],
  ['11', 'Electrical Equipment Installation', 'Switchgear, protection systems, meters, batteries and other electrical equipment.'],
  ['12', 'Testing, Commissioning & Maintenance', 'Electrical testing, system energization, commissioning, preventive maintenance and fault restoration.'],
].map(([number, title, copy]) => ({ number, title, copy }));

const itCapabilities: ReadonlyArray<ServiceCapability> = [
  ['01', 'Network Infrastructure', 'Design and deployment of switching, routing, firewall and network infrastructure.'],
  ['02', 'LAN/WAN', 'Campus, office and branch network deployment with structured connectivity and segmentation.'],
  ['03', 'Structured Cabling', 'Cat6/Cat6A and fiber backbone cabling, termination, labeling and testing.'],
  ['04', 'Server Installation', 'Server, rack, storage, UPS and related equipment installation and configuration.'],
  ['05', 'Data Center & Server Room Infrastructure', 'Racks, structured cabling, power, UPS and infrastructure coordination for server rooms and data environments.'],
  ['06', 'Wi-Fi Infrastructure', 'Enterprise and commercial Wi-Fi deployment, access point installation, configuration and coverage optimization.'],
  ['07', 'CCTV & Access Control', 'IP surveillance, NVR/VMS, access control and security system installation.'],
  ['08', 'IT Hardware & Systems', 'Supply, installation and configuration of computers, workstations, printers, peripherals and related IT equipment.'],
  ['09', 'Network Troubleshooting', 'Fault isolation, network diagnostics, performance analysis and technical resolution.'],
  ['10', 'IT Maintenance & Support', 'Preventive maintenance, system health checks, troubleshooting and ongoing technical support.'],
].map(([number, title, copy]) => ({ number, title, copy }));

const telecomCapabilities: ReadonlyArray<ServiceCapability> = [
  ['01', 'Civil Works', 'Foundations, equipment plinths, compound works, access preparation and site civil infrastructure.'],
  ['02', 'Tower Installation', 'Ground-based and rooftop tower erection, rigging, antenna and feeder line installation.'],
  ['03', 'RF Testing', 'SSV, cluster and customer complaint drive testing with KPI analysis and reporting.'],
  ['04', 'Equipment Deployment', 'BTS, microwave, rectifiers, batteries and hybrid power equipment installation.'],
  ['05', 'Site Integration', 'Power, transmission and ancillary system integration through commissioning.'],
  ['06', 'Testing & Commissioning', 'Site acceptance testing, VSWR/PIM checks, integration and commissioning to go-live.'],
  ['07', 'Tower Maintenance', 'Preventive and corrective tower maintenance, structural inspection and painting.'],
  ['08', 'Operation & Maintenance', 'SLA-driven preventive maintenance, fault attendance and emergency restoration.'],
].map(([number, title, copy]) => ({ number, title, copy }));

export const serviceDetails: Record<CapabilitySlug, { title: string; intro: string; lifecycle: ReadonlyArray<string>; scope: ReadonlyArray<string>; proof: string; image: string; imageAlt: string; capabilities: ReadonlyArray<ServiceCapability>; relatedProjectIds: ReadonlyArray<string> }> = {
  telecom: {
    title: 'Telecom',
    intro: 'Complete Telecom site delivery covering civil works, tower installation, equipment deployment, RF drive testing, site integration, maintenance and field support, delivered with a strong focus on safety, quality and timely project execution across all provinces of Nepal.',
    lifecycle: ['Site survey', 'Civil foundation', 'Tower erection', 'Equipment installation', 'Power and grounding', 'Commissioning', 'Optimization'],
    scope: ['Civil works', 'Tower installation', 'RF testing', 'Equipment deployment', 'Commissioning', 'Operation & maintenance'],
    proof: '115 telecom sites installed and 3500+ RF sites tested.',
    image: '/media/cinematic/T03-telecom-tower.webp', imageAlt: 'Telecom tower erected in Nepal', capabilities: telecomCapabilities,
    relatedProjectIds: ['rf-drive-test-network-optimization', 'cluster-drive-test-optimization', 'ssv-drive-testing-ncell', 'rf-customer-complaint-analysis-optimization'],
  },
  'optical-fiber': {
    title: 'Fiber',
    intro: 'Building reliable connectivity from the ground up, from route surveying and network planning to fiber deployment, precision splicing, testing, fault restoration and maintenance, ensuring robust and high-performance optical networks.',
    lifecycle: ['Route Survey', 'Fiber Deployment', 'Splicing & Termination', 'OTDR Testing', 'Customer Connection'],
    scope: ['Backbone & Access Fiber', 'Splicing & Termination', 'OTDR & Link Testing', 'POP & Network Integration', 'Fault Localization & Restoration'],
    proof: '2,240+ KM of fiber network delivery through installation, survey, managed services and LMC.',
    image: '/media/cinematic/F02-fiber-field-deployment.png', imageAlt: 'Field team deploying optical fiber in Nepal', capabilities: fiberCapabilities,
    relatedProjectIds: ['fiber-network-operations-maintenance', 'fiber-network-deployment-odn-implementation', 'pop-odn-ring-survey'],
  },
  'solar-energy': {
    title: 'Solar & Electrical',
    intro: "Solar and Electrical systems engineered for Nepal's terrain and grid conditions, covering rooftop, commercial, ground-mounted and off-grid systems from site assessment and system design through installation, power integration, testing, commissioning and long-term operation and maintenance.",
    lifecycle: ['Site & Load Assessment', 'System Design & BOQ', 'Installation', 'Testing & Commissioning', 'Grid Integration', 'O&M'],
    scope: ['Solar PV Systems', 'Rooftop & Ground-Mounted Solar', 'Battery & Hybrid Power Systems', 'Transformer Installation', 'Electrical Distribution & Pole Erection', 'Transmission & Distribution Expansion', 'Electrical Testing & Maintenance'],
    proof: '400 kW Solar O&M under management, plus electrical distribution and transformer installation delivery.',
    image: '/media/cinematic/E02-solar-hybrid-power.png', imageAlt: 'Solar hybrid power installation supporting infrastructure', capabilities: solarCapabilities,
    relatedProjectIds: ['400-kwp-ground-mount-solar', 'electrical-distribution-transformer-installation'],
  },
  'it-solutions': {
    title: 'IT Solutions',
    intro: 'Delivering reliable IT consulting, network and cloud infrastructure, CCTV and security systems, and customized software and web solutions to support secure, efficient and connected business operations.',
    lifecycle: ['Assessment', 'Design', 'Deployment', 'Configuration & Testing', 'Handover', 'Support'],
    scope: ['IT Infrastructure & LAN/WAN', 'Structured Cabling & Fiber', 'Server & Data Center Infrastructure', 'Wi-Fi & Network Systems', 'CCTV & Access Control', 'IT Hardware & Technical Support'],
    proof: 'IT consulting, infrastructure, security, software and web delivery for public and institutional clients.',
    image: '/media/cinematic/D01-digital-operations.png', imageAlt: 'Digital operations and network monitoring environment', capabilities: itCapabilities,
    relatedProjectIds: ['website-content-development-doit', 'website-content-management-janakpur', 'digital-media-social-media-seo'],
  },
};

export const technicalWorkforce = ['Civil Engineers', 'Telecom Engineers & Technicians', 'RF Engineers', 'Fiber Technicians & Splicers', 'Solar & Electrical Technicians', 'IT Professionals', 'Project Coordinators & Supervisors', 'Safety & Quality Personnel'] as const;
export const teamDepartments = [
  { title: 'Civil Engineering', copy: 'Civil Engineers · Site Supervisors · Masons & Technicians' },
  { title: 'Telecom & RF Engineering', copy: 'Telecom Engineers · RF Engineers · Technicians' },
  { title: 'Fiber & Network Operations', copy: 'Fiber Technicians · Splicers · O&M Technicians' },
  { title: 'Solar & Electrical', copy: 'Electrical Engineers · Solar Technicians · Electrical Technicians · Site Supervisors' },
  { title: 'IT Solutions', copy: 'Computer Engineers · IT Professionals · IT Technicians' },
  { title: 'Project Management & Coordination', copy: 'Project Managers · Project Coordinators · Planning & Reporting' },
  { title: 'Safety & Quality', copy: 'Safety & Quality Coordinators · Site Supervisors' },
] as const;
export const industries = ['Telecommunications', 'Internet & Fiber Networks', 'EPC & Infrastructure', 'Renewable Energy', 'IT & Digital Infrastructure', 'Government & Public Infrastructure', 'Commercial & Industrial'] as const;
export const industryDetails = [
  { title: 'Telecommunications', copy: 'Tower Works · Equipment Installation · RF · Network Infrastructure · Field Deployment · O&M' },
  { title: 'Internet & Fiber Networks', copy: 'FTTH · Fiber Deployment · Network Maintenance · Field Operations' },
  { title: 'EPC & Infrastructure', copy: 'Engineering · Procurement · Construction · Project Execution' },
  { title: 'Renewable Energy', copy: 'Solar · Electrical Systems · Installation · O&M' },
  { title: 'IT & Digital Infrastructure', copy: 'Networking · IT Infrastructure · Systems Installation · Technical Support' },
  { title: 'Government & Public Infrastructure', copy: 'Infrastructure Deployment · Connectivity · Technology Solutions' },
  { title: 'Commercial & Industrial', copy: 'Electrical · Solar · Infrastructure · Technology Solutions' },
] as const;
export const companyApproach = ['Survey-Based Engineering - Field data and site assessments inform practical, build-ready solutions.', 'Quality Testing & Documentation - Inspection, testing and documentation provide clear evidence of completed work.', 'Safety-Controlled Execution - Method statements, toolbox briefings and site procedures support safe project delivery.', 'Dedicated Project Coordination - Clear communication, reporting and coordination keep every project aligned from survey to handover.'] as const;
export const companyValuesDetailed = [
  { title: 'Integrity', copy: 'We work transparently, keep our commitments and make decisions that stand up to scrutiny and field realities.' },
  { title: 'Safety', copy: 'We promote a proactive safety culture through risk assessment, proper PPE, safe work practices, trained personnel, and continuous EHS awareness, ensuring our people, clients, communities, and the environment are protected.' },
  { title: 'Quality', copy: 'We combine disciplined workmanship, measured testing and clear documentation to deliver reliable results.' },
  { title: 'Accountability', copy: 'We take ownership of communication, coordination and delivery, from survey and execution to handover and support.' },
  { title: 'Innovation', copy: 'We adopt practical technologies, tools and methods that improve efficiency, reliability and field performance.' },
  { title: 'Customer Focus', copy: "We listen closely, communicate clearly and deliver solutions aligned with our clients' needs and objectives." },
] as const;

export const deliveryCapabilities = [
  { title: 'Project Execution', copy: 'Site deployment · Installation · Commissioning · Handover' },
  { title: 'Field Engineering', copy: 'Survey · Technical assessment · Supervision · Coordination' },
  { title: 'Testing & Commissioning', copy: 'RF · Fiber · Electrical · System testing' },
  { title: 'Operation & Maintenance', copy: 'Preventive maintenance · Fault response · Restoration' },
  { title: 'Project Documentation', copy: 'BOQ · Reports · Test records · As-built documentation · Handover' },
  { title: 'Multi-Site Coordination', copy: 'Planning · Field deployment · Progress monitoring · Reporting' },
] as const;

export const careerRoles: ReadonlyArray<CareerRole> = [
  { id: 'rf-drive-test-engineer', title: 'RF Drive Test Engineer', type: 'Full-time', location: 'Field-Based / Project Locations', discipline: 'Telecom', description: 'RF drive testing, network data collection, post-processing and optimization reporting for mobile networks.', responsibilities: ['Conduct RF drive tests and collect network performance data.', 'Perform post-processing and prepare drive-test reports.', 'Analyze key network performance indicators and identify coverage or quality issues.', 'Support network optimization activities and field verification.', 'Coordinate with field and technical teams during testing activities.'], requirements: ['Experience with RF drive-test tools such as TEMS.', 'Understanding of GSM, UMTS and LTE KPIs.', 'Basic knowledge of RF/network optimization.', 'Ability to work in field environments and travel extensively across Nepal.', 'Good reporting and communication skills.'], applicationSubject: 'Application: RF Drive Test Engineer - Pie Square Technologies' },
  { id: 'rf-data-analyst', title: 'RF Data Analyst', type: 'Full-time', location: 'Office-Based', discipline: 'Telecom', description: 'RF data post-processing and technical reporting based on drive-test logs, SSV, cluster testing and customer complaint data.', responsibilities: ['Post-process RF drive-test logs using Actix.', 'Prepare SSV and cluster analysis reports.', 'Analyze GSM, UMTS and LTE KPIs.', 'Prepare customer complaint analysis reports.', 'Identify coverage and quality issues from RF data.', 'Prepare clear technical reports, charts and KPI summaries.'], requirements: ['Practical experience with Actix and RF data analysis.', 'Good understanding of GSM / UMTS / LTE KPIs.', 'Experience in SSV and cluster report preparation.', 'Proficiency in Microsoft Excel, Google Earth and MS Word.', 'Knowledge of mobile network RF performance and optimization.'], applicationSubject: 'Application: RF Data Analyst - Pie Square Technologies' },
  { id: 'rf-technician-rigger', title: 'RF Technician / Rigger', type: 'Full-time', location: 'Field-Based', discipline: 'Telecom', description: 'RF field technician responsible for tower climbing, antenna installation and adjustment, azimuth optimization and MT optimization.', responsibilities: [], requirements: ['RF field and tower-climbing experience.', 'Knowledge of antennas, azimuth and tilt.', 'Experience in azimuth and MT optimization.', 'Willingness to travel to project sites.', 'Safety awareness for work at height.'], applicationSubject: 'Application: RF Technician / Rigger - Pie Square Technologies' },
] as const;
export const generalCareerApplication = { title: 'General Application', description: 'Send your CV for future engineering, technical, field, project coordination, support or internship opportunities.', applicationSubject: 'General Application - Pie Square Technologies' } as const;

export const contactServices = ['Telecom', 'Fiber', 'Solar & Electrical', 'IT Solutions', 'Other'] as const;
export const companyValues = [
  { title: 'Engineering credibility', copy: 'Documented field work and measured network performance.' },
  { title: 'Nationwide delivery', copy: 'Infrastructure built close to the ground, across Nepal.' },
  { title: 'Dependable handover', copy: 'Tested, commissioned and supported after go-live.' },
] as const;
