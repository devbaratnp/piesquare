import Image from 'next/image';
import Link from 'next/link';

type ServiceDetailProps = Readonly<{
  lifecycle: ReadonlyArray<string>;
  scope: ReadonlyArray<string>;
  proof: string;
  relatedHref?: string;
  image?: string;
  imageAlt?: string;
}>;

export function ServiceDetail({ lifecycle, scope, proof, relatedHref = '/projects', image, imageAlt = '' }: ServiceDetailProps) {
  const hasLifecycle = lifecycle.length > 0;
  const hasScope = scope.length > 0;

  return (
    <>
      {(hasLifecycle || hasScope) && (
        <div className="inner-page__grid">
          {hasLifecycle && (
            <section className="inner-page__card" aria-label="Delivery lifecycle">
              <h2>Lifecycle</h2>
              <ol>
                {lifecycle.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          )}
          {hasScope && (
            <section className="inner-page__card" aria-label="Technical scope">
              <h2>Technical scope</h2>
              <ul>
                {scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
      {image && (
        <div className="inner-page__hero-media">
          <Image src={image} alt={imageAlt} fill sizes="100vw" />
        </div>
      )}
      <p className="inner-page__proof">{proof}</p>
      <div className="inner-page__actions">
        <Link className="button button--primary" href="/contact">Discuss a Project ↗</Link>
        <Link className="button button--ghost" href={relatedHref}>View related projects ↗</Link>
      </div>
    </>
  );
}
