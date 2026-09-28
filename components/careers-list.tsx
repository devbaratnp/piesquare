'use client';

import { useState } from 'react';
import { careerRoles, generalCareerApplication, siteContact } from '@/data/site';

function ApplicationForm({ roleId, desiredDefault, email, id }: { roleId: string; desiredDefault: string; email: string; id: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');
    const form = new FormData(event.currentTarget);
    form.set('roleId', roleId);
    if (!String(form.get('desiredPosition') ?? '').trim()) form.set('desiredPosition', desiredDefault);
    try {
      const response = await fetch('/api/applications', { method: 'POST', body: form });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setStatus('error');
        setMessage(payload.message ?? 'Application could not be sent.');
        return;
      }
      setStatus('done');
      setMessage('Application received. We will contact you if your profile matches.');
      event.currentTarget.reset();
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again or email us directly.');
    }
  }

  return (
    <form className="career-apply-form" aria-label={`Apply for ${desiredDefault}`} onSubmit={onSubmit}>
      <label>Name<input name="name" autoComplete="name" required /></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Desired position<input name="desiredPosition" defaultValue={desiredDefault} required /></label>
      <label>Message<textarea name="message" rows={3} placeholder="Brief intro, availability, location" /></label>
      <label>CV (PDF/DOC/DOCX, max 5 MB)<input name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required /></label>
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      <div className="career-apply-form__actions">
        <button className="button button--primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : `Apply for ${desiredDefault} ↗`}
        </button>
        <a className="career-apply-form__fallback" href={`mailto:${email}?subject=${encodeURIComponent(`Application: ${desiredDefault} - Pie Square Technologies`)}`}>
          or email directly
        </a>
      </div>
      {message && (
        <p className="contact-form__note" role="status" id={`${id}-status`}>
          {message}
        </p>
      )}
    </form>
  );
}

export function CareersList({ email = siteContact.email }: { email?: string } = {}) {
  const [openRole, setOpenRole] = useState<string | null>(null);

  return (
    <section className="careers-list" aria-label="Open roles">
      <div className="careers-list__intro">
        <p className="inner-page__eyebrow">OPEN ROLES / NEPAL</p>
        <h2>Find your place in the field.</h2>
      </div>
      <div className="careers-list__grid">
        {careerRoles.map((role) => {
          const open = openRole === role.id;
          return (
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
              <button
                className="button button--primary career-role__apply"
                type="button"
                aria-expanded={open}
                aria-controls={`apply-${role.id}`}
                onClick={() => setOpenRole(open ? null : role.id)}
              >
                {open ? 'Close application' : 'Apply Now'}
              </button>
              {open && (
                <div id={`apply-${role.id}`}>
                  <ApplicationForm roleId={role.id} desiredDefault={role.title} email={email} id={`apply-${role.id}`} />
                </div>
              )}
            </article>
          );
        })}
      </div>
      <section className="career-general-application" aria-label="General application">
        <p className="inner-page__eyebrow">GENERAL APPLICATION</p>
        <h2>{generalCareerApplication.title}</h2>
        <p>{generalCareerApplication.description}</p>
        <ApplicationForm roleId="general" desiredDefault="" email={email} id="general-application" />
      </section>
    </section>
  );
}
