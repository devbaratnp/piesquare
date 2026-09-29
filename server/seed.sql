INSERT INTO site_settings (setting_key, setting_value) VALUES
  ('email', 'info@piesquaretechnologies.com'),
  ('phone', '+977 9715000715'),
  ('phone_href', 'tel:+9779715000715'),
  ('address', 'Lalitpur, Nepal'),
  ('map_url', 'https://maps.app.goo.gl/c1qiB9XLx6HiBsWu9?g_st=ic'),
  ('facebook', 'https://www.facebook.com/share/14rqRmyzjqT/?mibextid=wwXIfr'),
  ('website', 'piesquaretechnologies.com')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

INSERT INTO hero_section (eyebrow, title, subtitle, cta_text, cta_url, image_path, status)
SELECT 'Integrated infrastructure and technology solutions', 'BUILDING THE|INFRASTRUCTURE|THAT KEEPS NEPAL CONNECTED.', 'Telecom. Fiber. Solar. IT.', 'View our work', '#projects', '/media/cinematic/pie-square-hero-integrated-infrastructure.webp', 'PUBLISHED'
WHERE NOT EXISTS (SELECT 1 FROM hero_section);

INSERT INTO services (slug, title, summary, sort_order, status) VALUES
  ('telecom', 'Telecom', 'Telecom infrastructure, RF testing, commissioning and field support.', 1, 'PUBLISHED'),
  ('optical-fiber', 'Fiber', 'Route survey, deployment, splicing, testing and network maintenance.', 2, 'PUBLISHED'),
  ('solar-energy', 'Solar & Electrical', 'Solar PV, electrical systems, hybrid power and maintenance.', 3, 'PUBLISHED'),
  ('it-solutions', 'IT Solutions', 'IT infrastructure, networks, security and software delivery.', 4, 'PUBLISHED')
ON DUPLICATE KEY UPDATE summary = VALUES(summary), status = VALUES(status);

INSERT INTO about_section (title, intro, vision, mission, status)
SELECT
  'An Engineering Company Built for the Field.',
  'Pie Square Technologies delivers integrated infrastructure solutions across telecom, fiber optics, solar and renewable energy, and IT. With experienced technical teams, specialized equipment, and a field-focused approach, we work with telecom operators, ISPs, EPC contractors, technology companies, enterprises and government agencies across Nepal.',
  'Building the infrastructure that connects, powers and enables Nepal.',
  'To deliver integrated infrastructure and technology solutions with quality, safety and accountability.',
  'PUBLISHED'
WHERE NOT EXISTS (SELECT 1 FROM about_section);

