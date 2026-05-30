import { useState } from "react";

export default function NewTodoModal({ onClose, onSuccess, lookup }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user_id: "",
    category_id: "",
    status_id: "1", // Default to Pending
    priority_id: "2", // Default to Medium
    due_date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Convert string IDs to numbers for the SQL backend
        body: JSON.stringify({
          ...formData,
          user_id: formData.user_id ? Number(formData.user_id) : null,
          category_id: formData.category_id
            ? Number(formData.category_id)
            : null,
          status_id: formData.status_id ? Number(formData.status_id) : null,
          priority_id: formData.priority_id
            ? Number(formData.priority_id)
            : null,
        }),
      });

      if (!response.ok) throw new Error("Failed to create todo");

      onSuccess(); // Triggers a re-fetch in App.jsx
      onClose(); // Closes the modal
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Create New Todo</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-rose-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title *
            </label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              placeholder="Task name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              placeholder="Task details..."
              rows="3"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Assignee
              </label>
              <select
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              >
                <option value="">Unassigned</option>
                {lookup.users.map((u) => (
                  <option key={u.user_id} value={u.user_id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              >
                <option value="">None</option>
                {lookup.categories.map((c) => (
                  <option key={c.category_id} value={c.category_id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select
                name="status_id"
                value={formData.status_id}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              >
                {lookup.statuses.map((s) => (
                  <option key={s.status_id} value={s.status_id}>
                    {s.status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Priority
              </label>
              <select
                name="priority_id"
                value={formData.priority_id}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              >
                {lookup.priorities.map((p) => (
                  <option key={p.priority_id} value={p.priority_id}>
                    {p.level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
