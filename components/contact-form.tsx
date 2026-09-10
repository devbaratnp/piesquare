'use client';

import { useState } from 'react';
import { contactServices } from '@/data/site';

export function ContactForm() {
  const [attempted, setAttempted] = useState(false);

  return (
    <form
      className="contact-form"
      aria-label="Project inquiry form"
      onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
      }}
    >
      <label>Name<input name="name" autoComplete="name" required /></label>
      <label>Company<input name="company" autoComplete="organization" /></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Service Required
        <select name="service" defaultValue={contactServices[0]}>
          {contactServices.map((service) => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
      </label>
      <label>Project Location<input name="location" placeholder="District / Province" /></label>
      <label className="full">Message<textarea name="message" rows={5} required /></label>
      <div className="full">
        <button className="button button--primary" type="submit">Send inquiry ↗</button>
      </div>
      <p className="contact-form__note" role={attempted ? 'status' : undefined}>
        {attempted
          ? 'This form is not connected, so nothing was sent. Please use the direct email or phone links above.'
          : 'No backend submission is connected yet. Your direct email and phone options are listed above.'}
      </p>
    </form>
  );
}
