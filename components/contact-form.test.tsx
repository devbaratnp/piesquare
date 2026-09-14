import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ContactForm } from './contact-form';

afterEach(cleanup);

describe('ContactForm', () => {
  it('renders all required inquiry fields', () => {
    render(<ContactForm />);

    for (const label of ['Name', 'Company', 'Phone', 'Email', 'Project Type', 'Required Service', 'Project Location', 'Estimated Project Size', 'Expected Start Date', 'Project Documents', 'Message']) {
      expect(screen.getByLabelText(new RegExp(label, 'i'))).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: /submit request/i })).toBeInTheDocument();
    expect(screen.getByText(/no backend submission is connected/i)).toBeInTheDocument();
  });

  it('does not claim an inquiry was sent', () => {
    render(<ContactForm />);

    fireEvent.submit(screen.getByRole('form', { name: /project inquiry/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/nothing was sent/i);
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
  });
});
