'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/components/motion/reduced-motion';

export interface ImageCard {
  id: string;
  src: string;
  alt: string;
  rotation: number;
}

interface ImageCarouselHeroProps {
  title: React.ReactNode;
  subtitle: string;
  description: string;
  ctaText: string;
  onCtaClick?: () => void;
  images: ReadonlyArray<ImageCard>;
  features?: Array<{ title: string; description: string }>;
}

export function ImageCarouselHero({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  images,
  features = [],
}: ImageCarouselHeroProps) {
  const reduced = useReducedMotion();
  const [rotation, setRotation] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (reduced || images.length < 2) return;
    const interval = window.setInterval(() => setRotation((value) => (value + 0.35) % 360), 50);
    return () => window.clearInterval(interval);
  }, [images.length, reduced]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div
      className={`logo-carousel ${isHovering ? 'is-hovering' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      }}
    >
      <div className="logo-carousel__content">
        <p className="eyebrow eyebrow--dark">{subtitle}</p>
        <h2 className="display-title">{title}</h2>
        <p className="logo-carousel__description">{description}</p>
        <button className="button button--dark logo-carousel__cta" type="button" onClick={onCtaClick}>
          {ctaText}
          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
        </button>
      </div>

      <div className="logo-carousel__stage" aria-label="Selected company and network logos">
        <div className="logo-carousel__orbit" aria-hidden="true" />
        <div className="logo-carousel__core">
          <span>PIE / SQUARE</span>
          <b>FIELD NETWORK</b>
          <i />
        </div>
        {images.map((image, index) => {
          const angle = (rotation + (index * 360) / images.length) * (Math.PI / 180);
          const radiusX = compact ? 110 : 175;
          const radiusY = compact ? 82 : 112;
          const x = Number((Math.cos(angle) * radiusX).toFixed(3));
          const y = Number((Math.sin(angle) * radiusY).toFixed(3));
          const perspectiveX = (mousePosition.x - 0.5) * 12;
          const perspectiveY = (mousePosition.y - 0.5) * -12;

          return (
            <figure
              className="logo-carousel__card"
              key={image.id}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0) rotateX(${perspectiveY}deg) rotateY(${perspectiveX}deg) rotateZ(${image.rotation}deg)`,
                zIndex: Math.round(100 + y),
              }}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 38vw, 180px" />
              <figcaption>{image.alt}</figcaption>
            </figure>
          );
        })}
        <span className="logo-carousel__signal" aria-hidden="true" />
      </div>

      {features.length > 0 && (
        <div className="logo-carousel__features">
          {features.map((feature) => (
            <div className="logo-carousel__feature" key={feature.title}>
              <strong>{feature.title}</strong>
              <span>{feature.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
