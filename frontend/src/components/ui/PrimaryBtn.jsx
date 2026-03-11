export default function PrimaryBtn({ children, loading, ...props }) {
  return (
    <button
      className="w-full rounded-xl py-3 font-bold text-sm tracking-wide transition-all duration-200 relative overflow-hidden"
      style={{
        background: loading
          ? "#155724"
          : "linear-gradient(135deg, #28a745 0%, #218838 100%)",
        color: "white",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: "0 4px 20px rgba(40,167,69,0.35)",
        letterSpacing: "0.06em",
      }}
      onMouseEnter={(e) => {
        if (!loading)
          e.currentTarget.style.background =
            "linear-gradient(135deg, #218838 0%, #155724 100%)";
      }}
      onMouseLeave={(e) => {
        if (!loading)
          e.currentTarget.style.background =
            "linear-gradient(135deg, #28a745 0%, #218838 100%)";
      }}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="3"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          Processing…
        </span>
      ) : (
        children
      )}
    </button>
  );
}
