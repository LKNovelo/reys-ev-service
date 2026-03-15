const projects = [
  {
    id: 1,
    title: 'Residential Level 2 Installation',
    location: 'San Diego, CA',
    description:
      'Installed a 48A Level 2 smart charger in a single-car garage with a dedicated 240V circuit and panel upgrade.',
    tags: ['Level 2', 'Residential', 'Panel Upgrade'],
  },
  {
    id: 2,
    title: 'Commercial Fleet Charging Depot',
    location: 'Chula Vista, CA',
    description:
      'Deployed 12 Level 2 charging stations for a local delivery fleet, including load management software setup.',
    tags: ['Fleet', 'Commercial', 'Level 2', 'Load Management'],
  },
  {
    id: 3,
    title: 'Multi-Family Solar + EV Integration',
    location: 'National City, CA',
    description:
      'Integrated EV charging with an existing solar array in a 24-unit apartment complex, enabling smart scheduling.',
    tags: ['Solar', 'Multi-Family', 'Smart Charging'],
  },
  {
    id: 4,
    title: 'DC Fast Charger (DCFC) Installation',
    location: 'El Cajon, CA',
    description:
      'Installed a 50 kW DC fast charger for a local auto dealership, including trenching, conduit, and utility coordination.',
    tags: ['DCFC', 'Commercial', 'High-Power'],
  },
  {
    id: 5,
    title: 'Outdoor Weatherproof Charger Install',
    location: 'La Mesa, CA',
    description:
      'Mounted and wired a NEMA 3R-rated Level 2 charger on an exterior wall with GFCI protection and conduit routing.',
    tags: ['Level 2', 'Outdoor', 'Residential'],
  },
  {
    id: 6,
    title: 'Workplace Charging Program',
    location: 'Coronado, CA',
    description:
      'Designed and installed a 6-station workplace charging program with access control and energy monitoring.',
    tags: ['Workplace', 'Commercial', 'Energy Monitoring'],
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
    gap: '1.5rem',
  },
  card: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    overflow: 'hidden',
  },
  imgPlaceholder: {
    width: '100%',
    height: '160px',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
  },
  cardBody: { padding: '1.5rem' },
  cardTitle: { fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' },
  location: { color: '#22c55e', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.75rem' },
  desc: { color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem' },
  tag: {
    background: 'rgba(34,197,94,0.1)',
    color: '#22c55e',
    border: '1px solid rgba(34,197,94,0.2)',
    borderRadius: '9999px',
    padding: '0.2rem 0.65rem',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
};

export default function WorkPage() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <span style={styles.eyebrow}>Portfolio</span>
        <h1 style={styles.title}>Our Work</h1>
        <p style={styles.subtitle}>
          A selection of completed EV charging projects across San Diego County.
        </p>
      </div>
      <div style={styles.grid}>
        {projects.map((p) => (
          <div key={p.id} style={styles.card}>
            <div style={styles.imgPlaceholder}>⚡</div>
            <div style={styles.cardBody}>
              <h2 style={styles.cardTitle}>{p.title}</h2>
              <p style={styles.location}>📍 {p.location}</p>
              <p style={styles.desc}>{p.description}</p>
              <div style={styles.tags}>
                {p.tags.map((t) => (
                  <span key={t} style={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
