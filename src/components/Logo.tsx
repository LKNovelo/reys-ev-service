import Image from "next/image";

export default function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/rays-ev-service-logo.webp"
      alt="Ray's EV Service"
      width={size}
      height={size}
      className={className}
    />
  );
}
