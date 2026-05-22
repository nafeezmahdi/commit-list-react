export default function FilterGroup({
  title,
  items,
  idKey,
  labelKey,
  filterKey,
  activeValue,
  onToggle,
  getChipClass,
  activeRingClass,
}) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h2 class="mb-3 text-xl font-semibold">{title}</h2>
      <div id="statusesList" class="flex flex-wrap gap-2">
        {items.map((item) => {
          const id = item[idKey];
          const label = item[labelKey];
          const isActive = activeValue === String(id);
          return (
            <button
              key={id}
              onClick={() => onToggle(filterKey, id)}
              type="button"
              className={`${getChipClass(item)} ${isActive ? activeRingClass : ""}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
