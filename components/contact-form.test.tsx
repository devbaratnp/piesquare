import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from './contact-form';

afterEach(cleanup);

describe('ContactForm', () => {
  it('renders all required inquiry fields', () => {
    render(<ContactForm />);

    for (const label of ['Name', 'Company', 'Phone', 'Email', 'Project Type', 'Required Service', 'Project Location', 'Estimated Project Size', 'Expected Start Date', 'Project Documents', 'Message']) {
      expect(screen.getByLabelText(new RegExp(label, 'i'))).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: /submit request/i })).toBeInTheDocument();
    expect(screen.getByText(/appears in the admin inbox/i)).toBeInTheDocument();
  });

  it('submits an inquiry to the contact endpoint', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Thanks — your message was sent.' }),
    } as Response);
    render(<ContactForm />);

    fireEvent.submit(screen.getByRole('form', { name: /project inquiry/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' })));
    expect(screen.getByRole('status')).toHaveTextContent(/your message was sent/i);
    fetchMock.mockRestore();
  });

  it('requires phone details on general messages', () => {
    render(<ContactForm variant="message" />);

    expect(screen.getByLabelText(/^phone/i)).toBeRequired();
    expect(screen.getByLabelText(/^email/i)).toBeRequired();
  });
});
