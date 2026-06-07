import { useState, useEffect } from "react";
import TodoDetailsError from "./components/TodoDetailsError";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoHeader from "./components/TodoHeader";
import TodoTags from "./components/TodoTags";
import TodoMetaData from "./components/TodoMetaData";
import DetailList from "./components/DetailList";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://commit-list-backend-mongo.vercel.app/api";

export default function TodoDetails({ todoId, onGoBack }) {
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/todos/${todoId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((res) => {
        const rawTodo = res.data || res;

        // THE FIX: We force missing arrays to be empty arrays [] so React doesn't crash!
        const adaptedTodo = {
          ...rawTodo,
          // Protect single items
          status_name: rawTodo.status_name || rawTodo.status || "Pending",
          priority_level:
            rawTodo.priority_level || rawTodo.priority || "Medium",

          // Protect lists (If missing, default to [])
          subtasks: rawTodo.subtasks || [],
          reminders: rawTodo.reminders || [],
          comments: rawTodo.comments || [],
          attachments: rawTodo.attachments || [],
          tags: rawTodo.tags || [],
          sharedUsers: rawTodo.sharedUsers || [],
        };

        setTodo(adaptedTodo);
      })
      .catch((err) => {
        console.error("Error fetching details:", err);
        setError(true);
      });
  }, [todoId]);

  if (error) {
    return <TodoDetailsError onGoBack={onGoBack} />;
  }

  if (!todo)
    return (
      <div className="page-layout animated-page-bg text-slate-900">
        <Header />
        <main className="flex flex-1 items-center justify-center p-12 text-center font-semibold text-slate-500">
          Compiling multi-table layout data streams...
        </main>
        <Footer />
      </div>
    );

  const status = todo.status_name ?? "-";
  const priority = todo.priority_level ?? "-";
  const cleanDate = todo.due_date ? todo.due_date.substring(0, 10) : "-";

  return (
    <div className="page-layout animated-page-bg text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <button
          onClick={onGoBack}
          className="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </button>

        <div id="todoDetails">
          <article className="rounded-xl bg-white p-6 shadow-sm">
            <TodoHeader todo={todo} status={status} priority={priority} />

            <TodoMetaData todo={todo} cleanDate={cleanDate} />
            <TodoTags todo={todo} />

            <section className="mt-6 grid gap-6 sm:grid-cols-2">
              <DetailList
                title="Subtasks"
                items={todo.subtasks}
                emptyText="No subtasks"
                renderItem={(s) => (
                  <li
                    key={s.subtask_id}
                    className={`rounded-md border border-slate-200 px-3 py-2 text-sm ${s.is_completed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                  >
                    {s.title} - {s.is_completed ? "Completed" : "Pending"}
                  </li>
                )}
              />
              <DetailList
                title="Reminders"
                items={todo.reminders}
                emptyText="No reminders"
                renderItem={(r) => (
                  <li
                    key={r.reminder_id}
                    className="rounded-md border border-slate-200 px-3 py-2 text-sm"
                  >
                    {r.reminder_time}
                  </li>
                )}
              />
            </section>

            <section className="mt-6 grid gap-6 sm:grid-cols-2">
              <DetailList
                title="Comments"
                items={todo.comments}
                emptyText="No comments"
                renderItem={(c) => (
                  <li
                    key={c.comment_id}
                    className="rounded-md border border-slate-200 px-3 py-2 text-sm"
                  >
                    <strong>User #{c.user_id}:</strong> {c.text}
                  </li>
                )}
              />
              <DetailList
                title="Attachments"
                items={todo.attachments}
                emptyText="No attachments"
                renderItem={(a) => (
                  <li
                    key={a.attachment_id}
                    className="rounded-md border border-slate-200 px-3 py-2 text-sm text-indigo-600 hover:underline cursor-pointer"
                  >
                    {a.file_url}
                  </li>
                )}
              />
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
