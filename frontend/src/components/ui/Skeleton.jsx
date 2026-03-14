export default function Skeleton({ h = 120, delay = 0 }) {
  return (
    <div className="rounded-2xl" style={{
      height: h, background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.06)",
      animation: `shimmer 1.6s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}/>
  );
}