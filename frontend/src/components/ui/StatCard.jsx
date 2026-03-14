
export default function StatCard({ icon, label, value, color, bg, border, delay = 0, sub }) {
  return (
    <div
      className="rounded-2xl flex flex-col gap-3 p-5 transition-all duration-200"
      style={{
        background: bg,
        border: `1px solid ${border}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.2)`,
        animation: `fadeSlideUp 0.4s ease both`,
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}>
          {icon}
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#6c757d", letterSpacing: "0.1em" }}>
          {label}
        </span>
      </div>
      <div>
        <p className="text-3xl font-black" style={{ color: "#f1f5f9", fontFamily: "Georgia, serif", letterSpacing: "-0.03em" }}>
          {value}
        </p>
        {sub && <p className="text-xs mt-1" style={{ color: "#6c757d" }}>{sub}</p>}
      </div>
    </div>
  );
}
