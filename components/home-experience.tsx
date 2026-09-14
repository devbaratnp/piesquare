'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisProvider } from '@/components/motion/lenis-provider';
import { useReducedMotion } from '@/components/motion/reduced-motion';
import { SceneShell } from '@/components/scene-shell';
import { SignalLine } from '@/components/signal-line';
import { SiteNav } from '@/components/site-nav';
import { DiscussProjectButton } from '@/components/discuss-project-button';
import {
  capabilities,
  capabilityRoutes,
  companyLogos,
  companyTimeline,
  digitalModules,
  energyPoints,
  fiberSteps,
  impactStats,
  projects,
  siteContact,
  telecomFrames,
  whyPieSquare,
} from '@/data/site';
import { ImageCarouselHero } from '@/components/ui/ai-image-generator-hero';
import type { SignalState } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

const stateOrder: SignalState[] = [
  'HERO_TRANSMIT',
  'MAP_ROUTE',
  'TELECOM_BUILD',
  'RF_DRIVE',
  'FIBER_LIGHT',
  'ENERGY_CURRENT',
  'DIGITAL_NETWORK',
  'FINAL_CONVERGENCE',
];

const capabilitySummaries = [
  'Tower systems, installation, testing, and optimization.',
  'Backbone, access, splicing, and customer connectivity.',
  'Hybrid power, batteries, and remote-site continuity.',
  'Infrastructure, security, and software for organizations.',
] as const;

type MediaPlateProps = Readonly<{
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}>;

function MediaPlate({ src, alt, className = '', priority = false }: MediaPlateProps) {
  return (
    <figure className={'media-plate ' + className}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 720px) 100vw, 50vw" />
      <span className="media-plate__rule" aria-hidden="true" />
    </figure>
  );
}

function SectionMarker({ number, label, light = false }: { number: string; label: string; light?: boolean }) {
  return (
    <div className={'section-marker ' + (light ? 'section-marker--light' : '')}>
      <span>{number}</span>
      <b>{label}</b>
    </div>
  );
}

