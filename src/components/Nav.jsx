'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/education', label: 'Education' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid #334155',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 800,
    fontSize: '1.125rem',
    color: '#f8fafc',
    textDecoration: 'none',
  },
  brandAccent: { color: '#22c55e' },
  navList: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    listStyle: 'none',
  },
};

function NavLink({ href, label, active }) {
  return (
    <li>
      <Link
        href={href}
        style={{
          display: 'inline-block',
          padding: '0.4rem 0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.9rem',
          fontWeight: active ? 600 : 400,
          color: active ? '#22c55e' : '#cbd5e1',
          background: active ? 'rgba(34,197,94,0.1)' : 'transparent',
          transition: 'color 0.2s, background 0.2s',
          textDecoration: 'none',
        }}
      >
        {label}
      </Link>
    </li>
  );
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link href="/" style={styles.brand}>
          <span>⚡</span>
          <span>
            Rey's <span style={styles.brandAccent}>EV</span> Service
          </span>
        </Link>
        <ul style={styles.navList}>
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={pathname === link.href}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}
