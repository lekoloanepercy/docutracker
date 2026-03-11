import { useState, useEffect, useRef } from "react";
import GlassCard from "./GlassCard";
import BrandHeader from "./ui/BrandHeader";
import PrimaryBtn from "./ui/PrimaryBtn";
import Input from "./ui/Input";
// ── SVG Icons ──────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);


export default function NewPasswordPanel({ onBack, onReset }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/\d/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#dc3545", "#ffc107", "#17a2b8", "#28a745"][strength];

  const handleReset = () => {
    const e = {};
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "Minimum 8 characters";
    if (!confirm) e.confirm = "Please confirm your password";
    else if (confirm !== password) e.confirm = "Passwords don't match";
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onReset(); }, 1800);
  };

  return (
    <GlassCard visible={mounted}>
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-medium mb-6 transition-colors duration-150"
        style={{ background: "none", border: "none", cursor: "pointer", color: "#6c757d", padding: 0 }}
        onMouseEnter={e => e.currentTarget.style.color = "#28a745"}
        onMouseLeave={e => e.currentTarget.style.color = "#6c757d"}>
        <ArrowLeftIcon/> Back
      </button>
      <BrandHeader subtitle="Create a strong new password for your account"/>
      <Input label="New Password" type={showP ? "text" : "password"} placeholder="••••••••"
        value={password} onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
        icon={<LockIcon/>} error={errors.password}
        rightElement={
          <button type="button" onClick={() => setShowP(p => !p)}
            style={{ color: "#6c757d", background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = "#28a745"}
            onMouseLeave={e => e.currentTarget.style.color = "#6c757d"}>
            {showP ? <EyeOffIcon/> : <EyeIcon/>}
          </button>
        }
      />
      {password && (
        <div className="mb-4 -mt-2">
          <div className="flex gap-1 mb-1">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex-1 rounded-full transition-all duration-300"
                style={{ height: 3, background: i <= strength ? strengthColor : "rgba(255,255,255,0.1)" }}/>
            ))}
          </div>
          <p className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</p>
        </div>
      )}
      <Input label="Confirm Password" type={showC ? "text" : "password"} placeholder="••••••••"
        value={confirm} onChange={e => { setConfirm(e.target.value); setErrors(p => ({ ...p, confirm: "" })); }}
        icon={<LockIcon/>} error={errors.confirm}
        rightElement={
          <button type="button" onClick={() => setShowC(p => !p)}
            style={{ color: "#6c757d", background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = "#28a745"}
            onMouseLeave={e => e.currentTarget.style.color = "#6c757d"}>
            {showC ? <EyeOffIcon/> : <EyeIcon/>}
          </button>
        }
      />
      <div className="mt-2">
        <PrimaryBtn loading={loading} onClick={handleReset}>Reset Password →</PrimaryBtn>
      </div>
    </GlassCard>
  );
};
