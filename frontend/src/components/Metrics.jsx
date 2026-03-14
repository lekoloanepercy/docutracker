// pages/UsageMetrics.jsx
// Role-aware usage metrics page.
// Manager / Runner → "System Usage Metrics" (all users)
// Everyone else    → "Your Usage Metrics"   (personal)
//
// Swap fetchMetrics() body with your real service call.
// Expected shape: { success, tasksCompleted, errorRate, userEngagement }

import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; // ← adjust to your hook
import TasksCompletedChart from "./ui/chart/TasksCompletedChart";
import ErrorRateChart from "./ui/chart/ErrorRateChart";
import UserEngagementChart from "./ui/chart/UserEngagementChart";

import { getUserMetrics } from "../services/metricsService";

function parsePct(val) {
  if (!val) return 0;
  const n = parseFloat(String(val).replace("%", ""));
  return isNaN(n) ? 0 : n;
}

function ChangeChip({ value }) {
  const raw = String(value ?? "0").replace("%", "");
  const isInf = raw === "Infinity" || raw === "-Infinity";
  const num = isInf ? Infinity : parseFloat(raw);
  const positive = isInf || num >= 0;
  const color = positive ? "#28a745" : "#dc3545";
  const Icon = isInf
    ? TrendingUp
    : num > 0
      ? TrendingUp
      : num < 0
        ? TrendingDown
        : Minus;
  const label = isInf ? "New" : `${value}`;

  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}35`,
        color,
      }}
    >
      <Icon size={10} />
      {label}
    </span>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ h = 40, delay = 0, className = "" }) {
  return (
    <div
      className={`rounded-xl ${className}`}
      style={{
        height: h,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        animation: "shimmer 1.6s ease-in-out infinite",
        animationDelay: `${delay}s`,
      }}
    />
  );
}

// ── Table row ─────────────────────────────────────────────────────────────────
function MetricRow({ label, current, previous, change, color, delay }) {
  return (
    <tr
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        animation: "fadeSlideUp 0.35s ease both",
        animationDelay: `${delay}s`,
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(40,167,69,0.04)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <td style={{ padding: "14px 16px" }}>
        <div className="flex items-center gap-2.5">
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 6px ${color}80`,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>
            {label}
          </span>
        </div>
      </td>
      <td style={{ padding: "14px 16px", textAlign: "right" }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color,
            fontFamily: "monospace",
          }}
        >
          {current}
        </span>
      </td>
      <td style={{ padding: "14px 16px", textAlign: "right" }}>
        <span
          style={{ fontSize: 13, color: "#9ca3af", fontFamily: "monospace" }}
        >
          {previous}
        </span>
      </td>
      <td style={{ padding: "14px 16px", textAlign: "right" }}>
        <ChangeChip value={change} />
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function UsageMetrics() {
  const { user } = useAuth();
  const isManager = user?.role === "MANAGER" || user?.role === "RUNNER";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: swap with → const { data: res } = await getUsageMetrics(isManager);
      const { data } = await getUserMetrics();
      if (!data.success) {
        setError("Failed to load metrics.");
        return;
      }
      setData(data.metrics);
    } catch (e) {
      setError("Something went wrong. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  // ── Error state ──────────────────────────────────────────────────────────────
  if (error)
    return (
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center py-24 gap-5">
        <div
          className="flex items-center justify-center w-20 h-20 rounded-2xl"
          style={{
            background: "rgba(220,53,69,0.12)",
            border: "1px solid rgba(220,53,69,0.3)",
            color: "#dc3545",
          }}
        >
          <AlertTriangle size={36} />
        </div>
        <div className="text-center">
          <h2
            className="text-lg font-black text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Metrics Unavailable
          </h2>
          <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
            {error}
          </p>
        </div>
        <button
          onClick={fetchMetrics}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150"
          style={{
            background: "rgba(40,167,69,0.12)",
            border: "1px solid rgba(40,167,69,0.3)",
            color: "#28a745",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(40,167,69,0.22)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(40,167,69,0.12)")
          }
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );

  const tc = data?.tasksCompleted;
  const er = data?.errorRate;
  const ue = data?.userEngagement;

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* ── Heading ── */}
      <div
        className="mb-8"
        style={{ animation: "fadeSlideUp 0.35s ease both" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{
              background: "rgba(40,167,69,0.12)",
              border: "1px solid rgba(40,167,69,0.3)",
              color: "#28a745",
            }}
          >
            <BarChart3 size={18} />
          </div>
          <div>
            <h1
              className="text-2xl font-black text-white"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
            >
              {isManager ? "System Usage Metrics" : "Your Usage Metrics"}
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#6c757d" }}>
              {isManager
                ? "Aggregated metrics across all users and tasks"
                : "Your personal performance and engagement data"}
            </p>
          </div>
        </div>
        <div
          style={{
            width: 48,
            height: 2,
            background: "linear-gradient(90deg,#28a745,transparent)",
            marginTop: 12,
          }}
        />
      </div>

      {/* ── Summary Table ── */}
      <p
        className="text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: "#6c757d", letterSpacing: "0.14em" }}
      >
        Summary
      </p>
      <div
        className="mb-8"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(40,167,69,0.15)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
          animation: "fadeSlideUp 0.4s ease both",
          animationDelay: "0.05s",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}
          >
            <thead>
              <tr
                style={{
                  background: "rgba(40,167,69,0.06)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {["Metric", "Current", "Previous", "Change"].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      textAlign: i === 0 ? "left" : "right",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "#6c757d",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  {[0, 1, 2].map((i) => (
                    <tr key={i}>
                      <td colSpan={4} style={{ padding: "10px 16px" }}>
                        <Skeleton h={32} delay={i * 0.08} />
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <MetricRow
                    label="Tasks Completed"
                    current={tc?.current ?? 0}
                    previous={tc?.previous ?? 0}
                    change={tc?.change ?? "0%"}
                    color="#28a745"
                    delay={0.1}
                  />
                  <MetricRow
                    label="Error Rate"
                    current={er?.current ?? "0%"}
                    previous={er?.previous ?? "0%"}
                    change={er?.change ?? "0%"}
                    color="#dc3545"
                    delay={0.15}
                  />
                  <MetricRow
                    label="User Engagement"
                    current={ue?.current ?? "0%"}
                    previous={ue?.previous ?? "0%"}
                    change={ue?.change ?? "0%"}
                    color="#17a2b8"
                    delay={0.2}
                  />
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Charts ── */}
      <p
        className="text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: "#6c757d", letterSpacing: "0.14em" }}
      >
        Visual Breakdown
      </p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton h={280} delay={0.1} />
          <Skeleton h={280} delay={0.15} />
          <Skeleton h={280} delay={0.2} />
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{
            animation: "fadeSlideUp 0.45s ease both",
            animationDelay: "0.25s",
          }}
        >
          <TasksCompletedChart
            current={tc?.current ?? 0}
            previous={tc?.previous ?? 0}
          />
          <ErrorRateChart
            current={er?.current ?? "0%"}
            previous={er?.previous ?? "0%"}
          />
          <UserEngagementChart
            current={ue?.current ?? "0%"}
            previous={ue?.previous ?? "0%"}
            change={ue?.change ?? "0%"}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer     { 0%,100%{opacity:0.5} 50%{opacity:1} }
      `}</style>
    </div>
  );
}
