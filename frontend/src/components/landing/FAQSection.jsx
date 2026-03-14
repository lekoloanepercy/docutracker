import { useState } from "react";
import homeData from "../../../utils/homepageData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";

const { faqs } = homeData;

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

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section style={{
      padding: "100px 24px",
      background: "#060e18",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "40vw", height: "50vh", background: "radial-gradient(ellipse, rgba(40,167,69,0.05) 0%, transparent 70%)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <RevealDiv delay={0} style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#28a745", textTransform: "uppercase", marginBottom: 12 }}>
            FAQ
          </p>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontFamily: "Georgia, serif", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Common questions
          </h2>
        </RevealDiv>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => {
            const Icon    = faq.icon;
            const isOpen  = open === i;
            return (
              <RevealDiv key={i} delay={0.08 + i * 0.08}>
                <div style={{
                  background: isOpen ? "rgba(40,167,69,0.06)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isOpen ? "rgba(40,167,69,0.35)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 16, overflow: "hidden",
                  transition: "border-color 0.25s, background 0.25s",
                }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center",
                      gap: 16, padding: "20px 24px",
                      background: "transparent", border: "none", cursor: "pointer",
                      textAlign: "left",
                    }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: isOpen ? "rgba(40,167,69,0.15)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isOpen ? "rgba(40,167,69,0.4)" : "rgba(255,255,255,0.08)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.25s",
                    }}>
                      <Icon size={16} color={isOpen ? "#28a745" : "#6c757d"} strokeWidth={1.8}/>
                    </div>
                    <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: isOpen ? "white" : "#d1d5db", transition: "color 0.2s" }}>
                      {faq.question}
                    </span>
                    <ChevronDown size={16} color="#6c757d" style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s ease" }}/>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 24px 20px 76px", animation: "expandIn 0.25s ease forwards" }}>
                      <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.75 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              </RevealDiv>
            );
          })}
        </div>
      </div>

      <style>{`@keyframes expandIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
}