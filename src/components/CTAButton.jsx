import Link from 'next/link';

const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.4rem',
  padding: '0.75rem 1.75rem',
  borderRadius: '0.5rem',
  fontWeight: 700,
  fontSize: '0.95rem',
  cursor: 'pointer',
  textDecoration: 'none',
  border: 'none',
  transition: 'background 0.2s, color 0.2s, opacity 0.2s',
};

const variants = {
  primary: {
    background: '#22c55e',
    color: '#0f172a',
  },
  secondary: {
    background: 'transparent',
    color: '#22c55e',
    border: '2px solid #22c55e',
  },
};

/**
 * @param {{ children: React.ReactNode, href?: string, onClick?: Function, variant?: 'primary' | 'secondary' }} props
 */
export default function CTAButton({ children, href, onClick, variant = 'primary' }) {
  const style = { ...baseStyle, ...variants[variant] };

  if (href) {
    return (
      <Link href={href} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type="submit" style={style} onClick={onClick}>
      {children}
    </button>
  );
}
