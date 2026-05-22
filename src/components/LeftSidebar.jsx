import FilterGroup from "./FilterGroup";

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
      <FilterGroup
        title="Status 🚦"
        items={lookup.statuses}
        idKey="status_id"
        labelKey="status"
        filterKey="statusId"
        activeValue={filters.statusId}
        onToggle={toggleFilter}
        activeRingClass="ring-2 ring-blue-400"
        getChipClass={(s) =>
          `status-chip rounded-full px-4 py-2 text-sm font-semibold hover:opacity-90 ${statusClass[s.status]}`
        }
      />

      <FilterGroup
        title="Priority ⚡"
        items={lookup.priorities}
        idKey="priority_id"
        labelKey="level"
        filterKey="priorityId"
        activeValue={filters.priorityId}
        onToggle={toggleFilter}
        activeRingClass="ring-2 ring-rose-400"
        getChipClass={(p) =>
          `priority-chip rounded-full px-4 py-2 text-sm font-semibold hover:opacity-90 ${priorityClass[p.level]}`
        }
      />

      <FilterGroup
        title="Categories 🗂️"
        items={lookup.categories}
        idKey="category_id"
        labelKey="name"
        filterKey="categoryId"
        activeValue={filters.categoryId}
        onToggle={toggleFilter}
        activeRingClass="ring-2 ring-indigo-400"
        getChipClass={() =>
          "category-chip rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-200"
        }
      />

      <FilterGroup
        title="Tags 🏷️"
        items={lookup.tags}
        idKey="tag_id"
        labelKey="name"
        filterKey="tagId"
        activeValue={filters.tagId}
        onToggle={toggleFilter}
        activeRingClass="ring-2 ring-purple-400"
        getChipClass={() =>
          "tag-chip rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-200"
        }
      />
    </aside>
  );
}
