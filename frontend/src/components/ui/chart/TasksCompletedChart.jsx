// components/charts/TasksCompletedChart.jsx
import { useEffect, useRef } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TasksCompletedChart({ current = 0, previous = 0 }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy old instance before re-creating
    if (chartRef.current) { chartRef.current.destroy(); }

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: ["Previous Period", "Current Period"],
        datasets: [
          {
            label: "Tasks Completed",
            data: [previous, current],
            backgroundColor: ["rgba(108,117,125,0.5)", "rgba(40,167,69,0.7)"],
            borderColor:     ["rgba(108,117,125,0.9)", "rgba(40,167,69,1)"],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
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
            borderColor: "rgba(40,167,69,0.3)",
            borderWidth: 1,
            titleColor: "#f1f5f9",
            bodyColor: "#9ca3af",
            padding: 10,
            cornerRadius: 10,
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
            ticks: { color: "#6c757d", font: { size: 11 }, stepSize: 1 },
            border: { color: "rgba(255,255,255,0.06)" },
          },
        },
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [current, previous]);

  return (
    <div className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(40,167,69,0.15)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6c757d", letterSpacing: "0.1em" }}>Tasks Completed</p>
          <p className="text-2xl font-black text-white mt-0.5" style={{ fontFamily: "Georgia, serif" }}>{current}</p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)", color: "#28a745" }}>
          Current Period
        </span>
      </div>
      <div style={{ height: 180, position: "relative" }}>
        <canvas ref={canvasRef}/>
      </div>
    </div>
  );
}