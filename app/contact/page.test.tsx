import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Page from './page';

afterEach(() => cleanup());

describe('contact page', () => {
  it('organizes direct contact, quote, and site-survey paths', () => {
    render(<Page />);

    expect(screen.getByRole('heading', { level: 1, name: /talk to our engineering team/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /head office/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /send us a message/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /let's build your next project/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /need a site survey/i })).toBeInTheDocument();
    expect(screen.getByText(/sunday – friday, 9:00 – 18:00/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute('href', expect.stringContaining('wa.me'));
  });
});
