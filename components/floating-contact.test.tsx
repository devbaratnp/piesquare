import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FloatingContact } from './floating-contact';

describe('FloatingContact', () => {
  it('uses the supplied circular WhatsApp and phone artwork', () => {
    render(<FloatingContact />);

    expect(screen.getByRole('link', { name: /message pie square technologies on whatsapp/i })).toHaveAttribute('href', 'https://wa.me/9779715000715');
    expect(screen.getByRole('link', { name: /call pie square technologies/i })).toHaveAttribute('href', 'tel:+9779715000715');
    expect(screen.getByAltText('WhatsApp')).toHaveAttribute('src', expect.stringContaining('contact-whatsapp-button'));
    expect(screen.getByAltText('Phone')).toHaveAttribute('src', expect.stringContaining('contact-phone-button'));
  });
});
