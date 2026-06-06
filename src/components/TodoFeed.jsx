import Pagination from "./Pagination";
import TodoCard from "./TodoCard";

export default function TodoFeed({
  pageItems,
  total,
  filters,
  setFilters,
  totalPages,
  start,
  pageSize,
  usersById,
  categoriesById,
  statusesById,
  prioritiesById,
  getTodoRelated,
  statusClass,
  priorityClass,
  onCardClick,
}) {
  const showingFrom = total === 0 ? 0 : start + 1;
  const showingTo = Math.min(start + pageSize, total);

  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
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
              d="M9 11l3 3L22 4"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
            />
          </svg>
          Todos
        </h2>

        <div id="todoList" className="space-y-3">
          {pageItems.length === 0 ? (
            <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">
              No todos found for the selected filters.
            </p>
          ) : (
            pageItems.map((todo, i) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                index={i}
                usersById={usersById}
                categoriesById={categoriesById}
                statusesById={statusesById}
                prioritiesById={prioritiesById}
                getTodoRelated={getTodoRelated}
                statusClass={statusClass}
                priorityClass={priorityClass}
                onCardClick={onCardClick}
              />
            ))
          )}
        </div>

        {pageItems.length > 0 && (
          <Pagination
            showingFrom={showingFrom}
            showingTo={showingTo}
            total={total}
            filters={filters}
            setFilters={setFilters}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
}
