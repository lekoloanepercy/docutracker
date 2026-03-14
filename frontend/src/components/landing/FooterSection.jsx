// components/landing/FooterSection.jsx
import { useNavigate } from "react-router-dom";

export default function FooterSection() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer style={{
      padding: "60px 24px 32px",
      background: "#040b10",
      borderTop: "1px solid rgba(40,167,69,0.12)",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 32, marginBottom: 48 }}>

          {/* Brand */}
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="9" fill="#28a745"/>
                <path d="M10 8h11l5 5v15a1 1 0 01-1 1H10a1 1 0 01-1-1V9a1 1 0 011-1z" fill="white" fillOpacity="0.92"/>
                <path d="M21 8l5 5h-4a1 1 0 01-1-1V8z" fill="white" fillOpacity="0.45"/>
              </svg>
              <div>
                <p style={{ color: "white", fontWeight: 900, fontSize: 14, fontFamily: "Georgia, serif", letterSpacing: "-0.02em", lineHeight: 1 }}>DocuTracker</p>
                <p style={{ color: "#28a745", fontSize: 9, letterSpacing: "0.14em", marginTop: 1 }}>WORKFLOW</p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#6c757d", lineHeight: 1.7 }}>
              Smart task management for dha digitization hub.
            </p>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
            <p style={{ fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>Ready to get started?</p>
            <button onClick={() => navigate("/login")}
              style={{
                padding: "12px 28px", borderRadius: 10,
                background: "linear-gradient(135deg,#28a745,#218838)",
                border: "none", color: "white", fontSize: 14,
                fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(40,167,69,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              Login to Dashboard →
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 24 }}/>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#6c757d" }}>© {year} DocuTracker. All rights reserved.</p>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#28a745", boxShadow: "0 0 6px #28a745" }}/>
            <span style={{ fontSize: 11, color: "#6c757d" }}>System operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}