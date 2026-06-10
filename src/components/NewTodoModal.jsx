import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500";

export default function NewTodoModal({
  lookup,
  onClose,
  onSuccess,
  todo = null,
}) {
  const isEdit = Boolean(todo);
  const [loading, setLoading] = useState(false);
  const formatTagsForInput = (tags) => {
    if (!tags?.length) return "";
    return tags
      .map((t) => (typeof t === "string" ? t : t.name))
      .filter(Boolean)
      .join(", ");
  };

  const [formData, setFormData] = useState({
    title: todo?.title || "",
    description: todo?.description || "",
    assignee: todo?.assignee || "",
    category: todo?.category || "",
    tags: formatTagsForInput(todo?.tags),
    status_id: todo?.status_id || "1",
    priority_id: todo?.priority_id || "2",
    due_date: todo?.due_date ? todo.due_date.substring(0, 10) : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSuccess(formData, todo?._id);
      onClose();
    } catch (error) {
      alert(`Failed to ${isEdit ? "update" : "create"} task`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl shadow-indigo-500/10 ring-1 ring-slate-200/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 px-6 py-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                {isEdit ? "Edit Todo" : "Create New Todo"}
              </h2>
              <p className="mt-0.5 text-sm text-indigo-100">
                {isEdit
                  ? "Update task details below"
                  : "Fill in the details to add a new task"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className={labelClass}>Title *</label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              placeholder="What needs to be done?"
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              placeholder="Add more context..."
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Assignee</label>
              <input
                type="text"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className={inputClass}
                placeholder="Who is responsible?"
              />
            </div>
            <div>
              <label className={labelClass}>Due Date</label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Work, Personal"
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                name="status_id"
                value={formData.status_id}
                onChange={handleChange}
                className={inputClass}
              >
                {lookup.statuses.map((s) => (
                  <option key={s.status_id} value={s.status_id}>
                    {s.status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <select
                name="priority_id"
                value={formData.priority_id}
                onChange={handleChange}
                className={inputClass}
              >
                {lookup.priorities.map((p) => (
                  <option key={p.priority_id} value={p.priority_id}>
                    {p.level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Urgent, Home, Exam (comma-separated)"
            />
            <p className="mt-1 text-xs text-slate-400">
              Add one or more tags separated by commas
            </p>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl disabled:opacity-50 disabled:hover:shadow-lg"
            >
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
