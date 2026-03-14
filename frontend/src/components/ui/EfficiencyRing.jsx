import {
  CheckCircle2, Clock, AlertTriangle, FileText,
  ClipboardList, TrendingUp, RefreshCw, Timer, Zap,
} from "lucide-react";

export default function EfficiencyRing({ score }) {
  const clamped  = Math.min(100, Math.max(0, score));
  const radius   = 54;
  const circ     = 2 * Math.PI * radius;
  const dash     = (clamped / 100) * circ;
  const color    = clamped >= 70 ? "#28a745" : clamped >= 40 ? "#ffc107" : "#dc3545";
  const label    = clamped >= 70 ? "Great" : clamped >= 40 ? "Fair" : "Needs Work";

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ position: "relative", width: 140, height: 140 }}>
        <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
          {/* Progress */}
          <circle cx="70" cy="70" r={radius} fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 8px ${color}80)`,
              transition: "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <span className="text-3xl font-black" style={{ color: "#f1f5f9", fontFamily: "Georgia, serif", letterSpacing: "-0.04em" }}>
            {clamped}
          </span>
          <span className="text-xs font-bold" style={{ color, letterSpacing: "0.06em" }}>%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6c757d", letterSpacing: "0.1em" }}>Efficiency</p>
        <p className="text-xs font-semibold mt-0.5" style={{ color }}>{label}</p>
      </div>
    </div>
  );
}