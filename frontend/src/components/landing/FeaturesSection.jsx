
import homeData from "../../../utils/homepageData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
const { features } = homeData;

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

export default function FeaturesSection() {
  return (
    <section style={{
      padding: "100px 24px",
      background: "#060e18",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "50vh", background: "radial-gradient(ellipse, rgba(40,167,69,0.06) 0%, transparent 70%)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        <RevealDiv delay={0} style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#28a745", textTransform: "uppercase", marginBottom: 12 }}>
            Platform Features
          </p>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontFamily: "Georgia, serif", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Built for every role
          </h2>
        </RevealDiv>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <RevealDiv key={i} delay={0.1 + i * 0.12}>
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(40,167,69,0.18)",
                  borderRadius: 22, padding: "36px 36px",
                  height: "100%",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(40,167,69,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>

                  {/* Corner accent */}
                  <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "radial-gradient(circle at top right, rgba(40,167,69,0.1), transparent 70%)" }}/>

                  {/* Icon */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, marginBottom: 24,
                    background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={22} color="#28a745" strokeWidth={1.8}/>
                  </div>

                  <h3 style={{ fontSize: 20, fontFamily: "Georgia, serif", fontWeight: 700, color: "white", marginBottom: 24, letterSpacing: "-0.02em" }}>
                    {feature.title}
                  </h3>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {feature.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(40,167,69,0.15)", border: "1px solid rgba(40,167,69,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                        <span style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.6 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}