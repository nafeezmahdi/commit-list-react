export const LOOKUP_DATA = {
  users: [
    { id: 1, name: "Nafeez Mahdi", email: "nafeez@example.com" },
    { id: 2, name: "Rahim Uddin", email: "rahim@example.com" },
    { id: 3, name: "Ayesha Khan", email: "ayesha@example.com" },
    { id: 4, name: "Sadia Akter", email: "sadia@example.com" },
  ],
  categories: { 1: "Work", 2: "Personal", 3: "Study", 4: "Health" },
  statuses: { 1: "Pending", 2: "In Progress", 3: "Completed" },
  priorities: { 1: "Low", 2: "Medium", 3: "High" },
};

export const STATUS_COLORS = {
  Pending: "bg-amber-100 text-amber-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-emerald-100 text-emerald-800",
};

export const PRIORITY_COLORS = {
  Low: "bg-slate-200 text-slate-700",
  Medium: "bg-orange-100 text-orange-800",
  High: "bg-rose-100 text-rose-800",
};
