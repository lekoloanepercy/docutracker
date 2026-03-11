// navConfig.js
// Edit the `path`, `label`, and icon names here to match your real routes.
// Icons are from lucide-react — swap any name freely.

export const MANAGER_NAV = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard",         path: "/manager/dashboard",  icon: "LayoutDashboard" },
    ],
  },
  {
    section: "People",
    items: [
      { label: "Add users",   path: "manager/team/add",       icon: "Users" },
      { label: "View/Edit/Remove users",   path: "manager/team/users",  icon: "Users" },
    ],
  },
    {
    section: "Tasks",
    items: [
      { label: "Add Tasks",   path: "manager/task/add",       icon: "Users" },
      { label: "View/Edit/Remove tasks",   path: "manager/team/users",  icon: "Users" },
    ],
  },
  {
    section: "Insights",
    items: [
      { label: "Reports",           path: "/manager/reports",    icon: "BarChart3" },
      { label: "Analytics",         path: "/manager/analytics",  icon: "TrendingUp" },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Settings",          path: "/manager/settings",   icon: "Settings2" },
    ],
  },
];

export const WORKER_NAV = [
  {
    section: "My Workspace",
    items: [
      { label: "My Dashboard",      path: "/worker/dashboard",   icon: "LayoutDashboard" },
      { label: "My Documents",      path: "/worker/documents",   icon: "FileText" },
    ],
  },
  {
    section: "Actions",
    items: [
      { label: "Submit / Upload",   path: "/worker/submit",      icon: "Upload" },
      { label: "Tasks",             path: "/worker/tasks",       icon: "ClipboardList" },
    ],
  },
];

// Helper — pick the right nav based on role
export function getNavByRole(role) {
  return role === "MANAGER" ? MANAGER_NAV : WORKER_NAV;
}