export default function Input({ icon, label, error, rightElement, ...props }) {
 return( <div className="mb-4">
    {label && <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
      style={{ color: "#6c757d", letterSpacing: "0.1em" }}>{label}</label>}
    <div className="relative flex items-center">
      {icon && (
        <div className="absolute left-3.5 pointer-events-none" style={{ color: "#6c757d" }}>
          {icon}
        </div>
      )}
      <input
        className="w-full rounded-xl border text-sm outline-none transition-all duration-200 py-3 pr-10"
        style={{
          paddingLeft: icon ? "2.75rem" : "1rem",
          background: "rgba(255,255,255,0.04)",
          border: error ? "1px solid #dc3545" : "1px solid rgba(255,255,255,0.1)",
          color: "#f1f5f9",
          boxShadow: "none",
        }}
        onFocus={e => { e.target.style.border = "1px solid #28a745"; e.target.style.boxShadow = "0 0 0 3px rgba(40,167,69,0.15)"; }}
        onBlur={e => { e.target.style.border = error ? "1px solid #dc3545" : "1px solid rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
        {...props}
      />
      {rightElement && <div className="absolute right-3.5">{rightElement}</div>}
    </div>
    {error && <p className="text-xs mt-1.5" style={{ color: "#dc3545" }}>{error}</p>}
  </div>);
};
