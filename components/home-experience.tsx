'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { LenisProvider } from '@/components/motion/lenis-provider';
import { useReducedMotion } from '@/components/motion/reduced-motion';
import { SceneShell } from '@/components/scene-shell';
import { ProvenMetrics } from '@/components/proven-metrics';
import { SignalLine } from '@/components/signal-line';
import { SiteNav } from '@/components/site-nav';
import { FloatingContact } from '@/components/floating-contact';
import { SiteFooter } from '@/components/site-footer';
import { PhoneIcon, WhatsAppIcon } from '@/components/contact-icons';
import {
  clients,
  companyIntro,
  companyTimeline,
  homeDeliverySteps,
  homeIndustries,
  projects as fallbackProjects,
  serviceOverview,
  siteContact,
  trustedClientLogoFiles,
  whyPieSquare,
  type ProjectRecord,
} from '@/data/site';
import type { SignalState } from '@/lib/motion';
import styles from './home-atlas.module.css';

type HomeHeroContent = Readonly<{
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  image: string;
}>;

type HomeContact = Readonly<{
  email: string;
  phone: string;
  phoneHref: string;
  address: string;
  mapUrl: string;
  facebook: string;
  website: string;
}>;

type HomeService = Readonly<{
  slug: string;
  title: string;
  summary: string;
  scope: ReadonlyArray<string>;
  href: string;
}>;

const stateOrder: SignalState[] = ['HERO_TRANSMIT', 'MAP_ROUTE', 'DIGITAL_NETWORK', 'FINAL_CONVERGENCE'];

function serviceAnchor(service: HomeService, index: number) {
  if (service.href.endsWith('/telecom')) return 'telecom';
  if (service.href.endsWith('/optical-fiber')) return 'fiber';
  if (service.href.endsWith('/solar-energy')) return 'energy';
  if (service.href.endsWith('/it-solutions')) return 'digital';
  return (['telecom', 'fiber', 'energy', 'digital'] as const)[index] ?? `service-${index + 1}`;
}

function HeroScene({ hero }: { hero: HomeHeroContent }) {
  const lines = hero.title.split('|');
  return (
    <SceneShell id="top" state="HERO_TRANSMIT" className={styles.hero}>
      <div className={styles.heroPhoto} aria-hidden="true">
        <Image src={hero.image} alt="" fill priority sizes="(max-width: 720px) 100vw, 58vw" />
      </div>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={`page-wrap ${styles.heroContent}`}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{hero.eyebrow}</p>
          <h1 className={styles.heroTitle}>
            {lines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line.includes('NEPAL CONNECTED.') ? <>{line.replace('NEPAL CONNECTED.', '')}<em>NEPAL CONNECTED.</em></> : line}
              </span>
            ))}
          </h1>
          <div className={styles.heroMeta}><span>ESTABLISHED 2019</span><span>LALITPUR, NEPAL</span></div>
          <div className={styles.heroActions}>
            <a className="button button--primary" href={hero.ctaUrl}>{hero.ctaText} ↗</a>
            <a className="button button--ghost" href="#expertise">Explore our services ↗</a>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function CompanyScene() {
  return (
    <SceneShell id="company" state="MAP_ROUTE" className={styles.company}>
      <div className={`page-wrap ${styles.companyContent}`}>
        <div className={styles.companyIntro}>
          <p className={styles.kicker}>WHO WE ARE</p>
          <h2 className={styles.displayTitle}>INFRASTRUCTURE <em>EXPERTISE. FIELD EXECUTION. RELIABLE RESULTS.</em></h2>
          <p className={styles.bodyCopy}>{companyIntro}</p>
          <Link className={styles.textLink} href="/company">Learn more about us <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.network} aria-label="Pie Square field delivery network across telecom, fiber, solar and electrical, and IT">
          <div className={styles.networkRule} aria-hidden="true" />
          <p className={styles.networkTop}>FOUR DISCIPLINES / ONE DELIVERY NETWORK</p>
          <div className={styles.networkMap}>
            <span className={styles.networkNode}>TELECOM</span>
            <span className={styles.networkNode}>FIBER</span>
            <strong className={styles.networkCore}>PIE SQUARE<span>FIELD DELIVERY NETWORK</span></strong>
            <span className={styles.networkNode}>SOLAR &amp;<br /> ELECTRICAL</span>
            <span className={styles.networkNode}>IT</span>
          </div>
          <p className={styles.networkBottom}>ENGINEERING • DEPLOYMENT • COMMISSIONING • O&amp;M</p>
          <p className={styles.networkAccessible}>PIE SQUARE — FIELD DELIVERY NETWORK · TELECOM | FIBER | SOLAR &amp; ELECTRICAL | IT</p>
        </div>
        <ol className={styles.timeline} aria-label="Pie Square company timeline">
          {companyTimeline.map((item) => (
            <li key={item.marker}><span>{item.marker}</span><strong>{item.title}</strong></li>
          ))}
        </ol>
      </div>
    </SceneShell>
  );
}

