// ── Glass Card wrapper ─────────────────────────────────────────────────────
export default function GlassCard({ children, visible }) {
  return (
    <div
      style={{
        background: "rgba(10, 20, 35, 0.75)",
        border: "1px solid rgba(40,167,69,0.2)",
        borderRadius: "24px",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
        padding: "2.5rem 2.25rem",
        width: "100%",
        maxWidth: "420px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
    >
      {children}
    </div>
  );
}
