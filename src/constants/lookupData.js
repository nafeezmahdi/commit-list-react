export const lookup = {
  users: [
    { user_id: 1, name: "Nafeez Mahdi", email: "nafeez@example.com" },
    { user_id: 2, name: "Rahim Uddin", email: "rahim@example.com" },
    { user_id: 3, name: "Ayesha Khan", email: "ayesha@example.com" },
    { user_id: 4, name: "Sadia Akter", email: "sadia@example.com" },
    { user_id: 5, name: "Tanvir Hasan", email: "tanvir@example.com" },
    { user_id: 6, name: "Farhana Rahman", email: "farhana@example.com" },
    { user_id: 7, name: "Imran Hossain", email: "imran@example.com" },
    { user_id: 8, name: "Nusrat Jahan", email: "nusrat@example.com" },
    { user_id: 9, name: "Mehedi Alam", email: "mehedi@example.com" },
    { user_id: 10, name: "Ritu Sultana", email: "ritu@example.com" },
  ],
  categories: [
    { category_id: 1, name: "Work" },
    { category_id: 2, name: "Personal" },
    { category_id: 3, name: "Study" },
    { category_id: 4, name: "Health" },
  ],
  statuses: [
    { status_id: 1, status: "Pending" },
    { status_id: 2, status: "In Progress" },
    { status_id: 3, status: "Completed" },
  ],
  priorities: [
    { priority_id: 1, level: "Low" },
    { priority_id: 2, level: "Medium" },
    { priority_id: 3, level: "High" },
  ],
  tags: [
    { tag_id: 1, name: "Urgent" },
    { tag_id: 2, name: "Home" },
    { tag_id: 3, name: "Exam" },
    { tag_id: 4, name: "Fitness" },
  ],
};

const byId = (arr, key) =>
  Object.fromEntries(arr.map((item) => [item[key], item]));
export const usersById = byId(lookup.users, "user_id");
export const categoriesById = byId(lookup.categories, "category_id");
export const statusesById = byId(lookup.statuses, "status_id");
export const prioritiesById = byId(lookup.priorities, "priority_id");

export const statusClass = {
  Pending: "bg-amber-100 text-amber-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-emerald-100 text-emerald-800",
};
export const priorityClass = {
  Low: "bg-slate-200 text-slate-700",
  Medium: "bg-orange-100 text-orange-800",
  High: "bg-rose-100 text-rose-800",
};
