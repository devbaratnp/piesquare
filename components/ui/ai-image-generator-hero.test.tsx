import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ImageCarouselHero } from './ai-image-generator-hero';

describe('ImageCarouselHero', () => {
  it('renders supplied logo cards, company copy, and a usable CTA', () => {
    render(
      <ImageCarouselHero
        title="The company"
        subtitle="Connected field network"
        description="Infrastructure that keeps Nepal moving."
        ctaText="Explore our network"
        images={[
          { id: 'ntc', src: '/media/logos/nepal-telecom.jpg', alt: 'Nepal Telecom', rotation: -8 },
          { id: 'ncell', src: '/media/logos/ncell.png', alt: 'Ncell', rotation: 6 },
          { id: 'cgnet', src: '/media/logos/cg-net.png', alt: 'CG Net', rotation: 12 },
        ]}
      />,
    );

    expect(screen.getByRole('heading', { name: 'The company' })).toBeInTheDocument();
    expect(screen.getByText('Connected field network')).toBeInTheDocument();
    expect(screen.getByAltText('Nepal Telecom')).toBeInTheDocument();
    expect(screen.getByAltText('Ncell')).toBeInTheDocument();
    expect(screen.getByAltText('CG Net')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Explore our network' })).toBeInTheDocument();
  });
});
