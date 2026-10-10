import { InnerPage } from '@/components/inner-page';
import { companyAboutIntro, companyApproach, companyApproachIntro, companyMissionCopy, companyMissionTitle, companyTeamIntro, companyValuesDetailed, companyVisionCopy, companyVisionTitle, industryDetails, teamDepartments } from '@/data/site';
import { getPublicContent } from '@/server/content';
import { buildPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata({
  title: 'About Us | Pie Square Technologies',
  description: 'The field force behind critical infrastructure in Nepal.',
  path: '/company',
});

const provinces = ['Koshi Province', 'Madhesh Province', 'Bagmati Province', 'Gandaki Province', 'Lumbini Province', 'Karnali Province', 'Sudurpashchim Province'];

export default async function CompanyPage() {
  const content = await getPublicContent();
  return (
    <InnerPage
      eyebrow="About Us"
      title={<>The Field Force Behind <em>Critical Infrastructure.</em></>}
      lede="Pie Square Technologies is an integrated infrastructure and technology solutions company based in Nepal."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/company' }]}
      image="/media/cinematic/C01-company-infrastructure-landscape.png"
      imageAlt="Infrastructure landscape supporting telecom networks across Nepal"
      variant="company"
      hideActions
      contact={content.contact}
    >
      <section className="about-intro" aria-label="Who we are">
        <p className="inner-page__eyebrow">WHO WE ARE</p>
        <h2>{content.about.title}</h2>
        <div className="about-intro__copy">
          <p>{content.about.intro || companyAboutIntro}</p>
        </div>
      </section>

      <div className="inner-page__grid about-vision-grid">
        <section className="inner-page__card" aria-label="Our Vision">
          <p className="inner-page__eyebrow">OUR VISION</p>
          <h2>{content.about.vision || companyVisionTitle}</h2>
          <p>{companyVisionCopy}</p>
        </section>
        <section className="inner-page__card" aria-label="Our Mission">
          <p className="inner-page__eyebrow">OUR MISSION</p>
          <h2>{companyMissionTitle}</h2>
          <p>{content.about.mission || companyMissionCopy}</p>
        </section>
      </div>

      <section className="about-values" aria-label="Our values">
        <p className="inner-page__eyebrow">WHAT GUIDES US</p>
        <h2>Our <em>Values</em></h2>
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
        <h2>Engineered with Precision. <em>Delivered with Discipline.</em></h2>
        <p>{companyApproachIntro}</p>
        <ul>
          {companyApproach.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.copy}</span></li>)}
        </ul>
      </section>

      <section className="about-team" aria-label="Technical workforce">
        <p className="inner-page__eyebrow">OUR TEAM</p>
        <h2>Multidisciplinary Expertise. <em>Experienced Delivery Team.</em></h2>
        <p className="about-team__intro">{companyTeamIntro}</p>
        <div className="workforce-list">
          {teamDepartments.map((department) => (
            <span key={department.title}>
              <strong>{department.title}</strong>
              {department.copy}
            </span>
          ))}
        </div>
      </section>

      <section className="inner-page__card about-industries" aria-label="Industries we support">
        <p className="inner-page__eyebrow">INDUSTRIES WE SUPPORT</p>
        <h2>Industries <em>We Support</em></h2>
        <div className="industry-detail-list">
          {industryDetails.map((industry) => <article key={industry.title}><h3>{industry.title}</h3><p>{industry.copy}</p></article>)}
        </div>
      </section>

      <section className="about-coverage" aria-label="Geographic coverage">
        <p className="inner-page__eyebrow">GEOGRAPHIC COVERAGE</p>
        <h2>Operating Across <em>Nepal</em></h2>
        <p>Field teams deployable across all seven provinces — coverage locations grow with the project footprint.</p>
        <span className="about-coverage__coordinates">27.7172° N / 85.3240° E — HQ KATHMANDU</span>
        <div className="province-list">
          {provinces.map((province) => <span key={province}>{province}</span>)}
        </div>
      </section>
    </InnerPage>
  );
}
