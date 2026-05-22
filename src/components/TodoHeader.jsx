export default function TodoHeader({ todo, status, priority }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Todo #{todo.todo_id}
        </p>
        <h2 className="mt-1 text-2xl font-bold">{todo.title}</h2>
        <p className="mt-2 text-slate-600">{todo.description}</p>
      </div>
      <div className="space-y-2">
        <span className="block rounded-full bg-blue-100 px-3 py-1 text-center text-xs font-semibold text-blue-800">
          {status}
        </span>
        <span className="block rounded-full bg-rose-100 px-3 py-1 text-center text-xs font-semibold text-rose-800">
          {priority}
        </span>
      </div>
    </div>
  );
}