function HeroScene() {
  return (
    <SceneShell id="top" state="HERO_TRANSMIT" className="hero-scene">
      <div className="hero-scene__media" aria-hidden="true">
        <Image src="/media/cinematic/H01-hero-nepal-tower.webp" alt="" fill priority sizes="100vw" />
        <div className="hero-scene__veil" />
        <div className="hero-scene__rings"><i /><i /><i /></div>
        <div className="hero-scene__antenna" />
      </div>

      <div className="page-wrap hero-scene__content">
        <div className="hero-editorial__copy">
          <p className="eyebrow">Pie Square Technologies / infrastructure / Nepal</p>
          <h1 className="display-title hero-scene__title">
            <span>BUILDING THE</span>
            <span>INFRASTRUCTURE</span>
            <span>THAT CONNECTS <em>NEPAL.</em></span>
          </h1>
          <p className="hero-scene__disciplines">Telecom. Fiber. Energy. Technology.</p>
          <div className="hero-scene__footer">
            <p>Telecom, fiber, energy, and technology solutions for the networks and digital infrastructure that keep businesses and communities connected.</p>
            <div className="hero-scene__meta">
              <span>Established 2019</span>
              <span>Kusunti-13, Lalitpur, Nepal</span>
            </div>
          </div>
          <div className="hero-scene__actions">
            <a className="button button--primary" href="#projects" data-cursor="view">View our work ↗</a>
            <a className="button button--ghost" href="#expertise" data-cursor="view">Explore capabilities ↗</a>
            <span className="scroll-cue"><i /> Scroll to transmit</span>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function CompanyScene() {
  return (
    <SceneShell id="company" state="MAP_ROUTE" className="company-scene light-scene">
      <div className="topo-grid" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
      <div className="page-wrap company-scene__layout">
        <SectionMarker number="01" label="The company" />
        <ImageCarouselHero
          title={<>INFRASTRUCTURE<br /><em>ENGINEERED FOR PROGRESS.</em></>}
          subtitle="About Pie Square / connected field network"
          description="Pie Square Technologies supports Nepal's evolving digital infrastructure through telecom network services, fiber deployment, renewable energy systems, and IT solutions. We work with telecom operators, ISPs, enterprises, and institutions to build reliable, sustainable, and future-ready infrastructure across the country."
          ctaText="Explore our network"
          onCtaClick={() => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })}
          images={companyLogos}
          features={[
            { title: '2019 / ESTABLISHED', description: 'Field systems since 2019' },
            { title: 'TELECOM / FIBER', description: 'Infrastructure built close to the ground' },
            { title: 'ENERGY / DIGITAL', description: 'One infrastructure partner' },
          ]}
        />
        <ol className="company-timeline" aria-label="Company timeline from 2019 to today">
          {companyTimeline.map((item) => (
            <li key={item.marker}>
              <span>{item.marker}</span>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ol>
      </div>
    </SceneShell>
  );
}

function CapabilitiesScene() {
  return (
    <SceneShell id="expertise" state="MAP_ROUTE" className="capabilities-scene">
      <div className="page-wrap">
        <SectionMarker number="02" label="One partner / four capability layers" light />
        <div className="capabilities-scene__intro">
          <div>
            <p className="eyebrow">What we build</p>
            <p className="capabilities-scene__aside">One partner for the physical layer, the power layer, and the systems behind both.</p>
          </div>
          <h2 className="display-title">WHAT WE<br /><em>BUILD.</em></h2>
        </div>
        <div className="capability-list">
          {capabilities.map((item, index) => (
            <Link className="capability-row editorial-reveal" key={item} href={capabilityRoutes[index].href}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
              <span className="capability-row__meta">
                <small>{capabilitySummaries[index]}</small>
                <b aria-label={`Capability ${index + 1} of 4`}>0{index + 1} / 04</b>
              </span>
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

function TelecomScene() {
  const [active, setActive] = useState(0);
  const sceneRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const scene = sceneRef.current;
    if (reduced || !scene || typeof window === 'undefined' || !('ResizeObserver' in window)) return;
    const trigger = ScrollTrigger.create({
      trigger: scene,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => setActive(Math.min(telecomFrames.length - 1, Math.floor(self.progress * telecomFrames.length))),
    });
    return () => trigger.kill();
  }, [reduced]);

  return (
    <section id="telecom" ref={sceneRef} className="telecom-scene" data-scene="telecom" data-signal-state="TELECOM_BUILD">
      <div className="telecom-scene__backdrop" aria-hidden="true">
        <Image src="/media/cinematic/T01-telecom-survey.webp" alt="" fill sizes="100vw" />
        <div className="telecom-scene__shade" />
      </div>
      <div className="page-wrap telecom-scene__layout">
        <div className="telecom-scene__copy">
          <SectionMarker number="03" label="From survey to signal" light />
          <p className="eyebrow">Telecom lifecycle / seven phases</p>
          <h2 className="display-title">FROM SURVEY<br /><em>TO SIGNAL.</em></h2>
          <p>Survey. Foundation. Steel. Equipment. Power. Commissioning. Optimization. A network is a physical thing before it becomes an invisible one.</p>
          <div className="telecom-scene__phase">
            <span>0{telecomFrames[active][2]} / 07</span>
            <b>{telecomFrames[active][1]}</b>
          </div>
          <ol className="telecom-scene__phase-list" aria-label="Telecom construction phases">
            {telecomFrames.map(([, label, number], index) => (
              <li className={index === active ? 'is-active' : ''} key={label}>
                <span>{number}</span>
                {label}
              </li>
            ))}
          </ol>
        </div>
        <div className="telecom-scene__frames">
          {telecomFrames.map(([src, label]) => (
            <Image key={src} className={telecomFrames[active][0] === src ? 'is-active' : ''} src={src} alt={label + ' phase of the telecom construction sequence'} fill sizes="(max-width: 720px) 100vw, 50vw" />
          ))}
        </div>
      </div>
    </section>
  );
}

function RFScene() {
  return (
    <SceneShell id="rf" state="RF_DRIVE" className="rf-scene">
      <div className="rf-scene__scan" aria-hidden="true" />
      <div className="page-wrap rf-scene__layout">
        <div className="rf-scene__copy">
          <SectionMarker number="04" label="RF engineering" light />
          <p className="eyebrow eyebrow--red">A network is never finished</p>
          <h2 className="display-title">A NETWORK ISN&apos;T<br />FINISHED WHEN<br /><em>THE TOWER GOES LIVE.</em></h2>
          <p className="rf-scene__body">It has to perform. Drive testing maps the moments a signal weakens, hands over, or disappears. The route study is a visualization, not a project measurement.</p>
          <p className="rf-scene__note">Readouts shown for illustration — visualization only, not project measurements.</p>
          <div className="rf-readout">
            <span><small>RSRP</small><b>-85 dBm</b></span>
            <span><small>SINR</small><b>18 dB</b></span>
            <span><small>RSRQ</small><b>-10 dB</b></span>
            <span><small>THROUGHPUT</small><b>150 Mbps</b></span>
          </div>
        </div>
        <div className="rf-scene__visual">
          <MediaPlate className="rf-scene__media" src="/media/projects/rf-drive.jpg" alt="RF drive-testing vehicle on a field route" />
          <div className="rf-map" aria-label="Abstract RF route visualization">
            <div className="rf-map__rings" />
            <svg viewBox="0 0 700 600" aria-hidden="true">
              <path className="rf-map__ghost" d="M40 490 C160 250 180 560 320 350 S470 180 650 80" />
              <path className="rf-map__route" d="M40 490 C160 250 180 560 320 350 S470 180 650 80" pathLength="1" />
            </svg>
            {[18, 34, 52, 68, 79].map((left, index) => (
              <i key={left} style={{ left: left + '%', top: (58 - index * 7) + '%' }} />
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function FiberScene() {
  return (
    <SceneShell id="fiber" state="FIBER_LIGHT" className="fiber-scene light-scene">
      <div className="fiber-scene__photo">
        <Image src="/media/cinematic/F01-fiber-macro.webp" alt="Cinematic macro study of a red light traveling through fiber glass" fill sizes="100vw" />
        <div className="fiber-scene__veil" />
      </div>
      <div className="page-wrap fiber-scene__layout">
        <SectionMarker number="05" label="Optical fiber" />
        <div>
          <p className="eyebrow eyebrow--dark">Connecting communities</p>
          <h2 className="fiber-number">2240<span>+ KM</span></h2>
          <h3 className="display-title">CONNECTING COMMUNITIES. KILOMETER BY <em>KILOMETER.</em></h3>
          <div className="fiber-steps">{fiberSteps.map((step) => <span key={step}>{step}</span>)}</div>
          <MediaPlate className="fiber-scene__submedia" src="/media/cinematic/F02-fiber-field-deployment.png" alt="Field team deploying optical fiber in Nepal" />
        </div>
      </div>
    </SceneShell>
  );
}

function EnergyScene() {
  return (
    <SceneShell id="energy" state="ENERGY_CURRENT" className="energy-scene light-scene">
      <div className="page-wrap energy-scene__layout">
        <div className="energy-scene__copy">
          <SectionMarker number="06" label="Energy" />
          <p className="eyebrow eyebrow--dark">Powering the infrastructure behind connectivity</p>
          <h2 className="display-title">POWERING THE INFRASTRUCTURE BEHIND <em>CONNECTIVITY.</em></h2>
          <p className="energy-scene__body">Hybrid power, off-grid systems, battery storage, load optimization, and maintenance for telecom and public infrastructure.</p>
          <ul className="energy-scene__points">
            {energyPoints.map((point) => (
              <li key={point.title}><strong>{point.title}</strong><span>{point.copy}</span></li>
            ))}
          </ul>
          <div className="energy-scene__spec"><strong>400 kW</strong><span>Solar O&amp;M project documented in the company profile</span></div>
        </div>
        <MediaPlate className="energy-scene__media" src="/media/cinematic/E02-solar-hybrid-power.png" alt="Solar hybrid power and battery installation supporting connectivity infrastructure" />
      </div>
    </SceneShell>
  );
}

function DigitalScene() {
  const nodes = Array.from({ length: 24 }, (_, index) => ({
    x: (index * 43) % 96 + '%',
    y: (index * 67) % 84 + '%',
  }));

  return (
    <SceneShell id="digital" state="DIGITAL_NETWORK" className="digital-scene">
      <div className="digital-scene__network" aria-hidden="true">
        {nodes.map((node, index) => <i key={index} style={{ '--x': node.x, '--y': node.y } as CSSProperties} />)}
      </div>
      <div className="page-wrap digital-scene__layout">
        <SectionMarker number="07" label="IT / digital systems" light />
        <p className="eyebrow eyebrow--red">The infrastructure behind the organization</p>
        <h2 className="display-title">INFRASTRUCTURE<br />DOESN&apos;T END<br /><em>AT THE TOWER.</em></h2>
        <div className="digital-scene__body">
          <p>Infrastructure, security, and software that keeps connected organizations moving after the field crew leaves site.</p>
          <div className="digital-scene__list">{digitalModules.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
        <MediaPlate className="digital-scene__media" src="/media/projects/rack.jpg" alt="Network equipment rack in an IT operations environment" />
      </div>
    </SceneShell>
  );
}

function ImpactScene() {
  return (
    <section id="impact" className="impact-scene" data-scene="impact" data-signal-state="DIGITAL_NETWORK">
      <div className="page-wrap">
        <SectionMarker number="09" label="Impact in numbers" light />
        <div className="impact-scene__label">FIELD OUTPUT / COMPANY PROFILE REFERENCE</div>
        <div className="impact-stats">
          {impactStats.map(([value, label], index) => (
            <div key={label} className={'impact-stat ' + (index === 0 ? 'is-active' : '')}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="impact-scene__line"><i /></div>
      </div>
    </section>
  );
}

function ProjectsScene() {
  return (
    <section id="projects" className="projects-scene" data-scene="projects" data-signal-state="DIGITAL_NETWORK">
      <div className="page-wrap">
        <SectionMarker number="10" label="Project evidence" />
        <div className="projects-scene__head">
          <h2 className="display-title">BUILT IN THE FIELD.<br /><em>PROVEN IN THE NETWORK.</em></h2>
          <span>REAL COMPANY DOCUMENTATION / PROOF OF WORK</span>
        </div>
        <div className="evidence-wall">
          {projects.slice(0, 6).map((project, index) => (
            <article className={'evidence-card evidence-card--' + (index + 1) + ' editorial-reveal'} key={project.id}>
              <div className="evidence-card__image">
                <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 720px) 100vw, 33vw" />
              </div>
              <div className="evidence-card__copy">
                <span>{project.status} / {project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.location} / {project.scope.join(' • ')}</p>
              </div>
            </article>
          ))}
        </div>
        <Link className="button button--dark projects-scene__cta" href="/projects">View All Projects ↗</Link>
      </div>
    </section>
  );
}

function ClientsScene() {
  return (
    <section id="clients" className="clients-scene light-scene" data-scene="clients" data-signal-state="DIGITAL_NETWORK">
      <div className="page-wrap clients-scene__layout">
        <SectionMarker number="11" label="Trusted in the field" />
        <div>
          <p className="eyebrow eyebrow--dark">Selected clients / supplied company profile</p>
          <h2 className="display-title">TRUSTED ACROSS<br /><em>CRITICAL INFRASTRUCTURE.</em></h2>
        </div>
        <div className="clients-scene__names">
          {companyLogos.map((logo) => (
            <figure key={logo.id}>
              <Image src={logo.src} alt={logo.alt} fill sizes="(max-width: 640px) 80vw, 300px" />
            </figure>
          ))}
          <span>Enterprise + public infrastructure</span>
        </div>
      </div>
    </section>
  );
}

function WhyScene() {
  return (
    <section id="why" className="why-scene light-scene" data-scene="why" data-signal-state="FINAL_CONVERGENCE" aria-label="Why Pie Square">
      <div className="page-wrap why-scene__layout">
        <SectionMarker number="12" label="Why Pie Square" />
        <h2 className="display-title">WHY <em>PIE SQUARE.</em></h2>
        <div className="why-scene__grid">
          {whyPieSquare.map((item, index) => (
            <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalScene() {
  return (
    <SceneShell id="contact" state="FINAL_CONVERGENCE" className="final-scene">
      <div className="final-scene__mesh" aria-hidden="true" />
      <div className="page-wrap final-scene__layout">
        <SectionMarker number="13" label="Pie Square Technologies" light />
        <p className="eyebrow eyebrow--red">The signal continues</p>
        <h2 className="display-title">ONE PARTNER. MULTIPLE INFRASTRUCTURE <em>LAYERS.</em></h2>
        <h3 className="display-title display-title--secondary">BUILD THE NEXT CONNECTION <em>WITH US.</em></h3>
        <div className="final-scene__actions">
          <DiscussProjectButton className="button button--primary" dataCursor="start">Discuss a Project ↗</DiscussProjectButton>
          <a className="button button--ghost" href={'mailto:' + siteContact.email} data-cursor="contact">{siteContact.email}</a>
          <a className="button button--ghost" href={siteContact.phoneHref} data-cursor="contact">{siteContact.phone}</a>
        </div>
        <div className="final-scene__foot">
          <span>{siteContact.address}</span>
          <span>{siteContact.email}</span>
          <span>{siteContact.website}</span>
        </div>
      </div>
    </SceneShell>
  );
}

function MotionBridge({ onState }: { onState: (state: SignalState) => void }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-signal-state]'));
    const update = (entries: IntersectionObserverEntry[]) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const state = visible?.target.getAttribute('data-signal-state') as SignalState | null;
      if (state && stateOrder.includes(state)) onState(state);
    };

    if (reduced || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.style.scrollSnapAlign = 'none');
      return;
    }

    const observer = new IntersectionObserver(update, { threshold: [0.2, 0.5, 0.8], rootMargin: '-12% 0px -12% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onState, reduced]);

  return null;
}

export function HomeExperience() {
  const [signalState, setSignalState] = useState<SignalState>('HERO_TRANSMIT');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || typeof window === 'undefined' || !('ResizeObserver' in window)) return;

    const contexts = gsap.context(() => {
      gsap.fromTo('.hero-scene__media img', { scale: 1.04 }, { scale: 1.12, ease: 'none', scrollTrigger: { trigger: '.hero-scene', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.fromTo('.hero-editorial__copy', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.08 });
      gsap.fromTo('.fiber-scene__photo img', { scale: 1.05 }, { scale: 1.16, ease: 'none', scrollTrigger: { trigger: '.fiber-scene', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo('.energy-scene__media img', { scale: 1.07 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.energy-scene', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.editorial-reveal').forEach((element) => {
        gsap.fromTo(element, { y: 28, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 82%', once: true } });
      });
    });

    return () => contexts.revert();
  }, [reduced]);

  return (
    <LenisProvider>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteNav />
      <SignalLine state={signalState} />
      <MotionBridge onState={setSignalState} />
      <main id="main-content" className="experience">
        <HeroScene />
        <CompanyScene />
        <CapabilitiesScene />
        <TelecomScene />
        <RFScene />
        <FiberScene />
        <EnergyScene />
        <DigitalScene />
        <ImpactScene />
        <ProjectsScene />
        <ClientsScene />
        <WhyScene />
        <FinalScene />
      </main>
    </LenisProvider>
  );
}
