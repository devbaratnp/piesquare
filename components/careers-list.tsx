import { siteContact, careerRoles } from '@/data/site';

export function CareersList() {
  return (
    <section className="careers-list" aria-label="Open roles">
      <div className="careers-list__intro">
        <p className="inner-page__eyebrow">OPEN ROLES / NEPAL</p>
        <h2>Find your place in the field.</h2>
      </div>
      <div className="careers-list__grid">
        {careerRoles.map((role) => (
          <article className="career-role" key={role.id}>
            <div className="career-role__meta">
              <span>{role.type}</span>
              <span>{role.location}</span>
              <span>{role.discipline}</span>
            </div>
            <h3>{role.title}</h3>
            <p>{role.description}</p>
            <ul>
              {role.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
            </ul>
            <a
              className="button button--primary career-role__apply"
              href={`mailto:${siteContact.email}?subject=${encodeURIComponent(role.applicationSubject)}`}
            >
              Apply Now
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
