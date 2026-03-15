const stats = [
  { value: "Tesla S / 3 / X / Y", label: "Models served — no hybrids" },
  { value: "Same-day",            label: "Dispatch in primary zone"    },
  { value: "Boeing-trained",      label: "Electrical specialist"       },
  { value: "U.S. Marine",         label: "Veteran-owned & operated"    },
];

export default function TrustStrip() {
  return (
    <div className="bg-brand-green">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map(({ value, label }, i) => (
          <div
            key={value}
            className={`px-6 py-5 text-center ${
              i < stats.length - 1 ? "border-r border-white/20" : ""
            }`}
          >
            <span className="font-display font-semibold text-white text-lg sm:text-xl tracking-wide block">
              {value}
            </span>
            <span className="font-body text-white/65 text-xs mt-1 block leading-snug">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
