import homeData from "../../../utils/homepageData";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const { aiUsage } = homeData;

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

export default function AISection() {
  return (
    <section style={{
      padding: "100px 24px",
      background: "linear-gradient(180deg, #060e18 0%, #071a10 60%, #060e18 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "80vw", height: "60vh", background: "radial-gradient(ellipse, rgba(40,167,69,0.07) 0%, transparent 70%)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        <RevealDiv delay={0} style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(40,167,69,0.1)", border: "1px solid rgba(40,167,69,0.3)",
            borderRadius: 20, padding: "5px 14px", marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#28a745", boxShadow: "0 0 8px #28a745", animation: "pulse 1.5s ease-in-out infinite alternate" }}/>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#5dd879", letterSpacing: "0.1em", textTransform: "uppercase" }}>AI-Powered</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontFamily: "Georgia, serif", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
            Intelligence built in
          </h2>
          <p style={{ fontSize: 15, color: "#9ca3af", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            DocuTracker uses AI to surface insights, reduce friction, and help your team work smarter.
          </p>
        </RevealDiv>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {aiUsage.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealDiv key={i} delay={0.08 + i * 0.1}>
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(40,167,69,0.15)",
                  borderRadius: 20, padding: "28px 28px",
                  height: "100%",
                  transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                  position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(40,167,69,0.4)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(40,167,69,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(40,167,69,0.15)"; e.currentTarget.style.boxShadow = "none"; }}>

                  {/* Top glow */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(40,167,69,0.4), transparent)" }}/>

                  <div style={{
                    width: 48, height: 48, borderRadius: 14, marginBottom: 20,
                    background: "rgba(40,167,69,0.1)", border: "1px solid rgba(40,167,69,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={20} color="#28a745" strokeWidth={1.8}/>
                  </div>

                  <h3 style={{ fontSize: 16, fontFamily: "Georgia, serif", fontWeight: 700, color: "white", marginBottom: 10, letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                </div>
              </RevealDiv>
            );
          })}
        </div>
      </div>

      <style>{`@keyframes pulse{from{opacity:0.4}to{opacity:1}}`}</style>
    </section>
  );
}