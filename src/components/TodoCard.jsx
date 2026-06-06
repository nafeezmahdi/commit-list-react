export default function TodoCard({
  todo,
  index,
  usersById,
  categoriesById,
  statusesById,
  prioritiesById,
  getTodoRelated,
  statusClass,
  priorityClass,
  onCardClick,
}) {
  const user = usersById[todo._id];
  const category = categoriesById[todo.category_id];
  const status = statusesById[todo.status_id]?.status;
  const priority = prioritiesById[todo.priority_id]?.level;
  const related = getTodoRelated(todo.todo_id);
  const completeSubtasks = related.subtasks.filter(
    (s) => s.is_completed,
  ).length;

  return (
    <article
      key={todo._id}
      style={{ animationDelay: `${index * 70}ms` }}
      className="todo-card-animate rounded-lg border border-slate-200 p-4 transition-shadow hover:shadow-md bg-white"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">
            <button
              onClick={() => onCardClick(todo._id)}
              className="text-indigo-700 hover:underline text-left font-semibold"
            >
              {todo.title}
            </button>
          </h3>
          <p className="text-sm text-slate-600">{todo.description}</p>
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

      <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
        <p>
          <span className="font-medium text-slate-800">Assignee:</span>{" "}
          {user ? (
            <span className="ml-1 rounded bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
              {user.name}
            </span>
          ) : (
            "-"
          )}
        </p>
        <p>
          <span className="font-medium text-slate-800">Category:</span>{" "}
          {category ? (
            <span className="ml-1 rounded bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
              {category.name}
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
          {related.tags.length ? (
            related.tags.map((t) => (
              <span
                key={t.tag_id}
                className="ml-1 rounded bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700"
              >
                {t.name}
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
