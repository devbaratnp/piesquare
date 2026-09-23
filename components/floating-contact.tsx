import { siteContact } from '@/data/site';

export function FloatingContact() {
  return (
    <div className="floating-contact" aria-label="Direct contact">
      <a href={siteContact.phoneHref} aria-label="Call Pie Square Technologies">Call</a>
      <a href={`https://wa.me/${siteContact.phone.replace(/\D/g, '')}`} aria-label="Message Pie Square Technologies on WhatsApp">WhatsApp</a>
    </div>
  );
}
