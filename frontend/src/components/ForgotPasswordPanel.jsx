import { useState, useEffect, useRef } from "react";
import GlassCard from "./GlassCard";
import BrandHeader from "./ui/BrandHeader";
import PrimaryBtn from "./ui/PrimaryBtn";
import Input from "./ui/Input";
// ── SVG Icons ──────────────────────────────────────────────────────────────

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const DocFlowLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="10" fill="#28a745"/>
    <path d="M10 8h11l5 5v15a1 1 0 01-1 1H10a1 1 0 01-1-1V9a1 1 0 011-1z" fill="white" fillOpacity="0.9"/>
    <path d="M21 8l5 5h-4a1 1 0 01-1-1V8z" fill="white" fillOpacity="0.5"/>
    <line x1="13" y1="16" x2="23" y2="16" stroke="#28a745" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="13" y1="19.5" x2="23" y2="19.5" stroke="#28a745" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="13" y1="23" x2="19" y2="23" stroke="#28a745" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function ForgotEmailPanel({ onBack, onSend }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const handleSend = () => {
    if (!email) { setError("Email is required"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSend(email); }, 1600);
  };

  return (
    <GlassCard visible={mounted}>
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-medium mb-6 transition-colors duration-150"
        style={{ background: "none", border: "none", cursor: "pointer", color: "#6c757d", padding: 0 }}
        onMouseEnter={e => e.currentTarget.style.color = "#28a745"}
        onMouseLeave={e => e.currentTarget.style.color = "#6c757d"}>
        <ArrowLeftIcon/> Back to Sign In
      </button>
      <BrandHeader subtitle="Enter your email — we'll send you a reset code"/>
      <div className="flex justify-center mb-6">
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(40,167,69,0.12)",
          border: "1px solid rgba(40,167,69,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#28a745"
        }}>
          <MailIcon/>
        </div>
      </div>
      <Input label="Email address" type="email" placeholder="you@company.com"
        value={email} onChange={e => { setEmail(e.target.value); setError(""); }}
        icon={<MailIcon/>} error={error}/>
      <div className="mt-2">
        <PrimaryBtn loading={loading} onClick={handleSend}>Send Reset Code →</PrimaryBtn>
      </div>
    </GlassCard>
  );
};