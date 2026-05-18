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
    <div class="lg:col-span-2 space-y-4">
      <div class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold">
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
              d="M9 11l3 3L22 4"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
            />
          </svg>
          Todos
        </h2>

        <div id="todoList" class="space-y-3">
          {pageItems.length === 0 ? (
            <p class="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">
              No todos found for the selected filters.
            </p>
          ) : (
            pageItems.map((todo, i) => {
              const user = usersById[todo.user_id];
              const category = categoriesById[todo.category_id];
              const status = statusesById[todo.status_id]?.status;
              const priority = prioritiesById[todo.priority_id]?.level;
              const related = getTodoRelated(todo.todo_id);
              const completeSubtasks = related.subtasks.filter(
                (s) => s.is_completed,
              ).length;

              return (
                <article
                  key={todo.todo_id}
                  style={{ animationDelay: `${i * 70}ms` }}
                  class="todo-card-animate rounded-lg border border-slate-200 p-4 transition-shadow hover:shadow-md bg-white"
                >
                  <div class="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 class="text-lg font-semibold">
                        <button
                          onClick={() => onCardClick(todo.todo_id)}
                          class="text-indigo-700 hover:underline text-left font-semibold"
                        >
                          {todo.title}
                        </button>
                      </h3>
                      <p class="text-sm text-slate-600">{todo.description}</p>
                    </div>
                    <div class="flex gap-2">
                      <span
                        class={`rounded-full px-3 py-1.5 text-sm font-semibold ${statusClass[status]}`}
                      >
                        {status}
                      </span>
                      <span
                        class={`rounded-full px-3 py-1.5 text-sm font-semibold ${priorityClass[priority]}`}
                      >
                        {priority}
                      </span>
                    </div>
                  </div>

                  <div class="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
                    <p>
                      <span class="font-medium text-slate-800">Assignee:</span>{" "}
                      {user ? (
                        <span class="ml-1 rounded bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                          {user.name}
                        </span>
                      ) : (
                        "-"
                      )}
                    </p>
                    <p>
                      <span class="font-medium text-slate-800">Category:</span>{" "}
                      {category ? (
                        <span class="ml-1 rounded bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                          {category.name}
                        </span>
                      ) : (
                        "-"
                      )}
                    </p>
                    <p>
                      <span class="font-medium text-slate-800">Due Date:</span>{" "}
                      {todo.due_date ? todo.due_date.substring(0, 10) : "-"}
                    </p>
                    <p>
                      <span class="font-medium text-slate-800">Subtasks:</span>{" "}
                      {completeSubtasks}/{related.subtasks.length}
                    </p>
                    <p>
                      <span class="font-medium text-slate-800">Comments:</span>{" "}
                      {related.comments.length}
                    </p>
                    <p>
                      <span class="font-medium text-slate-800">
                        Attachments:
                      </span>{" "}
                      {related.attachments.length}
                    </p>
                  </div>

                  <div class="mt-3 space-y-2 text-sm">
                    <p>
                      <span class="font-medium text-slate-800">Tags:</span>{" "}
                      {related.tags.length ? (
                        related.tags.map((t) => (
                          <span
                            key={t.tag_id}
                            class="ml-1 rounded bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700"
                          >
                            {t.name}
                          </span>
                        ))
                      ) : (
                        <span class="text-slate-500">None</span>
                      )}
                    </p>
                    <p>
                      <span class="font-medium text-slate-800">Reminder:</span>{" "}
                      {related.reminders.length ? (
                        related.reminders.map((r) => r.reminder_time).join(", ")
                      ) : (
                        <span class="text-slate-500">None</span>
                      )}
                    </p>
                    <p>
                      <span class="font-medium text-slate-800">Recurring:</span>{" "}
                      {related.recurring ? (
                        related.recurring.repeat_type
                      ) : (
                        <span class="text-slate-500">No</span>
                      )}
                    </p>
                    <p>
                      <span class="font-medium text-slate-800">
                        Shared with:
                      </span>{" "}
                      {related.sharedUsers.length ? (
                        related.sharedUsers.map((u) => u.name).join(", ")
                      ) : (
                        <span class="text-slate-500">Only assignee</span>
                      )}
                    </p>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {pageItems.length > 0 && (
          <div
            id="pagination"
            class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p class="text-sm text-slate-600">
              Showing{" "}
              <span class="font-semibold text-slate-900">
                {showingFrom}-{showingTo}
              </span>{" "}
              of <span class="font-semibold text-slate-900">{total}</span>
            </p>
            <div class="flex items-center justify-end gap-2">
              <button
                type="button"
                disabled={filters.page === 1}
                onClick={() => setFilters((p) => ({ ...p, page: p.page - 1 }))}
                class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ◀ Prev
              </button>
              <span class="min-w-[8ch] text-center text-sm font-semibold text-slate-700">
                Page {filters.page}/{totalPages}
              </span>
              <button
                type="button"
                disabled={filters.page === totalPages}
                onClick={() => setFilters((p) => ({ ...p, page: p.page + 1 }))}
                class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
