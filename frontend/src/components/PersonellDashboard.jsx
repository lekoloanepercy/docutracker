// pages/PersonellDashboard.jsx
import { useEffect, useState } from "react";
import {
  CheckCircle2, Clock, AlertTriangle, FileText,
  ClipboardList, TrendingUp, RefreshCw, Timer, Zap,
} from "lucide-react";
import { getPersonellDashboard } from "../services/dashboardService";
import greeting from "../../utils/greeting";
import EfficiencyRing from "./ui/EfficiencyRing";
import { formatAvgTime } from "../../utils/dateTimeFormat";
import StatCard from "./ui/StatCard";
import Skeleton from "./ui/Skeleton";


export default function PersonellDashboard() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const username = sessionStorage.getItem("username") ?? "there";

  const fetchPersonellDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: res } = await getPersonellDashboard();
      if (!res.success) { setError("Failed to load your dashboard."); return; }
      setData(res.personellDashboard);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPersonellDashboard(); }, []);

  // ── Error state ─────────────────────────────────────────────────────────────
  if (error) return (
    <div className="max-w-3xl mx-auto w-full flex flex-col items-center justify-center py-24 gap-5">
      <div className="flex items-center justify-center w-20 h-20 rounded-2xl"
        style={{ background: "rgba(220,53,69,0.12)", border: "1px solid rgba(220,53,69,0.3)", color: "#dc3545" }}>
        <AlertTriangle size={36}/>
      </div>
      <div className="text-center">
        <h2 className="text-lg font-black text-white" style={{ fontFamily: "Georgia, serif" }}>Dashboard Unavailable</h2>
        <p className="text-sm mt-1" style={{ color: "#6c757d" }}>{error}</p>
      </div>
      <button onClick={fetchPersonellDashboard}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150"
        style={{ background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)", color: "#28a745", cursor: "pointer" }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(40,167,69,0.22)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(40,167,69,0.12)"}>
        <RefreshCw size={14}/> Retry
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto w-full">

      {/* ── Greeting ── */}
      <div className="mb-8" style={{ animation: "fadeSlideUp 0.35s ease both" }}>
        <p className="text-sm font-semibold" style={{ color: "#28a745", letterSpacing: "0.08em" }}>
          {greeting()},
        </p>
        <h1 className="text-3xl font-black text-white mt-0.5"
          style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.03em" }}>
          {username}
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
          Here's your personal performance summary.
        </p>
        <div style={{ width: 48, height: 2, background: "linear-gradient(90deg,#28a745,transparent)", marginTop: 10 }}/>
      </div>

      {/* ── Top row: stats + efficiency ring ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

        {/* Stats column — 2/3 width */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {loading ? (
            <>
              <Skeleton delay={0.05}/>
              <Skeleton delay={0.1}/>
              <Skeleton delay={0.15}/>
              <Skeleton delay={0.2}/>
            </>
          ) : (
            <>
              <StatCard icon={<ClipboardList size={18}/>} label="Total Tasks"    value={data?.totalTasks ?? 0}      color="#17a2b8" bg="rgba(23,162,184,0.07)"  border="rgba(23,162,184,0.2)"  delay={0.05}/>
              <StatCard icon={<Clock size={18}/>}          label="Pending"        value={data?.pendingTasks ?? 0}    color="#ffc107" bg="rgba(255,193,7,0.07)"   border="rgba(255,193,7,0.2)"   delay={0.1}/>
              <StatCard icon={<CheckCircle2 size={18}/>}  label="Completed"      value={data?.completedTasks ?? 0}  color="#28a745" bg="rgba(40,167,69,0.07)"   border="rgba(40,167,69,0.2)"   delay={0.15}/>
              <StatCard icon={<Timer size={18}/>}          label="Avg Completion" value={formatAvgTime(data?.avgCompletionTime)} color="#ff9900" bg="rgba(255,153,0,0.07)" border="rgba(255,153,0,0.2)" delay={0.2}
                sub="Per completed task"/>
            </>
          )}
        </div>

        {/* Efficiency ring — 1/3 width */}
        <div className="rounded-2xl flex items-center justify-center p-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(40,167,69,0.15)",
            animation: "fadeSlideUp 0.4s ease both",
            animationDelay: "0.25s",
            minHeight: 200,
          }}>
          {loading
            ? <Skeleton h={140}/>
            : <EfficiencyRing score={data?.efficiencyScore ?? 0}/>}
        </div>
      </div>

      {/* ── Reports card ── */}
      {loading ? <Skeleton h={100} delay={0.3}/> : (
        <div className="rounded-2xl p-5 flex items-center gap-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,193,7,0.2)",
            animation: "fadeSlideUp 0.4s ease both",
            animationDelay: "0.3s",
          }}>
          <div className="flex items-center justify-center w-14 h-14 rounded-xl flex-shrink-0"
            style={{ background: "rgba(255,193,7,0.12)", border: "1px solid rgba(255,193,7,0.3)", color: "#ffc107" }}>
            <FileText size={22}/>
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#6c757d", letterSpacing: "0.1em" }}>
              Your Reports
            </p>
            <p className="text-3xl font-black text-white" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.03em" }}>
              {data?.totalReports ?? 0}
            </p>
            <p className="text-xs mt-1" style={{ color: "#6c757d" }}>Total reports submitted by you</p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1">
            <Zap size={32} color="rgba(255,193,7,0.15)"/>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer {
          0%,100% { opacity:0.5 }
          50%      { opacity:1   }
        }
      `}</style>
    </div>
  );
}