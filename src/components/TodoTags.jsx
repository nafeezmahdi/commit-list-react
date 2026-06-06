export default function TodoTags({ todo }) {
  return (
    <section className="mt-6">
      <h3 className="text-lg font-semibold">Tags</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {todo.tags && todo.tags.length ? (
          todo.tags.map((t) => (
            <span
              key={t.tag_id}
              className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700"
            >
              {t.name}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-500">No tags</span>
        )}
      </div>
    </section>
  );
}
