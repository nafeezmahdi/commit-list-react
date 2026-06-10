export default function TodoCard({
  todo,
  index,
  usersById,
  categoriesById,
  statusesById,
  prioritiesById,
  statusClass,
  priorityClass,
  getTodoRelated,
  onCardClick,
  onEdit,
  onDelete,
}) {
  const status = statusesById[todo.status_id]?.status || "Pending";
  const priority = prioritiesById[todo.priority_id]?.level || "Medium";
  const related = getTodoRelated(todo.todo_id) || {};
  const assignee = todo.assignee || usersById[todo.user_id]?.name;
  const categoryName = todo.category || categoriesById[todo.category_id]?.name;
  const tags = todo.tags?.length ? todo.tags : related.tags || [];
  const completeSubtasks = (related.subtasks || []).filter(
    (s) => s.is_completed,
  ).length;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${todo.title}"?`)) {
      onDelete(todo._id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(todo);
  };

  return (
    <article
      key={todo._id}
      style={{ animationDelay: `${index * 70}ms` }}
      className="todo-card-animate group rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold">
            <button
              onClick={() => onCardClick(todo._id)}
              className="text-left font-semibold text-indigo-700 transition-colors hover:text-indigo-900 hover:underline"
            >
              {todo.title}
            </button>
          </h3>
          <p className="mt-0.5 text-sm text-slate-600 line-clamp-2">
            {todo.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 opacity-80 transition-opacity group-hover:opacity-100">
            <button
              onClick={handleEdit}
              title="Edit todo"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              title="Delete todo"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-sm font-semibold ${statusClass[status]}`}
            >
              {status}
            </span>
            <span
              className={`rounded-full px-3 py-1.5 text-sm font-semibold ${priorityClass[priority]}`}
            >
              {priority}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
        <p>
          <span className="font-medium text-slate-800">Assignee:</span>{" "}
          {assignee ? (
            <span className="ml-1 rounded bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
              {assignee}
            </span>
          ) : (
            "-"
          )}
        </p>
        <p>
          <span className="font-medium text-slate-800">Category:</span>{" "}
          {categoryName ? (
            <span className="ml-1 rounded bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
              {categoryName}
            </span>
          ) : (
            "-"
          )}
        </p>
        <p>
          <span className="font-medium text-slate-800">Due Date:</span>{" "}
          {todo.due_date ? todo.due_date.substring(0, 10) : "-"}
        </p>
        <p>
          <span className="font-medium text-slate-800">Subtasks:</span>{" "}
          {completeSubtasks}/{related.subtasks.length}
        </p>
        <p>
          <span className="font-medium text-slate-800">Comments:</span>{" "}
          {related.comments.length}
        </p>
        <p>
          <span className="font-medium text-slate-800">Attachments:</span>{" "}
          {related.attachments.length}
        </p>
      </div>

      <div className="mt-3 space-y-2 text-sm">
        <p>
          <span className="font-medium text-slate-800">Tags:</span>{" "}
          {tags.length ? (
            tags.map((t, i) => (
              <span
                key={t.tag_id ?? i}
                className="ml-1 rounded bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700"
              >
                {typeof t === "string" ? t : t.name}
              </span>
            ))
          ) : (
            <span className="text-slate-500">None</span>
          )}
        </p>
        <p>
          <span className="font-medium text-slate-800">Reminder:</span>{" "}
          {related.reminders.length ? (
            related.reminders.map((r) => r.reminder_time).join(", ")
          ) : (
            <span className="text-slate-500">None</span>
          )}
        </p>
        <p>
          <span className="font-medium text-slate-800">Recurring:</span>{" "}
          {related.recurring ? (
            related.recurring.repeat_type
          ) : (
            <span className="text-slate-500">No</span>
          )}
        </p>
        <p>
          <span className="font-medium text-slate-800">Shared with:</span>{" "}
          {related.sharedUsers.length ? (
            related.sharedUsers.map((u) => u.name).join(", ")
          ) : (
            <span className="text-slate-500">Only assignee</span>
          )}
        </p>
      </div>
    </article>
  );
}
