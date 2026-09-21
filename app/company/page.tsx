import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { companyApproach, companyValuesDetailed, industryDetails, teamDepartments } from '@/data/site';

export const metadata: Metadata = {
  title: 'About Us | Pie Square Technologies',
  description: 'The field force behind critical infrastructure in Nepal.',
  alternates: { canonical: '/company' },
};

const provinces = ['Koshi Province', 'Madhesh Province', 'Bagmati Province', 'Gandaki Province', 'Lumbini Province', 'Karnali Province', 'Sudurpashchim Province'];

export default function CompanyPage() {
  return (
    <InnerPage
      eyebrow="About Us"
      title="The Field Force Behind Critical Infrastructure."
      lede="Pie Square Technologies is an integrated infrastructure and technology solutions company based in Nepal."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/company' }]}
      image="/media/cinematic/C01-company-infrastructure-landscape.png"
      imageAlt="Infrastructure landscape supporting telecom networks across Nepal"
    >
      <section className="about-intro" aria-label="Who we are">
        <p className="inner-page__eyebrow">WHO WE ARE</p>
        <h2>An Engineering Company Built for the Field.</h2>
        <div className="about-intro__copy">
          <p>Our strength lies in bringing multi-disciplinary expertise in Telecom, Fiber Optics, Solar Energy, and IT Infrastructure under one roof, with responsible execution, and EHS compliance enabling clients to manage diverse infrastructure requirements through a single, dependable partner.</p>
          <p>From field-level execution to project coordination and management, our teams work with a practical, solution-oriented approach to meet demanding project requirements. We continuously focus on operational efficiency, technical accuracy, adaptability, and long-term client relationships, helping build infrastructure that is reliable, scalable, and ready for the future.</p>
        </div>
      </section>

      <div className="inner-page__grid about-vision-grid">
        <section className="inner-page__card" aria-label="Our Vision">
          <p className="inner-page__eyebrow">OUR VISION</p>
          <h2>Building the infrastructure that connects, powers and enables Nepal.</h2>
          <p>To create reliable infrastructure that strengthens connectivity, supports sustainable energy, and enables communities and businesses to move forward through technology.</p>
        </section>
        <section className="inner-page__card" aria-label="Our Mission">
          <p className="inner-page__eyebrow">OUR MISSION</p>
          <h2>Integrated solutions. Reliable delivery.</h2>
          <p>To deliver integrated infrastructure and technology solutions with quality, safety and accountability, combining engineering expertise, field execution and dependable project delivery across Nepal.</p>
        </section>
      </div>

      <section className="about-values" aria-label="Our values">
        <p className="inner-page__eyebrow">WHAT GUIDES US</p>
        <h2>Our Values</h2>
        <div className="about-values__grid">
          {companyValuesDetailed.map((value) => (
            <article key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-approach" aria-label="Our approach">
        <p className="inner-page__eyebrow">OUR APPROACH</p>
        <h2>Methodical Engineering. Disciplined Execution.</h2>
        <p>Every project follows the same backbone: rigorous survey, engineered planning, safety-controlled installation, certified testing and structured handover. We document as we build — so operators and procurement teams receive evidence, not promises.</p>
        <ul>
          {companyApproach.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="about-team" aria-label="Management and technical workforce">
        <p className="inner-page__eyebrow">OUR TEAM</p>
        <h2>Management &amp; Technical Workforce</h2>
        <p className="about-team__note">Named team profiles will be added once approved personnel records are provided.</p>
          <div className="workforce-list">
            {teamDepartments.map((department) => <span key={department.title}><strong>{department.title}</strong>{department.copy}</span>)}
        </div>
      </section>

      <section className="about-coverage" aria-label="Geographic coverage">
        <p className="inner-page__eyebrow">GEOGRAPHIC COVERAGE</p>
        <h2>Operating Across Nepal</h2>
        <p>Field teams deployable across all seven provinces — coverage locations grow with the project footprint.</p>
        <span className="about-coverage__coordinates">27.7172° N / 85.3240° E — HQ KATHMANDU</span>
        <div className="province-list">
          {provinces.map((province) => <span key={province}>{province}</span>)}
        </div>
      </section>

      <section className="inner-page__card about-industries" aria-label="Industries we support">
        <p className="inner-page__eyebrow">INDUSTRIES</p>
        <h2>Industries We Support</h2>
        <div className="industry-detail-list">
          {industryDetails.map((industry) => <article key={industry.title}><h3>{industry.title}</h3><p>{industry.copy}</p></article>)}
        </div>
      </section>
    </InnerPage>
  );
}
