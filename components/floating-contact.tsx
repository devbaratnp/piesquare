import Image from 'next/image';
import { siteContact } from '@/data/site';

type FloatingContactProps = Readonly<{ phone: string; phoneHref: string }>;

export function FloatingContact({ contact = siteContact }: { contact?: FloatingContactProps }) {
  return (
    <div className="floating-contact" aria-label="Direct contact">
      <a href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} aria-label="Message Pie Square Technologies on WhatsApp">
        <Image className="floating-contact__image" src="/media/contact-whatsapp-button.png" alt="WhatsApp" width={128} height={128} />
      </a>
      <a href={contact.phoneHref} aria-label="Call Pie Square Technologies">
        <Image className="floating-contact__image" src="/media/contact-phone-button.png" alt="Phone" width={128} height={128} />
      </a>
    </div>
  );
}
