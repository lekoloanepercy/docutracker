
import homeData from "../../../utils/homepageData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
const { about } = homeData;

function RevealDiv({ children, delay = 0, style = {} }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section style={{
      padding: "100px 24px",
      background: "linear-gradient(180deg, #060e18 0%, #0a1f0e 50%, #060e18 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Accent line left */}
      <div style={{
        position: "absolute", left: 0, top: "20%", bottom: "20%",
        width: 3,
        background: "linear-gradient(180deg, transparent, #28a745, transparent)",
      }}/>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Section label */}
        <RevealDiv delay={0}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#28a745", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>
            About the Platform
          </p>
        </RevealDiv>

        {/* Main about block */}
        <RevealDiv delay={0.1}>
          <div style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(40,167,69,0.18)",
            borderRadius: 24, padding: "48px 52px",
            marginBottom: 32,
            boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
            position: "relative", overflow: "hidden",
          }}>
            {/* Corner accent */}
            <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: "radial-gradient(circle at top right, rgba(40,167,69,0.12), transparent 70%)" }}/>

            <h2 style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontFamily: "Georgia, serif", fontWeight: 900,
              color: "white", letterSpacing: "-0.03em",
              marginBottom: 20, lineHeight: 1.1,
            }}>
              {about.title}
            </h2>
            <p style={{ fontSize: 16, color: "#9ca3af", lineHeight: 1.8, maxWidth: 680 }}>
              {about.description}
            </p>
          </div>
        </RevealDiv>

        {/* Why block */}
        <RevealDiv delay={0.2}>
          <div style={{
            background: "rgba(40,167,69,0.06)",
            border: "1px solid rgba(40,167,69,0.2)",
            borderRadius: 24, padding: "40px 52px",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 100, height: 100, background: "radial-gradient(circle at bottom left, rgba(40,167,69,0.15), transparent 70%)" }}/>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0, marginTop: 4,
                background: "rgba(40,167,69,0.15)", border: "1px solid rgba(40,167,69,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: 22, fontFamily: "Georgia, serif", fontWeight: 700, color: "white", marginBottom: 12, letterSpacing: "-0.02em" }}>
                  {about.whyTitle}
                </h3>
                <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.8 }}>
                  {about.whyDescription}
                </p>
              </div>
            </div>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}