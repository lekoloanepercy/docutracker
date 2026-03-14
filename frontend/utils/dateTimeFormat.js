// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(ts) {
  if (!ts) return "--";
  return new Date(ts).toLocaleString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(ts) {
  if (!ts) return "--";
  return new Date(ts).toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAvgTime(raw) {
  if (!raw) return "--";
  // e.g. "-33m -50.25s" → strip negatives and clean up
  return raw.replace(/-/g, "").replace(/\s+/g, " ").trim() || raw;
}

export { formatTime, formatDate, formatAvgTime };
