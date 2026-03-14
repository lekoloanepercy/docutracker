// hooks/useScrollReveal.js
// Lightweight IntersectionObserver hook — no external deps needed.
// Usage: const { ref, visible } = useScrollReveal();
// Then: <div ref={ref} style={{ opacity: visible ? 1 : 0, ... }}>

import { useEffect, useRef, useState } from "react";

export function useScrollReveal(threshold = 0.15) {
  const ref     = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}