export default function FilterSection({
  filters,
  setFilters,
  lookup,
  onReset,
}) {
  const handleFilterChange = (key, val) => {
    setFilters((prev) => ({ ...prev, [key]: val, page: 1 }));
  };

  return (
    <section id="filters" class="rounded-xl bg-white p-4 shadow-sm">
      <div class="mb-4 flex items-center justify-between gap-3">
        <h2 class="flex items-center gap-2 text-lg font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5h18M6 12h12m-9 7h6"
            />
          </svg>
          Filter Todos
        </h2>
        <button
          id="resetFiltersBtn"
          type="button"
          onClick={onReset}
          class="inline-flex items-center gap-1 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 4v6h6M20 20v-6h-6"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20 9a8 8 0 0 0-14-3M4 15a8 8 0 0 0 14 3"
            />
          </svg>
          Reset Filters
        </button>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <label class="text-sm">
          <span class="mb-1 block text-slate-600">Search</span>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Title or description"
            class="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />
        </label>
        <label class="text-sm">
          <span class="mb-1 block text-slate-600">User</span>
          <select
            value={filters.userId}
            onChange={(e) => handleFilterChange("userId", e.target.value)}
            class="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">All</option>
            {lookup.users.map((u) => (
              <option key={u.user_id} value={u.user_id}>
                {u.name}
              </option>
            ))}
          </select>
        </label>
        <label class="text-sm">
          <span class="mb-1 block text-slate-600">Category</span>
          <select
            value={filters.categoryId}
            onChange={(e) => handleFilterChange("categoryId", e.target.value)}
            class="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">All</option>
            {lookup.categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label class="text-sm">
          <span class="mb-1 block text-slate-600">Status</span>
          <select
            value={filters.statusId}
            onChange={(e) => handleFilterChange("statusId", e.target.value)}
            class="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">All</option>
            {lookup.statuses.map((s) => (
              <option key={s.status_id} value={s.status_id}>
                {s.status}
              </option>
            ))}
          </select>
        </label>
        <label class="text-sm">
          <span class="mb-1 block text-slate-600">Priority</span>
          <select
            value={filters.priorityId}
            onChange={(e) => handleFilterChange("priorityId", e.target.value)}
            class="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">All</option>
            {lookup.priorities.map((p) => (
              <option key={p.priority_id} value={p.priority_id}>
                {p.level}
              </option>
            ))}
          </select>
        </label>
        <label class="text-sm">
          <span class="mb-1 block text-slate-600">Tag</span>
          <select
            value={filters.tagId}
            onChange={(e) => handleFilterChange("tagId", e.target.value)}
            class="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">All</option>
            {lookup.tags.map((t) => (
              <option key={t.tag_id} value={t.tag_id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
