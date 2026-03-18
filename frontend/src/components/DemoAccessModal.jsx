import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Info, Clock, Mail, Lock, ExternalLink } from "lucide-react";

const DEMO_ACCOUNTS = [
  //{ role: "Manager",  email: "manager@demo.com",  password: "Demo@1234" },
  { role: "Worker",   email: "test@gmail.com",   password: "test02*^" },
];

export default function DemoAccessModal({ show = true }) {
  const [isOpen, setIsOpen] = useState(show);
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full relative flex flex-col"
        style={{
          maxWidth: 480,
          background: "rgba(8,16,28,0.98)",
          border: "1px solid rgba(40,167,69,0.25)",
          borderRadius: 24,
          boxShadow: "0 32px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset",
          padding: "2rem",
          animation: "popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-xl transition-colors duration-150"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#6c757d", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.color = "#f1f5f9"}
          onMouseLeave={e => e.currentTarget.style.color = "#6c757d"}>
          <X size={15}/>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <h2 className="text-xl font-black text-white mb-1"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
            Demo Access
          </h2>
          <p className="text-sm" style={{ color: "#6c757d", maxWidth: 340 }}>
            This is a closed internal system. Use the credentials below to explore the platform.
          </p>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: "1.5rem" }}/>

        {/* Credentials */}
        <p className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#6c757d", letterSpacing: "0.14em" }}>
          Test Account
        </p>

        <div className="flex flex-col gap-3 mb-5">
          {DEMO_ACCOUNTS.map((acc, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(40,167,69,0.15)",
              borderRadius: 14, padding: "14px 16px",
            }}>
              {/* Role label */}
              <span className="inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-full mb-3"
                style={{
                  background: i === 0 ? "rgba(40,167,69,0.12)" : "rgba(23,162,184,0.12)",
                  border: `1px solid ${i === 0 ? "rgba(40,167,69,0.3)" : "rgba(23,162,184,0.3)"}`,
                  color: i === 0 ? "#28a745" : "#17a2b8",
                }}>
                {acc.role}
              </span>

              <div className="flex flex-col gap-2">
                {/* Email */}
                <div className="flex items-center gap-2.5">
                  <Mail size={13} color="#6c757d" style={{ flexShrink: 0 }}/>
                  <span className="text-xs font-semibold" style={{ color: "#6c757d", minWidth: 52 }}>Email</span>
                  <code className="text-sm font-mono px-2 py-0.5 rounded-lg flex-1"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#f1f5f9", letterSpacing: "0.02em" }}>
                    {acc.email}
                  </code>
                </div>
                {/* Password */}
                <div className="flex items-center gap-2.5">
                  <Lock size={13} color="#6c757d" style={{ flexShrink: 0 }}/>
                  <span className="text-xs font-semibold" style={{ color: "#6c757d", minWidth: 52 }}>Password</span>
                  <code className="text-sm font-mono px-2 py-0.5 rounded-lg flex-1"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#f1f5f9", letterSpacing: "0.02em" }}>
                    {acc.password}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cold start warning */}
        <div className="flex items-start gap-3 rounded-xl p-3 mb-6"
          style={{ background: "rgba(255,193,7,0.07)", border: "1px solid rgba(255,193,7,0.2)" }}>
          <Clock size={15} color="#ffc107" style={{ flexShrink: 0, marginTop: 1 }}/>
          <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>
            <span className="font-bold" style={{ color: "#ffc107" }}>Expect a cold start delay.</span>{" "}
            The server is hosted on a free tier and may take up to <span style={{ color: "#f1f5f9", fontWeight: 600 }}>30–60 seconds</span> to wake up on first request. Please be patient — it will load.
          </p>
        </div>

        {/* CTA */}
        <button onClick={() => { setIsOpen(false); navigate("/login"); }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-150"
          style={{
            background: "linear-gradient(135deg,#28a745,#218838)",
            border: "none", color: "white", cursor: "pointer",
            boxShadow: "0 4px 20px rgba(40,167,69,0.35)",
            letterSpacing: "0.04em",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg,#218838,#155724)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg,#28a745,#218838)"; e.currentTarget.style.transform = "translateY(0)"; }}>
          <ExternalLink size={14}/> Go to Login
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </div>
  );
}