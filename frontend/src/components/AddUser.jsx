// pages/AddUser.jsx
// Reuses Input and PrimaryBtn from your existing components
import { useState } from "react";
import Input from "./ui/Input";
import PrimaryBtn from "./ui/PrimaryBtn";
import { User, Hash, Mail, ShieldCheck } from "lucide-react";

const ROLES = [
  { value: "INDEXER",      label: "Indexer" },
  { value: "CREATOR",      label: "Batch Creator" },
  { value: "ASSEMBLER",    label: "Assembler" },
  { value: "QC",           label: "QC" },
  { value: "SCANNER",      label: "Scanner" },
  { value: "RUNNER",       label: "Runner" },
  { value: "tech-support", label: "Technical Support" },
];

const EMPTY = { persal: "", fullName: "", email: "", role: "" };

export default function AddUser() {
  const [form, setForm]     = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
    setSuccess(false);
  };

  const validate = () => {
    const e = {};
    if (!form.persal.trim())   e.persal   = "Persal number is required";
    if (!form.fullName.trim()) e.fullName  = "Name & surname is required";
    if (!form.email.trim())    e.email     = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.role)            e.role      = "Please select a role";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    // TODO: replace setTimeout with your real API call
    setTimeout(() => {
      console.log("New user submitted:", form);
      setLoading(false);
      setSuccess(true);
      setForm(EMPTY);
    }, 1600);
  };

  return (
    <div className="max-w-xl mx-auto">

      {/* ── Page heading ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
          Add New User
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
          Fill in the details below to register a new team member.
        </p>
        <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #28a745, transparent)", marginTop: 10 }}/>
      </div>

      {/* ── Card ── */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(40,167,69,0.15)",
        borderRadius: 20,
        padding: "2rem 2rem",
        boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
      }}>

        <Input
          label="Persal Number"
          type="text"
          placeholder="e.g. 00123456"
          value={form.persal}
          onChange={set("persal")}
          icon={<Hash size={16}/>}
          error={errors.persal}
        />

        <Input
          label="Name & Surname"
          type="text"
          placeholder="e.g. Jane Dlamini"
          value={form.fullName}
          onChange={set("fullName")}
          icon={<User size={16}/>}
          error={errors.fullName}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="jane@company.com"
          value={form.email}
          onChange={set("email")}
          icon={<Mail size={16}/>}
          error={errors.email}
        />

        {/* ── Role select ── */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase mb-1.5"
            style={{ color: "#6c757d", letterSpacing: "0.1em" }}>
            Role
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 pointer-events-none" style={{ color: "#6c757d" }}>
              <ShieldCheck size={16}/>
            </div>
            <select
              value={form.role}
              onChange={set("role")}
              style={{
                width: "100%",
                paddingLeft: "2.75rem",
                paddingRight: "1rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                background: "rgba(255,255,255,0.04)",
                border: errors.role ? "1px solid #dc3545" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                color: form.role ? "#f1f5f9" : "#6c757d",
                fontSize: 14,
                outline: "none",
                appearance: "none",
                cursor: "pointer",
                transition: "border 0.2s, box-shadow 0.2s",
              }}
              onFocus={e => { e.target.style.border = "1px solid #28a745"; e.target.style.boxShadow = "0 0 0 3px rgba(40,167,69,0.15)"; }}
              onBlur={e => { e.target.style.border = errors.role ? "1px solid #dc3545" : "1px solid rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
            >
              <option value="" style={{ background: "#0a1628" }}>-- Select a Role --</option>
              {ROLES.map((r) => (
                <option key={r.value} value={r.value} style={{ background: "#0a1628", color: "#f1f5f9" }}>
                  {r.label}
                </option>
              ))}
            </select>
            {/* chevron */}
            <div className="absolute right-3.5 pointer-events-none" style={{ color: "#6c757d" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
          {errors.role && <p className="text-xs mt-1.5" style={{ color: "#dc3545" }}>{errors.role}</p>}
        </div>

        {/* ── Success banner ── */}
        {success && (
          <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl text-sm"
            style={{ background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)", color: "#5dd879" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            User added successfully!
          </div>
        )}

        <PrimaryBtn loading={loading} onClick={handleSubmit}>
          Add User →
        </PrimaryBtn>
      </div>
    </div>
  );
}