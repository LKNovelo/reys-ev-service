import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/education', label: 'Education' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

const styles = {
  footer: {
    background: '#0a1020',
    borderTop: '1px solid #334155',
    padding: '3rem 1.5rem 2rem',
    marginTop: 'auto',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  top: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2.5rem',
    marginBottom: '2.5rem',
  },
  brand: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: '#f8fafc',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  brandAccent: { color: '#22c55e' },
  tagline: { color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 },
  colTitle: {
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#94a3b8',
    marginBottom: '1rem',
  },
  linkList: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  link: { color: '#cbd5e1', fontSize: '0.9rem', textDecoration: 'none' },
  contactList: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  contactItem: { display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#cbd5e1' },
  divider: { borderColor: '#334155', borderStyle: 'solid', borderWidth: '1px 0 0', margin: '0 0 1.5rem' },
  bottom: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '0.75rem',
  },
  copyright: { color: '#64748b', fontSize: '0.85rem' },
  greenText: { color: '#22c55e' },
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.top}>
          {/* Brand */}
          <div>
            <div style={styles.brand}>
              <span>⚡</span>
              <span>Rey's <span style={styles.brandAccent}>EV</span> Service</span>
            </div>
            <p style={styles.tagline}>
              Professional EV charger installation, maintenance, and education
              for a cleaner tomorrow.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={styles.colTitle}>Navigation</p>
            <ul style={styles.linkList}>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={styles.link}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={styles.colTitle}>Contact</p>
            <div style={styles.contactList}>
              <div style={styles.contactItem}><span>📞</span><span>(619) 555-0182</span></div>
              <div style={styles.contactItem}><span>✉️</span><span>rey@reysevservice.com</span></div>
              <div style={styles.contactItem}><span>📍</span><span>San Diego County, CA</span></div>
              <div style={styles.contactItem}><span>🕐</span><span>Mon–Sat: 7am – 6pm</span></div>
            </div>
          </div>
        </div>

        <hr style={styles.divider} />

        <div style={styles.bottom}>
          <p style={styles.copyright}>
            © 2024 <span style={styles.greenText}>Rey's EV Service</span>. All rights reserved.
          </p>
          <p style={styles.copyright}>Powering a cleaner future ⚡</p>
        </div>
      </div>
    </footer>
  );
}