function ServicesScene({ services }: { services: ReadonlyArray<HomeService> }) {
  return (
    <SceneShell id="expertise" state="MAP_ROUTE" className={styles.services}>
      <div className={`page-wrap ${styles.sectionPad}`}>
        <div className={styles.servicesHead}>
          <div><p className={styles.kicker}>FOUR DIVISIONS / ONE STANDARD</p><p>Engineering, deployment, commissioning and long-term support.</p></div>
          <h2 className={styles.displayTitle}>WHAT WE <em>DELIVER.</em></h2>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((service, index) => {
            const anchor = serviceAnchor(service, index);
            const hasRfScope = service.scope.some((scope) => /\brf\b/i.test(scope));
            return (
              <Link id={anchor} className={`${styles.serviceCard} atlas-reveal`} href={service.href} key={`${service.href}-${index}`}>
                <div className={styles.serviceCardTop}><span>{String(index + 1).padStart(2, '0')} / 04</span><span aria-hidden="true">↗</span></div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ul aria-label={`${service.title} scope`}>
                  {service.scope.map((scope) => <li id={anchor === 'telecom' && /\brf\b/i.test(scope) ? 'rf' : undefined} key={scope}>{scope}</li>)}
                  {anchor === 'telecom' && !hasRfScope ? <li id="rf">RF Drive Testing</li> : null}
                </ul>
              </Link>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
}

function ProcessScene() {
  return (
    <SceneShell id="process" state="MAP_ROUTE" className={styles.process}>
      <div className={`page-wrap ${styles.sectionPad}`}>
        <p className={styles.kicker}>HOW WE DELIVER</p>
        <h2 className={styles.processTitle}>From Survey to Service<br />We Deliver End to End.</h2>
        <p className={styles.processIntro}>A disciplined, documented delivery methodology applied to every project regardless of scale.</p>
        <ol className={styles.processSteps} aria-label="Delivery process">
          {homeDeliverySteps.map((step, index) => (
            <li key={step.title} className="atlas-reveal"><span className={styles.processNumber}>{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.copy}</p></li>
          ))}
        </ol>
      </div>
    </SceneShell>
  );
}

function ImpactScene() {
  return (
    <SceneShell id="impact" state="DIGITAL_NETWORK" className={styles.impact}>
      <ProvenMetrics />
    </SceneShell>
  );
}

function ProjectsScene({ projects }: { projects: ReadonlyArray<ProjectRecord> }) {
  return (
    <SceneShell id="projects" state="DIGITAL_NETWORK" className={styles.projects}>
      <div className={`page-wrap ${styles.sectionPad}`}>
        <div className={styles.projectsHead}>
          <div><p className={styles.kicker}>SELECTED PROJECTS</p><h2 className={styles.displayTitle}>BUILT IN THE FIELD.<br /><em>PROVEN IN THE NETWORK.</em></h2></div>
          <Link className={styles.textLink} href="/projects">View all projects <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.projectGrid}>
          {projects.slice(0, 6).map((project, index) => (
            <Link href={`/projects/${project.id}`} className={`${styles.projectCard} atlas-reveal`} key={project.id}>
              <div className={styles.projectImage}><Image src={project.image || '/media/projects/hero.jpg'} alt={project.imageAlt || project.title} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div>
              <div className={styles.projectMeta}><span>{String(index + 1).padStart(2, '0')} / {project.categoryLabel}</span><span>{project.status}</span></div>
              <h3>{project.title}</h3>
              <p>{project.location} · {project.duration}</p>
              <span className={styles.projectLink}>VIEW PROJECT ↗</span>
            </Link>
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

function IndustriesScene() {
  return (
    <SceneShell id="industries" state="DIGITAL_NETWORK" className={styles.industries}>
      <div className={`page-wrap ${styles.sectionPad}`}>
        <p className={styles.kicker}>INDUSTRIES</p>
        <h2 className={styles.industriesTitle}>Industries We Support</h2>
        <ul className={styles.industryGrid}>
          {homeIndustries.map((industry) => <li key={industry}><span aria-hidden="true">◆</span>{industry}</li>)}
        </ul>
      </div>
    </SceneShell>
  );
}

function ClientsScene() {
  return (
    <SceneShell id="clients" state="DIGITAL_NETWORK" className={styles.clients}>
      <div className={`page-wrap ${styles.sectionPad}`}>
        <p className={styles.kicker}>FIELD PARTNERSHIPS</p>
        <h2 className={styles.displayTitle}><em>TRUSTED BY INDUSTRY.</em><br />BUILT FOR LONG-TERM PARTNERSHIPS.</h2>
        <div className={styles.logoGrid} aria-label="Trusted clients">
          {trustedClientLogoFiles.map((logo) => (
            <figure className={`${styles.logoCell} atlas-client-logo`} key={logo.name}>
              <div className={styles.logoImage}><Image src={logo.src} alt={logo.alt} fill sizes="(max-width: 720px) 45vw, 22vw" /></div>
              <figcaption>{logo.name}</figcaption>
            </figure>
          ))}
        </div>
        <p className={styles.clientNote}>{clients.length} established client and project relationships across Nepal’s infrastructure landscape.</p>
      </div>
    </SceneShell>
  );
}

function WhyScene() {
  return (
    <SceneShell id="why" state="FINAL_CONVERGENCE" className={styles.why}>
      <div className={`page-wrap ${styles.sectionPad}`}>
        <p className={styles.kicker}>WHY PIE SQUARE</p>
        <h2 className={styles.displayTitle}>ENGINEERING DISCIPLINE,<br /><em>FIELD-PROVEN.</em></h2>
        <div className={styles.whyGrid}>
          {whyPieSquare.map((item, index) => (
            <article key={item.title} className="atlas-reveal"><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.copy}</p></article>
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

function ProfileScene() {
  return (
    <SceneShell id="profile" state="FINAL_CONVERGENCE" className={styles.profile}>
      <div className={`page-wrap ${styles.profileContent}`}>
        <div><p className={styles.kicker}>COMPANY PROFILE</p><h2>Looking for More Information?</h2><p>Download our company profile to learn more about our services, technical capabilities, project experience and resources.</p></div>
        <div className={styles.profileAction}><a href="/resources/pie-square-company-profile-2026.pdf" target="_blank" rel="noopener noreferrer">Download Company Profile <span aria-hidden="true">↗</span></a><small>PDF · COMPANY PROFILE 2026</small></div>
      </div>
    </SceneShell>
  );
}

function FinalScene({ contact }: { contact: HomeContact }) {
  return (
    <SceneShell id="contact" state="FINAL_CONVERGENCE" className="final-scene">
      <div className="final-scene__mesh" aria-hidden="true" />
      <div className="page-wrap final-scene__layout">
        <p className="eyebrow eyebrow--red">The signal continues</p>
        <h2 className="display-title">ONE PARTNER. MULTIPLE INFRASTRUCTURE <em>LAYERS.</em></h2>
        <h3 className="display-title display-title--secondary">BUILD THE NEXT CONNECTION <em>WITH US.</em></h3>
        <div className="final-scene__actions">
          <a className="button button--primary" href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}><WhatsAppIcon className="button__icon" /><span>WhatsApp ↗</span></a>
          <a className="button button--ghost" href={'mailto:' + contact.email}>{contact.email}</a>
          <a className="button button--ghost" href={contact.phoneHref}><PhoneIcon className="button__icon" /><span>{contact.phone}</span></a>
        </div>
        <div className="final-scene__foot"><span>{contact.address}</span><span>{contact.email}</span><span>{contact.website}</span></div>
      </div>
    </SceneShell>
  );
}

function MotionBridge({ onState }: { onState: (state: SignalState) => void }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-signal-state]'));
    if (reduced || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const state = visible?.target.getAttribute('data-signal-state') as SignalState | null;
      if (state && stateOrder.includes(state)) onState(state);
    }, { threshold: [0.2, 0.5, 0.8], rootMargin: '-12% 0px -12% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onState, reduced]);

  return null;
}

export function HomeExperience({ hero, contact, services, projects }: { hero?: HomeHeroContent; contact?: HomeContact; services?: ReadonlyArray<HomeService>; projects?: ReadonlyArray<ProjectRecord> } = {}) {
  const resolvedHero = hero ?? {
    eyebrow: 'INTEGRATED INFRASTRUCTURE & TECHNOLOGY SOLUTIONS',
    title: 'BUILDING THE|INFRASTRUCTURE|THAT KEEPS NEPAL CONNECTED.',
    subtitle: 'Telecom. Fiber. Solar. IT.',
    ctaText: 'View our work',
    ctaUrl: '#projects',
    image: '/media/cinematic/pie-square-hero-integrated-infrastructure.webp',
  };
  const resolvedContact = contact ?? siteContact;
  const resolvedServices = services ?? serviceOverview.map((service) => ({ slug: service.href.split('/').pop() ?? service.title.toLowerCase(), title: service.title, summary: service.summary, scope: service.scope, href: service.href }));
  const resolvedProjects = projects ?? fallbackProjects;
  const [signalState, setSignalState] = useState<SignalState>('HERO_TRANSMIT');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || typeof window === 'undefined') return;
    const context = gsap.context(() => {
      gsap.fromTo(`.${styles.heroCopy}`, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
      gsap.fromTo(`.${styles.heroPhoto} img`, { scale: 1.06 }, { scale: 1, duration: 1.5, ease: 'power2.out' });
    });
    return () => context.revert();
  }, [reduced]);

  return (
    <LenisProvider>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteNav tone="paper" />
      <FloatingContact contact={resolvedContact} />
      <SignalLine state={signalState} />
      <MotionBridge onState={setSignalState} />
      <main id="main-content" className="experience">
        <HeroScene hero={resolvedHero} />
        <CompanyScene />
        <ServicesScene services={resolvedServices} />
        <ProcessScene />
        <ImpactScene />
        <ProjectsScene projects={resolvedProjects} />
        <IndustriesScene />
        <ClientsScene />
        <WhyScene />
        <ProfileScene />
        <FinalScene contact={resolvedContact} />
      </main>
      <SiteFooter contact={resolvedContact} />
    </LenisProvider>
  );
}
