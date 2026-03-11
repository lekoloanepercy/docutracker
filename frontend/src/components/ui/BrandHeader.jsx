const DocFlowLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="10" fill="#28a745"/>
    <path d="M10 8h11l5 5v15a1 1 0 01-1 1H10a1 1 0 01-1-1V9a1 1 0 011-1z" fill="white" fillOpacity="0.9"/>
    <path d="M21 8l5 5h-4a1 1 0 01-1-1V8z" fill="white" fillOpacity="0.5"/>
    <line x1="13" y1="16" x2="23" y2="16" stroke="#28a745" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="13" y1="19.5" x2="23" y2="19.5" stroke="#28a745" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="13" y1="23" x2="19" y2="23" stroke="#28a745" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function BrandHeader ({ subtitle }) {
 return  (<div className="flex flex-col items-center mb-7">
    <div className="flex items-center gap-3 mb-3">
      <DocFlowLogo/>
      <div>
        <p className="font-black text-lg leading-none" style={{ color: "white", fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>DocuTracker</p>
        <p className="text-xs leading-none mt-0.5" style={{ color: "#28a745", letterSpacing: "0.12em" }}>WORKSPACE</p>
      </div>
    </div>
    <div style={{ width: 40, height: 1.5, background: "linear-gradient(90deg, transparent, #28a745, transparent)", margin: "8px 0" }}/>
    <p className="text-sm text-center" style={{ color: "#6c757d" }}>{subtitle}</p>
  </div>);
};
