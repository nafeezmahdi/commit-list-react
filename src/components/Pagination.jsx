export default function Pagination({
  showingFrom,
  showingTo,
  total,
  filters,
  setFilters,
  totalPages,
}) {
  return (
    <div
      id="pagination"
      className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-slate-600">
        Showing{" "}
        <span className="font-semibold text-slate-900">
          {showingFrom}-{showingTo}
        </span>{" "}
        of <span className="font-semibold text-slate-900">{total}</span>
      </p>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          disabled={filters.page === 1}
          onClick={() => setFilters((p) => ({ ...p, page: p.page - 1 }))}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ◀ Prev
        </button>
        <span className="min-w-[8ch] text-center text-sm font-semibold text-slate-700">
          Page {filters.page}/{totalPages}
        </span>
        <button
          type="button"
          disabled={filters.page === totalPages}
          onClick={() => setFilters((p) => ({ ...p, page: p.page + 1 }))}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