INSERT INTO projects (slug, title, category, short_description, full_description, featured_image, client_name, location, completion_info, featured, sort_order, status) VALUES
  ('rf-drive-test-network-optimization', 'RF Drive Test & Network Optimization', 'TELECOM', 'Single-Site Verification & RF Optimization. 1,214 sites.', 'Pie Square Technologies conducted site-level RF Drive Test, network verification, physical parameter verification, optimization and technical reporting across designated locations in Nepal.', '/media/projects/rf-drive.jpg', 'C.C.S. Nepal Private Limited', 'Nepal - Terai, Mid-Hill, High-Hill and Kathmandu', '17 November 2019 - 20 May 2024', 1, 1, 'PUBLISHED'),
  ('cluster-drive-test-optimization', 'Cluster Drive Test & Optimization', 'TELECOM', 'Cluster-Level RF Performance Testing & Optimization.', 'Pie Square Technologies completed cluster-level RF Drive Test and Optimization across commissioned base stations and designated routes within assigned areas in Nepal.', '/media/projects/telecom.jpg', 'C.C.S. Nepal Private Limited', 'Nepal - 7 Provinces', '17 November 2019 - 01 August 2024', 1, 2, 'PUBLISHED'),
  ('ssv-drive-testing-ncell', 'SSV Drive Testing & Network Verification - Ncell', 'TELECOM', '381 Sites · GSM · UMTS · LTE.', 'Pie Square Technologies completed SSV drive testing and network verification for 381 Ncell sites across Madhesh, Koshi and Lumbini Provinces under the ZTE project.', '/media/projects/antenna.jpg', 'ZTE Nepal Pvt. Ltd.', 'Madhesh, Koshi and Lumbini Provinces', 'Completed', 0, 3, 'PUBLISHED'),
  ('fiber-network-operations-maintenance', 'Fiber Network Operations & Maintenance', 'FIBER', 'Managed Fiber Network Delivery & Field Operations.', 'Pie Square Technologies provides fiber network operations and maintenance services supporting network availability, fault response, customer connectivity, POP support and approved network expansion activities across Eastern Nepal.', '/media/client/fiber-deployment.jpeg', 'CG Communications Limited (CGNET)', 'Eastern Nepal · Biratnagar · Itahari · Duhabi · Dharan · Lahan', 'April 2024 - Present', 1, 4, 'PUBLISHED'),
  ('fiber-network-deployment-odn-implementation', 'Fiber Network Deployment & ODN Implementation', 'FIBER', 'End-to-End Fiber Network Deployment.', 'Deployment and installation of fiber optic network infrastructure for broadband connectivity, covering fiber cable pulling, ODN installation, splicing, distribution, testing and commissioning across Kathmandu Valley.', '/media/client/fiber-splicing.jpeg', 'C.C.S. Nepal Private Limited', 'Kathmandu Valley', 'November 2021 - June 2023', 1, 5, 'PUBLISHED'),
  ('400-kwp-ground-mount-solar', '400 kWp Ground-Mount Solar Power Plant', 'SOLAR', 'Solar PV Operation & Maintenance.', 'Pie Square Technologies provides comprehensive operation and maintenance services for a 400 kWp ground-mounted solar PV plant at Surya Nepal Private Limited.', '/media/client/solar-plant.png', 'Surya Nepal Private Limited', 'Simar, Bara, Nepal', 'October 2025 - Present', 1, 6, 'PUBLISHED'),
  ('pop-odn-ring-survey', 'POP & ODN Ring Survey', 'FIBER', 'Fiber Network Survey & Deployment Planning.', 'Pie Square Technologies conducted field surveys and route planning for POP locations and ODN ring networks to support FTTH network deployment across multiple project areas in Nepal.', '/media/client/fiber-splicing.jpeg', 'C.C.S. Nepal Private Limited', 'Palpa, Kawasoti, Pragatinagar, Nawalpur, Bharatpur, Ratnanagar and Hetauda', 'January 2022 - February 2022', 0, 7, 'PUBLISHED'),
  ('electrical-distribution-transformer-installation', 'Electrical Distribution Network & Transformer Installation', 'SOLAR', 'Transformer Installation · LT Distribution · PSC Pole Erection.', 'Pie Square Technologies, as a subcontractor to Teleconstruct Developers Pvt. Ltd., executed electrical distribution infrastructure works for Nabrajpur Rural Municipality in Siraha, Madhesh Province.', '/media/client/transformer-site.png', 'Teleconstruct Developers Pvt. Ltd.', 'Nabrajpur Rural Municipality, Siraha, Madhesh Province', 'June 2025 - July 2025', 1, 8, 'PUBLISHED'),
  ('website-content-development-doit', 'Website Content Development, Update & Management', 'IT', 'Website Content Management & DoIT Template Customization.', 'Website content development, page updates and information management within the existing government-provided website template.', '/media/projects/rack.jpg', 'Provincial and Local Infrastructure Development Project', 'Janakpurdham, Dhanusha, Nepal', 'April 2025 - May 2025', 0, 9, 'PUBLISHED'),
  ('website-content-management-janakpur', 'Website Content Management & DoIT Template Customization', 'IT', 'Website Content Development & Management.', 'Website content management, page updates, information organization and client enablement for routine website administration.', '/media/projects/rack.jpg', 'Purbanchal Bikas Nirdeshanalaya', 'Janakpur, Dhanusha, Nepal', 'May 2025 - June 2025', 0, 10, 'PUBLISHED'),
  ('digital-media-social-media-seo', 'Digital Media, Social Media & Online Promotion Services', 'IT', 'Digital Marketing, Social Media Management & SEO.', 'Digital content, social media management, online promotion and SEO services supporting institutional communication and online visibility.', '/media/projects/clients.jpg', 'National Reconstruction Authority (NRA)', 'Singha Durbar, Kathmandu, Nepal', 'July 2021', 0, 11, 'PUBLISHED'),
  ('rf-customer-complaint-analysis-optimization', 'RF Customer Complaint Analysis & Optimization', 'TELECOM', 'Drive Test-Based Customer Complaint Resolution.', 'Pie Square Technologies carried out RF field investigation and optimization activities to address customer complaints at various locations across Nepal under the NT 4G LTE Project.', '/media/projects/rf-drive.jpg', 'C.C.S. Nepal Private Limited', 'All Seven Provinces of Nepal', '17 November 2019 - 20 May 2024', 0, 12, 'PUBLISHED')
ON DUPLICATE KEY UPDATE
  title = VALUES(title), category = VALUES(category), short_description = VALUES(short_description), full_description = VALUES(full_description), featured_image = VALUES(featured_image), client_name = VALUES(client_name), location = VALUES(location), completion_info = VALUES(completion_info), featured = VALUES(featured), sort_order = VALUES(sort_order), status = VALUES(status);
