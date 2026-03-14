// components/charts/UserEngagementChart.jsx
import { useEffect, useRef } from "react";
import {
  Chart, LineController, LineElement, PointElement,
  CategoryScale, LinearScale, Tooltip, Legend, Filler,
} from "chart.js";

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

function parsePercent(val) {
  if (val === undefined || val === null) return 0;
  const raw = String(val).replace("%", "");
  if (raw === "Infinity" || raw === "-Infinity") return 0;
  const n = parseFloat(raw);
  return isNaN(n) ? 0 : n;
}

export default function UserEngagementChart({ current = "0%", previous = "0%", change = "0%" }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  const currentVal  = parsePercent(current);
  const previousVal = parsePercent(previous);

  // Trend line: previous → midpoint → current
  const mid = parseFloat(((previousVal + currentVal) / 2).toFixed(2));

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: ["Previous", "Mid", "Current"],
        datasets: [
          {
            label: "Engagement %",
            data: [previousVal, mid, currentVal],
            borderColor: "rgba(23,162,184,1)",
            backgroundColor: "rgba(23,162,184,0.08)",
            borderWidth: 2.5,
            pointBackgroundColor: "rgba(23,162,184,1)",
            pointBorderColor: "rgba(10,22,40,1)",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true,
            tension: 0.45,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(10,22,40,0.95)",
            borderColor: "rgba(23,162,184,0.3)",
            borderWidth: 1,
            titleColor: "#f1f5f9",
            bodyColor: "#9ca3af",
            padding: 10,
            cornerRadius: 10,
            callbacks: { label: (ctx) => ` ${ctx.parsed.y.toFixed(1)}%` },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.04)" },
            ticks: { color: "#6c757d", font: { size: 11 } },
            border: { color: "rgba(255,255,255,0.06)" },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(255,255,255,0.04)" },
            ticks: {
              color: "#6c757d", font: { size: 11 },
              callback: (v) => `${v}%`,
            },
            border: { color: "rgba(255,255,255,0.06)" },
          },
        },
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [currentVal, previousVal]);

  // Change display — handle Infinity gracefully
  const changeRaw   = String(change).replace("%", "");
  const isInfinity  = changeRaw === "Infinity" || changeRaw === "-Infinity";
  const changeColor = isInfinity || parseFloat(changeRaw) >= 0 ? "#28a745" : "#dc3545";
  const changeLabel = isInfinity ? "New metric" : change;

  return (
    <div className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(23,162,184,0.2)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6c757d", letterSpacing: "0.1em" }}>User Engagement</p>
          <p className="text-2xl font-black mt-0.5" style={{ fontFamily: "Georgia, serif", color: "#17a2b8" }}>{current}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${changeColor}18`, border: `1px solid ${changeColor}44`, color: changeColor }}>
            {changeLabel}
          </span>
          <span className="text-xs" style={{ color: "#6c757d" }}>vs {previous}</span>
        </div>
      </div>
      <div style={{ height: 180, position: "relative" }}>
        <canvas ref={canvasRef}/>
      </div>
    </div>
  );
}