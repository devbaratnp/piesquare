import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CareersList } from './careers-list';

describe('CareersList', () => {
  it('renders role details and expandable backend application forms', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal('fetch', fetchMock);

    render(<CareersList />);

    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByRole('heading', { name: /rf drive test engineer/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /general application/i })).toBeInTheDocument();
    expect(screen.getByText(/conduct rf drive tests and collect network performance data/i)).toBeInTheDocument();

    const applyButtons = screen.getAllByRole('button', { name: /apply now/i });
    expect(applyButtons).toHaveLength(3);
    fireEvent.click(applyButtons[0]);

    const roleForm = screen.getByLabelText(/apply for rf drive test engineer/i) as HTMLFormElement;
    expect(within(roleForm).getByLabelText(/desired position/i)).toBeInTheDocument();
    expect(within(roleForm).getByLabelText(/cv \(pdf/i)).toBeInTheDocument();

    fireEvent.change(within(roleForm).getByLabelText(/^name/i), { target: { value: 'Test User' } });
    fireEvent.change(within(roleForm).getByLabelText(/phone/i), { target: { value: '+9779800000000' } });
    fireEvent.change(within(roleForm).getByLabelText(/^email/i), { target: { value: 'test@example.com' } });
    const file = new File(['cv'], 'cv.pdf', { type: 'application/pdf' });
    fireEvent.change(within(roleForm).getByLabelText(/cv \(pdf/i), { target: { files: [file] } });
    fireEvent.submit(roleForm);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/applications', expect.objectContaining({ method: 'POST' })));
    vi.unstubAllGlobals();
  });
});
