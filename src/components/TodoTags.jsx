export default function TodoTags({ todo }) {
  return (
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
  );
}
