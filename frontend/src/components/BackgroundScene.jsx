export default function BackgroundScene() {
 return ( <div className="absolute inset-0 overflow-hidden">
    {/* Deep dark base */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #0f2b1e 70%, #071a10 100%)",
      }}
    />
    {/* Radial glow – green */}
    <div
      style={{
        position: "absolute",
        top: "-10%",
        right: "-5%",
        width: "60%",
        height: "70%",
        background:
          "radial-gradient(ellipse, rgba(40,167,69,0.18) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
    {/* Radial glow – blue tint */}
    <div
      style={{
        position: "absolute",
        bottom: "5%",
        left: "-10%",
        width: "55%",
        height: "60%",
        background:
          "radial-gradient(ellipse, rgba(23,162,184,0.12) 0%, transparent 70%)",
        filter: "blur(50px)",
      }}
    />
    {/* Grid lines overlay */}
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.06,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="#28a745"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    {/* Floating document shapes */}
    {[
      { top: "8%", left: "6%", rotate: "-12deg", scale: 0.9, opacity: 0.18 },
      { top: "18%", right: "8%", rotate: "8deg", scale: 0.7, opacity: 0.14 },
      {
        bottom: "22%",
        left: "4%",
        rotate: "15deg",
        scale: 0.75,
        opacity: 0.12,
      },
      {
        bottom: "10%",
        right: "6%",
        rotate: "-6deg",
        scale: 1.1,
        opacity: 0.16,
      },
      { top: "50%", left: "14%", rotate: "20deg", scale: 0.6, opacity: 0.1 },
      { top: "40%", right: "5%", rotate: "-18deg", scale: 0.8, opacity: 0.13 },
    ].map((s, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          ...s,
          transform: `rotate(${s.rotate}) scale(${s.scale})`,
          opacity: s.opacity,
          animation: `floatDoc${i % 3} ${6 + i * 1.2}s ease-in-out infinite`,
        }}
      >
        <svg width="70" height="88" viewBox="0 0 70 88" fill="none">
          <rect width="70" height="88" rx="6" fill="#28a745" />
          <rect
            x="10"
            y="22"
            width="50"
            height="4"
            rx="2"
            fill="white"
            fillOpacity="0.7"
          />
          <rect
            x="10"
            y="32"
            width="40"
            height="3"
            rx="2"
            fill="white"
            fillOpacity="0.5"
          />
          <rect
            x="10"
            y="41"
            width="45"
            height="3"
            rx="2"
            fill="white"
            fillOpacity="0.5"
          />
          <rect
            x="10"
            y="50"
            width="30"
            height="3"
            rx="2"
            fill="white"
            fillOpacity="0.4"
          />
          <path d="M50 0 L70 20 L50 20 Z" fill="white" fillOpacity="0.2" />
        </svg>
      </div>
    ))}
    {/* Floating connection dots */}
    {[
      { top: "30%", left: "20%", size: 6 },
      { top: "65%", left: "30%", size: 4 },
      { top: "20%", right: "25%", size: 5 },
      { bottom: "35%", right: "20%", size: 7 },
      { top: "75%", left: "60%", size: 4 },
      { top: "45%", right: "35%", size: 5 },
    ].map((d, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          ...d,
          width: d.size,
          height: d.size,
          borderRadius: "50%",
          background: "#5dd879",
          opacity: 0.35,
          boxShadow: `0 0 ${d.size * 3}px #28a745`,
          animation: `pulse ${2 + i * 0.5}s ease-in-out infinite alternate`,
        }}
      />
    ))}
    <style>{`
      @keyframes floatDoc0 { 0%,100%{transform:translateY(0) rotate(-12deg) scale(0.9)} 50%{transform:translateY(-14px) rotate(-12deg) scale(0.9)} }
      @keyframes floatDoc1 { 0%,100%{transform:translateY(0) rotate(8deg) scale(0.7)} 50%{transform:translateY(-10px) rotate(8deg) scale(0.7)} }
      @keyframes floatDoc2 { 0%,100%{transform:translateY(0) rotate(15deg) scale(0.75)} 50%{transform:translateY(-12px) rotate(15deg) scale(0.75)} }
      @keyframes pulse { from{opacity:0.2} to{opacity:0.5} }
    `}</style>
  </div>
 );
}
