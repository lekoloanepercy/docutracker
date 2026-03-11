// pages/ViewUsers.jsx
import { useState } from "react";
import { Trash2, Pencil, Search, Users } from "lucide-react";

// ── Static mock data — replace with your real API call ──────────────────────
const MOCK_USERS = [
  { id: 1, persal: "00112233", fullName: "Jane Dlamini",    role: "INDEXER",      email: "jane.dlamini@company.com" },
  { id: 2, persal: "00445566", fullName: "Sipho Nkosi",     role: "CREATOR",      email: "sipho.nkosi@company.com" },
  { id: 3, persal: "00778899", fullName: "Ayanda Mokoena",  role: "QC",           email: "ayanda.mokoena@company.com" },
  { id: 4, persal: "00334455", fullName: "Thabo Sithole",   role: "SCANNER",      email: "thabo.sithole@company.com" },
  { id: 5, persal: "00667788", fullName: "Lerato Khumalo",  role: "ASSEMBLER",    email: "lerato.khumalo@company.com" },
  { id: 6, persal: "00990011", fullName: "Bongani Zulu",    role: "RUNNER",       email: "bongani.zulu@company.com" },
  { id: 7, persal: "00223344", fullName: "Nomsa Hadebe",    role: "tech-support", email: "nomsa.hadebe@company.com" },
];

// ── Role badge colours ───────────────────────────────────────────────────────
const ROLE_META = {
  INDEXER:      { label: "Indexer",           color: "#17a2b8", bg: "rgba(23,162,184,0.12)"  },
  CREATOR:      { label: "Batch Creator",     color: "#ffc107", bg: "rgba(255,193,7,0.12)"   },
  ASSEMBLER:    { label: "Assembler",         color: "#28a745", bg: "rgba(40,167,69,0.12)"   },
  QC:           { label: "QC",               color: "#ff9900", bg: "rgba(255,153,0,0.12)"   },
  SCANNER:      { label: "Scanner",          color: "#5dd879", bg: "rgba(93,216,121,0.12)"  },
  RUNNER:       { label: "Runner",           color: "#6c757d", bg: "rgba(108,117,125,0.12)" },
  "tech-support":{ label: "Tech Support",    color: "#dc3545", bg: "rgba(220,53,69,0.12)"   },
};

const RoleBadge = ({ role }) => {
  const meta = ROLE_META[role] ?? { label: role, color: "#6c757d", bg: "rgba(108,117,125,0.12)" };
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
      color: meta.color, background: meta.bg,
      border: `1px solid ${meta.color}33`,
      borderRadius: 20, padding: "3px 10px",
      whiteSpace: "nowrap",
    }}>
      {meta.label}
    </span>
  );
};

export default function ViewUsers() {
  const [users, setUsers]     = useState(MOCK_USERS);
  const [search, setSearch]   = useState("");

  const filtered = users.filter((u) =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.persal.includes(search) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (ROLE_META[u.role]?.label ?? u.role).toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user) => {
    console.log("Edit clicked:", user);
    // TODO: navigate to edit page or open edit modal
  };

  const handleDelete = (user) => {
    console.log("Delete clicked:", user);
    // TODO: replace with real delete API call + confirmation dialog
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <div>

      {/* ── Page heading ── */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-white"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
            Users
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
            {users.length} registered team member{users.length !== 1 ? "s" : ""}
          </p>
          <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #28a745, transparent)", marginTop: 10 }}/>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            minWidth: 240,
          }}>
          <Search size={14} color="#6c757d"/>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, persal, role…"
            style={{
              background: "transparent", border: "none", outline: "none",
              color: "#f1f5f9", fontSize: 13, width: "100%",
            }}
          />
        </div>
      </div>

      {/* ── Table card ── */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(40,167,69,0.15)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
      }}>

        {/* Table header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr 160px 1fr 120px",
          padding: "12px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(40,167,69,0.06)",
        }}>
          {["Persal No.", "Name & Surname", "Role", "Email", "Manage"].map((h) => (
            <span key={h} style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
              color: "#6c757d", textTransform: "uppercase",
            }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Users size={36} color="#28a74540"/>
            <p style={{ color: "#6c757d", fontSize: 13 }}>No users found</p>
          </div>
        ) : (
          filtered.map((user, idx) => (
            <div
              key={user.id}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr 160px 1fr 120px",
                padding: "14px 20px",
                alignItems: "center",
                borderBottom: idx < filtered.length - 1
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(40,167,69,0.04)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* Persal */}
              <span style={{
                fontFamily: "monospace", fontSize: 13,
                color: "#9ca3af", letterSpacing: "0.05em",
              }}>
                {user.persal}
              </span>

              {/* Name */}
              <div className="flex items-center gap-2.5">
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, #28a745, #155724)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: "white",
                }}>
                  {user.fullName.charAt(0)}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>
                  {user.fullName}
                </span>
              </div>

              {/* Role */}
              <div><RoleBadge role={user.role}/></div>

              {/* Email */}
              <span style={{
                fontSize: 12, color: "#9ca3af",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {user.email}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  title="Edit user"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 32, height: 32, borderRadius: 8,
                    background: "rgba(255,193,7,0.1)",
                    border: "1px solid rgba(255,193,7,0.25)",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,193,7,0.2)"; e.currentTarget.style.borderColor = "#ffc107"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,193,7,0.1)"; e.currentTarget.style.borderColor = "rgba(255,193,7,0.25)"; }}
                >
                  <Pencil size={13} color="#ffc107"/>
                </button>

                <button
                  onClick={() => handleDelete(user)}
                  title="Delete user"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 32, height: 32, borderRadius: 8,
                    background: "rgba(220,53,69,0.1)",
                    border: "1px solid rgba(220,53,69,0.25)",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,53,69,0.2)"; e.currentTarget.style.borderColor = "#dc3545"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(220,53,69,0.1)"; e.currentTarget.style.borderColor = "rgba(220,53,69,0.25)"; }}
                >
                  <Trash2 size={13} color="#dc3545"/>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Footer count ── */}
      {filtered.length > 0 && (
        <p className="text-xs mt-4 text-right" style={{ color: "#6c757d" }}>
          Showing {filtered.length} of {users.length} users
        </p>
      )}
    </div>
  );
}