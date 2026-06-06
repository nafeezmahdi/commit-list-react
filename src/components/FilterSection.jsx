import FilterHeader from "./FilterHeader";
import FilterInput from "./FilterInput";
import FilterSelect from "./FilterSelect";

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
    <section id="filters" className="rounded-xl bg-white p-4 shadow-sm">
      <FilterHeader onReset={onReset} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <FilterInput
          label="Search"
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          placeholder="Title or description"
        />
        <FilterSelect
          label="User"
          value={filters.userId}
          onChange={(e) => handleFilterChange("userId", e.target.value)}
          options={lookup.users}
          valueKey="user_id"
          labelKey="name"
        />

        <FilterSelect
          label="Category"
          value={filters.categoryId}
          onChange={(e) => handleFilterChange("categoryId", e.target.value)}
          options={lookup.categories}
          valueKey="category_id"
          labelKey="name"
        />

        <FilterSelect
          label="Status"
          value={filters.statusId}
          onChange={(e) => handleFilterChange("statusId", e.target.value)}
          options={lookup.statuses}
          valueKey="status_id"
          labelKey="status"
        />

        <FilterSelect
          label="Priority"
          value={filters.priorityId}
          onChange={(e) => handleFilterChange("priorityId", e.target.value)}
          options={lookup.priorities}
          valueKey="priority_id"
          labelKey="level"
        />

        <FilterSelect
          label="Tag"
          value={filters.tagId}
          onChange={(e) => handleFilterChange("tagId", e.target.value)}
          options={lookup.tags}
          valueKey="tag_id"
          labelKey="name"
        />
      </div>
    </section>
  );
}
