import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { companyIntro, siteContact } from '@/data/site';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('uses the shared About copy and exposes icon-led phone and WhatsApp actions', () => {
    render(<SiteFooter contact={siteContact} />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(companyIntro);
    expect(screen.getByText('Pie Square Technologies Private Limited')).toBeInTheDocument();
    expect(screen.getByText('Integrated infrastructure & technology solutions')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /company profile/i })).toHaveAttribute('href', '/resources/pie-square-company-profile-2026.pdf');
    expect(screen.getByRole('link', { name: /call pie square technologies/i })).toHaveAttribute('href', siteContact.phoneHref);
    expect(screen.getByRole('link', { name: /message pie square technologies on whatsapp/i })).toHaveAttribute('href', 'https://wa.me/9779715000715');
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument();
  });
});
