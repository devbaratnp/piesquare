import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { footerIntro, siteContact } from '@/data/site';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('uses the concise footer copy and exposes icon-led phone and WhatsApp actions', () => {
    render(<SiteFooter contact={siteContact} />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(footerIntro);
    expect(screen.getByText('Pie Square Technologies Private Limited')).toBeInTheDocument();
    expect(screen.queryByText('Integrated infrastructure & technology solutions')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'SERVICES' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'COMPANY' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'RESOURCES' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'CONTACT' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /company profile/i })).toHaveAttribute('href', '/resources/pie-square-company-profile-2026.pdf');
    expect(screen.getByRole('link', { name: /call pie square technologies/i })).toHaveAttribute('href', siteContact.phoneHref);
    expect(screen.getByRole('link', { name: /message pie square technologies on whatsapp/i })).toHaveAttribute('href', 'https://wa.me/9779715000715');
    expect(screen.getByRole('link', { name: /powered by jigri tools/i })).toHaveAttribute('href', 'https://jigritools.com/');
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument();
  });
});
