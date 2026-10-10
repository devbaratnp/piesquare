'use client';

import { useState } from 'react';
import { contactServices } from '@/data/site';

type ContactFormProps = Readonly<{
  variant?: 'quote' | 'message' | 'survey';
}>;

export function ContactForm({ variant = 'quote' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const isMessage = variant === 'message';
  const isSurvey = variant === 'survey';
  const ariaLabel = isMessage ? 'General message form' : isSurvey ? 'Site survey form' : 'Project inquiry form';

  return (
    <form
      className={`contact-form contact-form--${variant}`}
      aria-label={ariaLabel}
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus('sending');
        setMessage('');
        const formElement = event.currentTarget;
        const form = new FormData(formElement);
        form.set('kind', variant);
        try {
          const response = await fetch('/api/contact', { method: 'POST', body: form });
          const payload = await response.json().catch(() => ({})) as { message?: string };
          if (!response.ok) {
            setStatus('error');
            setMessage(payload.message ?? 'Your message could not be sent.');
            return;
          }
          setStatus('done');
          setMessage(payload.message ?? 'Thanks — your message was sent. We will be in touch soon.');
          formElement.reset();
        } catch {
          setStatus('error');
          setMessage('Network error. Please try again or email us directly.');
        }
      }}
    >
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      <label>Name *<input name="name" autoComplete="name" required /></label>
      {!isMessage && <label>Company<input name="company" autoComplete="organization" /></label>}
      <label>Phone *<input name="phone" type="tel" autoComplete="tel" required /></label>
      <label>Email *<input name="email" type="email" autoComplete="email" required /></label>

      {isMessage && <label className="full">Message *<textarea name="message" rows={5} required /></label>}

      {isSurvey && (
        <>
          <label>Survey Type<select name="surveyType" defaultValue="Telecom Site Survey"><option>Telecom Site Survey</option><option>Fiber Route Survey</option><option>Solar Site Assessment</option><option>IT Infrastructure Audit</option></select></label>
          <label>Location *<input name="location" required /></label>
          <label>Number of Sites<input name="numberOfSites" inputMode="numeric" /></label>
          <label>Preferred Date<input name="preferredDate" type="date" /></label>
          <label>Upload Site Documents<span className="contact-form__hint">Site lists, coordinates, drawings</span><input name="siteDocuments" type="file" multiple /></label>
          <label className="full">Requirements<textarea name="requirements" rows={5} /></label>
        </>
      )}

      {!isMessage && !isSurvey && (
        <>
          <label>Project Type<select name="projectType" defaultValue={contactServices[0]}>{contactServices.slice(0, -1).map((service) => <option key={service}>{service}</option>)}</select></label>
          <label>Required Service<input name="service" placeholder="Service or capability" /></label>
          <label>Project Location<input name="location" placeholder="District / Province" /></label>
          <label>Estimated Project Size<input name="projectSize" placeholder="Sites, km, kW or scope" /></label>
          <label>Expected Start Date<input name="startDate" type="date" /></label>
          <label>Upload Project Documents<span className="contact-form__hint">BOQ, RFQ, drawings, specs, tender docs</span><input name="documents" type="file" multiple /></label>
          <label className="full">Message<textarea name="message" rows={5} required /></label>
        </>
      )}

      <div className="full">
        <button className="button button--primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : isMessage ? 'Send Message' : isSurvey ? 'Request Site Survey' : 'Submit Request'} ↗</button>
      </div>
      <p className="contact-form__note" role={status === 'error' ? 'alert' : status !== 'idle' ? 'status' : undefined}>
        {status === 'idle' ? 'Your message goes to the Pie Square team and appears in the admin inbox.' : message}
      </p>
    </form>
  );
}
