interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  const h = size;
  const w = size * (40 / 48);

  return (
    <svg width={w} height={h} viewBox="0 0 40 48" fill="none"
      aria-label="Ray's EV Service shield logo" className={className}>
      {/* White border */}
      <path d="M6,1 L34,1 Q39,1 39,7 L39,29 Q39,43 20,48 Q1,43 1,29 L1,7 Q1,1 6,1Z" fill="white"/>
      {/* Green body */}
      <path d="M6,2.5 L34,2.5 Q37.5,2.5 37.5,7 L37.5,29.5 Q37.5,42 20,47 Q2.5,42 2.5,29.5 L2.5,7 Q2.5,2.5 6,2.5Z" fill="#1A5C00"/>
      {/* Blue top band */}
      <path d="M6,2.5 L34,2.5 Q37.5,2.5 37.5,7 L37.5,12 L2.5,12 L2.5,7 Q2.5,2.5 6,2.5Z" fill="#2B5FA6"/>
      {/* White divider */}
      <line x1="2.5" y1="12.5" x2="37.5" y2="12.5" stroke="white" strokeWidth="0.5" opacity="0.6"/>
      {/* Amber bolt */}
      <polygon points="23,15 13,30 20,30 16,44 28,27 21,27" fill="#F5A623"/>
    </svg>
  );
}