const services = [
  {
    icon: '🔌',
    title: 'EV Charger Installation',
    description:
      'We install all levels of EV charging equipment for residential and commercial properties.',
    items: ['Level 1 (120V) Outlets', 'Level 2 (240V) EVSE', 'DC Fast Charging (DCFC)'],
  },
  {
    icon: '🔧',
    title: 'EV Maintenance & Diagnostics',
    description:
      'Keep your charging equipment and EV systems running efficiently with expert service.',
    items: ['Charging Station Inspection', 'Fault Diagnosis & Repair', 'Firmware Updates'],
  },
  {
    icon: '🔋',
    title: 'Battery Health Assessment',
    description:
      'Understand the true state of your EV battery with a thorough health assessment.',
    items: ['State of Health (SoH) Report', 'Capacity Testing', 'Degradation Analysis'],
  },
  {
    icon: '🏠',
    title: 'Smart Home Integration',
    description:
      'Integrate your EV charger with your smart home ecosystem for scheduling and energy management.',
    items: ['Smart Panel Integration', 'Solar + EV Pairing', 'Load Management Setup'],
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    padding: '2rem',
  },
  cardIcon: { fontSize: '2.25rem', marginBottom: '1rem' },
  cardTitle: { fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' },
  cardDesc: { color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' },
  itemList: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  item: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' },
  dot: { color: '#22c55e', fontWeight: 700 },
};

export default function ServicesPage() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <span style={styles.eyebrow}>What We Do</span>
        <h1 style={styles.title}>Our Services</h1>
        <p style={styles.subtitle}>
          From installation to maintenance, we provide end-to-end EV charging solutions
          tailored to your needs.
        </p>
      </div>
      <div style={styles.grid}>
        {services.map((s) => (
          <div key={s.title} style={styles.card}>
            <div style={styles.cardIcon}>{s.icon}</div>
            <h2 style={styles.cardTitle}>{s.title}</h2>
            <p style={styles.cardDesc}>{s.description}</p>
            <ul style={styles.itemList}>
              {s.items.map((item) => (
                <li key={item} style={styles.item}>
                  <span style={styles.dot}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
