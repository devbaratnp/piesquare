import { impactStats } from '@/data/site';
import styles from './home-atlas.module.css';

export function ProvenMetrics() {
  return (
    <div className={styles.impact}>
      <div className={`page-wrap ${styles.sectionPad}`}>
        <p className={styles.kicker}>PROVEN DELIVERY</p>
        <h2 className={styles.displayTitle}>VERIFIED FIELD <em>METRICS.</em></h2>
        <div className={styles.metricGrid}>
          {impactStats.map(([value, label, detail]) => (
            <article className={`${styles.metric} impact-stat atlas-reveal`} key={label}>
              <strong>{value}</strong><span>{label}</span><small>{detail}</small>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
