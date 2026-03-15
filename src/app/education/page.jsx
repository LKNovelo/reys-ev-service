const articles = [
  {
    icon: '🔌',
    title: 'Understanding EV Charging Levels',
    summary:
      'Not all chargers are equal. Learn the difference between Level 1, Level 2, and DC Fast Charging — and which is right for your lifestyle.',
    points: [
      'Level 1 (120V): ~4-5 miles of range per hour. Standard household outlet.',
      'Level 2 (240V): ~25-30 miles of range per hour. Ideal for home and workplace.',
      'DC Fast Charging: ~100-200+ miles in 20-30 min. For public/commercial use.',
    ],
  },
  {
    icon: '🌿',
    title: 'Benefits of Driving Electric',
    summary:
      'EVs offer more than just zero tailpipe emissions. Discover the financial, performance, and environmental advantages.',
    points: [
      'Lower fuel costs — electricity is cheaper than gasoline per mile.',
      'Reduced maintenance: no oil changes, fewer brake jobs (regenerative braking).',
      'Smoother, quieter ride with instant torque delivery.',
      'Eligible for federal and state tax credits up to $7,500.',
    ],
  },
  {
    icon: '🏠',
    title: 'Home Charging Setup Guide',
    summary:
      'Setting up home charging is easier than you think. Here\u2019s what you need to know before scheduling an installation.',
    points: [
      'Assess your electrical panel — most homes need a 240V/50A circuit.',
      'Choose a UL-listed Level 2 EVSE from a reputable brand.',
      'Decide on indoor (garage) vs. outdoor weatherproof installation.',
      'Consider a smart charger to schedule charging during off-peak hours.',
    ],
  },
  {
    icon: '🔋',
    title: 'EV Battery Maintenance Tips',
    summary:
      'Your battery is your biggest asset. Follow these best practices to maximize its lifespan and efficiency.',
    points: [
      'Keep daily charge level between 20% and 80% for regular use.',
      'Avoid frequent DC fast charging — it generates more heat.',
      'Park in shaded or temperature-controlled areas when possible.',
      'Use scheduled charging to take advantage of cooler overnight temperatures.',
    ],
  },
];

const styles = {
  page: { maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' },
  header: { textAlign: 'center', marginBottom: '3.5rem' },
  eyebrow: {
    display: 'inline-block',
    color: '#22c55e',
    fontWeight: 600,
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '0.75rem',
  },
  title: { fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' },
  subtitle: { color: '#94a3b8', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.75rem',
  },
  card: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    padding: '2rem',
  },
  cardIcon: { fontSize: '2.25rem', marginBottom: '1rem' },
  cardTitle: { fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' },
  cardSummary: { color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' },
  pointList: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  point: { display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.5 },
  bullet: { color: '#22c55e', flexShrink: 0, fontWeight: 700 },
};

export default function EducationPage() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <span style={styles.eyebrow}>Learn More</span>
        <h1 style={styles.title}>EV Education Center</h1>
        <p style={styles.subtitle}>
          Everything you need to know about electric vehicles and charging —
          straight from the experts.
        </p>
      </div>
      <div style={styles.grid}>
        {articles.map((a) => (
          <article key={a.title} style={styles.card}>
            <div style={styles.cardIcon}>{a.icon}</div>
            <h2 style={styles.cardTitle}>{a.title}</h2>
            <p style={styles.cardSummary}>{a.summary}</p>
            <ul style={styles.pointList}>
              {a.points.map((p) => (
                <li key={p} style={styles.point}>
                  <span style={styles.bullet}>•</span>
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
