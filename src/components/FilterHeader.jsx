export default function FilterHeader({ onReset }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-indigo-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5h18M6 12h12m-9 7h6"
          />
        </svg>
        Filter Todos
      </h2>
      <button
        id="resetFiltersBtn"
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-slate-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v6h6M20 20v-6h-6"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 9a8 8 0 0 0-14-3M4 15a8 8 0 0 0 14 3"
          />
        </svg>
        Reset Filters
      </button>
    </div>
  );
}
