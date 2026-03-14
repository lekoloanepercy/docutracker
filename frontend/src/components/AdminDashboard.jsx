// pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import {
  Users, CheckCircle2, Clock, AlertTriangle,
  ShieldCheck, ClipboardList, FileText, Lightbulb,
  Flag, TrendingUp, RefreshCw, Timer,
} from "lucide-react";
import { getAdminDashboard } from "../services/dashboardService";
import greeting from "../../utils/greeting";
import { formatAvgTime } from "../../utils/dateTimeFormat";
import StatCard from "./ui/StatCard";
import Skeleton from "./ui/Skeleton";
import ReportBar from "./ui/ReportBar";


export default function AdminDashboard() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const username = sessionStorage.getItem("username") ?? "Admin";

  const fetchAdminDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: res } = await getAdminDashboard();
      if (!res.success) { setError("Failed to load dashboard data."); return; }
      setData(res.adminDashboard);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdminDashboard(); }, []);

  // ── Error state ─────────────────────────────────────────────────────────────
  if (error) return (
    <div className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center py-24 gap-5">
      <div className="flex items-center justify-center w-20 h-20 rounded-2xl"
        style={{ background: "rgba(220,53,69,0.12)", border: "1px solid rgba(220,53,69,0.3)", color: "#dc3545" }}>
        <AlertTriangle size={36}/>
      </div>
      <div className="text-center">
        <h2 className="text-lg font-black text-white" style={{ fontFamily: "Georgia, serif" }}>Dashboard Unavailable</h2>
        <p className="text-sm mt-1" style={{ color: "#6c757d" }}>{error}</p>
      </div>
      <button onClick={fetchAdminDashboard}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150"
        style={{ background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)", color: "#28a745", cursor: "pointer" }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(40,167,69,0.22)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(40,167,69,0.12)"}>
        <RefreshCw size={14}/> Retry
      </button>
    </div>
  );

  const reports = data?.reportsSummary;
  const totalReports = reports?.numOfReports ?? 0;

  return (
    <div className="max-w-5xl mx-auto w-full">

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
          Here's an overview of your workspace activity.
        </p>
        <div style={{ width: 48, height: 2, background: "linear-gradient(90deg,#28a745,transparent)", marginTop: 10 }}/>
      </div>

      {/* ── Task Stats ── */}
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6c757d", letterSpacing: "0.14em" }}>
        Task Overview
      </p>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[...Array(6)].map((_, i) => <Skeleton key={i} delay={i * 0.07}/>)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard icon={<ClipboardList size={18}/>}  label="Total Tasks"     value={data?.totalTasks ?? 0}      color="#17a2b8"  bg="rgba(23,162,184,0.07)"   border="rgba(23,162,184,0.2)"  delay={0.05}/>
          <StatCard icon={<Clock size={18}/>}           label="Pending"         value={data?.pendingTasks ?? 0}    color="#ffc107"  bg="rgba(255,193,7,0.07)"    border="rgba(255,193,7,0.2)"   delay={0.1}/>
          <StatCard icon={<CheckCircle2 size={18}/>}   label="Completed"       value={data?.completedTasks ?? 0}  color="#28a745"  bg="rgba(40,167,69,0.07)"    border="rgba(40,167,69,0.2)"   delay={0.15}/>
          <StatCard icon={<ShieldCheck size={18}/>}    label="Approved"        value={data?.approvedTasks ?? 0}   color="#5dd879"  bg="rgba(93,216,121,0.07)"   border="rgba(93,216,121,0.2)"  delay={0.2}/>
          <StatCard icon={<AlertTriangle size={18}/>}  label="Errors"          value={data?.erroredTasks ?? 0}    color="#dc3545"  bg="rgba(220,53,69,0.07)"    border="rgba(220,53,69,0.2)"   delay={0.25}/>
          <StatCard icon={<Timer size={18}/>}          label="Avg Completion"  value={formatAvgTime(data?.avgCompletionTime)} color="#ff9900" bg="rgba(255,153,0,0.07)" border="rgba(255,153,0,0.2)" delay={0.3}
            sub="Average time per completed task"/>
        </div>
      )}

      {/* ── Bottom row: active members + reports ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Active members */}
        {loading ? <Skeleton h={160} delay={0.1}/> : (
          <div className="rounded-2xl p-5 flex flex-col gap-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(40,167,69,0.15)",
              animation: "fadeSlideUp 0.4s ease both",
              animationDelay: "0.35s",
            }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl"
                style={{ background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)", color: "#28a745" }}>
                <Users size={18}/>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6c757d", letterSpacing: "0.1em" }}>Active Members</p>
                <p className="text-3xl font-black text-white" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.03em" }}>
                  {data?.activeMembers ?? 0}
                </p>
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }}/>
            <p className="text-xs" style={{ color: "#6c757d" }}>
              Currently active team members on the platform.
            </p>
          </div>
        )}

        {/* Reports breakdown */}
        {loading ? <Skeleton h={160} delay={0.15}/> : (
          <div className="rounded-2xl p-5 flex flex-col gap-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(40,167,69,0.15)",
              animation: "fadeSlideUp 0.4s ease both",
              animationDelay: "0.4s",
            }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{ background: "rgba(255,193,7,0.12)", border: "1px solid rgba(255,193,7,0.3)", color: "#ffc107" }}>
                  <FileText size={18}/>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6c757d", letterSpacing: "0.1em" }}>Reports</p>
                  <p className="text-2xl font-black text-white" style={{ fontFamily: "Georgia, serif" }}>{totalReports}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <ReportBar label="Errors"      value={reports?.errors      ?? 0} total={totalReports} color="#dc3545"/>
              <ReportBar label="Suggestions" value={reports?.suggestions  ?? 0} total={totalReports} color="#ffc107"/>
              <ReportBar label="Other"       value={reports?.other        ?? 0} total={totalReports} color="#6c757d"/>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1;   }
        }
      `}</style>
    </div>
  );
}