export default function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  const h = size;
  const w = size * (44 / 50);

  /* Interstate highway shield — three-point crown with rounded valleys */
  const outerShield = "M2,10 L4,1.5 Q13,8 22,0.5 Q31,8 40,1.5 L42,10 L42,30 C42,42 22,49 22,49 C22,49 2,42 2,30Z";
  const innerShield = "M3.5,10.5 L5.5,3 Q13.5,9 22,2 Q30.5,9 38.5,3 L40.5,10.5 L40.5,29.5 C40.5,41 22,47.5 22,47.5 C22,47.5 3.5,41 3.5,29.5Z";
  /* Blue banner clips to the top of the inner shield */
  const blueBanner = "M3.5,10.5 L5.5,3 Q13.5,9 22,2 Q30.5,9 38.5,3 L40.5,10.5 L40.5,16 L3.5,16Z";

  return (
    <svg width={w} height={h} viewBox="0 0 44 50" fill="none"
      aria-label="Ray's EV Service shield logo" className={className}>
      {/* White outer border */}
      <path d={outerShield} fill="white"/>
      {/* Subtle stroke for definition at small sizes */}
      <path d={outerShield} fill="none" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.12"/>
      {/* Green body */}
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a7a10" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#0d3300" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      <path d={innerShield} fill="#1A5C00"/>
      <path d={innerShield} fill="url(#sg)"/>
      {/* Blue top banner */}
      <path d={blueBanner} fill="#2B5FA6"/>
      {/* White divider line */}
      <line x1="3.5" y1="16.2" x2="40.5" y2="16.2" stroke="white" strokeWidth="0.6" opacity="0.45"/>
      {/* REV text in banner */}
      <text x="22" y="13.5" textAnchor="middle" fontFamily="Oswald,'Arial Black',Impact,sans-serif" fontWeight="700" fontSize="9" fill="white" letterSpacing="1.8">REV</text>
      {/* Amber lightning bolt */}
      <polygon points="26,17 14,30 21,30 17,43 30,27 23.5,27" fill="#F5A623"/>
    </svg>
  );
}
