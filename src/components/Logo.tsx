interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 36, className = "" }: LogoProps) {
  const h = size;
  const w = size * 0.75;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 28 38"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Shield body — green */}
      <path
        d="M2,6 Q2,1 7,1 L21,1 Q26,1 26,6 Q26,16 22,23 L14,37 L6,23 Q2,16 2,6Z"
        fill="#1A5C00"
      />
      {/* Blue top band — ~1/5 of shield height */}
      <path
        d="M2,6 Q2,1 7,1 L21,1 Q26,1 26,6 L26,10.5 L2,10.5Z"
        fill="#2B5FA6"
      />
      {/* White divider line */}
      <line
        x1="2" y1="11" x2="26" y2="11"
        stroke="white" strokeWidth="0.7" opacity="0.45"
      />
      {/* Amber lightning bolt */}
      <polygon
        points="16,12 11,23 15.5,23 11,35 20,21.5 15.5,21.5"
        fill="#F5A623"
      />
    </svg>
  );
}
