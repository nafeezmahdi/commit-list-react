import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api";

export default function TodoDetails({ todoId, onGoBack }) {
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/todos/${todoId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setTodo(data))
      .catch(() => setError(true));
  }, [todoId]);

  if (error) {
    return (
      <div class="min-h-screen animated-page-bg text-slate-900 p-8 flex items-center justify-center">
        <article class="rounded-xl bg-white p-6 shadow-sm max-w-md text-center">
          <h2 class="text-xl font-bold text-slate-800">Todo not found</h2>
          <p class="mt-2 text-slate-600">The requested todo does not exist.</p>
          <button
            onClick={onGoBack}
            class="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </article>
      </div>
    );
  }

  if (!todo)
    return (
      <div class="text-center p-12 text-slate-500 font-semibold">
        Compiling sub-table layouts...
      </div>
    );

  const status = todo.status_name ?? "-";
  const priority = todo.priority_level ?? "-";
  const cleanDate = todo.due_date ? todo.due_date.substring(0, 10) : "-";

  return (
    <div class="min-h-screen animated-page-bg text-slate-900">
      <header class="sticky top-0 z-50 relative backdrop-blur shadow-sm">
        <div class="animated-header-bg absolute inset-0 -z-10"></div>
        <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 relative z-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
          <div class="flex items-center gap-3">
            <div class="h-11 w-11 rounded-xl shadow-sm bg-indigo-600 flex items-center justify-center font-bold text-white text-xl">
              CL
            </div>
            <div>
              <h1 class="text-2xl font-extrabold tracking-tight">
                <button
                  onClick={onGoBack}
                  class="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent text-left font-extrabold"
                >
                  CommitList
                </button>
              </h1>
              <p class="text-sm text-slate-500">
                Your daily command center for tasks, priorities, and
                productivity.
              </p>
            </div>
          </div>
          <button
            onClick={onGoBack}
            class="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div id="todoDetails">
          <article class="rounded-xl bg-white p-6 shadow-sm">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  Todo #{todo.todo_id}
                </p>
                <h2 class="mt-1 text-2xl font-bold">{todo.title}</h2>
                <p class="mt-2 text-slate-600">{todo.description}</p>
              </div>
              <div class="space-y-2">
                <span class="block rounded-full bg-blue-100 px-3 py-1 text-center text-xs font-semibold text-blue-800">
                  {status}
                </span>
                <span class="block rounded-full bg-rose-100 px-3 py-1 text-center text-xs font-semibold text-rose-800">
                  {priority}
                </span>
              </div>
            </div>

            <div class="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <p>
                <span class="font-semibold text-slate-800">Assignee ID:</span>{" "}
                User #{todo.user_id}
              </p>
              <p>
                <span class="font-semibold text-slate-800">Category:</span>{" "}
                {todo.category_name ?? "-"}
              </p>
              <p>
                <span class="font-semibold text-slate-800">Due Date:</span>{" "}
                {cleanDate}
              </p>
              <p>
                <span class="font-semibold text-slate-800">Recurring:</span>{" "}
                {todo.recurring_settings
                  ? todo.recurring_settings.repeat_type
                  : "No"}
              </p>
              <p>
                <span class="font-semibold text-slate-800">Shared With:</span>{" "}
                {todo.shared_with && todo.shared_with.length
                  ? todo.shared_with.map((u) => u.name).join(", ")
                  : "Only assignee"}
              </p>
            </div>

            <section class="mt-6">
              <h3 class="text-lg font-semibold">Tags</h3>
              <div class="mt-2 flex flex-wrap gap-2">
                {todo.tags && todo.tags.length ? (
                  todo.tags.map((t) => (
                    <span
                      key={t.tag_id}
                      class="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700"
                    >
                      {t.name}
                    </span>
                  ))
                ) : (
                  <span class="text-sm text-slate-500">No tags</span>
                )}
              </div>
            </section>

            <section class="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 class="text-lg font-semibold">Subtasks</h3>
                <ul class="mt-2 space-y-2">
                  {todo.subtasks && todo.subtasks.length ? (
                    todo.subtasks.map((s) => (
                      <li
                        key={s.subtask_id}
                        class={`rounded-md border border-slate-200 px-3 py-2 text-sm ${s.is_completed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                      >
                        {s.title} - {s.is_completed ? "Completed" : "Pending"}
                      </li>
                    ))
                  ) : (
                    <li class="text-sm text-slate-500">No subtasks</li>
                  )}
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-semibold">Reminders</h3>
                <ul class="mt-2 space-y-2">
                  {todo.reminders && todo.reminders.length ? (
                    todo.reminders.map((r) => (
                      <li
                        key={r.reminder_id}
                        class="rounded-md border border-slate-200 px-3 py-2 text-sm"
                      >
                        {r.reminder_time}
                      </li>
                    ))
                  ) : (
                    <li class="text-sm text-slate-500">No reminders</li>
                  )}
                </ul>
              </div>
            </section>

            <section class="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 class="text-lg font-semibold">Comments</h3>
                <ul class="mt-2 space-y-2">
                  {todo.comments && todo.comments.length ? (
                    todo.comments.map((c) => (
                      <li
                        key={c.comment_id}
                        class="rounded-md border border-slate-200 px-3 py-2 text-sm"
                      >
                        <strong>User #{c.user_id}:</strong> {c.text}
                      </li>
                    ))
                  ) : (
                    <li class="text-sm text-slate-500">No comments</li>
                  )}
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-semibold">Attachments</h3>
                <ul class="mt-2 space-y-2">
                  {todo.attachments && todo.attachments.length ? (
                    todo.attachments.map((a) => (
                      <li
                        key={a.attachment_id}
                        class="rounded-md border border-slate-200 px-3 py-2 text-sm"
                      >
                        {a.file_url}
                      </li>
                    ))
                  ) : (
                    <li class="text-sm text-slate-500">No attachments</li>
                  )}
                </ul>
              </div>
            </section>
          </article>
        </div>
      </main>

      <footer class="mt-12">
        <div class="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div class="rounded-xl border border-white/60 bg-white/70 backdrop-blur p-4 text-center text-sm text-slate-600 shadow-sm">
            2026 &copy; <span class="font-semibold text-slate-800">NM</span>.
            All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
