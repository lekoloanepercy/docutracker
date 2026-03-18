import homeData from "../../../utils/homepageData";
import { useNavigate } from "react-router-dom";

const { hero, systemStatus } = homeData;

const DocFlowLogo = () => (
  <svg width="44" height="44" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="#28a745" />
    <path
      d="M10 8h11l5 5v15a1 1 0 01-1 1H10a1 1 0 01-1-1V9a1 1 0 011-1z"
      fill="white"
      fillOpacity="0.92"
    />
    <path d="M21 8l5 5h-4a1 1 0 01-1-1V8z" fill="white" fillOpacity="0.45" />
    <line
      x1="13"
      y1="16"
      x2="23"
      y2="16"
      stroke="#28a745"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="13"
      y1="19.5"
      x2="23"
      y2="19.5"
      stroke="#28a745"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="13"
      y1="23"
      x2="19"
      y2="23"
      stroke="#28a745"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px 60px",
        background:
          "linear-gradient(160deg, #060e18 0%, #0a1f0e 60%, #060e18 100%)",
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
          linear-gradient(rgba(40,167,69,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(40,167,69,0.04) 1px, transparent 1px)
        `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Radial glows */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse, rgba(40,167,69,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "40vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse, rgba(23,162,184,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 64,
          background: "rgba(6,14,24,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(40,167,69,0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <DocFlowLogo />
          <div>
            <p
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: 16,
                fontFamily: "Georgia, serif",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              DocuTracker
            </p>
            <p
              style={{
                color: "#28a745",
                fontSize: 9,
                letterSpacing: "0.14em",
                marginTop: 1,
              }}
            >
              WORKFLOW
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "8px 20px",
            borderRadius: 10,
            background: "linear-gradient(135deg,#28a745,#218838)",
            border: "none",
            color: "white",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.04em",
            boxShadow: "0 4px 16px rgba(40,167,69,0.3)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-1px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          Login →
        </button>
      </nav>

      {/* Hero content */}
      <div
        style={{
          maxWidth: 760,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge 
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(40,167,69,0.1)",
            border: "1px solid rgba(40,167,69,0.3)",
            borderRadius: 20,
            padding: "5px 14px",
            marginBottom: 28,
            animation: "fadeDown 0.5s ease both",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#28a745",
              boxShadow: "0 0 8px #28a745",
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#5dd879",
              letterSpacing: "0.06em",
            }}
          >
            {hero.badge}
          </span>
        </div>*/}

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(52px, 10vw, 96px)",
            fontFamily: "Georgia, serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "white",
            marginBottom: 24,
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.1s",
          }}
        >
          {hero.title}
          <span
            style={{
              display: "block",
              color: "#28a745",
              fontSize: "0.55em",
              letterSpacing: "-0.01em",
              marginTop: 4,
            }}
          >
            Document Workflow
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 17,
            color: "#9ca3af",
            lineHeight: 1.7,
            maxWidth: 580,
            margin: "0 auto 40px",
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.2s",
          }}
        >
          {hero.subtitle}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 64,
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.3s",
          }}
        >
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "14px 32px",
              borderRadius: 12,
              background: "linear-gradient(135deg,#28a745,#218838)",
              border: "none",
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(40,167,69,0.4)",
              transition: "all 0.2s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(40,167,69,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(40,167,69,0.4)";
            }}
          >
            {hero.primaryAction}
          </button>
          <button
            onClick={() =>
              document
                .getElementById("workflow-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "14px 32px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#d1d5db",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.09)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "#d1d5db";
            }}
          >
            {hero.secondaryAction}
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 0,
            justifyContent: "center",
            flexWrap: "wrap",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(40,167,69,0.15)",
            borderRadius: 16,
            overflow: "hidden",
            animation: "fadeUp 0.6s ease both",
            animationDelay: "0.4s",
          }}
        >
          {hero.stats.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                minWidth: 140,
                padding: "20px 24px",
                textAlign: "center",
                borderRight:
                  i < hero.stats.length - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
              }}
            >
              <p
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#28a745",
                  fontFamily: "Georgia, serif",
                  letterSpacing: "-0.03em",
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "#6c757d",
                  marginTop: 4,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* System status ticker */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          flesWrap: "wrap",
          gap: 20,
          animation: "fadeUp 0.5s ease both",
          animationDelay: "0.5s",
           marginLeft: -130
        }}
      >
        {systemStatus.map((s, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 6, }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#28a745",
                boxShadow: "0 0 8px #28a745",
                animation: `pulse ${1.5 + i * 0.3}s ease-in-out infinite alternate`,
              }}
            />
            <span
              style={{ fontSize: 11, color: "#6c757d", whiteSpace: "nowrap" }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes pulse    { from{opacity:0.4} to{opacity:1} }
      `}</style>
    </section>
  );
}
