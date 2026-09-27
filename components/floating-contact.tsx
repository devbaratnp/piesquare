import { siteContact } from '@/data/site';

type FloatingContactProps = Readonly<{ phone: string; phoneHref: string }>;

export function FloatingContact({ contact = siteContact }: { contact?: FloatingContactProps }) {
  return (
    <div className="floating-contact" aria-label="Direct contact">
      <a href={contact.phoneHref} aria-label="Call Pie Square Technologies">Call</a>
      <a href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} aria-label="Message Pie Square Technologies on WhatsApp">WhatsApp</a>
    </div>
  );
}
