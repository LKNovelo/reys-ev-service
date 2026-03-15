import CTAButton from '@/components/CTAButton';

const features = [
  {
    icon: '🔌',
    title: 'EV Charger Installation',
    description:
      'Level 1, Level 2, and DC fast charging solutions for homes and businesses, installed safely and up to code.',
  },
  {
    icon: '🔧',
    title: 'Maintenance & Diagnostics',
    description:
      'Keep your EV charging equipment running at peak performance with expert maintenance and diagnostics.',
  },
  {
    icon: '📚',
    title: 'EV Education',
    description:
      'Learn everything you need to know about EVs — from charging basics to maximizing battery life.',
  },
];

const styles = {
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '6rem 1.5rem',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    borderBottom: '1px solid #334155',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(34,197,94,0.15)',
    color: '#22c55e',
    border: '1px solid rgba(34,197,94,0.3)',
    borderRadius: '9999px',
    padding: '0.25rem 0.875rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '1.5rem',
  },
  heading: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: '1.25rem',
    maxWidth: '700px',
  },
  accent: { color: '#22c55e' },
  subheading: {
    fontSize: '1.125rem',
    color: '#94a3b8',
    maxWidth: '520px',
    marginBottom: '2.5rem',
    lineHeight: 1.7,
  },
  features: {
    padding: '5rem 1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '0.75rem',
  },
  sectionSub: {
    textAlign: 'center',
    color: '#94a3b8',
    marginBottom: '3rem',
    fontSize: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    padding: '2rem',
    transition: 'border-color 0.2s',
  },
  cardIcon: { fontSize: '2.5rem', marginBottom: '1rem' },
  cardTitle: { fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' },
  cardDesc: { color: '#94a3b8', lineHeight: 1.7 },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section style={styles.hero}>
        <span style={styles.badge}>⚡ Clean Energy Experts</span>
        <h1 style={styles.heading}>
          Power Your Drive with{' '}
          <span style={styles.accent}>Rey's EV Service</span>
        </h1>
        <p style={styles.subheading}>
          Professional EV charger installation, maintenance, and diagnostics
          for homeowners and businesses — done right, done safe.
        </p>
        <CTAButton href="/services">Explore Our Services</CTAButton>
      </section>

      {/* Features */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>What We Offer</h2>
        <p style={styles.sectionSub}>
          Comprehensive EV services from installation to education.
        </p>
        <div style={styles.grid}>
          {features.map((f) => (
            <div key={f.title} style={styles.card}>
              <div style={styles.cardIcon}>{f.icon}</div>
              <h3 style={styles.cardTitle}>{f.title}</h3>
              <p style={styles.cardDesc}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
