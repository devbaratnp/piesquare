'use client';

import { useState } from 'react';
import { contactServices } from '@/data/site';

type ContactFormProps = Readonly<{
  variant?: 'quote' | 'message' | 'survey';
}>;

export function ContactForm({ variant = 'quote' }: ContactFormProps) {
  const [attempted, setAttempted] = useState(false);
  const isMessage = variant === 'message';
  const isSurvey = variant === 'survey';
  const ariaLabel = isMessage ? 'General message form' : isSurvey ? 'Site survey form' : 'Project inquiry form';

  return (
    <form
      className={`contact-form contact-form--${variant}`}
      aria-label={ariaLabel}
      onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
      }}
    >
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
        <button className="button button--primary" type="submit">{isMessage ? 'Send Message' : isSurvey ? 'Request Site Survey' : 'Submit Request'} ↗</button>
      </div>
      <p className="contact-form__note" role={attempted ? 'status' : undefined}>
        {attempted
          ? 'This form is not connected, so nothing was sent. Please use the direct email or phone links above.'
          : 'No backend submission is connected yet. Your direct email and phone options are listed above.'}
      </p>
    </form>
  );
}
