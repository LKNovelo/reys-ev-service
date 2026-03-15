const signals = [
  { label: "USMC Veteran",     sub: "Discipline · Integrity"  },
  { label: "Boeing-Trained",   sub: "Electrical systems"      },
  { label: "Tesla Toolbox 3",  sub: "OEM-level diagnostics"   },
  { label: "LA → San Diego",   sub: "Mobile coverage"         },
];

export default function TrustStrip() {
  return (
    <div className="bg-[#2B5FA6] py-3.5 px-5">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center divide-x divide-white/20">
        {signals.map(({ label, sub }) => (
          <div
            key={label}
            className="px-5 py-1 text-center first:pl-0 last:pr-0"
          >
            <p className="text-white text-[11px] font-bold tracking-[0.5px] uppercase">
              {label}
            </p>
            <p className="text-white/65 text-[9px] mt-0.5">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
