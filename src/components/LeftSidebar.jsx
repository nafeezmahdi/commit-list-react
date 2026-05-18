export default function LeftSidebar({
  lookup,
  filters,
  setFilters,
  statusClass,
  priorityClass,
}) {
  const toggleFilter = (key, id) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === String(id) ? "" : String(id),
      page: 1,
    }));
  };

  return (
    <aside class="space-y-4 lg:col-span-1">
      <div class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="mb-3 text-xl font-semibold">Status 🚦</h2>
        <div id="statusesList" class="flex flex-wrap gap-2">
          {lookup.statuses.map((s) => (
            <button
              key={s.status_id}
              onClick={() => toggleFilter("statusId", s.status_id)}
              type="button"
              class={`status-chip rounded-full px-4 py-2 text-sm font-semibold ${statusClass[s.status]} hover:opacity-90 ${filters.statusId === String(s.status_id) ? "ring-2 ring-blue-400" : ""}`}
            >
              {s.status}
            </button>
          ))}
        </div>
      </div>

      <div class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="mb-3 text-xl font-semibold">Priority ⚡</h2>
        <div id="prioritiesList" class="flex flex-wrap gap-2">
          {lookup.priorities.map((p) => (
            <button
              key={p.priority_id}
              onClick={() => toggleFilter("priorityId", p.priority_id)}
              type="button"
              class={`priority-chip rounded-full px-4 py-2 text-sm font-semibold ${priorityClass[p.level]} hover:opacity-90 ${filters.priorityId === String(p.priority_id) ? "ring-2 ring-rose-400" : ""}`}
            >
              {p.level}
            </button>
          ))}
        </div>
      </div>

      <div class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="mb-3 text-xl font-semibold">Categories 🗂️</h2>
        <div id="categoriesList" class="flex flex-wrap gap-2">
          {lookup.categories.map((c) => (
            <button
              key={c.category_id}
              onClick={() => toggleFilter("categoryId", c.category_id)}
              type="button"
              class={`category-chip rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-200 ${filters.categoryId === String(c.category_id) ? "ring-2 ring-indigo-400" : ""}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="mb-3 text-xl font-semibold">Tags 🏷️</h2>
        <div id="tagsList" class="flex flex-wrap gap-2">
          {lookup.tags.map((t) => (
            <button
              key={t.tag_id}
              onClick={() => toggleFilter("tagId", t.tag_id)}
              type="button"
              class={`tag-chip rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-200 ${filters.tagId === String(t.tag_id) ? "ring-2 ring-purple-400" : ""}`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
