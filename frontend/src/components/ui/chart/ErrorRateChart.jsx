// components/charts/ErrorRateChart.jsx
import { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

function parsePercent(val) {
  if (val === undefined || val === null) return 0;
  const n = parseFloat(String(val).replace("%", ""));
  return isNaN(n) ? 0 : Math.min(100, Math.max(0, n));
}

export default function ErrorRateChart({ current = "0%", previous = "0%" }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  const currentVal  = parsePercent(current);
  const previousVal = parsePercent(previous);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: ["Error Rate", "Success Rate"],
        datasets: [
          {
            data: [currentVal, Math.max(0, 100 - currentVal)],
            backgroundColor: ["rgba(220,53,69,0.8)", "rgba(40,167,69,0.25)"],
            borderColor:     ["rgba(220,53,69,1)",   "rgba(40,167,69,0.4)"],
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#9ca3af",
              font: { size: 11 },
              padding: 16,
              usePointStyle: true,
              pointStyleWidth: 8,
            },
          },
          tooltip: {
            backgroundColor: "rgba(10,22,40,0.95)",
            borderColor: "rgba(220,53,69,0.3)",
            borderWidth: 1,
            titleColor: "#f1f5f9",
            bodyColor: "#9ca3af",
            padding: 10,
            cornerRadius: 10,
            callbacks: { label: (ctx) => ` ${ctx.parsed.toFixed(1)}%` },
          },
        },
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [currentVal]);

  return (
    <div className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(220,53,69,0.2)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6c757d", letterSpacing: "0.1em" }}>Error Rate</p>
          <p className="text-2xl font-black mt-0.5" style={{ fontFamily: "Georgia, serif", color: "#dc3545" }}>{current}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs" style={{ color: "#6c757d" }}>Previous</span>
          <span className="text-sm font-bold" style={{ color: "#9ca3af" }}>{previous}</span>
        </div>
      </div>
      <div style={{ height: 200, position: "relative" }}>
        <canvas ref={canvasRef}/>
      </div>
    </div>
  );
}