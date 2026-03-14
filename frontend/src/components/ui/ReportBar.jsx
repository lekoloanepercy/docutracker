export default function ReportBar({ label, value, total, color }) {
  const pct = total > 0 ? Math.round((Number(value) / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold" style={{ color: "#9ca3af" }}>{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="w-full rounded-full" style={{ height: 6, background: "rgba(255,255,255,0.06)" }}>
        <div className="rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, height: 6, background: color, boxShadow: `0 0 8px ${color}80` }}/>
      </div>
    </div>
  );
}