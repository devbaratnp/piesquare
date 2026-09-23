import { careerRoles, generalCareerApplication, siteContact } from '@/data/site';

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
            {role.responsibilities.length > 0 && (
              <div className="career-role__responsibilities">
                <h4>Key responsibilities</h4>
                <ul>
                  {role.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
                </ul>
              </div>
            )}
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
      <section className="career-general-application" aria-label="General application">
        <p className="inner-page__eyebrow">GENERAL APPLICATION</p>
        <h2>{generalCareerApplication.title}</h2>
        <p>{generalCareerApplication.description}</p>
        <form action={`mailto:${siteContact.email}`} method="get" encType="text/plain" aria-label="General career application">
          <label>Name<input name="name" required /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>Desired position<input name="desiredPosition" required /></label>
          <label>CV<input name="cv" type="file" /></label>
          <button className="button button--primary" type="submit">Send Your CV ↗</button>
        </form>
      </section>
    </section>
  );
}
