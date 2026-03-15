const highlights = [
  { icon: '⚡', stat: '500+', label: 'Chargers Installed' },
  { icon: '🏆', stat: '10+', label: 'Years Experience' },
  { icon: '⭐', stat: '5.0', label: 'Average Rating' },
  { icon: '🌿', stat: '100%', label: 'Clean Energy Focused' },
];

const styles = {
  page: { maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' },
  header: { textAlign: 'center', marginBottom: '4rem' },
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem',
    marginBottom: '4rem',
  },
  statCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    padding: '1.75rem',
    textAlign: 'center',
  },
  statIcon: { fontSize: '2rem', marginBottom: '0.5rem' },
  statNum: { fontSize: '2rem', fontWeight: 800, color: '#22c55e', display: 'block' },
  statLabel: { fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '3rem',
    alignItems: 'start',
  },
  section: { marginBottom: '2.5rem' },
  sectionTitle: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#22c55e' },
  body: { color: '#cbd5e1', lineHeight: 1.8, marginBottom: '1rem' },
  card: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    padding: '2rem',
  },
  cardTitle: { fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' },
  listItem: { display: 'flex', gap: '0.5rem', marginBottom: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' },
  check: { color: '#22c55e', flexShrink: 0 },
};

export default function AboutPage() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <span style={styles.eyebrow}>Our Story</span>
        <h1 style={styles.title}>About Rey's EV Service</h1>
        <p style={styles.subtitle}>
          Dedicated to accelerating the transition to clean electric transportation —
          one charger at a time.
        </p>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        {highlights.map((h) => (
          <div key={h.label} style={styles.statCard}>
            <div style={styles.statIcon}>{h.icon}</div>
            <span style={styles.statNum}>{h.stat}</span>
            <p style={styles.statLabel}>{h.label}</p>
          </div>
        ))}
      </div>

      <div style={styles.twoCol}>
        <div>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Meet Rey</h2>
            <p style={styles.body}>
              Rey is a certified EV charging technician with over a decade of hands-on
              experience in electrical systems and clean-energy infrastructure. After
              seeing the rapid growth of electric vehicles firsthand, Rey founded Rey's
              EV Service to make high-quality EV charging accessible to everyone.
            </p>
            <p style={styles.body}>
              From single-family homes to commercial fleet depots, Rey brings the same
              level of expertise, care, and professionalism to every job.
            </p>
          </div>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Our Mission</h2>
            <p style={styles.body}>
              We believe that the future of transportation is electric. Our mission is
              to remove every barrier standing between people and clean, reliable EV
              charging — through expert installation, honest advice, and ongoing support.
            </p>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Certifications & Experience</h3>
          {[
            'EVITP Certified EV Infrastructure Technician',
            'Licensed Electrical Contractor',
            'Tesla Certified Installer',
            'ChargePoint Certified Partner',
            'OSHA 10 Safety Certified',
            'Residential & Commercial Projects',
            'Solar + EV Integration Specialist',
          ].map((item) => (
            <div key={item} style={styles.listItem}>
              <span style={styles.check}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
