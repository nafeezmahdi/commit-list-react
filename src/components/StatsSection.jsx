export default function StatsSection({ stats }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" id="stats">
      {stats.map((card, i) => (
        <article key={i} className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className="mt-2 text-2xl font-bold">{card.value}</p>
        </article>
      ))}
    </section>
  );
}
