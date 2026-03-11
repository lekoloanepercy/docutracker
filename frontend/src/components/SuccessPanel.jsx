import { useState,useEffect } from "react";
import GlassCard from "./GlassCard";
import PrimaryBtn from "./ui/PrimaryBtn";
// ── SVG Icons ──────────────────────────────────────────────────────────────

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);



export default function SuccessPanel({ message, onContinue }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
  }, []);
  return (
    <GlassCard visible={mounted}>
      <div className="flex flex-col items-center py-6">
        <div
          style={{
            color: "#28a745",
            marginBottom: 20,
            animation:
              "popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
          }}
        >
          <CheckCircleIcon />
        </div>
        <h2
          className="text-xl font-black mb-2"
          style={{ color: "white", fontFamily: "'Georgia', serif" }}
        >
          {message.title}
        </h2>
        <p
          className="text-sm text-center mb-8"
          style={{ color: "#6c757d", maxWidth: 280 }}
        >
          {message.body}
        </p>
        <PrimaryBtn onClick={onContinue}>{message.cta}</PrimaryBtn>
      </div>
      <style>{`
        @keyframes popIn { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
      `}</style>
    </GlassCard>
  );
}
