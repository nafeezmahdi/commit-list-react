import { useState, useEffect } from "react";
import TodoDetailsError from "./components/TodoDetailsError";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoHeader from "./components/TodoHeader";
import TodoTags from "./components/TodoTags";
import TodoMetaData from "./components/TodoMetaData";
import DetailList from "./components/DetailList";

const API_URL = "http://localhost:5000/api";

export default function TodoDetails({ todoId, onGoBack }) {
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Hits the relational database getter endpoint on your running server instance
    fetch(`${API_URL}/todos/${todoId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setTodo(data))
      .catch(() => setError(true));
  }, [todoId]);

  if (error) {
    return <TodoDetailsError onGoBack={onGoBack} />;
  }

  if (!todo)
    return (
      <div className="text-center p-12 text-slate-500 font-semibold">
        Compiling multi-table layout data streams...
      </div>
    );

  const status = todo.status_name ?? "-";
  const priority = todo.priority_level ?? "-";
  const cleanDate = todo.due_date ? todo.due_date.substring(0, 10) : "-";

  return (
    <div className="min-h-screen animated-page-bg text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
