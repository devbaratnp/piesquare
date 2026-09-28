import { Phone } from 'lucide-react';

type ContactIconProps = Readonly<{ className?: string }>;

export function PhoneIcon({ className }: ContactIconProps) {
  return <Phone className={className} data-testid="phone-icon" aria-hidden="true" focusable="false" strokeWidth={1.8} />;
}

export function WhatsAppIcon({ className }: ContactIconProps) {
  return (
    <svg className={className} data-testid="whatsapp-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M20.52 3.48A11.83 11.83 0 0 0 12.08 0C5.54 0 .22 5.32.22 11.86c0 2.09.54 4.12 1.57 5.91L.12 24l6.38-1.67a11.84 11.84 0 0 0 5.58 1.42h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.22-6.15-3.43-8.41Zm-8.44 18.2h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.79.99 1.01-3.7-.23-.38a9.84 9.84 0 0 1-1.5-5.15C2.18 6.43 6.61 2 12.08 2a9.82 9.82 0 0 1 7 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.47-4.44 9.9-9.89 9.9Z" />
      <path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}
