
import homeData from "../../../utils/homepageData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
const { workflow } = homeData;

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

export default function WorkflowSection() {
  return (
    <section id="workflow-section" style={{
      padding: "100px 24px",
      background: "linear-gradient(180deg, #060e18 0%, #0a1f0e 100%)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        <RevealDiv delay={0} style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#28a745", textTransform: "uppercase", marginBottom: 12 }}>
            How It Works
          </p>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontFamily: "Georgia, serif", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            From document to completion
          </h2>
        </RevealDiv>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {workflow.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 0;
            return (
              <RevealDiv key={i} delay={0.1 + i * 0.12}>
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 32,
                  padding: "32px 0",
                  borderBottom: i < workflow.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  justifyContent: isEven ? "flex-start" : "flex-end",
                }}>
                  {/* Step number + icon */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 20,
                    flexDirection: isEven ? "row" : "row-reverse",
                    flex: 1,
                  }}>
                    {/* Number */}
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                      background: "rgba(40,167,69,0.1)",
                      border: "2px solid rgba(40,167,69,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, fontWeight: 900, color: "#28a745",
                      fontFamily: "Georgia, serif",
                      boxShadow: "0 0 24px rgba(40,167,69,0.15)",
                    }}>
                      {i + 1}
                    </div>

                    {/* Connector line */}
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(${isEven ? "90deg" : "270deg"}, rgba(40,167,69,0.4), transparent)`, maxWidth: 80 }}/>

                    {/* Card */}
                    <div style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(40,167,69,0.15)",
                      borderRadius: 18, padding: "28px 32px",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      maxWidth: 520,
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(40,167,69,0.4)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(40,167,69,0.1)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(40,167,69,0.15)"; e.currentTarget.style.boxShadow = "none"; }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          <Icon size={18} color="#28a745" strokeWidth={1.8}/>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#28a745", textTransform: "uppercase" }}>
                          {step.step}
                        </span>
                      </div>
                      <h3 style={{ fontSize: 18, fontFamily: "Georgia, serif", fontWeight: 700, color: "white", marginBottom: 10, letterSpacing: "-0.02em" }}>
                        {step.title}
                      </h3>
                      <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.7 }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}