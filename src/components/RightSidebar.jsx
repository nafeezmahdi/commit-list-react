export default function RightSidebar({ lookup, filters, setFilters }) {
  return (
    <aside className="space-y-4 lg:col-span-1">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Users 👥</h2>
        <div id="usersList" className="space-y-2">
          {lookup.users.map((u) => (
            <button
              key={u.user_id}
              type="button"
              onClick={() =>
                setFilters((p) => ({
                  ...p,
                  userId:
                    p.userId === String(u.user_id) ? "" : String(u.user_id),
                  page: 1,
                }))
              }
              className={`user-chip w-full rounded-md border border-slate-200 p-2 text-left hover:bg-slate-50 ${filters.userId === String(u.user_id) ? "ring-2 ring-slate-400" : ""}`}
            >
              <p className="font-medium">{u.name}</p>
              <p className="text-xs text-slate-500">{u.email}</p>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
