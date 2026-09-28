import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Page from './page';

describe('careers page', () => {
  it('keeps the page focused on the CV application action', async () => {
    render(await Page());

    expect(document.querySelector('.inner-page__actions')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send your cv/i })).toBeInTheDocument();
  });
});
